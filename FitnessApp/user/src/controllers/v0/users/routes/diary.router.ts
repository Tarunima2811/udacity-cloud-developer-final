import {Router, Request, Response, response} from 'express';

import { requireAuth } from './auth.router';
import {FitnessDiary} from "../models/FitnessDiary";
import {FitnessDiaryResponse} from "../models/FitnessDiaryResponse";
import {sequelize} from "../../../../sequelize";

const router: Router = Router();

router.post("/", requireAuth, async (req: Request, res: Response) => {
  let { recordDate, height, weight, waterIntake, workout, steps, notes } = req.body;

  if (!req.headers || !req.headers.userid){
    return res.status(400).send({ message: 'Required headers missing.' });
  }

  if ( !recordDate || !height || !weight ) {
    return res.status(400).send({ message: 'Reqest must have recordDate, height and weight.'});
  }

  const bmi = await calculateBMI(height, weight);

  const userId: string = req.headers.userid.toString();

  const recordDateTz = recordDate;
  // @ts-ignore
  const new_record = await new FitnessDiary ({
    recordDate: recordDateTz, height: height, weight: weight, waterIntake: waterIntake, workout: workout, steps: steps, notes: notes,
    bmi: bmi, email: userId });
  let savedUser = await new_record.save();
  res.status(201).send(savedUser);
});

// get all Diary items
router.get('/all', async (req: Request, res: Response) => {
  const items = await FitnessDiary.findAll({
      order: [sequelize.literal(`TO_DATE("recordDate", 'YYYY-mm-DD')`)]
    });
  res.status(200).send(items);
});

// get diary items filtered by used email
router.get("/", requireAuth, async (req: Request, res: Response) => {
    if (!req.headers || !req.headers.userid){
        return res.status(200).send({});
    }

    const email: string = req.headers.userid.toString();

    try {
        var items = await FitnessDiary.findAll({
                where: {email: email},
                order: [sequelize.literal(`TO_DATE("recordDate", 'YYYY-mm-DD')`)]
            });
        if (items == null || items.length == 0) {
          return res.status(200).send({});
        }
        res.status(200).send(items);
      } catch (e) {
        console.log("exception: ", e);
        res.status(500).send("Internal Server Error.");
      }
});

export const DiaryRouter: Router = router;

async function convertResponse(items: FitnessDiary[]): Promise<FitnessDiaryResponse[]> {
  var responseList = new Array();
  items.forEach(async function (item) {
    var response = new FitnessDiaryResponse();

    response.id = item.id;
    if (item.height) {
      response.height = parseFloat(item.height) + 'cms';
    } else {
      response.weight = '--'
    }
    if (item.weight) {
      response.weight = parseFloat(item.weight) + 'kgs';
    } else {
      response.weight = '--';
    }
    if (item.waterIntake) {
      response.waterIntake = item.waterIntake + 'glasses';
    } else {
      response.waterIntake = '--';
    }
    if (item.workout) {
      response.workout = item.workout + 'mins';
    } else {
      response.workout = '--';
    }
    if (item.steps) {
      response.steps = item.steps;
    } else {
      response.steps = 0;
    }
    if (item.bmi) {
      response.bmi = item.bmi;
    } else {
      response.bmi = '--';
    }

    response.notes = item.notes;
    response.recordDate = item.recordDate;
    responseList.push(response);
  });

  return responseList;
}

async function calculateBMI(height: string, weight: string): Promise<string> {
  const weightInKg = parseFloat(weight);
  const heightInM = parseFloat(height)/100;
  let bmi : number = weightInKg/(heightInM * heightInM);
  return Math.round((bmi + Number.EPSILON) * 100) / 100 + '';
}

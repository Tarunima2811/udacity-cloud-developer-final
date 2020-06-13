export interface DiaryItem {
    id: number;
    recordDate: string,
    height: string,
    weight: string,
    waterIntake: number,
    workout: number,
    steps: number,
    notes: string,
    bmi: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export const diaryItemMocks: DiaryItem[] = [
    {
        "id": 4,
        "recordDate": "26-05-2010",
        "height": "170",
        "weight": "80",
        "waterIntake": 10,
        "workout": 80,
        "steps": 9567,
        "notes": "New user",
        "bmi": "27.68",
        "createdAt": "2020-05-26T07:02:23.309Z",
        "email": "rahul@gmail.com",
        "updatedAt": "2020-05-26T07:02:23.309Z"
    },
    {
        "id": 1,
        "recordDate": "13-09-2019",
        "height": "175",
        "weight": "75",
        "waterIntake": 10,
        "workout": 80,
        "steps": 9567,
        "notes": "New user",
        "bmi": "24.49",
        "createdAt": "2020-05-26T07:01:12.138Z",
        "email": "rahul@gmail.com",
        "updatedAt": "2020-05-26T07:01:12.138Z"
    },
    {
        "id": 2,
        "recordDate": "26-05-2020",
        "height": "175",
        "weight": "85",
        "waterIntake": 10,
        "workout": 80,
        "steps": 9567,
        "notes": "New user",
        "bmi": "27.76",
        "createdAt": "2020-05-26T07:01:48.329Z",
        "email": "rahul@gmail.com",
        "updatedAt": "2020-05-26T07:01:48.329Z"
    }
];

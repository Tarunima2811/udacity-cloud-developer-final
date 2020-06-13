import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeedProviderService } from '../services/feed.provider.service';

import { LoadingController, ModalController } from '@ionic/angular';
import {DiaryItem} from "../models/diary-item.model";


@Component({
  selector: 'app-feed-upload',
  templateUrl: './feed-upload.component.html',
  styleUrls: ['./feed-upload.component.scss'],
})
export class FeedUploadComponent implements OnInit {
  previewDataUrl;
  uploadForm: FormGroup;
  diaryItem: DiaryItem;

  constructor(
    private feed: FeedProviderService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
        date: new FormControl('', Validators.required),
        height: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required),
        waterIntake: new FormControl(0),
        workout: new FormControl(0),
        steps: new FormControl(0),
        notes: new FormControl('')
    });
  }

  onSubmit($event) {
    $event.preventDefault();
    this.loadingController.create();

    if (!this.uploadForm.valid) {
        return;
    } else {
        console.log('form control: ', this.uploadForm);
        this.diaryItem = {
            recordDate: this.uploadForm.controls['date'].value,
            height: this.uploadForm.controls['height'].value,
            weight: this.uploadForm.controls['weight'].value,
            waterIntake: this.uploadForm.controls['waterIntake'].value,
            workout: this.uploadForm.controls['workout'].value,
            steps: this.uploadForm.controls['steps'].value,
            notes: this.uploadForm.controls['notes'].value,
        } as DiaryItem;
    }
    console.log('Record: ', this.diaryItem);
    this.feed.saveDiaryItem(this.diaryItem)
      .then((result) => {
        this.modalController.dismiss();
        this.loadingController.dismiss();
      });
  }

  cancel() {
    this.modalController.dismiss();
  }
}

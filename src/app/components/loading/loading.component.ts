import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(private loadingController: LoadingController) {

  }

  ngOnInit() {
    this.loadingController.create({
      message: 'Loading...'
    }).then(loading => loading.present());
  }

}

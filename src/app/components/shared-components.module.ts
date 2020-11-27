import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { EmptyMissionsComponent } from './empty-missions/empty-missions.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    LoadingComponent,
    EmptyMissionsComponent
  ],
  exports: [
    LoadingComponent,
    EmptyMissionsComponent
  ]
})
export class SharedComponentsModule { }

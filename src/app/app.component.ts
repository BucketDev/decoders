import { Component } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import { AuthService } from './services/auth.service';
const { AdMob } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  loading = true;

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private authService: AuthService,
              private loadingController: LoadingController) {
    this.authService.$userRetrieved.subscribe(() => {
      this.loading = false;
      // TODO this should be removed after a better loading component is implemented
      this.loadingController.dismiss();
    });
    this.initializeApp();
  }

  initializeApp() {
    AdMob.initialize();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

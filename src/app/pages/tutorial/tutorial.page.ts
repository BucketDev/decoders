import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/services/progress.service';
import { AuthService } from '../../services/auth.service';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { environment } from '../../../environments/environment';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
const { AdMob } = Plugins;

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  private bannerOptions: AdOptions = {
    adId: environment.decodersBannerAdID,
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER
  };

  private interstitialOptions: AdOptions = {
    adId: environment.decodersBannerAdID,
  };

  constructor(private progressService: ProgressService,
              private authService: AuthService,
              private router: Router,
              private loadingController: LoadingController) {
    AdMob.showBanner(this.bannerOptions);
  }

  ngOnInit() {}

  finishTutorial = () =>
  this.loadingController.create({
    message: 'Saving progress...'
  })
  .then(loading => {
    loading.present();
    this.progressService.update(this.authService.user.uid, { wasTutorialPlayed: true })
      .then(() => {
        AdMob.addListener('onAdLoaded', (info: boolean) => {
          loading.dismiss();
          AdMob.showInterstitial();
        });
        AdMob.addListener('onInterstitialAdClosed', (info: boolean) => {
          this.router.navigateByUrl('/home');
        });
        AdMob.prepareInterstitial(this.interstitialOptions);
      })
    })
}

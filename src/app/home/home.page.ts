import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { environment } from '../../environments/environment';
const { AdMob } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private bannerOptions: AdOptions = {
    adId: environment.decodersBannerAdID,
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    isTesting: true
  };

  constructor() {
    AdMob.showBanner(this.bannerOptions);

    // Subscribe Banner Event Listener
    AdMob.addListener('onAdLoaded', (info: boolean) => console.log('ad loaded'));
  }

}

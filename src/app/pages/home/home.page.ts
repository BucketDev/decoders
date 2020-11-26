import { Component, OnInit } from '@angular/core';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { environment } from '../../../environments/environment';
const { AdMob, Network } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  networkStatus: any;
  networkListener: PluginListenerHandle;

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

  ngOnInit() {
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      console.log('Network status changed', status);
    });
  }

}

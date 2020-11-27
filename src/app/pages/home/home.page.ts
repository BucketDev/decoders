import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level.service';
import { MissionService } from '../../services/mission.service';
import { Plugins, PluginListenerHandle } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { environment } from '../../../environments/environment';
import { Level } from 'src/app/models/level.class';
import { Mission } from 'src/app/models/mission.class';
const { AdMob, Network } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  networkStatus: any;
  networkListener: PluginListenerHandle;
  levels: Level[];

  private bannerOptions: AdOptions = {
    adId: environment.decodersBannerAdID,
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER
  };

  constructor(private levelService: LevelService,
              private missionService: MissionService) {
    AdMob.showBanner(this.bannerOptions);
  }

  ngOnInit() {
    this.levelService.findAll().subscribe((levels: Level[]) => {
      this.levels = levels;
      levels.forEach(level => this.missionService.findAllByLevelUid(level.uid)
        .subscribe((missions: Mission[]) => level.missions = missions));
    });
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      console.log('Network status changed', status);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/services/progress.service';
import { AuthService } from '../../services/auth.service';
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { environment } from '../../../environments/environment';
import { Plugins } from '@capacitor/core';
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

  constructor(private progressService: ProgressService,
              private authService: AuthService,
              private router: Router) {
    AdMob.showBanner(this.bannerOptions);
  }

  ngOnInit() {
  }

  finishTutorial = () =>
    this.progressService.update(this.authService.user.uid, { wasTutorialPlayed: true })
      .then(() => this.router.navigateByUrl('/home'))

}

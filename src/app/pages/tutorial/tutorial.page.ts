import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/services/progress.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private progressService: ProgressService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  finishTutorial = () =>
    this.progressService.update(this.authService.user.uid, { wasTutorialPlayed: true })
      .then(() => this.router.navigateByUrl('/home'))

}

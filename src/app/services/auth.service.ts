import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReplaySubject } from 'rxjs';
import { StorageService } from './storage.service';
import { ProgressService } from './progress.service';
import { Progress } from '../models/progress.class';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;
  $userRetrieved = new ReplaySubject<boolean>(1);

  constructor(private fireAuth: AngularFireAuth,
              private storage: StorageService,
              private progressService: ProgressService,
              private router: Router) {
    fireAuth.authState.subscribe((user) => {
      this.user = user;
      if (user === null) {
        fireAuth.signInAnonymously()
          .then(() => console.log('success'))
          .catch((err) => console.error(err));
      } else {
        // recover info from local storage
        storage.get(user.uid)
          .then(value => {
            // if null then create the first record and save (firestore and local)
            if (value === null) {
              this.progressService.add(user.uid, new Progress())
                .then(() => this.router.navigateByUrl('/tutorial')
                  .then(() => this.$userRetrieved.next(true)));
            } else {
              // not null then validate tutorial progress
              // if tutorial was done, load path with current level
              if (value.wasTutorialPlayed) {
                this.router.navigateByUrl('/home').then(() => this.$userRetrieved.next(true));
              } else {
                // if tutorial is not completed, load tutorial
                this.router.navigateByUrl('/tutorial').then(() => this.$userRetrieved.next(true));
              }
            }
          })
          .catch(console.error);
      }
    });
  }

}

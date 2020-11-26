import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Progress } from '../models/progress.class';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private db: AngularFirestore,
              private storage: StorageService) { }

  add = (uid: string, progress: Progress) =>
    this.db.collection('users').doc(uid).set({...progress})
      .finally(() => this.storage.set(uid, progress))

  update = (uid: string, progress: Progress) =>
    this.db.collection('users').doc(uid).update({...progress})
      .finally(() => this.storage.set(uid, progress))
}

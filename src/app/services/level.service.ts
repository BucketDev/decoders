import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Level } from '../models/level.class';


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private db: AngularFirestore) { }

  findAll = () =>
    this.db.collection('levels', ref => ref.orderBy('level', 'asc')).get().pipe(map((snapshot: QuerySnapshot<Level>) =>
      snapshot.docs.map((document: QueryDocumentSnapshot<Level>) => {
        const {level, name} = document.data();
        const currentLevel: Level = new Level(level, name);
        const uid: string = document.id;
        return {...currentLevel, uid};
      })))

}

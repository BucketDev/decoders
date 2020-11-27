import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mission } from '../models/mission.class';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private db: AngularFirestore) { }

  findAllByLevelUid = (levelUid: string) =>
    this.db.collection('levels').doc(levelUid).collection('missions', ref => ref.orderBy('mission', 'asc'))
      .get().pipe(map((snapshot: QuerySnapshot<Mission>) =>
        snapshot.docs.map((document: QueryDocumentSnapshot<Mission>) => {
          const {mission, name} = document.data();
          const currenMission: Mission = new Mission(mission, name);
          const uid: string = document.id;
          return {...currenMission, uid};
        })))

}

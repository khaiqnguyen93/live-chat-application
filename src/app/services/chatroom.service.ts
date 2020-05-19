import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  public chatrooms: Observable<any>;
  public changeChatroom: BehaviorSubject<String | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMsg: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.selectedChatroom = this.changeChatroom.pipe(
      switchMap((chatroomId) => {
        if(chatroomId) {
          return db.doc(`chatrooms/${chatroomId}`).valueChanges();
        }
        return of(null);
      })
    )

    this.selectedChatroomMsg = this.changeChatroom.pipe(
      switchMap((chatroomId) => {
        if(chatroomId) {
          return db.collection(`chatrooms/${chatroomId}/messages`, ref => {
            return ref.orderBy('createdAt', 'asc').limit(50);
          }).valueChanges()
          ;
        }
        return of(null);
      })
    )

    this.chatrooms = db.collection('chatrooms').valueChanges();
  }

  public createMessage(msg: string): void {
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: msg,
      createdAt: new Date,
      sender: this.authService.currentUserSnapshot
    };

    this.db.collection(`chatrooms/${chatroomId}/messages`).add(message);
  }
}

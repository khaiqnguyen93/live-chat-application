import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/app/classes/alert';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string = '';
  private subscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: string;

  constructor(
    private authService: AuthService
    , private routeActivated: ActivatedRoute
    , private fireStorage: AngularFireStorage
    , private afStore: AngularFirestore
    , private location: Location
    , private alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      })
    );

    this.subscriptions.push(
      this.routeActivated.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
  }

  public uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `profile_${this.currentUser.id}_${file.name}`;
    const uploadTask = this.fireStorage.upload(filePath, file);
    const ref = this.fireStorage.ref(filePath);

    // Observe percentage change
    this.subscriptions.push(
      uploadTask.percentageChanges().subscribe(percentage => {
        if(percentage < 100) {
          document.getElementById("overlay").style.display = "block";
        } else {
          document.getElementById("overlay").style.display = "none";
        }
        this.uploadPercent = percentage;
      })
    );

    // Get notified when download Url is available
    let downloadUrlTemp: Observable<string>;
    this.subscriptions.push(
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          downloadUrlTemp = ref.getDownloadURL();
          downloadUrlTemp.subscribe(url => this.downloadUrl = url);
        })
      ).subscribe()
    )
  }

  public save(): void {
    let photo;
    if(this.downloadUrl) {
      photo = this.downloadUrl;
    } else {
      photo = this.currentUser.photoUrl;
    }
    const user = Object.assign({}, this.currentUser, {photoUrl: photo});
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc((`users/${user.id}`))
    userRef.set(user);
    this.alertService.alerts.next(new Alert('Your profile was successfully updated!'));
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

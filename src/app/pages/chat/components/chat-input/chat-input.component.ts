import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public newMsgText: string = '';
  private subscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: string = '';
  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;

  constructor(
    private chatroomService: ChatroomService
    , private fireStorage: AngularFireStorage
    , private afStore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  public uploadFile(event): void {
    const file = event.target.files[0];
    this.labelImport.nativeElement.innerText = file.name;

    const datePipe = new DatePipe('en-US');
    const myFormattedDate = datePipe.transform(new Date(), 'dd_MM_yyyy_hhhh_mm_ss');
    const filePath = `${myFormattedDate}_${file.name}`;
    const uploadTask = this.fireStorage.upload(filePath, file);
    const ref = this.fireStorage.ref(filePath);

    // Observe percentage change
    this.subscriptions.push(
      uploadTask.percentageChanges().subscribe(percentage => {
        if(percentage < 100) {
          //loading
        } else {
          //loading off
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

  public submit(message: string): void {
    let file = {};
    if(this.downloadUrl) {
      file = {
        name: this.labelImport.nativeElement.innerText,
        url: this.downloadUrl,
      }
    }
    this.chatroomService.createMessage(message, file);
    this.resetValue();
  }

  private resetValue(): void {
    this.newMsgText = '';
    this.downloadUrl = '';
    this.labelImport.nativeElement.innerText = 'Choose file';
  }
}

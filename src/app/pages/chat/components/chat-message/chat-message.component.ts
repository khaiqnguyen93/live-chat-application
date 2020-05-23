import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() msg: Message;
  constructor(
    private fireStorage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  public download(event: any): void {
    const storageRef = this.fireStorage.ref(`23_05_2020_0101_00_22_vi-sao-ga-trong-lai-gay.jpg`);
    console.log(storageRef)
    console.log('storageRef');
    storageRef.getDownloadURL().subscribe((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    })
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public newMsgText: string = '';
  constructor() { }

  ngOnInit() {
  }

  public submit(message: string): void {
    console.log('New Message:', message);

    this.newMsgText = '';
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public newMsgText: string = '';
  constructor(
    private chatroomService: ChatroomService
  ) { }

  ngOnInit() {
  }

  public submit(message: string): void {
    this.chatroomService.createMessage(message);

    this.newMsgText = '';
  }
}

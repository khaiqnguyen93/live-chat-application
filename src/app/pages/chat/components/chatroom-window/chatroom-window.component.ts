import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer',{static: false}) private scrollContainer: ElementRef;

  public subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public msgs: Observable<any>;

  constructor(
    private route: ActivatedRoute
    , private chatroomService: ChatroomService
    ) {
      this.subscriptions.push(
        this.chatroomService.selectedChatroom.subscribe(chatRoom => {
          this.chatroom = chatRoom;
        })
      );

      this.subscriptions.push(
        this.chatroomService.selectedChatroomMsg.subscribe(msgs => {
          this.msgs = msgs;
        })
      )

    }

  ngOnInit() {
    this.scrollToNewestMessage();
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatroomService.changeChatroom.next(chatroomId);
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewChecked() {
    this.scrollToNewestMessage();
  }

  private scrollToNewestMessage(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }
}

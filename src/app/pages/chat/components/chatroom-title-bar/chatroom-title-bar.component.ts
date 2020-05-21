import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { QrDialogComponent } from 'src/app/components/qr-dialog/qr-dialog.component';

@Component({
  selector: 'app-chatroom-title-bar',
  templateUrl: './chatroom-title-bar.component.html',
  styleUrls: ['./chatroom-title-bar.component.scss']
})
export class ChatroomTitleBarComponent implements OnInit {

  public currentUrl: string = null;
  @Input() title: string;

  constructor(
    public dialog : MatDialog
  ) {}

  openQRDialog(): void {
    this.dialog.open(QrDialogComponent, {});
  }

  ngOnInit() {
  }

}

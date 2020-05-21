import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialogComponent implements OnInit {

  public currentUrl: string = null;
  constructor(
    @Inject(DOCUMENT)private document: any) {
      this.currentUrl = document.location.href;
    }

  ngOnInit() {
  }

}

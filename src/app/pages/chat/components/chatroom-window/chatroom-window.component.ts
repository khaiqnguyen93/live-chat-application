import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  public dummyData = [
    {
      message: "sfcdsdsdsfs",
      createAt: new Date,
      sender: {
        firstName:'Kai',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },
    {
      message: "aaa",
      createAt: new Date,
      sender: {
        firstName:'Kai',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },
    {
      message: "aaa",
      createAt: new Date,
      sender: {
        firstName:'Kai',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },
    {
      message: "aaa",
      createAt: new Date,
      sender: {
        firstName:'Vy',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },
    {
      message: "aaa",
      createAt: new Date,
      sender: {
        firstName:'Khai',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },
    {
      message: "aaa",
      createAt: new Date,
      sender: {
        firstName:'Khai',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },
    {
      message: "aaa",
      createAt: new Date,
      sender: {
        firstName:'Khai',
        lastName:'Nguyen',
        photoURL:'https://via.placeholder.com/50x50'
      }
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}

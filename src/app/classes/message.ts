import { User } from '../interfaces/user'
export class Message {
  message: string;
  createdAt: any;
  sender: User;
  file: any;

  constructor({message, createdAt, sender, file}) {
    this.message = message;
    this.createdAt = createdAt;
    this.sender= sender;
    this.file = file;
  }
}

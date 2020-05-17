export class User {
  firstName: string;
  lastName: string;
  photoURL: string;

  constructor({firstName, lastName, photoURL}){
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoURL = photoURL;
  }
}

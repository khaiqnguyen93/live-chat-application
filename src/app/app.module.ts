import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { AlertModule } from 'ngx-bootstrap/alert';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { QRCodeModule } from 'angularx-qrcode';

// Components
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditorComponent } from './pages/profile-editor/profile-editor.component';

// Services
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { ChatroomService } from './services/chatroom.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { OwnershipAccountGuard } from './guards/ownership-account.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomWindowComponent,
    ProfileComponent,
    ProfileEditorComponent,
    QrDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    QRCodeModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  entryComponents: [
    QrDialogComponent,
  ],
  providers: [
    AuthService,
    AlertService,
    ChatroomService,
    AuthGuard,
    OwnershipAccountGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

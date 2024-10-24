import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

}




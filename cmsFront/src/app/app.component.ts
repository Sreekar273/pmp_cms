import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cmsFront';

  constructor(private auth: AuthService){}
  // ngOnInit(): void {
  //   // localStorage.getItem('loggedIn');
  //   if (localStorage.getItem("loggedIn")){
  //     this.showSidebar = true;
  //   }
  // }
}

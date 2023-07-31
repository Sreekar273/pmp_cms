import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router){}

    // ngOnInit(): void {
    //     throw new Error("Method not implemented.");
    // }

    toggleSidebar(){
        this.toggleSidebarForMe.emit();
    }

    logout(){
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
    }

}

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent {

  constructor(private http: HttpClient, private router: Router){}

  // @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  // curremail = JSON.parse(localStorage.getItem('currentUser')!);

  onSubmit(data: {email: string, type: string, complaint: string}, path: string){

    let curremail = localStorage.getItem('UserData');

    console.log(curremail);

    //   alert('1');  FINAL
      // let queryParams = new HttpParams().append("username",data.username);
      console.log(data);
      data.email = curremail!;
      console.log(data);
      
      return this.http.post<any>("http://127.0.0.1:8000/complaint", data)
        .subscribe((result)=>{
        console.log(result);

        this.router.navigate([path]);
      });
    }

}

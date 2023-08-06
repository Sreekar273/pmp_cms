import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  // baseURL = 'http://localhost:5000/login';
  // baseUrl = 'http://13.233.29.211/login'

  path:string | undefined;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService){}

  loginUser(): void{
    this.auth.login().then(()=>{
      this.router.navigate(['/complaint']);
    });
  }

  onSubmit(data:any, path: string){

  //   alert('1');  FINAL
    // let queryParams = new HttpParams().append("username",data.username);
  //  console.log(data.username);
  // this.router.navigate([path]);
    return this.http.post<any>("https://pmp-cms-node.vercel.app/login", data)
      .subscribe((result)=>{
        // debugger;
        console.log(result);
        console.log(result.role);
        // localStorage.setItem('localUserData', JSON.stringify(result));
        localStorage.setItem('localUserData', (result.role));
        console.log(localStorage.getItem('localUserData'));

        localStorage.setItem('UserData', (data.email));
        console.log(localStorage.getItem('UserData'));

        if(result.result){
          // this.router.navigate([path]);
          if(result.role === 'Admin'){
            this.auth.login().then(()=>{
              this.router.navigate(['/admin']);
            });
            // this.loginUser();
          }
          else{
            // path = '/complaint';
            this.loginUser();
          }
          
        }
        else{
          alert('Incorrect email or password');
        }
    });
    // this.http.get<any>("http://127.0.0.1:5000/login", data).subscribe({

    // })
  }
  // loginUser(): void{
  //   this.auth.login().then(()=>{
  //     this.router.navigate(['/complaint']);
  //   });
  // }

  // onSubmit(data:any, path: string){

  // //   alert('1');  FINAL
  //   // let queryParams = new HttpParams().append("username",data.username);
  // //  console.log(data.username);
  // // this.router.navigate([path]);
  //   return this.http.post<any>("http://127.0.0.1:8000/login", data)
  //     .subscribe((result)=>{
  //       // debugger;
  //       console.log(result);
  //       console.log(result.role);
  //       // localStorage.setItem('localUserData', JSON.stringify(result));
  //       localStorage.setItem('localUserData', (result.role));
  //       console.log(localStorage.getItem('localUserData'));

  //       localStorage.setItem('UserData', (data.email));
  //       console.log(localStorage.getItem('UserData'));

  //       if(result.result){
  //         // this.router.navigate([path]);
  //         if(result.role === 'Admin'){
  //           this.auth.login().then(()=>{
  //             this.router.navigate(['/admin']);
  //           });
  //           // this.loginUser();
  //         }
  //         else{
  //           // path = '/complaint';
  //           this.loginUser();
  //         }
          
  //       }
  //       else{
  //         alert('Incorrect email or password');
  //       }
  //   });
  //   // this.http.get<any>("http://127.0.0.1:5000/login", data).subscribe({

  //   // })
  // }

  // ngOnInit(){
  //   // this.loginData = this.service.getData();
  // }

  // public getJsonValue: any;
  // public postJsonValue: any;

  // constructor(private http: HttpClient){
  //   // logindata(){
  //   //   return this.http.get(this.baseURL);
  //   // }
  //   this.getMethod();
  // }

}

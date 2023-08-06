import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient){}

  totalAngularPackages: any;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http.get<any>('https://pmp-cms-node.vercel.app/admin').subscribe(data => {
      // console.log(data);
        this.totalAngularPackages = data;
        console.log(this.totalAngularPackages);
    });

    // console.log(this.totalAngularPackages);
  }
  // ngOnInit() {
  //   // Simple GET request with response type <any>
  //   this.http.get<any>('http://127.0.0.1:8000/admin').subscribe(data => {
  //     // console.log(data);
  //       this.totalAngularPackages = data;
  //       console.log(this.totalAngularPackages);
  //   });

  //   // console.log(this.totalAngularPackages);
  // }
}

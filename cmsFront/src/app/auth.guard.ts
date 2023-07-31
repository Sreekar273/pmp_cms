import { CanActivateFn, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  if(!localStorage.getItem('loggedIn')){
    alert('Please login to continue');
    router.navigate(['/login']);
  }

  return true;
};

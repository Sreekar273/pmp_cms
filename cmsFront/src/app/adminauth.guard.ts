import { CanActivateFn, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export const adminauthGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);

  if(localStorage.getItem('localUserData') === 'User'){
    alert('Not authorised');
    router.navigate(['/complaint']);
  }

  return true;
};

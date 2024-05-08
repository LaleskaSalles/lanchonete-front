import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router= inject(Router);

  if(!authService.isLoggedIn()){
    router.navigate(['/login']);
    }
  return true;

};

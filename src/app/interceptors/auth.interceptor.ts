import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getAccessToken();

  // Clone request and add Authorization header if token exists
  const authReq = accessToken
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    : req;

  return next(authReq);
};

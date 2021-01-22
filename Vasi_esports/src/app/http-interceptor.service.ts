import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService} from './authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private injector : Injector) { }

intercept(req, next){
  let auth = this.injector.get(AuthenticationService);
  let tokenizedReq = req.clone({
    setHeader :{
      Authorization : `Bearer ${auth.getToken()}`
    }
  });
  return next.handle(tokenizedReq);
}

}

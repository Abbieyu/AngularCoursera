import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  handleError(error:HttpErrorResponse | any){
    let errMsg:string;
    if(error.error instanceof ErrorEvent){//an error event occured
      errMsg = error.error.message;
    }
    else{// the server responded with an error ( the error is coming from the server side)
      errMsg = `${error.status}-${error.statusText || ''} ${error.error}`;
    }

    return throwError(errMsg);//return an error observable
  }
}

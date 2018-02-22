import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AllUserData } from '../../../shared/to/all-user-data';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }


  loadUserThreads(): Observable<AllUserData> {
    return this.http.get('/apiv1/threads')
      .map((res: Response) => res.json());
  }

}

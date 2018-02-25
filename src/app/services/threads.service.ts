import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AllUserData } from '../../../shared/to/all-user-data';
import { INITIAL_DATA_STATE } from '../store/data-state';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }


  loadUserThreads(userId?: number): Observable<AllUserData> {
    if (!userId) {
      return Observable.of(<AllUserData>INITIAL_DATA_STATE);
    }

    const headers = new Headers();

    headers.append('userid', userId.toString());

    return this.http.get('/apiv1/threads', { headers })
      .map((res: Response) => res.json());
  }

}

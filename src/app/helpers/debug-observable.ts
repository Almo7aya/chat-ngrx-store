import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


//declear the debug method in the defintion
// it will marge with the existen types
declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (string) => Observable<T>;
  }
}

// add the debug function to the Observable prototype 
// dont use the fucking arrow function it's not have a this
Observable.prototype.debug = function (message: string) {

  const { production } = environment;

  return this.do(
    nextValue => !production ? console.log(message, nextValue) : null,
    error => !production ? console.error(message, error) : null,
    () => !production ? console.log(message, 'COMPLETED !!') : null
  );

};


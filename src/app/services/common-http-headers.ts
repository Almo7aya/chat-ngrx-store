import { Headers } from '@angular/http';

export const commonHttpHeaders = (userId) => {
  const headers = new Headers();
  headers.append('userid', userId.toString());
  headers.append('content-type', 'application/json; charset=utf-8');

  return headers;
};

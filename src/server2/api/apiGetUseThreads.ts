import { Application, Response, Request } from 'express';

export const apiGetUserThreads = (app: Application) => {

  app.route('/apiv2/threads').get((req: Request, res: Response) => {

  });

};

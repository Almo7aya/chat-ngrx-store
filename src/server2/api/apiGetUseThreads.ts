import { Application, Response, Request } from 'express';
import { getDbThreadsByParticipantId } from '../persistence/getDbThreadsByParticipantId';

export const apiGetUserThreads = (app: Application) => {

  app.route('/apiv2/threads').get((req: Request, res: Response) => {

    const participantId = 1; // just for now

    const participantThreads = getDbThreadsByParticipantId(participantId);

    res.writeHead(200, { 'Content-Type': 'text/plan' });
    res.end('Its working');

  });

};

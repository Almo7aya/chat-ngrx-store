
import { Application } from 'express';
import { Thread } from '../../../shared/model/thread';
import { dbThreads } from '../db-data';
import * as _ from 'lodash';



export function apiUpdateThread(app: Application) {

  app.route('/apiv1/threads/:id').patch((req, res) => {

    const participantId = parseInt(req.headers['userid'].toString(), 10);

    const threadId = parseInt(req.params['id'], 10);

    const updatedProps = req.body;


    const allThreads: Thread[] = <any>_.values(dbThreads);

    const thread = _.find(allThreads, threadE => threadE.id === threadId);

    if (updatedProps.hasOwnProperty('read')) {
      thread.participants[<any>participantId] = 0;
    }

    res.status(200).send();

  });

}

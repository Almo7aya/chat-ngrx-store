import { Application, Response, Request } from 'express';
import { getDbThreadsByParticipantId } from '../persistence/getDbThreadsByParticipantId';
import { Thread } from '../../../shared/model/thread';
import { Message } from '../../../shared/model/message';
import { AllUserData } from '../../../shared/to/all-user-data';
import { filter, values, keys, uniq } from 'lodash';
import { dbMessages, dbParticipants } from '../../server/model/data-db';

export const apiGetUserThreads = (app: Application) => {

  app.route('/apiv2/threads').get((req: Request, res: Response) => {

    const participantId = 1; // just for now

    const participantThreads: Thread[] = getDbThreadsByParticipantId(participantId);

    let messages: Message[] = [];
    let participantIds: string[] = [];

    participantThreads.forEach((thread: Thread) => {
      const threadMessages: Message[] = filter(values(dbMessages), (message: Message) => message.threadId === thread.id);
      const threadParticipantIds: string[] = keys(thread.participants);
      messages = [...messages, ...threadMessages];
      participantIds = [...participantIds, ...threadParticipantIds];
    });

    const participants = uniq(participantIds.map(partId => dbParticipants[partId]));

    const response: AllUserData = {
      messages,
      participants,
      threads: participantThreads
    };

    res.status(200).json(response);

  });

};

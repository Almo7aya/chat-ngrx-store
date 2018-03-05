import { Application, Response, Request } from 'express';
import { getDbThreadsByParticipantId } from '../persistence/getDbThreadsByParticipantId';
import { Thread } from '../../../shared/model/thread';
import { Message } from '../../../shared/model/message';
import { filter, values, keys } from 'lodash';
import { dbMessages } from '../../server/model/data-db';

export const apiGetUserThreads = (app: Application) => {

  app.route('/apiv2/threads').get((req: Request, res: Response) => {

    const participantId = 1; // just for now

    const participantThreads: Thread[] = getDbThreadsByParticipantId(participantId);

    const messages: Message[] = [];
    const participantIds: string[] = [];

    participantThreads.forEach((thread: Thread) => {
      const threadMessages: Message[] = filter(values(dbMessages), (message: Message) => message.threadId === thread.id);
      const threadParticipantIds: string[] = keys(thread.participants);
      messages.concat(threadMessages);
      participantIds.concat(threadParticipantIds);
    });

    res.status(200).json({ messages, participantIds });

  });

};

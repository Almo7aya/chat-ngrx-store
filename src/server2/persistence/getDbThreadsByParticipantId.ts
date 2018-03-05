import { Thread } from '../../../shared/model/thread';
import { values, includes, keys, filter } from 'lodash';
import { dbThreads } from '../db-data';

export const getDbThreadsByParticipantId = (participantId: number): Thread[] => {

  const allThreadsDb: Thread[] = values<Thread>(dbThreads);

  return filter(allThreadsDb, threadDb =>
    includes(keys(threadDb.participants), participantId.toString())
  );

};

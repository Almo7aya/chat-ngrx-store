


import { Application } from 'express';
import { dbMessagesQueuePerUser, dbMessages, dbThreads } from "../db-data";


export function apiMessageNotificationsPerUser(app: Application) {


    app.route('/apiv1/notifications/messages').post((req, res) => {

        const participantId = req.headers['userid'];

        if (!participantId) {
            res.status(200).json({ payload: [] });
            return;
        }

        const unreadMessageIds = dbMessagesQueuePerUser[<any>participantId];

        const unreadMessages = unreadMessageIds.map(messageId => dbMessages[messageId]);

        dbMessagesQueuePerUser[<any>participantId] = [];

        res.status(200).json({ payload: unreadMessages });

    });

}
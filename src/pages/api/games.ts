import type { NextApiRequest, NextApiResponse } from 'next';

import {
  GameEntryEntry,
  GameEntryWithObjectId,
} from '../../../models/GameEntry/GameEntries';

import { GameEntries } from '../../../models/GameEntry/GameEntriesDb';

if (!process.env.API_KEY) {
  throw new Error('API_KEY missing in env');
}
class ErrorWithStatusCode extends Error {
  status = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    GameEntryWithObjectId | GameEntryWithObjectId[] | { message: string } | null
  >
) {
  try {
    switch (req.method) {
      case 'POST': {
        if (req.body.apiKey !== process.env.API_KEY) {
          throw new ErrorWithStatusCode('Unauthorized.', 401);
        }
        delete req.body.apiKey;
        const validatedLog = await GameEntryEntry.parseAsync(req.body);
        const insertResult = await GameEntries.insertOne(validatedLog);
        return res.status(200).json({
          ...validatedLog,
          _id: insertResult.insertedId,
        });
      }
      case 'GET': {
        let logs;
        if (req.query.title) {
          logs = await GameEntries.find({
            $or: [
              { title: new RegExp(req.query.title as string, 'i') },
              { platform: new RegExp(req.query.title as string, 'i') },
            ],
          }).toArray();
          if (
            req.query.title === 'wishlist' ||
            req.query.title === 'wish list'
          ) {
            const extraLogs = await GameEntries.find({
              bought: false,
            }).toArray();
            logs = [...logs, ...extraLogs];
          }
          if (req.query.title === 'bought') {
            const extraLogs = await GameEntries.find({
              bought: true,
            }).toArray();
            logs = [...logs, ...extraLogs];
          }
        } else {
          logs = await GameEntries.find().toArray();
        }
        return res.status(200).json(logs);
      }
      case 'DELETE': {
        if (req.body.title && req.body.platform) {
          await GameEntries.deleteOne({
            $and: [{ title: req.body.title }, { platform: req.body.platform }],
          });
          return res.status(200).json({ message: 'deleted' });
        }
        return res.status(400).json({ message: 'error parsing data' });
      }
      default: {
        throw new ErrorWithStatusCode('Not Supported.', 405);
      }
    }
  } catch (e) {
    const error = e as Error;
    if (error instanceof ErrorWithStatusCode) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    // TODO: handle zod errors
    // TODO: handle all errors in catch all middleware
    return res.json({
      message: error.message,
    });
  }
}

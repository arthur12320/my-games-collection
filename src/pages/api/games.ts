import type { NextApiRequest, NextApiResponse } from 'next';

import {
  GameEntries,
  GameEntryEntry,
  GameEntryWithObjectId,
} from '../../../models/GameEntry/GameEntries';

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
    GameEntryWithObjectId | GameEntryWithObjectId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'POST': {
        const validatedLog = await GameEntryEntry.parseAsync(req.body);
        const insertResult = await GameEntries.insertOne(validatedLog);
        return res.status(200).json({
          ...validatedLog,
          _id: insertResult.insertedId,
        });
      }
      case 'GET': {
        return res.json({ mm: 'mm' });
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

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
        const search = req.query.title;
        const { beaten } = req.query;
        const { bought } = req.query;
        const { platform } = req.query;
        
        if (search || beaten !== undefined || bought !== undefined) {
          let andSearch: {}[] = [];
          let searchParams = {};
          if (search) {
           
            searchParams = {
              title: new RegExp(search as string, 'i'),
            };
          }

          if (beaten !== undefined || bought !== undefined) {
            if (beaten !== undefined) {
              andSearch = [...andSearch, { beaten: beaten !== 'false' }];
            }
            if (bought !== undefined) {
              andSearch = [...andSearch, { bought: bought !== 'false' }];
            }
            if (platform !== undefined) {
              andSearch = [...andSearch, { platform }];
            }
            logs = await GameEntries.find({
              $and: [...andSearch, searchParams],
            })
              .sort({ _id: -1 })
              .toArray();
          } else {
            logs = await GameEntries.find(searchParams)
              .sort({ _id: -1 })
              .toArray();
          }
        } else {
          logs = await GameEntries.find().sort({ _id: -1 }).toArray();
        }
        return res.status(200).json(logs);
      }
      case 'PATCH': {
        if (req.body.newGame.apiKey !== process.env.API_KEY) {
          throw new ErrorWithStatusCode('Unauthorized.', 401);
        }
        if (req.body.oldGame && req.body.newGame) {
          const filter = {
            $and: [
              { title: req.body.oldGame.title },
              { platform: req.body.oldGame.platform },
            ],
          };

          const newgame = req.body.newGame;
          // eslint-disable-next-line no-underscore-dangle
          delete newgame._id;
          const update = {
            $set: newgame,
          };

          await GameEntries.updateOne(filter, update);
          return res.status(200).json({ message: 'updated' });
        }
        return res.status(400).json({ message: 'error parsing data' });
      }
      case 'DELETE': {
        if (req.body.apiKey !== process.env.API_KEY) {
          throw new ErrorWithStatusCode('Unauthorized.', 401);
        }
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

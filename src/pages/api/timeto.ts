import type { NextApiRequest, NextApiResponse } from 'next';

import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

const hltbService = new HowLongToBeatService();

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
  res: NextApiResponse<number | { message: string } | null | HowLongToBeatEntry>
) {
  try {
    switch (req.method) {
      case 'GET': {
        const { name } = req.query;

        if (name) {
          return await hltbService
            .search(decodeURI(name as string) as string)
            .then((result) => {
              res.status(200).json(result[0]);
            });
        }
        return [];

        // return res.status(200).json();
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

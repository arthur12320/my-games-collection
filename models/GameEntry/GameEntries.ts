import { WithId } from 'mongodb';
import db from '../../db';

import { GameEntryEntry } from './GameEntry';

export { GameEntryEntry };

export type GameEntryWithObjectId = WithId<GameEntryEntry>;

export const GameEntries = db.collection<GameEntryEntry>('games');

import db from '../../db';
import { GameEntryEntry } from './GameEntry';

export { GameEntryEntry };

export const GameEntries = db.collection<GameEntryEntry>('games');

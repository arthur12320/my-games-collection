import { WithId } from 'mongodb';
import { GameEntryEntry } from './GameEntry';

export { GameEntryEntry };

export type GameEntryWithObjectId = WithId<GameEntryEntry>;

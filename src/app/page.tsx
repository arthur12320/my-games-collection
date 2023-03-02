
import GameCard from './components/gameCard';
import { GameEntries } from '../../models/GameEntry/GameEntries';
import { GameEntryEntryWithId } from '../../models/GameEntry/GameEntry';

export default async function Home() {
  const games = await GameEntries.aggregate<GameEntryEntryWithId>([
    { $addFields: { _id: { $toString: '$_id' } } },
  ]).toArray();

  return (
    <main className="bg-slate-300 h-max min-h-full">
      <div>
        <p className="text-green-500 font-bold text-center ">testeee</p>
        <div className="grid grid-cols-1 gap-6 m-5 md:grid-cols-2 lg:grid-cols-4 items-start h-max">
          {games.map((game: GameEntryEntryWithId) => (
            <GameCard key={game.title} game={game} />
          ))}
        </div>
        <p className="text-green-500 font-bold text-center ">testeee</p>

      </div>
    </main>
  );
}

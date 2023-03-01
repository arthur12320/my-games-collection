import GameCard from './components/gameCard';
import GameCard2 from './components/gameCard2';

export default function Home() {
  return (
    <main className="bg-slate-300 h-full">
      <div>
        <p className="text-green-500 font-bold text-center ">testeee</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-center">
          <GameCard name={'Call of Duty: Black Ops'} />
          <GameCard name={'Call of Duty: Black Ops'} />
          <GameCard2 name={'Call of Duty: Black Ops'} />
          <GameCard2 name={'Call of Duty: Black Ops'} />
          <GameCard name={'Call of Duty: Black Ops'} />
          <GameCard2 name={'Call of Duty: Black Ops'} />
        </div>
      </div>
    </main>
  );
}

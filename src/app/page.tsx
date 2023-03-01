import GameCard from './components/gameCard';
import GameCard2 from './components/gameCard2';

export default function Home() {
  return (
    <main className="bg-slate-300 h-max">
      <div>
        <p className="text-green-500 font-bold text-center ">testeee</p>
        <div className="grid grid-cols-1 gap-6 m-5 md:grid-cols-2 lg:grid-cols-4 items-start h-max">
          <GameCard name={'Call of Duty: Black Ops'} />
          <GameCard name={'Call of Duty: Black Ops'} />
          <GameCard2 name={'Darksiders II'} />
          <GameCard2 name={'Darksiders II'} />
          <GameCard name={'Call of Duty: Black Ops'} />
          <GameCard2 name={'Darksiders II'} />
        </div>
        <p className="text-green-500 font-bold text-center ">testeee</p>
      </div>
    </main>
  );
}

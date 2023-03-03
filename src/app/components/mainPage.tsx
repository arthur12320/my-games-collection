/* eslint-disable no-underscore-dangle */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameCard from './gameCard';
import { GameEntryEntryWithId } from '../../../models/GameEntry/GameEntry';
import NavBar from './navBar';

export default function MainPage() {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(
      encodeURI(
        `/api/games${searchValue !== '' ? `?title=${searchValue}` : ''}`
      )
    )
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setGames(json);
      });
  }, [searchValue]);

  return (
    <>
      <div>
        <NavBar
          onSearchChange={(e) => {
            setSearchValue(e.target.value);
          }}
          searchValue={searchValue}
        />
        <div className="grid grid-cols-1 gap-6 m-5 md:grid-cols-2 lg:grid-cols-4 items-start h-max">
          {loading ? (
            <progress className="progress w-56"></progress>
          ) : (
            games.map((game: GameEntryEntryWithId) => (
              <GameCard key={game._id} game={game} />
            ))
          )}
        </div>
        <button
          onClick={() => {
            router.push('/addgame');
          }}
          className=" fixed right-8 bottom-8 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        >
          Add Game
        </button>
      </div>
    </>
  );
}

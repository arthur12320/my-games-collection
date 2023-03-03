/* eslint-disable no-underscore-dangle */

'use client';

import { useEffect, useState } from 'react';
import GameCard from './gameCard';
import { GameEntryEntryWithId } from '../../../models/GameEntry/GameEntry';
import NavBar from './navBar';

export default function MainPage() {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(
      encodeURI(
        `/api/games${searchValue !== '' ? `?title=${searchValue}` : ''}`
      )
    )
      .then((res) => res.json())
      .then((json) => {
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
          {games.map((game: GameEntryEntryWithId) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
        <p className="text-green-500 font-bold text-center ">testeee</p>
      </div>
    </>
  );
}

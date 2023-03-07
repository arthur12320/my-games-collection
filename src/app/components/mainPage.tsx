/* eslint-disable no-underscore-dangle */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameCard from './gameCard';
import {
  GameEntryEntryWithId,
  GameEntryRequest,
} from '../../../models/GameEntry/GameEntry';
import NavBar from './navBar';
import GameInfo from './gameInfo';

export default function MainPage() {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(
    null as unknown as GameEntryEntryWithId
  );
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();

  function fetchData() {
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
  }

  useEffect(() => {
    fetchData();
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
        {showCard ? (
          <GameInfo
            game={selectedGame}
            onClose={() => {
              setShowCard(false);
            }}
            onDelete={async (apiKey) => {
              try {
                const sendingGame = selectedGame as unknown as GameEntryRequest;
                sendingGame.apiKey = apiKey;
                const response = await fetch('/api/games', {
                  method: 'DELETE',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify(selectedGame),
                });
                if (response.ok) {
                  localStorage.setItem('apiKey', apiKey);
                  fetchData();
                  // reset();
                } else {
                  const json = await response.json();
                  throw new Error(json.message);
                }
              } catch (e) {
                // TODO: treat this error
              }
            }}
          />
        ) : (
          <></>
        )}
        <div className="grid grid-cols-1 gap-6 m-5 md:grid-cols-2 lg:grid-cols-4 items-start h-max">
          {loading ? (
            <progress className="progress w-56"></progress>
          ) : (
            games.map((game: GameEntryEntryWithId) => (
              <GameCard
                onSelect={() => {
                  setSelectedGame(game);
                  setShowCard(true);
                }}
                key={game._id}
                game={game}
              />
            ))
          )}
        </div>
        <button
          onClick={() => {
            router.push('/addgame');
          }}
          className=" fixed right-8 bottom-8 btn btn-primary btn-md md:btn-md lg:btn-lg"
        >
          Add Game
        </button>
      </div>
    </>
  );
}

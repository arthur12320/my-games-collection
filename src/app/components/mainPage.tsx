/* eslint-disable no-underscore-dangle */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameCard from './gameCard';
import {
  GameEntryEntryWithId,
  GameEntryRequest,
  sortProperties,
  validPlatforms,
} from '../../../models/GameEntry/GameEntry';
import NavBar from './navBar';
import GameInfo from './gameInfo';
import PageTurner from './pageTurner';

export default function MainPage() {
  const [games, setGames] = useState([] as GameEntryEntryWithId[]);
  const [searchValue, setSearchValue] = useState('');
  const [searchBought, setSearchBought] = useState(false);
  const [searchBeaten, setSearchBeaten] = useState(false);
  const [searchWishList, setSearchWishList] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);

  const [searchPlatform, setSearchPlatform] = useState('all');
  const tuple = <T extends string[]>(...args: T) => args;
  const input = tuple(...sortProperties);
  const [orderBy, setOrderBy] = useState(
    sortProperties[0] as (typeof input)[number]
  );
  const [order, setOrder] = useState('asc');
  const translationArray = Object.values(validPlatforms);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedGame, setSelectedGame] = useState(
    null as unknown as GameEntryEntryWithId
  );
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();

  function fetchData() {
    setLoading(true);
    fetch(
      encodeURI(
        `/api/games?${searchValue !== '' ? `title=${searchValue}&` : ''}${
          searchBought ? 'bought=true&' : ''
        }${searchWishList ? 'bought=false&' : ''}${
          searchBeaten ? 'beaten=true&' : ''
        }${
          searchPlatform !== 'all' ? `platform=${searchPlatform}&` : ''
        }${`orderBy=${String(orderBy)}&`}${`order=${order}&`}skip=${
          page * limit
        }&${limit > 0 ? `limit=${limit}` : ''}`
      )
    )
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setGames(json.logs);
        setCount(json.count);
      });
  }

  useEffect(() => {
    fetchData();
  }, [
    searchValue,
    searchBought,
    searchWishList,
    searchBeaten,
    searchPlatform,
    orderBy,
    order,
    page,
    limit,
  ]);

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
            updateAll={() => {
              fetchData();
            }}
          />
        ) : (
          <></>
        )}
        <>
          <div className="lg:w-3/12 m-4 bg-slate-600 rounded drop-shadow-lg p-2">
            <label className="cursor-pointer label">
              <span className="label-text">Bought</span>
              <input
                type="checkbox"
                checked={searchBought}
                onChange={() => {
                  setSearchWishList(false);
                  setPage(0);
                  setSearchBought(!searchBought);
                }}
                className="checkbox checkbox-success"
              />
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">WishList</span>
              <input
                type="checkbox"
                checked={searchWishList}
                onChange={() => {
                  setSearchBought(false);
                  setPage(0);
                  setSearchWishList(!searchWishList);
                }}
                className="checkbox checkbox-success"
              />
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">Beaten</span>
              <input
                type="checkbox"
                checked={searchBeaten}
                onChange={() => {
                  setPage(0);
                  setSearchBeaten(!searchBeaten);
                }}
                className="checkbox checkbox-success"
              />
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">Platform</span>
              <select
                onChange={(e) => setSearchPlatform(e.target.value)}
                className="select select-bordered"
              >
                <option selected>all</option>
                {translationArray.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">Order By</span>
              <select
                onChange={(e) => {
                  setPage(0);
                  setOrderBy(e.target.value as string);
                }}
                className="select select-bordered"
              >
                {sortProperties.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">Order</span>
              <select
                onChange={(e) => {
                  setPage(0);
                  setOrder(e.target.value);
                }}
                className="select select-bordered"
              >
                <option key={'asc'} value={'asc'}>
                  ASC
                </option>
                <option key={'desc'} value={'desc'}>
                  DESC
                </option>
              </select>
            </label>
            <span className="label-text">Count: {count}</span>
          </div>
          {!loading && (
            <PageTurner
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
              count={count}
            />
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
                  orderBy={orderBy}
                />
              ))
            )}
          </div>
          {!loading && (
            <PageTurner
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
              count={count}
            />
          )}
        </>
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

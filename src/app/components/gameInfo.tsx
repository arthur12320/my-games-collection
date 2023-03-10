'use client';

import { useState } from 'react';
import { GameEntryEntryWithId } from '../../../models/GameEntry/GameEntry';
import UpdateGame from './updateGame';

export type GameInfoProps = {
  game: GameEntryEntryWithId | null;
  onClose: () => void;
  onDelete: (apiKey: string) => void;
  updateAll: () => void;
};
export default function GameInfo(props: GameInfoProps) {
  const [apiKey, setApiKey] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('apiKey') ?? '' : ''
  );

  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <>
        <div className="modal modal-open">
          <div className="modal-box ">
            <label
              onClick={props.onClose}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <picture>
              <img
                src={props.game ? props.game.mainImage : ''}
                alt={props.game ? props.game.title : ''}
                className={`pt-4 w-96 mx-auto ${
                  props.game && props.game.bought ? '' : 'grayscale'
                }`}
              />
            </picture>
            <h3 className="font-bold text-lg mt-5">
              {props.game ? props.game.title : ''}
            </h3>
            <p className="py-2">
              <b>Platform:</b>
              {` ${props.game?.platform}`}
            </p>
            <p className="py-2">
              <b>Bought Date:</b>
              {` ${new Date(
                props.game?.boughtDate as number
              ).toLocaleDateString()}`}
            </p>
            <p className="py-2">
              <b>Beaten:</b>
              {` ${props.game?.beaten ? '✅' : '❌'}`}
            </p>
            <p className="py-2">
              <b>Image Link:</b>
              <a
                href={props.game?.mainImage}
              >{` ${props.game?.mainImage.substring(0, 25)}...`}</a>
            </p>
            <label onClick={() => setShowEdit(true)} className="btn btn-error">
              update
            </label>
            <label htmlFor="my-modal" className="btn btn-error">
              delete
            </label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Deletion</h3>
                <p className="py-4">
                  Once deleted you cannot undo this action!
                </p>
                <p className="py-4">api key:</p>
                <input
                  className="input input-bordered"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <div className="modal-action">
                  <label
                    onClick={() => {
                      props.onClose();
                      props.onDelete(apiKey);
                    }}
                    htmlFor="my-modal"
                    className="btn btn-error"
                  >
                    Confirm
                  </label>
                  <label htmlFor="my-modal" className="btn">
                    Cancel
                  </label>
                </div>
              </div>
            </div>
          </div>

          {showEdit && (
            <UpdateGame
              game={props.game as unknown as GameEntryEntryWithId}
              onCancel={() => {
                setShowEdit(false);
              }}
              onComplete={() => {
                props.onClose();
                props.updateAll();
              }}
            />
          )}
        </div>
      </>
    </>
  );
}

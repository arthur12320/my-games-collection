'use client';

import { GameEntryEntryWithId } from '../../../models/GameEntry/GameEntry';

export type GameInfoProps = {
  game: GameEntryEntryWithId | null;
  onClose: () => void;
};
export default function GameInfo(props: GameInfoProps) {
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
                className="pt-4 w-96 mx-auto"
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
              <b>Image Link:</b>
              <a
                href={props.game?.mainImage}
              >{` ${props.game?.mainImage.substring(0, 25)}...`}</a>
            </p>
          </div>
        </div>
      </>
    </>
  );
}

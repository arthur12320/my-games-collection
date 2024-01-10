import { GameEntryEntryWithId } from '../../../models/GameEntry/GameEntry';

export type GameCardProps = {
  game: GameEntryEntryWithId;
  onSelect: () => void;
  orderBy: string;
};

export default function GameCard(props: GameCardProps) {
  return (
    <div
      onClick={() => props.onSelect()}
      className="card bg-base-100 shadow-xl mx-auto hover:shadow-sm"
    >
      <div className="flex justify-center items-center">
        <picture>
          <img
            src={props.game.mainImage}
            alt={props.game.title}
            className={`pt-4 w-96 ${props.game.bought ? '' : 'grayscale'}`}
          />
        </picture>
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.game.title}</h2>
        <div className="badge badge-primary">{props.game.platform}</div>
        {!props.game.bought ? (
          <div className="badge badge-accent">wishlist</div>
        ) : (
          <></>
        )}
        {props.game.beaten ? (
          <div className="badge badge-accent">beaten</div>
        ) : (
          <></>
        )}
        {props.orderBy === 'estimatedBeatTime' && (
          <div className="flex flex-row">
            <p>playtime: </p>
            <div className="badge badge-accent">{`${props.game.estimatedBeatTime} h`}</div>
          </div>
        )}
        {props.orderBy === 'boughtDate' && (
          <div className="flex flex-row">
            <p>boughtDate: </p>
            <div className="badge badge-accent">{`${new Date(
              props.game?.boughtDate as number
            ).toLocaleDateString()} `}</div>
          </div>
        )}
      </div>
    </div>
  );
}

import { GameEntryEntryWithId } from '../../../models/GameEntry/GameEntry';

export type GameCardProps = {
  game: GameEntryEntryWithId;
  onSelect: () => void;
};

export default function GameCard(props: GameCardProps) {
  return (
    <div
      // eslint-disable-next-line no-underscore-dangle
      onClick={() => props.onSelect()}
      className="card bg-base-100 shadow-xl mx-auto hover:shadow-sm"
    >
      <div className="flex justify-center items-center">
        <picture>
          <img
            src={props.game.mainImage}
            alt={props.game.title}
            className="pt-4 w-96"
          />
        </picture>
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.game.title}</h2>
        <div className="badge badge-primary">{props.game.platform}</div>
      </div>
    </div>
  );
}

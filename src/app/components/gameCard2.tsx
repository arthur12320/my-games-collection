export type GameCardProps = {
  name: String;
};

export default function GameCard2(props: GameCardProps) {
  return (
    <div className="card w-96 h-99 bg-base-100 shadow-xl mx-auto">
      <figure>
        <img
          src="https://cdn.awsli.com.br/600x700/41/41275/produto/139409931/e868baf172.jpg"
          alt="game"
          className="pt-4"
        />
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title ">
          Call of Duty Black Ops{' '}
          <div className="badge badge-accent">XBOX 360</div>
        </h2>
      </div>
    </div>
  );
}

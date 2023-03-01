export type GameCardProps = {
  name: String;
};

export default function GameCard2(props: GameCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl mx-auto">
      <div className="flex justify-center items-center">
        <picture>
          <img
            src="https://cdn.awsli.com.br/600x700/41/41275/produto/139409931/e868baf172.jpg"
            alt="game"
            className="pt-4 w-96"
          />
        </picture>
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <div className="badge badge-accent">Xbox 360</div>
      </div>
    </div>
  );
}

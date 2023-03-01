export type GameCardProps = {
  name: String;
};

export default function GameCard(props: GameCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl mx-auto">
      <div className="flex justify-center items-center">
        <picture>
          <img
            src="https://static.netshoes.com.br/produtos/call-of-duty-black-ops-xbox-360/60/DVM-0005-460/DVM-0005-460_zoom1.jpg?ts=1597073386&ims=544x"
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

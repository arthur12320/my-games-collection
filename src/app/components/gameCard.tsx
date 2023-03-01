export type GameCardProps = {
  name: String;
};

export default function GameCard(props: GameCardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto">
      <figure>
        <img
          src="https://static.netshoes.com.br/produtos/call-of-duty-black-ops-xbox-360/60/DVM-0005-460/DVM-0005-460_zoom1.jpg?ts=1597073386&ims=544x"
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

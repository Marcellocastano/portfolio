import './SoldStamp.css';

export function SoldStamp({ winner, stampKey }: { winner: string | null; stampKey: number }) {
  return (
    <div className="fa-stamp" key={stampKey}>
      Aggiudicato
      <small>{winner}</small>
    </div>
  );
}

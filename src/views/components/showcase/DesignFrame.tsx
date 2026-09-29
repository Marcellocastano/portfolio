import { boardColumns } from '../../../models/showcase/board.model';
import './DesignFrame.css';

const Selection = ({ label }: { label: string }) => (
  <span className="selection">
    <i />
    <i />
    <i />
    <i />
    <span className="selection__tag">{label}</span>
  </span>
);

export function DesignFrame({ active }: { active: boolean }) {
  return (
    <div className="design" data-active={active}>
      <span className="design__label">Board</span>
      <div className="design__frame">
        {boardColumns.map((column, i) => (
          <div key={column.id} className="design__column">
            <span className="design__heading" />
            <span className="design__slot" data-card={i === 0}>
              {i === 0 && <Selection label="Card" />}
            </span>
            <span className="design__slot" />
          </div>
        ))}
      </div>
    </div>
  );
}

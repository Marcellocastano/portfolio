import { PATHS } from '../../../../../models/projects/playdev.model';
import './PathList.css';

export function PathList() {
  return (
    <ul className="path-list">
      {PATHS.map((p) => (
        <li key={p.name} data-active={p.status === 'In corso'}>
          <span className="path-list__tag">{p.tag}</span>
          <span className="path-list__name">{p.name}</span>
          <span className="path-list__status">{p.status}</span>
        </li>
      ))}
    </ul>
  );
}

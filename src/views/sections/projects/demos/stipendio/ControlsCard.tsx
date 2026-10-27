import { i18n } from '../../../../../models/i18n.model';
import { formatEuro } from '../../../../../models/projects/stipendio.model';
import type { useStipendioDemo } from '../../../../../controllers/useStipendioDemo';
import './ControlsCard.css';

export function ControlsCard({ d }: { d: ReturnType<typeof useStipendioDemo> }) {
  return (
    <div className="stip-controls">
      <span className="stip-controls__label">{i18n.demos.stipendio.ralLabel}</span>
      <output className="stip-controls__ral">{formatEuro(d.ral)}</output>
      <input
        type="range"
        min={d.RAL_MIN}
        max={d.RAL_MAX}
        step={500}
        value={d.ral}
        onChange={(e) => d.onSlider(Number(e.target.value))}
        onPointerDown={d.touch}
        aria-label={i18n.demos.stipendio.ralAria}
      />
      <div className="stip-controls__btns">
        {d.QUICK_RALS.map((v) => (
          <button key={v} type="button" data-current={v === d.ral} onClick={() => d.onSlider(v)}>
            {`${v / 1000}k`}
          </button>
        ))}
      </div>
      <div className="stip-controls__mensilita">
        <span className="stip-controls__label">{i18n.demos.stipendio.mensilita}</span>
        <div className="stip-controls__btns">
          {d.MENSILITA_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              data-current={m === d.mensilita}
              onClick={() => {
                d.touch();
                d.setMensilita(m);
              }}
            >
              {i18n.demos.stipendio.mensilitaValue(m)}
            </button>
          ))}
        </div>
      </div>
      <p className="stip-controls__note">{i18n.demos.stipendio.note}</p>
    </div>
  );
}

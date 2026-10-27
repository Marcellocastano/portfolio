import { i18n } from '../../../../../models/i18n.model';
import './SoldStamp.css';

/** Timbro sul lotto chiuso: "TUO!" se l'hai vinto, "VENDUTO" altrimenti. */
export function SoldStamp({ yours }: { yours: boolean }) {
  return (
    <div className="fc-stamp" aria-hidden="true">
      <span className="fc-stamp__tag" data-yours={yours}>
        {yours ? i18n.demos.fantaclash.stamp.yours : i18n.demos.fantaclash.stamp.sold}
      </span>
    </div>
  );
}

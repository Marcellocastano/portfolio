import { WindowLights } from '../../../components/showcase/Window';
import './ProfileCard.css';

/** Foto a colori dentro una finestra editor. */
export function ProfileCard() {
  return (
    <aside className="me">
      <figure className="me__frame">
        <div className="me__bar">
          <WindowLights />
          <span className="me__tab">me.jpg</span>
        </div>
        <div className="me__photo">
          <img src="/images/me-720.jpg" width={720} height={909} alt="Marcello Castano" loading="lazy" />
        </div>
      </figure>
      <p className="me__name">Marcello Castano</p>
      <p className="me__role">Full-Stack Developer a Torino</p>
      <p className="me__bio">
        Costruisco prodotti web dalla UI all'infrastruttura, con una predilezione per i dettagli che si sentono ma non
        si vedono. Fuori dall'orario di lavoro continuo a prototipare per curiosità.
      </p>
    </aside>
  );
}

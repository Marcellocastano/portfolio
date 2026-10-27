import { i18n } from '../../models/i18n.model';
import { footerYear, profile } from '../../models/profile.model';
import './Footer.css';

/** Footer: logo piccolo, copyright con anno fisso (SSR-safe), torna su. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <span className="footer__logo" aria-hidden="true">
          {'<mc'}
          <span className="footer__dot">.</span>
          {'/>'}
        </span>
        <span className="footer__copy">
          {i18n.footer.copyright(footerYear, `${profile.firstName} ${profile.lastName}`)}
        </span>
        <a className="footer__top" href="#top">
          {i18n.footer.toTop}
        </a>
      </div>
    </footer>
  );
}

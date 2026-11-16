import { useNavbar } from '../../controllers/useNavbar';
import { i18n } from '../../models/i18n.model';
import type { NavLink } from '../../models/profile.model';
import { profile } from '../../models/profile.model';
import type { Theme } from '../../models/theme.model';
import { ThemeToggle } from '../components/ThemeToggle';
import './Navbar.css';

interface Props {
  links: NavLink[];
  theme: Theme;
  onToggleTheme: (origin: { x: number; y: number }) => void;
}

const fullName = `${profile.firstName} ${profile.lastName}`;
const MENU_ID = 'menu-principale';

export function Navbar({ links, theme, onToggleTheme }: Props) {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbar();

  return (
    <header className="navbar" data-scrolled={scrolled} data-menu={menuOpen}>
      <a href="#top" className="navbar__logo" aria-label={i18n.nav.homeAria(fullName)} onClick={closeMenu}>
        <span className="navbar__bracket">&lt;</span>mc<span className="navbar__dot">.</span>
        <span className="navbar__bracket">/&gt;</span>
      </a>

      <nav className="navbar__nav" aria-label={i18n.nav.primaryAria}>
        <button
          type="button"
          className="navbar__menu"
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          onClick={toggleMenu}
        >
          {menuOpen ? i18n.nav.menuClose : i18n.nav.menuOpen}
        </button>
        <ul id={MENU_ID}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}

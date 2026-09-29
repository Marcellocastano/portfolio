import type { NavLink } from '../../models/profile.model';
import type { Theme } from '../../models/theme.model';
import { ThemeToggle } from '../components/ThemeToggle';
import './Navbar.css';

interface Props {
  links: NavLink[];
  theme: Theme;
  onToggleTheme: (origin: { x: number; y: number }) => void;
}

export function Navbar({ links, theme, onToggleTheme }: Props) {
  return (
    <header className="navbar">
      <a href="#top" className="navbar__logo" aria-label="Marcello Castano, home">
        <span className="navbar__bracket">&lt;</span>mc<span className="navbar__dot">.</span>
        <span className="navbar__bracket">/&gt;</span>
      </a>

      <nav className="navbar__nav" aria-label="Principale">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar__actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

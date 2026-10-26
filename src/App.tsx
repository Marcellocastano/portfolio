import { useThemeController } from './controllers/useThemeController';
import { navLinks, profile } from './models/profile.model';
import { Navbar } from './views/layout/Navbar';
import { About } from './views/sections/about/About';
import { Hero } from './views/sections/hero/Hero';
import { Projects } from './views/sections/projects/Projects';
import { Stack } from './views/sections/stack/Stack';
import { Contacts } from './views/sections/contacts/Contacts';
import { Footer } from './views/layout/Footer';

export default function App() {
  const { theme, toggleTheme } = useThemeController();

  return (
    <>
      <Navbar links={navLinks} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero profile={profile} theme={theme} />
        <About />
        <Projects />
        <Stack />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}

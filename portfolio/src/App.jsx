import { ThemeProvider } from './components/ThemeProvider';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import DSA from './sections/DSA';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CustomCursor />
      <ParticleField />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <DSA />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

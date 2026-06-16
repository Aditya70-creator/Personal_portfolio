import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import type { AppView, SectionId } from './types';
import HUDLanding from './components/HUDLanding';
import CyberRoad from './components/CyberRoad';
import GlobalNav from './components/Navigation/GlobalNav';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SocialSection from './components/sections/SocialSection';
import ContactSection from './components/sections/ContactSection';
import { audioEngine } from './audio/AudioEngine';

const fadeSlide = {
  landing: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.5 } },
  },
  roadmap: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.4 } },
  },
  section: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    exit: { opacity: 0, x: 60, transition: { duration: 0.35 } },
  },
};

function getVariant(view: AppView) {
  if (view === 'landing') return fadeSlide.landing;
  if (view === 'roadmap') return fadeSlide.roadmap;
  return fadeSlide.section;
}

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [returningHome, setReturningHome] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const homeTransitionRef = useRef<number | null>(null);

  const clearHomeTransition = useCallback(() => {
    if (homeTransitionRef.current !== null) {
      window.clearTimeout(homeTransitionRef.current);
      homeTransitionRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearHomeTransition();
    };
  }, [clearHomeTransition]);

  const goToRoadmap = useCallback(() => {
    clearHomeTransition();
    setReturningHome(false);
    setActiveSection(null);
    audioEngine.play('navigate');
    audioEngine.fadeIn(0.4);
    setView('roadmap');
  }, [clearHomeTransition]);

  const goToLanding = useCallback(() => {
    clearHomeTransition();
    audioEngine.play('navigate');
    audioEngine.fadeOut(0.8);
    setReturningHome(true);

    if (view === 'roadmap') {
      homeTransitionRef.current = window.setTimeout(() => {
        audioEngine.stopAmbient();
        setActiveSection(null);
        setView('landing');
        setReturningHome(false);
      }, 420);
      return;
    }

    setView('roadmap');
    homeTransitionRef.current = window.setTimeout(() => {
      audioEngine.stopAmbient();
      setActiveSection(null);
      setView('landing');
      setReturningHome(false);
    }, 620);
  }, [clearHomeTransition, view]);

  const goToSection = useCallback((id: SectionId) => {
    clearHomeTransition();
    setReturningHome(false);
    setActiveSection(id);
    audioEngine.play('sectionOpen');
    setView(id);
    audioEngine.fadeIn(0.5);
  }, [clearHomeTransition]);

  const goToPrevious = useCallback(() => {
    if (view === 'landing') return;
    if (view === 'roadmap') {
      goToLanding();
      return;
    }

    clearHomeTransition();
    setReturningHome(false);
    setActiveSection(null);
    audioEngine.play('sectionClose');
    audioEngine.fadeIn(0.35);
    setView('roadmap');
  }, [clearHomeTransition, goToLanding, view]);

  // Initialize audio on first user interaction (from landing)
  const handleEnterPortfolio = useCallback(() => {
    if (!audioInitialized) {
      audioEngine.init();
      setAudioInitialized(true);
    }
    goToRoadmap();
  }, [audioInitialized, goToRoadmap]);

  // Start ambient audio when hitting roadmap
  useEffect(() => {
    if (view === 'roadmap' && audioInitialized && !returningHome) {
      audioEngine.startAmbient();
    }
  }, [view, audioInitialized, returningHome]);

  const variant = getVariant(view);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          style={{ position: 'fixed', inset: 0 }}
        >
          {view === 'landing' && <HUDLanding onEnter={handleEnterPortfolio} />}
          {view === 'roadmap' && <CyberRoad activeSection={activeSection} onNavigate={goToSection} />}
          {view === 'about' && <AboutSection onNavigate={goToSection} />}
          {view === 'skills' && <SkillsSection onNavigate={goToSection} />}
          {view === 'projects' && <ProjectsSection onNavigate={goToSection} />}
          {view === 'social' && <SocialSection onNavigate={goToSection} />}
          {view === 'contact' && <ContactSection onNavigate={goToSection} />}
        </motion.div>
      </AnimatePresence>

      {/* Global navigation overlay - visible on roadmap and sections */}
      <GlobalNav
        currentView={view}
        onReturnHome={goToLanding}
        onStepBack={goToPrevious}
        onNavigate={goToSection}
        onGoToHub={goToRoadmap}
      />
    </ThemeProvider>
  );
}

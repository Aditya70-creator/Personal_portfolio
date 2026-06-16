import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@mui/material/styles';
import type { SectionId } from '../../types';

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
`;
const scanLine = keyframes`
  0% { top: -2px; opacity: 0.7; }
  100% { top: 100%; opacity: 0; }
`;
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const SECTION_ORDER: SectionId[] = ['about', 'skills', 'projects', 'social', 'contact'];
const SECTION_LABELS: Record<SectionId, string> = {
  about: 'ABOUT ME',
  skills: 'SKILLS',
  projects: 'PROJECTS',
  social: 'SOCIAL',
  contact: 'CONTACT',
};
const SECTION_COLORS: Record<SectionId, string> = {
  about: '#00e5ff',
  skills: '#bf5af2',
  projects: '#00ff41',
  social: '#ff9f0a',
  contact: '#ff375f',
};

const SECTION_BREADCRUMBS: Record<SectionId, string> = {
  about: 'About Me',
  skills: 'Skills',
  projects: 'Projects',
  social: 'Social',
  contact: 'Contact',
};

interface SectionWrapperProps {
  id: SectionId;
  title: string;
  subtitle: string;
  onNavigate: (id: SectionId) => void;
  children: React.ReactNode;
}

export default function SectionWrapper({ id, title, subtitle, onNavigate, children }: SectionWrapperProps) {
  const currentIdx = SECTION_ORDER.indexOf(id);
  const prevSection = currentIdx > 0 ? SECTION_ORDER[currentIdx - 1] : null;
  const nextSection = currentIdx < SECTION_ORDER.length - 1 ? SECTION_ORDER[currentIdx + 1] : null;
  const sectionColor = SECTION_COLORS[id];

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)`, backgroundSize: '60px 60px', animation: `${gridMove} 10s linear infinite`, zIndex: 0 }} />

      {/* Section-color radial glow */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 15% 50%, ${sectionColor}07 0%, transparent 55%)`, zIndex: 0, pointerEvents: 'none' }} />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 85% 20%, ${sectionColor}05 0%, transparent 45%)`, zIndex: 0, pointerEvents: 'none' }} />

      {/* Scanline */}
      <Box aria-hidden sx={{ position: 'absolute', left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${sectionColor}44, transparent)`, animation: `${scanLine} 7s linear infinite`, zIndex: 1, pointerEvents: 'none' }} />

      {/* Top bar */}
      <Box sx={{ position: 'relative', zIndex: 10, px: { xs: 2, md: 4 }, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(3,13,18,0.97)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
        <Box sx={{ width: 40 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: sectionColor,
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              letterSpacing: '0.3em',
              fontFamily: '"Orbitron", sans-serif',
              textShadow: `0 0 12px ${sectionColor}88`,
            }}
          >
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.45rem', letterSpacing: '0.2em' }}>
            {subtitle}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 0.5,
              color: 'text.disabled',
              fontSize: '0.45rem',
              letterSpacing: '0.16em',
              fontFamily: '"Orbitron", sans-serif',
            }}
          >
            ADITYA OS &gt; {SECTION_BREADCRUMBS[id].toUpperCase()}
          </Typography>
        </Box>

        {/* Section breadcrumb dots */}
        <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
          {SECTION_ORDER.map((s) => (
            <Box
              key={s}
              onClick={() => onNavigate(s)}
              title={SECTION_LABELS[s]}
              sx={{
                width: s === id ? 22 : 6,
                height: 6,
                borderRadius: s === id ? 3 : '50%',
                bgcolor: s === id ? SECTION_COLORS[s] : 'rgba(0,229,255,0.15)',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                boxShadow: s === id ? `0 0 8px ${SECTION_COLORS[s]}` : 'none',
                '&:hover': { bgcolor: SECTION_COLORS[s], opacity: 0.8 },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Scrollable content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 2,
          '&::-webkit-scrollbar': { width: '3px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: `${sectionColor}44`, borderRadius: '2px' },
          '&::-webkit-scrollbar-thumb:hover': { background: `${sectionColor}88` },
        }}
      >
        {children}
      </Box>

      {/* Bottom nav */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          px: { xs: 2, md: 4 },
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(3,13,18,0.97)',
          flexShrink: 0,
        }}
      >
        {prevSection ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover .nav-label': { color: SECTION_COLORS[prevSection] }, '&:hover .nav-icon': { color: SECTION_COLORS[prevSection] } }}
            onClick={() => onNavigate(prevSection)}
          >
            <ArrowBackIcon className="nav-icon" sx={{ fontSize: '0.9rem', color: 'text.disabled', transition: 'color 0.2s' }} />
            <Typography className="nav-label" variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em', transition: 'color 0.2s' }}>
              {SECTION_LABELS[prevSection]}
            </Typography>
          </Box>
        ) : <Box />}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: sectionColor, boxShadow: `0 0 6px ${sectionColor}`, animation: `${blink} 1.5s ease-in-out infinite` }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.45rem', letterSpacing: '0.1em' }}>
            {currentIdx + 1} / {SECTION_ORDER.length}
          </Typography>
        </Box>

        {nextSection ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover .nav-label': { color: SECTION_COLORS[nextSection] }, '&:hover .nav-icon': { color: SECTION_COLORS[nextSection] } }}
            onClick={() => onNavigate(nextSection)}
          >
            <Typography className="nav-label" variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em', transition: 'color 0.2s' }}>
              {SECTION_LABELS[nextSection]}
            </Typography>
            <ArrowForwardIcon className="nav-icon" sx={{ fontSize: '0.9rem', color: 'text.disabled', transition: 'color 0.2s' }} />
          </Box>
        ) : <Box />}
      </Box>
    </Box>
  );
}

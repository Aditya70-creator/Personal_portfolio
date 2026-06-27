import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useTheme, keyframes } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { audioEngine } from '../../audio/AudioEngine';
import type { AppView, SectionId } from '../../types';

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px #00e5ff55, 0 0 20px #00e5ff22; }
  50% { box-shadow: 0 0 18px #00e5ffaa, 0 0 36px #00e5ff44; }
`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SECTION_COLORS: Record<SectionId, string> = {
  about: '#00e5ff',
  skills: '#bf5af2',
  projects: '#00ff41',
  social: '#ff9f0a',
  contact: '#ff375f',
};

const SECTIONS: { id: SectionId; label: string; Icon: React.ElementType }[] = [
  { id: 'about', label: 'ABOUT ME', Icon: PersonIcon },
  { id: 'skills', label: 'SKILLS', Icon: CodeIcon },
  { id: 'projects', label: 'PROJECTS', Icon: FolderOpenIcon },
  { id: 'social', label: 'SOCIAL', Icon: PeopleIcon },
  { id: 'contact', label: 'CONTACT', Icon: EmailIcon },
];

interface GlobalNavProps {
  currentView: AppView;
  onReturnHome: () => void;
  onStepBack: () => void;
  onNavigate: (id: SectionId) => void;
  onGoToHub: () => void;
}

export default function GlobalNav({ currentView, onReturnHome, onStepBack, onNavigate, onGoToHub }: GlobalNavProps) {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  const isSection = currentView !== 'landing' && currentView !== 'roadmap';
  const isLanding = currentView === 'landing';
  const isRoadmap = currentView === 'roadmap';

  const handleEscape = useCallback(() => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }

    if (isSection || isRoadmap) {
      onStepBack();
      return;
    }

    if (!isLanding) {
      onReturnHome();
    }
  }, [isLanding, isRoadmap, isSection, menuOpen, onReturnHome, onStepBack]);

  useEscapeKey(handleEscape, true);

  const handleNavigate = (id: SectionId) => {
    audioEngine.play('sectionOpen');
    onNavigate(id);
    setMenuOpen(false);
  };

  const handleReturnToLanding = () => {
    audioEngine.play('navigate');
    onReturnHome();
    setMenuOpen(false);
  };

  const handleGoToHub = () => {
    audioEngine.play('navigate');
    onGoToHub();
    setMenuOpen(false);
  };

  const handleToggleMute = () => {
    const nowMuted = audioEngine.toggleMute();
    setMuted(nowMuted);
  };

  const currentSection = isSection ? (currentView as SectionId) : null;
  const sectionColor = currentSection ? SECTION_COLORS[currentSection] : '#00e5ff';
  const breadcrumbLabel = isSection ? currentSection!.replace(/^[a-z]/, (c) => c.toUpperCase()).replace('Me', 'Me') : isRoadmap ? 'Navigation Hub' : 'Home';

  return (
    <>
      {/* Top-left: return button */}
      {!isLanding && (
        <Fade in>
          <Box
            onClick={handleReturnToLanding}
            sx={{
              position: 'fixed',
              top: { xs: 14, md: 18 },
              left: { xs: 14, md: 18 },
              zIndex: 1400,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: { xs: 1.25, md: 1.5 },
              py: { xs: 0.85, md: 1 },
              bgcolor: 'rgba(3,13,18,0.88)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(0,229,255,0.45)',
              cursor: 'pointer',
              animation: `${glowPulse} 3s ease-in-out infinite`,
              transition: 'all 0.25s ease',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(0,229,255,0.1)',
                boxShadow: `0 0 24px rgba(0,229,255,0.35)`,
                transform: 'translateX(-2px) scale(1.01)',
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: '0.85rem', color: 'primary.main' }} />
            <Typography
              sx={{
                color: 'primary.main',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                textShadow: '0 0 10px rgba(0,229,255,0.6)',
              }}
            >
              RETURN TO ADITYA OS
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Breadcrumb system */}
      {!isLanding && (
        <Fade in>
          <Box
            sx={{
              position: 'fixed',
              top: { xs: 14, md: 18 },
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1400,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: { xs: 1.5, md: 2 },
              py: 0.75,
              bgcolor: 'rgba(3,13,18,0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,229,255,0.2)',
              boxShadow: '0 0 24px rgba(0,229,255,0.08)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontSize: '0.5rem',
                letterSpacing: '0.3em',
                fontFamily: '"Orbitron", sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              ADITYA OS
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem' }}>›</Typography>
            <Typography
              variant="caption"
              sx={{
                color: isSection ? sectionColor : 'text.primary',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                fontFamily: '"Orbitron", sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textShadow: `0 0 8px ${sectionColor}88`,
              }}
            >
              {breadcrumbLabel}
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Section breadcrumb (shown in sections) */}
      {isSection && currentSection && (
        <Fade in>
          <Box
            sx={{
              position: 'fixed',
              top: { xs: 56, md: 58 },
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1400,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              bgcolor: 'rgba(3,13,18,0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: `${sectionColor}44`,
            }}
          >
            <Typography
              variant="caption"
              onClick={handleGoToHub}
              sx={{
                color: 'text.disabled',
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                fontFamily: '"Orbitron", sans-serif',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
              }}
            >
              NAV HUB
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem' }}>›</Typography>
            <Typography
              variant="caption"
              sx={{
                color: sectionColor,
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                fontFamily: '"Orbitron", sans-serif',
                textShadow: `0 0 8px ${sectionColor}88`,
              }}
            >
              {currentSection.toUpperCase()}
            </Typography>
          </Box>
        </Fade>
      )}

      {/* ESC hint (sections only) */}
      {isSection && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1400,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            bgcolor: 'rgba(3,13,18,0.8)',
            border: '1px solid rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        >
          <KeyboardReturnIcon sx={{ fontSize: '0.6rem', color: 'text.disabled', transform: 'scaleX(-1)' }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.4rem', letterSpacing: '0.15em' }}>
            ESC — RETURN TO ROADMAP
          </Typography>
        </Box>
      )}

      {/* Bottom-right: Mute + Quick Nav */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1,
        }}
      >
        {/* Expanded nav menu */}
        <Fade in={menuOpen}>
          <Box
            sx={{
              display: menuOpen ? 'flex' : 'none',
              flexDirection: 'column',
              gap: 0.5,
              alignItems: 'flex-end',
              animation: menuOpen ? `${fadeUp} 0.25s ease-out` : 'none',
            }}
          >
            <NavItem
              label="HOME"
              color="#00e5ff"
              Icon={HomeIcon}
              active={isLanding}
              onClick={handleReturnToLanding}
            />
            {!isLanding && (
              <NavItem
                label="NAV HUB"
                color="#00e5ff"
                Icon={HomeIcon}
                active={isRoadmap}
                onClick={handleGoToHub}
              />
            )}
            {SECTIONS.map((s) => (
              <NavItem
                key={s.id}
                label={s.label}
                color={SECTION_COLORS[s.id]}
                Icon={s.Icon}
                active={currentView === s.id}
                onClick={() => handleNavigate(s.id)}
              />
            ))}
          </Box>
        </Fade>

        {/* Action buttons row */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {!isLanding && (
            <Tooltip title="Home" placement="top">
              <IconButton
                size="small"
                onClick={handleReturnToLanding}
                sx={{
                  color: 'primary.main',
                  border: '1px solid rgba(0,229,255,0.35)',
                  borderRadius: '4px',
                  width: 32,
                  height: 32,
                  bgcolor: 'rgba(3,13,18,0.95)',
                  '&:hover': { bgcolor: 'rgba(0,229,255,0.1)' },
                }}
              >
                <HomeIcon sx={{ fontSize: '0.9rem' }} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={muted ? 'Unmute' : 'Mute'} placement="top">
            <IconButton
              size="small"
              onClick={handleToggleMute}
              sx={{
                color: muted ? 'text.disabled' : 'primary.main',
                border: '1px solid',
                borderColor: muted ? 'rgba(255,255,255,0.1)' : 'rgba(0,229,255,0.3)',
                borderRadius: '4px',
                width: 32,
                height: 32,
                '&:hover': { bgcolor: 'rgba(0,229,255,0.1)' },
              }}
            >
              {muted ? <VolumeOffIcon sx={{ fontSize: '0.9rem' }} /> : <VolumeUpIcon sx={{ fontSize: '0.9rem' }} />}
            </IconButton>
          </Tooltip>

          <IconButton
            size="small"
            onClick={() => setMenuOpen(!menuOpen)}
            sx={{
              color: menuOpen ? '#000' : 'primary.main',
              bgcolor: menuOpen ? 'primary.main' : 'rgba(3,13,18,0.95)',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '4px',
              width: 36,
              height: 36,
              animation: `${glowPulse} 3s ease-in-out infinite`,
              '&:hover': {
                bgcolor: menuOpen ? 'primary.light' : 'rgba(0,229,255,0.15)',
                boxShadow: `0 0 20px ${theme.palette.primary.main}66`,
              },
              transition: 'all 0.2s ease',
            }}
          >
            {menuOpen ? <CloseIcon sx={{ fontSize: '1rem' }} /> : <MenuIcon sx={{ fontSize: '1rem' }} />}
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

interface NavItemProps {
  label: string;
  color: string;
  Icon: React.ElementType;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ label, color, Icon, active, onClick }: NavItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.75,
        cursor: 'pointer',
        bgcolor: active ? `${color}18` : 'rgba(3,13,18,0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: active ? color : `${color}44`,
        '&:hover': { bgcolor: `${color}15`, borderColor: color },
        transition: 'all 0.2s ease',
        minWidth: { xs: 150, md: 160 },
      }}
    >
      <Icon sx={{ fontSize: '0.85rem', color, flexShrink: 0 }} />
      <Typography
        variant="caption"
        sx={{
          color: active ? color : 'text.secondary',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: active ? 700 : 400,
        }}
      >
        {label}
      </Typography>
      {active && (
        <Box sx={{ ml: 'auto', width: 4, height: 4, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 6px ${color}` }} />
      )}
    </Box>
  );
}
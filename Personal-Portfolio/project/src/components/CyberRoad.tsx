import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes, useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import type { SectionId } from '../types';
import { audioEngine } from '../audio/AudioEngine';

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
`;
const scanLine = keyframes`
  0% { top: 0%; }
  100% { top: 100%; }
`;

const SECTION_COLORS: Record<SectionId, string> = {
  about: '#00e5ff',
  skills: '#bf5af2',
  projects: '#00ff41',
  social: '#ff9f0a',
  contact: '#ff375f',
};

// SVG layout: 900 x 700, hub at center (450, 350)
const SVG_W = 900;
const SVG_H = 700;
const HUB_X = 450;
const HUB_Y = 350;

const NODE_POSITIONS: Record<SectionId, { x: number; y: number }> = {
  about:    { x: 160, y: 140 },
  skills:   { x: 740, y: 140 },
  projects: { x: 140, y: 540 },
  social:   { x: 760, y: 540 },
  contact:  { x: 450, y: 620 },
};

const FORK_PATHS: Record<SectionId, string> = {
  about:    `M ${HUB_X} ${HUB_Y} Q 280 240 160 140`,
  skills:   `M ${HUB_X} ${HUB_Y} Q 620 240 740 140`,
  projects: `M ${HUB_X} ${HUB_Y} Q 270 460 140 540`,
  social:   `M ${HUB_X} ${HUB_Y} Q 630 460 760 540`,
  contact:  `M ${HUB_X} ${HUB_Y} L 450 620`,
};

const NODES: { id: SectionId; label: string; sub: string; Icon: React.ElementType; num: string }[] = [
  { id: 'about',    label: 'ABOUT ME',  sub: 'Identity Matrix', Icon: PersonIcon,     num: '01' },
  { id: 'skills',   label: 'SKILLS',    sub: 'Tech Stack',      Icon: CodeIcon,       num: '02' },
  { id: 'projects', label: 'PROJECTS',  sub: 'Build Log',       Icon: FolderOpenIcon, num: '03' },
  { id: 'social',   label: 'SOCIAL',    sub: 'Network Hub',     Icon: PeopleIcon,     num: '04' },
  { id: 'contact',  label: 'CONTACT',   sub: 'Comm Channel',    Icon: EmailIcon,      num: '05' },
];

interface CyberRoadProps {
  activeSection: SectionId | null;
  onNavigate: (section: SectionId) => void;
}

export default function CyberRoad({ activeSection, onNavigate }: CyberRoadProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const [droneTarget, setDroneTarget] = useState<{ x: number; y: number; color: string; label: string }>({
    x: HUB_X,
    y: HUB_Y,
    color: '#00e5ff',
    label: 'NAV HUB',
  });
  const [scrollImpulse, setScrollImpulse] = useState(0);

  const handleClick = useCallback((id: SectionId) => {
    audioEngine.play('nodeActivate');
    audioEngine.fadeOut(0.5);
    setDroneTarget({ x: NODE_POSITIONS[id].x, y: NODE_POSITIONS[id].y, color: SECTION_COLORS[id], label: id.toUpperCase() });
    window.setTimeout(() => onNavigate(id), 500);
  }, [onNavigate]);

  useEffect(() => {
    // Defer state updates to avoid synchronous setState within the effect
    const timer = window.setTimeout(() => {
      if (hovered) {
        setDroneTarget({ x: NODE_POSITIONS[hovered].x, y: NODE_POSITIONS[hovered].y, color: SECTION_COLORS[hovered], label: hovered.toUpperCase() });
        return;
      }

      if (activeSection) {
        setDroneTarget({ x: NODE_POSITIONS[activeSection].x, y: NODE_POSITIONS[activeSection].y, color: SECTION_COLORS[activeSection], label: activeSection.toUpperCase() });
        return;
      }

      setDroneTarget({ x: HUB_X, y: HUB_Y, color: '#00e5ff', label: 'NAV HUB' });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [activeSection, hovered]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const impulse = Math.max(-1, Math.min(1, event.deltaY / 120));
    if (!impulse) return;

    setScrollImpulse(impulse);
    window.setTimeout(() => setScrollImpulse(0), 180);
  }, []);

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
      onWheel={handleWheel}
    >
      {/* Animated grid */}
      <Box aria-hidden sx={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        animation: `${gridMove} 12s linear infinite`,
        zIndex: 0,
      }} />

      {/* Radial glow */}
      <Box aria-hidden sx={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.07) 0%, transparent 65%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Scan line */}
      <Box aria-hidden sx={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)',
        animation: `${scanLine} 8s linear infinite`,
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Header */}
      <Box sx={{
        position: 'relative', zIndex: 10,
        px: { xs: 2, md: 4 }, pt: { xs: 2, md: 3 },
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        pointerEvents: 'none',
      }}>
        <Box>
          <Typography sx={{
            color: 'primary.main', fontSize: '0.65rem', letterSpacing: '0.35em',
            fontFamily: '"Orbitron", sans-serif',
            textShadow: `0 0 12px ${theme.palette.primary.main}`,
          }}>
            ADITYA OS
          </Typography>
          <Typography sx={{ color: 'text.disabled', fontSize: '0.4rem', letterSpacing: '0.15em', mt: 0.25 }}>
            NAVIGATION SYSTEM v2.0
          </Typography>
        </Box>
        <Typography sx={{
          color: 'secondary.main', fontSize: '0.5rem', letterSpacing: '0.2em',
          fontFamily: '"Orbitron", sans-serif',
          textShadow: `0 0 8px ${theme.palette.secondary.main}`,
          animation: `${keyframes`0%,100%{opacity:1}50%{opacity:0.5}`} 2s ease-in-out infinite`,
        }}>
          SELECT DESTINATION
        </Typography>
      </Box>

      {/* SVG Map */}
      <Box sx={{ flex: 1, position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, width: '100%', height: '100%', maxHeight: 'calc(100vh - 100px)' }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%" height="100%" overflow="visible"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="strongGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00ff41" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Fork roads */}
          {NODES.map((node, i) => {
            const isHovered = hovered === node.id;
            const color = SECTION_COLORS[node.id];
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              >
                {/* Glow layer */}
                <motion.path
                  d={FORK_PATHS[node.id]}
                  fill="none"
                  stroke={color}
                  strokeWidth={isHovered ? 14 : 8}
                  strokeLinecap="round"
                  strokeOpacity={isHovered ? 0.45 : 0.18}
                  filter="url(#glow)"
                  animate={{ strokeWidth: isHovered ? 14 : 8, strokeOpacity: isHovered ? 0.45 : 0.18 }}
                  transition={{ duration: 0.25 }}
                />
                {/* Core line */}
                <motion.path
                  d={FORK_PATHS[node.id]}
                  fill="none"
                  stroke={color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeLinecap="round"
                  strokeOpacity={isHovered ? 1 : 0.55}
                  animate={{ strokeWidth: isHovered ? 2.5 : 1.5, strokeOpacity: isHovered ? 1 : 0.55 }}
                  transition={{ duration: 0.25 }}
                />
                {/* Animated dash on hover */}
                {isHovered && (
                  <motion.path
                    d={FORK_PATHS[node.id]}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="6 10"
                    initial={{ strokeDashoffset: 16 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.g>
            );
          })}

          {/* Hub */}
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}
            style={{ transformOrigin: `${HUB_X}px ${HUB_Y}px` }}
          >
            {/* Outer rings */}
            {[80, 62, 46].map((r, i) => (
              <circle key={r} cx={HUB_X} cy={HUB_Y} r={r}
                fill="none"
                stroke="#00e5ff"
                strokeWidth={i === 2 ? 1.5 : 0.5}
                strokeOpacity={i === 2 ? 0.55 : 0.15}
              >
                {i === 2 && (
                  <animate attributeName="r" values={`${r};${r + 4};${r}`} dur="3s" repeatCount="indefinite" />
                )}
              </circle>
            ))}
            {/* Hub fill */}
            <circle cx={HUB_X} cy={HUB_Y} r="32" fill="rgba(0,229,255,0.06)" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.7" filter="url(#glow)" />
            {/* Hub core */}
            <circle cx={HUB_X} cy={HUB_Y} r="12" fill="#00e5ff" filter="url(#strongGlow)">
              <animate attributeName="opacity" values="1;0.55;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
            {/* Hub label */}
            <text x={HUB_X} y={HUB_Y + 55} textAnchor="middle" fill="#00e5ff" fontSize="9" fontFamily="Orbitron, sans-serif" letterSpacing="3" opacity="0.55">
              NAV HUB
            </text>
          </motion.g>

          {/* Section nodes */}
          {NODES.map((node, i) => {
            const pos = NODE_POSITIONS[node.id];
            const color = SECTION_COLORS[node.id];
            const isHovered = hovered === node.id;

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 160 }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(node.id)}
              >
                {/* Pulse ring on hover */}
                {isHovered && (
                  <circle cx={pos.x} cy={pos.y} r="46" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="r" values="38;54;38" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Outer ring */}
                <circle
                  cx={pos.x} cy={pos.y} r="38"
                  fill="rgba(3,13,18,0.92)"
                  stroke={color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  strokeOpacity={isHovered ? 1 : 0.6}
                  filter={isHovered ? 'url(#glow)' : undefined}
                />
                {/* Inner ring */}
                <circle
                  cx={pos.x} cy={pos.y} r="27"
                  fill={isHovered ? `${color}18` : 'transparent'}
                  stroke={color}
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                {/* Center dot */}
                <circle cx={pos.x} cy={pos.y} r="11" fill={color} opacity={isHovered ? 1 : 0.75} filter={isHovered ? 'url(#glow)' : undefined}>
                  <animate attributeName="r" values="11;13;11" dur="2.5s" repeatCount="indefinite" />
                </circle>

                {/* Number badge */}
                <text x={pos.x - 32} y={pos.y - 40} fill={color} fontSize="7.5" fontFamily="monospace" opacity="0.65">
                  {node.num}
                </text>
                {/* Section label */}
                <text
                  x={pos.x} y={pos.y - 50}
                  textAnchor="middle"
                  fill={color}
                  fontSize="9.5"
                  fontFamily="Orbitron, sans-serif"
                  letterSpacing="2"
                  opacity={isHovered ? 1 : 0.8}
                  filter={isHovered ? `drop-shadow(0 0 8px ${color})` : undefined}
                >
                  {node.label}
                </text>
                <text x={pos.x} y={pos.y - 38} textAnchor="middle" fill="#555" fontSize="6.5" fontFamily="monospace" letterSpacing="1">
                  {node.sub}
                </text>

                {/* Click hint on hover */}
                {isHovered && (
                  <text x={pos.x} y={pos.y + 58} textAnchor="middle" fill={color} fontSize="7" fontFamily="Orbitron, sans-serif" letterSpacing="2" opacity="0.8">
                    ENTER
                  </text>
                )}
              </motion.g>
            );
          })}

          {/* Glowing cyber drone */}
          <motion.g
            initial={false}
            animate={{ x: droneTarget.x, y: droneTarget.y, scale: 1 + Math.abs(scrollImpulse) * 0.05 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
            style={{ transformOrigin: 'center center' }}
          >
            <motion.g animate={{ rotate: scrollImpulse * 14 }} transition={{ type: 'spring', stiffness: 180, damping: 16 }}>
              <ellipse cx="0" cy="20" rx="4" ry={10 + Math.abs(scrollImpulse) * 3} fill={droneTarget.color} opacity="0.28">
                <animate attributeName="opacity" values="0.28;0.12;0.28" dur="0.5s" repeatCount="indefinite" />
              </ellipse>
              <polygon points="0,-18 10,-6 7,6 0,4 -7,6 -10,-6" fill={droneTarget.color} filter="url(#glow)" />
              <circle cx="0" cy="-7" r="4" fill="#fff" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.45;0.9" dur="0.9s" repeatCount="indefinite" />
              </circle>
              <circle cx="-8" cy="-2" r="1.5" fill="#00ff41">
                <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="8" cy="-2" r="1.5" fill="#00ff41">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.6s" repeatCount="indefinite" />
              </circle>
              <text x="0" y="36" textAnchor="middle" fill={droneTarget.color} fontSize="7" fontFamily="Orbitron, sans-serif" letterSpacing="2" opacity="0.7">
                {droneTarget.label}
              </text>
            </motion.g>
          </motion.g>
        </svg>
      </Box>

      {/* Hover instruction */}
      <Box sx={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', pb: { xs: 8, md: 3 },
        pointerEvents: 'none',
      }}>
        <Typography sx={{
          color: 'text.disabled', fontSize: '0.45rem',
          letterSpacing: '0.2em', fontFamily: '"Orbitron", sans-serif',
        }}>
          HOVER A NODE AND CLICK TO ENTER
        </Typography>
      </Box>
    </Box>
  );
}

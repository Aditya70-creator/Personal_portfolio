import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { keyframes, useTheme } from '@mui/material/styles';
import { profile } from '../data/profile';
import { audioEngine } from '../audio/AudioEngine';

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
`;
const borderPulse = keyframes`
  0%, 100% { opacity: 0.6; box-shadow: 0 0 8px #00e5ff44, inset 0 0 8px #00e5ff11; }
  50% { opacity: 1; box-shadow: 0 0 20px #00e5ff88, inset 0 0 16px #00e5ff22; }
`;
const scanLine = keyframes`
  0% { top: 0%; opacity: 0.8; }
  100% { top: 100%; opacity: 0; }
`;
const radarSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.4; }
`;
const radarBlip = keyframes`
  0% { opacity: 1; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(2.5); }
`;

const BOOT_LINES = [
  'Initializing Portfolio...',
  'Loading Profile Data...',
  'Establishing Secure Connection...',
  'Compiling Skill Modules...',
  'Access Granted.',
];

const BLIP_POSITIONS = [
  { cx: 65, cy: 40 },
  { cx: 30, cy: 70 },
  { cx: 80, cy: 65 },
  { cx: 50, cy: 20 },
  { cx: 20, cy: 45 },
];


function HUDCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: 18,
        height: 18,
        zIndex: 2,
        ...(position === 'tl' && { top: 0, left: 0, borderTop: '2px solid #00e5ff', borderLeft: '2px solid #00e5ff' }),
        ...(position === 'tr' && { top: 0, right: 0, borderTop: '2px solid #00e5ff', borderRight: '2px solid #00e5ff' }),
        ...(position === 'bl' && { bottom: 0, left: 0, borderBottom: '2px solid #00e5ff', borderLeft: '2px solid #00e5ff' }),
        ...(position === 'br' && { bottom: 0, right: 0, borderBottom: '2px solid #00e5ff', borderRight: '2px solid #00e5ff' }),
      }}
    />
  );
}

function RadarSVG() {
  const r = 50;
  const cx = 60;
  const cy = 60;
  return (
    <Box sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {[15, 30, 45, r].map((radius) => (
          <circle key={radius} cx={cx} cy={cy} r={radius} fill="none" stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.3" />
        ))}
        <line x1={cx} y1={cx - r} x2={cx} y2={cx + r} stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1={cx - r} y1={cx} x2={cx + r} y2={cx} stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.3" />
        {BLIP_POSITIONS.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r="2.5" fill="#00ff41" />
        ))}
        <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: `${radarSpin} 3s linear infinite` } as React.CSSProperties}>
          <defs>
            <radialGradient id="sweepG2" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <path
            d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r * Math.sin(Math.PI / 6)} ${cy - r * Math.cos(Math.PI / 6)} Z`}
            fill="url(#sweepG2)"
            stroke="#00e5ff"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.9" />
        </g>
        <circle cx={cx} cy={cy} r="2" fill="#00e5ff" />
      </svg>
    </Box>
  );
}

function LeftPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid',
        borderColor: 'primary.main',
        p: 2,
        bgcolor: 'background.paper',
        animation: `${borderPulse} 3s ease-in-out infinite`,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HUDCorner position="tl" />
      <HUDCorner position="tr" />
      <HUDCorner position="bl" />
      <HUDCorner position="br" />
      <Box sx={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00e5ff44, transparent)', animation: `${scanLine} 4s linear infinite`, pointerEvents: 'none' }} />

      <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.55rem', letterSpacing: '0.2em', mb: 1.5, display: 'block', fontFamily: '"Orbitron", sans-serif' }}>
        OPERATOR PROFILE
      </Typography>

      <Box sx={{ mb: 1.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.7rem', fontWeight: 700, display: 'block', letterSpacing: '0.1em' }}>
          {profile.name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.55rem', display: 'block', letterSpacing: '0.05em' }}>
          {profile.role}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em', display: 'block', mb: 0.75 }}>
        CAREER FOCUS
      </Typography>
      {profile.careerInterests.map((interest) => (
        <Typography key={interest} variant="caption" sx={{ color: 'secondary.main', fontSize: '0.6rem', display: 'block', lineHeight: 1.9 }}>
          {'> '}{interest}
        </Typography>
      ))}

      <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em', display: 'block', mb: 0.75 }}>
          LOADING MODULES
        </Typography>
        {profile.currentLearning.map((item) => (
          <Typography key={item} variant="caption" sx={{ color: 'primary.main', fontSize: '0.6rem', display: 'block', lineHeight: 1.9 }}>
            {'• '}{item}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mt: 'auto', pt: 1.5 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', display: 'block', letterSpacing: '0.1em' }}>
          STATUS: <Box component="span" sx={{ color: 'secondary.main' }}>ACTIVE</Box>
        </Typography>
      </Box>
    </Box>
  );
}

function RightPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid',
        borderColor: 'primary.main',
        p: 2,
        bgcolor: 'background.paper',
        animation: `${borderPulse} 3s ease-in-out infinite`,
        animationDelay: '1.5s',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HUDCorner position="tl" />
      <HUDCorner position="tr" />
      <HUDCorner position="bl" />
      <HUDCorner position="br" />
      <Box sx={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00ff4144, transparent)', animation: `${scanLine} 4s linear infinite`, animationDelay: '2s', pointerEvents: 'none' }} />

      <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.55rem', letterSpacing: '0.2em', mb: 0.5, display: 'block', fontFamily: '"Orbitron", sans-serif' }}>
        SKILL RADAR
      </Typography>

      <RadarSVG />

      <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider', mb: 1.5 }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.5rem', letterSpacing: '0.15em', display: 'block', mb: 1, fontFamily: '"Orbitron", sans-serif' }}>
          TECH DOMAINS
        </Typography>
        {[
          { label: 'Languages', count: `${profile.skills.length} modules`, color: '#00e5ff' },
          { label: 'Security', count: 'active', color: '#00ff41' },
          { label: 'AI / ML', count: 'active', color: '#00e5ff' },
        ].map((d) => (
          <Box key={d.label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.55rem' }}>{d.label}</Typography>
            <Typography variant="caption" sx={{ color: d.color, fontSize: '0.55rem', fontWeight: 700 }}>{d.count}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.5rem', letterSpacing: '0.15em', display: 'block', mb: 1, fontFamily: '"Orbitron", sans-serif' }}>
          SKILL MODULES
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {profile.skills.slice(0, 6).map((s) => (
            <Chip key={s} label={s} size="small" sx={{ bgcolor: 'rgba(0,229,255,0.07)', color: 'primary.main', border: '1px solid rgba(0,229,255,0.2)', fontSize: '0.45rem', height: 16, '& .MuiChip-label': { px: 0.75 } }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

interface HUDLandingProps {
  onEnter: () => void;
}

export default function HUDLanding({ onEnter }: HUDLandingProps) {
  const theme = useTheme();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    audioEngine.init();
    const timer = setTimeout(() => audioEngine.play('enter'), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    async function boot() {
      const total = BOOT_LINES.length;
      for (let li = 0; li < total; li++) {
        const line = BOOT_LINES[li];
        for (let ci = 4; ci <= line.length + 4; ci += 4) {
          const actual = Math.min(ci, line.length);
          if (!alive) return;
          setLineIndex(li);
          setCharIndex(actual);
          setProgress(Math.round(((li + actual / line.length) / total) * 100));
          await sleep(60);
        }
        await sleep(300);
      }
      if (!alive) return;
      setBooted(true);
      setProgress(100);
      await sleep(400);
      if (!alive) return;
      setShowEnter(true);
    }
    boot();
    return () => { alive = false; };
  }, []);

  const currentLine = BOOT_LINES[lineIndex];
  const showingLine = booted ? 'Access Granted.' : (currentLine ? currentLine.slice(0, charIndex) : '');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Animated grid */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px', animation: `${gridMove} 8s linear infinite`, zIndex: 0 }} />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 120px, rgba(0,229,255,0.015) 120px, rgba(0,229,255,0.015) 121px)`, zIndex: 0 }} />
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Top bar */}
      <Box sx={{ position: 'relative', zIndex: 2, px: { xs: 2, md: 4 }, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(3,13,18,0.8)', backdropFilter: 'blur(4px)' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontSize: { xs: '0.7rem', md: '0.85rem' }, letterSpacing: '0.3em', textShadow: `0 0 12px ${theme.palette.primary.main}` }}>
          ADITYA OS
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em' }}>
          PERSONAL OPERATING SYSTEM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', boxShadow: `0 0 8px ${theme.palette.secondary.main}`, animation: `${blink} 1.2s ease-in-out infinite` }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.1em' }}>ONLINE</Typography>
        </Box>
      </Box>

      {/* Main HUD layout */}
      <Box sx={{ position: 'relative', zIndex: 2, flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '240px 1fr 240px' }, gap: { xs: 2, md: 3 }, px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, alignItems: 'stretch' }}>

        {/* Left panel */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <LeftPanel />
        </Box>

        {/* Center */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, minHeight: { xs: 'calc(100vh - 120px)', md: 'auto' } }}>
          {/* Arc reactor icon */}
          <Box sx={{ position: 'relative', width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, animation: `${neonFlicker} 6s ease-in-out infinite` }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <filter id="glowF">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <circle cx="50" cy="50" r="46" fill="none" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.4" style={{ animation: `${radarSpin} 8s linear infinite` }} />
              <polygon points="50,15 62,35 80,28 72,48 88,58 68,62 68,80 50,70 32,80 32,62 12,58 28,48 20,28 38,35" fill="none" stroke="#00e5ff" strokeWidth="1.5" filter="url(#glowF)" style={{ animation: `${radarSpin} 12s linear infinite reverse` }} />
              <circle cx="50" cy="50" r="14" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="8" fill="#00e5ff22" stroke="#00e5ff" strokeWidth="1" style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }} />
              <circle cx="50" cy="50" r="3" fill="#00e5ff" style={{ filter: 'drop-shadow(0 0 4px #00e5ff)' }} />
            </svg>
          </Box>

          {/* Main title */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h1" sx={{ color: 'primary.main', fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' }, letterSpacing: '0.2em', textShadow: `0 0 30px ${theme.palette.primary.main}, 0 0 60px ${theme.palette.primary.main}44`, mb: 0.5 }}>
              {profile.name.toUpperCase()}
            </Typography>
            <Typography variant="h5" sx={{ color: 'secondary.main', fontSize: { xs: '0.7rem', md: '0.85rem' }, letterSpacing: '0.2em', textShadow: `0 0 12px ${theme.palette.secondary.main}`, mb: 0.5 }}>
              {profile.role.toUpperCase()}
            </Typography>
            <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: { xs: '0.45rem', md: '0.55rem' }, letterSpacing: '0.2em' }}>
              {profile.careerInterests.slice(0, 3).join(' • ')}
            </Typography>
          </Box>

          {/* Terminal */}
          <Box sx={{ width: '100%', maxWidth: 480, border: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,229,255,0.03)', p: 2, position: 'relative', overflow: 'hidden' }}>
            <HUDCorner position="tl" />
            <HUDCorner position="tr" />
            <HUDCorner position="bl" />
            <HUDCorner position="br" />
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em', display: 'block', mb: 1 }}>
              TERMINAL // BOOT SEQUENCE
            </Typography>
            <Box sx={{ minHeight: 64, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'secondary.main', fontSize: { xs: '0.7rem', md: '0.8rem' }, letterSpacing: '0.05em', textShadow: `0 0 8px ${theme.palette.secondary.main}` }}>
                {showingLine}
                {!booted && (
                  <Box component="span" sx={{ display: 'inline-block', width: '8px', height: '1em', bgcolor: 'secondary.main', ml: '2px', verticalAlign: 'text-bottom', animation: `${blink} 0.7s step-end infinite` }} />
                )}
              </Typography>
            </Box>
          </Box>

          {/* Progress */}
          <Box sx={{ width: '100%', maxWidth: 480 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.1em' }}>SYSTEM LOAD</Typography>
              <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.5rem', letterSpacing: '0.1em' }}>{progress}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 6, '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', boxShadow: `0 0 10px ${theme.palette.primary.main}` } }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              {[0, 25, 50, 75, 100].map((t) => (
                <Typography key={t} variant="caption" sx={{ color: 'text.disabled', fontSize: '0.45rem' }}>{t}</Typography>
              ))}
            </Box>
          </Box>

          {/* Enter button */}
          {showEnter && (
            <Box sx={{ animation: `${fadeInUp} 0.6s ease-out forwards`, width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => { audioEngine.play('enter'); onEnter(); }}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  borderWidth: 1.5,
                  px: 6,
                  py: 1.5,
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  letterSpacing: '0.3em',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                  textShadow: `0 0 10px ${theme.palette.primary.main}`,
                  boxShadow: `0 0 20px ${theme.palette.primary.main}44, inset 0 0 20px ${theme.palette.primary.main}08`,
                  '&:hover': { borderColor: 'primary.light', bgcolor: `${theme.palette.primary.main}15`, boxShadow: `0 0 40px ${theme.palette.primary.main}88, inset 0 0 30px ${theme.palette.primary.main}15`, transform: 'scale(1.02)' },
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: 320,
                }}
              >
                ENTER PORTFOLIO
              </Button>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em' }}>
                ADITYA OS v1.0 // ACCESS GRANTED
              </Typography>
            </Box>
          )}
        </Box>

        {/* Right panel */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <RightPanel />
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box sx={{ position: 'relative', zIndex: 2, px: { xs: 2, md: 4 }, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'rgba(3,13,18,0.8)', backdropFilter: 'blur(4px)' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.45rem', letterSpacing: '0.1em' }}>ADITYA OS v1.0</Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.45rem', letterSpacing: '0.1em' }}>PERSONAL PORTFOLIO SYSTEM</Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.45rem', letterSpacing: '0.1em' }}>{new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC</Typography>
      </Box>
    </Box>
  );
}

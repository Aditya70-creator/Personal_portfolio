import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { keyframes, useTheme } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import { profile } from '../../data/profile';
import SectionWrapper from './SectionWrapper';
import type { SectionId } from '../../types';

const neonPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px #00e5ff88, 0 0 40px #00e5ff44; }
  50% { text-shadow: 0 0 40px #00e5ffcc, 0 0 80px #00e5ff88; }
`;
const glowBar = keyframes`
  0%, 100% { box-shadow: 0 0 6px #00e5ff44; }
  50% { box-shadow: 0 0 18px #00e5ff99, 0 0 36px #00e5ff33; }
`;

const INTEREST_ICONS = [CodeIcon, SecurityIcon, AutoAwesomeIcon, SchoolIcon];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const STATS = [
  { label: 'SKILLS', value: profile.skills.length, unit: 'modules' },
  { label: 'LEARNING', value: profile.currentLearning.length, unit: 'active' },
  { label: 'INTERESTS', value: profile.careerInterests.length, unit: 'domains' },
  { label: 'CATEGORIES', value: profile.skillCategories.length, unit: 'stacks' },
];

interface AboutSectionProps {
  onNavigate: (id: SectionId) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const theme = useTheme();

  return (
    <SectionWrapper id="about" title="ABOUT ME" subtitle="Identity Matrix // Operator Profile" onNavigate={onNavigate}>
      <Box
        component={motion.div as React.ElementType}
        variants={container}
        initial="hidden"
        animate="show"
        sx={{ px: { xs: 3, md: 6, lg: 10 }, py: { xs: 4, md: 6 } }}
      >
        <Grid container spacing={4}>
          {/* Left column — name + bio */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box component={motion.div as React.ElementType} variants={item}>
              <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.55rem', letterSpacing: '0.4em', display: 'block', mb: 1 }}>
                OPERATOR IDENTIFIED
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: 'primary.main',
                  fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                  letterSpacing: '0.1em',
                  lineHeight: 1.1,
                  animation: `${neonPulse} 4s ease-in-out infinite`,
                  mb: 1,
                }}
              >
                {profile.name.split(' ')[0]}
                <Box component="br" />
                <Box component="span" sx={{ color: 'secondary.main', textShadow: `0 0 30px ${theme.palette.secondary.main}66` }}>
                  {profile.name.split(' ')[1]}
                </Box>
              </Typography>
              <Typography variant="h5" sx={{ color: 'text.disabled', fontSize: { xs: '0.8rem', md: '1rem' }, letterSpacing: '0.25em', mb: 3 }}>
                {profile.role.toUpperCase()}
              </Typography>
            </Box>

            <Box
              component={motion.div as React.ElementType}
              variants={item}
              sx={{ position: 'relative', border: '1px solid', borderColor: 'divider', p: 3, mb: 3, bgcolor: 'rgba(0,229,255,0.02)', animation: `${glowBar} 4s ease-in-out infinite` }}
            >
              {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
                <Box key={pos} sx={{ position: 'absolute', width: 12, height: 12, ...(pos === 'tl' && { top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid', borderColor: 'primary.main' }), ...(pos === 'tr' && { top: 0, right: 0, borderTop: '1px solid', borderRight: '1px solid', borderColor: 'primary.main' }), ...(pos === 'bl' && { bottom: 0, left: 0, borderBottom: '1px solid', borderLeft: '1px solid', borderColor: 'primary.main' }), ...(pos === 'br' && { bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid', borderColor: 'primary.main' }) }} />
              ))}
              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em', display: 'block', mb: 1.5, fontFamily: '"Share Tech Mono", monospace' }}>
                {'>'} BIO // SYSTEM LOG
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', md: '0.9rem' }, lineHeight: 1.8, letterSpacing: '0.02em' }}>
                {profile.bio}
              </Typography>
            </Box>

            {/* Skill preview strip */}
            <Box component={motion.div as React.ElementType} variants={item}>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em', display: 'block', mb: 1.5, fontFamily: '"Orbitron", sans-serif' }}>
                TOP MODULES
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills.slice(0, 6).map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                  >
                    <Chip
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(0,229,255,0.06)',
                        color: 'primary.main',
                        border: '1px solid rgba(0,229,255,0.25)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.08em',
                        fontFamily: '"Share Tech Mono", monospace',
                        height: 24,
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.3 }}>
                  <Chip
                    label={`+${profile.skills.length - 6} more`}
                    size="small"
                    onClick={() => onNavigate('skills')}
                    sx={{
                      bgcolor: 'transparent',
                      color: 'text.disabled',
                      border: '1px dashed rgba(0,229,255,0.2)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.05em',
                      height: 24,
                      cursor: 'pointer',
                      '& .MuiChip-label': { px: 1 },
                      '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                      transition: 'all 0.2s ease',
                    }}
                  />
                </motion.div>
              </Box>
            </Box>
          </Grid>

          {/* Right column — career interests + learning */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box component={motion.div as React.ElementType} variants={item} sx={{ mb: 3 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.55rem', letterSpacing: '0.3em', display: 'block', mb: 2, fontFamily: '"Orbitron", sans-serif' }}>
                CAREER FOCUS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {profile.careerInterests.map((interest, i) => {
                  const Icon = INTEREST_ICONS[i % INTEREST_ICONS.length];
                  return (
                    <Box
                      key={interest}
                      component={motion.div as React.ElementType}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        border: '1px solid',
                        borderColor: 'rgba(0,229,255,0.15)',
                        bgcolor: 'rgba(0,229,255,0.03)',
                        '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(0,229,255,0.07)', transform: 'translateX(4px)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon sx={{ fontSize: '0.9rem', color: 'primary.main', opacity: 0.7, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        {interest}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box component={motion.div as React.ElementType} variants={item}>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontSize: '0.55rem', letterSpacing: '0.3em', display: 'block', mb: 2, fontFamily: '"Orbitron", sans-serif' }}>
                LOADING MODULES
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.currentLearning.map((mod, i) => (
                  <Chip
                    key={mod}
                    label={mod}
                    sx={{
                      bgcolor: 'rgba(0,255,65,0.06)',
                      color: 'secondary.main',
                      border: '1px solid rgba(0,255,65,0.3)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      fontFamily: '"Share Tech Mono", monospace',
                      animation: `${neonPulse} ${2 + i * 0.4}s ease-in-out infinite`,
                      '&:hover': { bgcolor: 'rgba(0,255,65,0.12)', boxShadow: `0 0 12px rgba(0,255,65,0.4)` },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Stats strip */}
        <Box
          component={motion.div as React.ElementType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          sx={{ mt: 5 }}
        >
          <Divider sx={{ borderColor: 'rgba(0,229,255,0.1)', mb: 3 }} />
          <Grid container spacing={2}>
            {STATS.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <Box
                  component={motion.div as React.ElementType}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.35 }}
                  sx={{
                    p: 2,
                    border: '1px solid rgba(0,229,255,0.12)',
                    bgcolor: 'rgba(0,229,255,0.02)',
                    textAlign: 'center',
                    position: 'relative',
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(0,229,255,0.06)' },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {(['tl', 'br'] as const).map((pos) => (
                    <Box key={pos} sx={{ position: 'absolute', width: 8, height: 8, ...(pos === 'tl' ? { top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid' } : { bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid' }), borderColor: 'primary.main', opacity: 0.6 }} />
                  ))}
                  <Typography variant="h4" sx={{ color: 'primary.main', fontSize: { xs: '1.5rem', md: '2rem' }, fontFamily: '"Orbitron", sans-serif', fontWeight: 900, letterSpacing: '0.05em', textShadow: `0 0 20px ${theme.palette.primary.main}66` }}>
                    {stat.value.toString().padStart(2, '0')}
                  </Typography>
                  <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em', display: 'block', lineHeight: 1.4 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(0,229,255,0.4)', fontSize: '0.45rem', letterSpacing: '0.1em' }}>
                    {stat.unit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

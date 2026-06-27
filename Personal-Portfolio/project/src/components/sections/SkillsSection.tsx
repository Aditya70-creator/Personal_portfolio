import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { keyframes, useTheme } from '@mui/material/styles';
import { profile } from '../../data/profile';
import SectionWrapper from './SectionWrapper';
import type { SectionId } from '../../types';

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 6px #00e5ff44; }
  50% { box-shadow: 0 0 16px #00e5ff88, 0 0 32px #00e5ff33; }
`;
const barGrow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

interface SkillsSectionProps {
  onNavigate: (id: SectionId) => void;
}

export default function SkillsSection({ onNavigate }: SkillsSectionProps) {
  const theme = useTheme();

  return (
    <SectionWrapper id="skills" title="SKILLS" subtitle="Tech Stack // Active Modules" onNavigate={onNavigate}>
      <Box sx={{ px: { xs: 3, md: 6, lg: 10 }, py: { xs: 4, md: 6 } }}>

        <Box component={motion.div as React.ElementType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.55rem', letterSpacing: '0.4em', display: 'block', mb: 1 }}>
            LOADED MODULES
          </Typography>
          <Typography variant="h2" sx={{ color: 'primary.main', fontSize: { xs: '1.8rem', md: '2.5rem' }, letterSpacing: '0.15em', mb: 1, textShadow: `0 0 30px ${theme.palette.primary.main}66` }}>
            TECH STACK
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 5 }}>
            {profile.skills.length} modules compiled and ready for deployment.
          </Typography>
        </Box>

        {/* Category cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {profile.skillCategories.map((cat, catIdx) => (
            <Grid key={cat.label} size={{ xs: 12, md: 4 }}>
              <Box
                component={motion.div as React.ElementType}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + catIdx * 0.15, duration: 0.5 }}
                sx={{
                  position: 'relative',
                  border: '1px solid',
                  borderColor: `${cat.color}33`,
                  p: 2.5,
                  bgcolor: `${cat.color}08`,
                  height: '100%',
                  '&:hover': { borderColor: `${cat.color}88`, bgcolor: `${cat.color}10` },
                  transition: 'all 0.3s ease',
                }}
              >
                {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
                  <Box key={pos} sx={{ position: 'absolute', width: 10, height: 10, ...(pos === 'tl' && { top: 0, left: 0, borderTop: '2px solid', borderLeft: '2px solid' }), ...(pos === 'tr' && { top: 0, right: 0, borderTop: '2px solid', borderRight: '2px solid' }), ...(pos === 'bl' && { bottom: 0, left: 0, borderBottom: '2px solid', borderLeft: '2px solid' }), ...(pos === 'br' && { bottom: 0, right: 0, borderBottom: '2px solid', borderRight: '2px solid' }), borderColor: cat.color, opacity: 0.6 }} />
                ))}

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="overline" sx={{ color: cat.color, fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: '"Orbitron", sans-serif' }}>
                    {cat.label}
                  </Typography>
                  <Box sx={{ px: 1, py: 0.25, border: '1px solid', borderColor: `${cat.color}44`, bgcolor: `${cat.color}11` }}>
                    <Typography variant="caption" sx={{ color: cat.color, fontSize: '0.45rem', letterSpacing: '0.15em', fontFamily: '"Share Tech Mono", monospace' }}>
                      {cat.skills.length.toString().padStart(2, '0')} MODS
                    </Typography>
                  </Box>
                </Box>

                {/* Accent bar */}
                <Box sx={{ height: '2px', bgcolor: `${cat.color}22`, mb: 2, overflow: 'hidden' }}>
                  <Box sx={{ height: '2px', bgcolor: cat.color, animation: `${barGrow} 1.2s ${0.3 + catIdx * 0.15}s ease-out forwards`, width: 0 }} />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {cat.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + catIdx * 0.15 + i * 0.07, duration: 0.3, type: 'spring', stiffness: 220 }}
                    >
                      <Chip
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: `${cat.color}0d`,
                          color: cat.color,
                          border: `1px solid ${cat.color}44`,
                          fontSize: '0.65rem',
                          letterSpacing: '0.06em',
                          fontFamily: '"Share Tech Mono", monospace',
                          height: 28,
                          animation: `${glowPulse} ${2.5 + (i % 3) * 0.4}s ease-in-out infinite`,
                          '& .MuiChip-label': { px: 1.25 },
                          '&:hover': {
                            bgcolor: `${cat.color}22`,
                            boxShadow: `0 0 16px ${cat.color}55`,
                            borderColor: cat.color,
                            transform: 'scale(1.06)',
                          },
                          transition: 'all 0.2s ease',
                          cursor: 'default',
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* All modules flat summary */}
        <Box
          component={motion.div as React.ElementType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          sx={{ border: '1px solid rgba(0,229,255,0.1)', p: 3, bgcolor: 'rgba(0,229,255,0.01)', position: 'relative' }}
        >
          {(['tl', 'br'] as const).map((pos) => (
            <Box key={pos} sx={{ position: 'absolute', width: 12, height: 12, ...(pos === 'tl' ? { top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid' } : { bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid' }), borderColor: 'primary.main', opacity: 0.5 }} />
          ))}
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.25em', display: 'block', mb: 2, fontFamily: '"Orbitron", sans-serif' }}>
            ALL MODULES — {profile.skills.length} TOTAL
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profile.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 + i * 0.04, duration: 0.3 }}
              >
                <Chip
                  label={skill}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0,229,255,0.04)',
                    color: 'text.secondary',
                    border: '1px solid rgba(0,229,255,0.15)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.05em',
                    fontFamily: '"Share Tech Mono", monospace',
                    height: 24,
                    '& .MuiChip-label': { px: 1 },
                    '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'rgba(0,229,255,0.08)' },
                    transition: 'all 0.15s ease',
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>

        <Box
          component={motion.div as React.ElementType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          sx={{ mt: 3, p: 2, border: '1px dashed rgba(0,229,255,0.1)', bgcolor: 'rgba(0,229,255,0.01)' }}
        >
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em' }}>
            Add skills &amp; categories in{' '}
            <Box component="span" sx={{ color: 'primary.main', fontFamily: '"Share Tech Mono", monospace' }}>src/data/profile.ts</Box>
          </Typography>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

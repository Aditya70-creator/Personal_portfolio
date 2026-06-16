import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { keyframes, useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import { profile } from '../../data/profile';
import SectionWrapper from './SectionWrapper';
import type { SectionId } from '../../types';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
const terminalGlow = keyframes`
  0%, 100% { box-shadow: 0 0 8px #00e5ff22; }
  50% { box-shadow: 0 0 20px #00e5ff55; }
`;

const CONTACT_FIELDS = [
  { label: 'FULL_NAME', value: profile.name, Icon: PersonIcon },
  { label: 'EMAIL', value: profile.email, Icon: EmailIcon, link: `mailto:${profile.email}` },
  { label: 'PHONE', value: profile.phone, Icon: PhoneIcon },
  { label: 'LOCATION', value: profile.location, Icon: LocationOnIcon },
  { label: 'LINKEDIN', value: profile.linkedin, Icon: LinkedInIcon, link: profile.linkedin },
  { label: 'GITHUB', value: profile.github, Icon: GitHubIcon, link: profile.github },
  { label: 'INSTAGRAM', value: profile.instagram, Icon: InstagramIcon, link: profile.instagram },
  { label: 'DISCORD', value: profile.discord, Icon: ForumIcon, link: 'https://discord.com' },
];

interface ContactSectionProps {
  onNavigate: (id: SectionId) => void;
}

export default function ContactSection({ onNavigate }: ContactSectionProps) {
  const theme = useTheme();
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  return (
    <SectionWrapper id="contact" title="CONTACT" subtitle="Comm Channel // Direct Link" onNavigate={onNavigate}>
      <Box sx={{ px: { xs: 3, md: 6, lg: 10 }, py: { xs: 4, md: 6 } }}>
        <Box component={motion.div as React.ElementType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.55rem', letterSpacing: '0.4em', display: 'block', mb: 1 }}>
            DIRECT CHANNEL
          </Typography>
          <Typography variant="h2" sx={{ color: 'primary.main', fontSize: { xs: '1.8rem', md: '2.5rem' }, letterSpacing: '0.15em', mb: 1, textShadow: `0 0 30px ${theme.palette.primary.main}66` }}>
            CONTACT
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 5 }}>
            Establish a direct communication link.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4, maxWidth: 1000 }}>
          {/* Terminal display */}
          <Box
            component={motion.div as React.ElementType}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Box
              sx={{
                border: '1px solid rgba(0,229,255,0.3)',
                bgcolor: 'rgba(0,0,0,0.6)',
                overflow: 'hidden',
                animation: `${terminalGlow} 3s ease-in-out infinite`,
              }}
            >
              {/* Terminal header */}
              <Box sx={{ px: 2, py: 1, bgcolor: 'rgba(0,229,255,0.08)', borderBottom: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', gap: 1 }}>
                {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                  <Box key={c} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c }} />
                ))}
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em', ml: 1 }}>
                  contact@aditya-os:~$
                </Typography>
              </Box>

              {/* Terminal body */}
              <Box sx={{ p: 2.5, fontFamily: '"Share Tech Mono", monospace' }}>
                <Typography variant="caption" sx={{ color: 'rgba(0,229,255,0.5)', fontSize: '0.6rem', display: 'block', mb: 2 }}>
                  {'// run query: GET /operator/contact'}
                </Typography>

                {CONTACT_FIELDS.map((field, i) => (
                  <motion.div
                    key={field.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        mb: 1.5,
                        cursor: field.link ? 'pointer' : 'default',
                        '&:hover .field-value': field.link ? { color: 'primary.light', textDecoration: 'underline' } : {},
                      }}
                      onMouseEnter={() => setHoveredField(field.label)}
                      onMouseLeave={() => setHoveredField(null)}
                      onClick={() => field.link && window.open(field.link, '_blank', 'noopener,noreferrer')}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 140 }}>
                        <field.Icon sx={{ fontSize: '0.75rem', color: hoveredField === field.label ? 'primary.light' : 'rgba(0,229,255,0.5)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(0,229,255,0.6)', fontSize: '0.6rem', letterSpacing: '0.08em' }}>
                          {field.label}:
                        </Typography>
                      </Box>
                      <Typography
                        className="field-value"
                        variant="caption"
                        sx={{
                          color: hoveredField === field.label && field.link ? 'primary.light' : 'secondary.main',
                          fontSize: '0.6rem',
                          letterSpacing: '0.03em',
                          transition: 'color 0.2s',
                          wordBreak: 'break-all',
                        }}
                      >
                        {field.value}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" sx={{ color: 'secondary.main', fontSize: '0.6rem' }}>{'$ '}</Typography>
                  <Box sx={{ width: 8, height: 12, bgcolor: 'secondary.main', ml: '2px', animation: `${blink} 1s step-end infinite` }} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Action panel */}
          <Box
            component={motion.div as React.ElementType}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Box sx={{ border: '1px solid rgba(0,229,255,0.15)', p: 3, bgcolor: 'rgba(0,229,255,0.02)' }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.5rem', letterSpacing: '0.25em', display: 'block', mb: 2, fontFamily: '"Orbitron", sans-serif' }}>
                INITIATE CONTACT
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.75rem', lineHeight: 1.7, mb: 3 }}>
                Ready to collaborate, discuss ideas, or explore opportunities? Open a direct channel.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EmailIcon />}
                href={`mailto:${profile.email}`}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  borderWidth: 1.5,
                  px: 4,
                  py: 1.5,
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                  '&:hover': { borderColor: 'primary.light', bgcolor: `${theme.palette.primary.main}15`, boxShadow: `0 0 20px ${theme.palette.primary.main}44` },
                  transition: 'all 0.3s ease',
                }}
              >
                CONTACT ME
              </Button>
            </Box>

            <Box sx={{ border: '1px solid rgba(0,229,255,0.1)', p: 3, bgcolor: 'rgba(0,229,255,0.01)' }}>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.15em', display: 'block', mb: 1.5 }}>
                QUICK LINKS
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {[{ label: 'GITHUB', href: profile.github, Icon: GitHubIcon }, { label: 'LINKEDIN', href: profile.linkedin, Icon: LinkedInIcon }].map(({ label, href, Icon }) => (
                  <Button
                    key={label}
                    variant="outlined"
                    size="small"
                    startIcon={<Icon sx={{ fontSize: '0.8rem' }} />}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.disabled',
                      borderColor: 'rgba(0,229,255,0.15)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'rgba(0,229,255,0.05)' },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box sx={{ p: 2, border: '1px dashed rgba(0,229,255,0.1)' }}>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.1em', lineHeight: 1.7, display: 'block' }}>
                Update contact details in{' '}
                <Box component="span" sx={{ color: 'primary.main', fontFamily: '"Share Tech Mono", monospace' }}>
                  src/data/profile.ts
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

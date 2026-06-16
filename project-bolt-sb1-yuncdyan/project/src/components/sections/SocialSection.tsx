import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ForumIcon from '@mui/icons-material/Forum';
import MessageIcon from '@mui/icons-material/Message';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { socials } from '../../data/socials';
import SectionWrapper from './SectionWrapper';
import type { SectionId } from '../../types';

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Discord: ForumIcon,
  Slack: MessageIcon,
};

interface SocialSectionProps {
  onNavigate: (id: SectionId) => void;
}

export default function SocialSection({ onNavigate }: SocialSectionProps) {
  const theme = useTheme();

  return (
    <SectionWrapper id="social" title="SOCIAL" subtitle="Network Hub // Comm Links" onNavigate={onNavigate}>
      <Box sx={{ px: { xs: 3, md: 6, lg: 10 }, py: { xs: 4, md: 6 } }}>
        <Box component={motion.div as React.ElementType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.55rem', letterSpacing: '0.4em', display: 'block', mb: 1 }}>
            COMM LINKS
          </Typography>
          <Typography variant="h2" sx={{ color: 'primary.main', fontSize: { xs: '1.8rem', md: '2.5rem' }, letterSpacing: '0.15em', mb: 1, textShadow: `0 0 30px ${theme.palette.primary.main}66` }}>
            SOCIAL NETWORK
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 5 }}>
            {socials.length} active communication channels.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {socials.map((social, i) => {
            const Icon = PLATFORM_ICONS[social.platform] ?? OpenInNewIcon;
            return (
              <motion.div
                key={social.platform}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              >
                <Box
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    position: 'relative',
                    border: '1px solid rgba(0,229,255,0.2)',
                    p: 3,
                    bgcolor: 'rgba(0,229,255,0.03)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: social.color,
                      bgcolor: `${social.color}11`,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 8px 32px ${social.color}33`,
                    },
                  }}
                >
                  {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
                    <Box key={pos} sx={{ position: 'absolute', width: 10, height: 10, ...(pos === 'tl' && { top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid', borderColor: 'primary.main' }), ...(pos === 'tr' && { top: 0, right: 0, borderTop: '1px solid', borderRight: '1px solid', borderColor: 'primary.main' }), ...(pos === 'bl' && { bottom: 0, left: 0, borderBottom: '1px solid', borderLeft: '1px solid', borderColor: 'primary.main' }), ...(pos === 'br' && { bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid', borderColor: 'primary.main' }) }} />
                  ))}

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 1, bgcolor: `${social.color}22`, border: `1px solid ${social.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon sx={{ fontSize: '1.5rem', color: social.color, filter: `drop-shadow(0 0 6px ${social.color})` }} />
                    </Box>
                    <OpenInNewIcon sx={{ fontSize: '0.8rem', color: 'rgba(0,229,255,0.3)' }} />
                  </Box>

                  <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '0.85rem', letterSpacing: '0.15em', fontFamily: '"Orbitron", sans-serif', mb: 0.5 }}>
                    {social.platform.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block', letterSpacing: '0.05em' }}>
                    {social.username}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Box>

        <Box component={motion.div as React.ElementType} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }} sx={{ mt: 4, p: 2, border: '1px solid rgba(0,229,255,0.1)', bgcolor: 'rgba(0,229,255,0.02)' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.2em' }}>
            Update links in{' '}
            <Box component="span" sx={{ color: 'primary.main', fontFamily: '"Share Tech Mono", monospace' }}>src/data/socials.ts</Box>
          </Typography>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

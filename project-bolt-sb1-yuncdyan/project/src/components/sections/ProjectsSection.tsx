import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTheme } from '@mui/material/styles';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import SectionWrapper from './SectionWrapper';
import type { SectionId } from '../../types';

const STATUS_COLORS: Record<Project['status'], string> = {
  'Completed': '#00ff41',
  'In Progress': '#ff9900',
  'Planned': '#00e5ff',
};

interface ProjectsSectionProps {
  onNavigate: (id: SectionId) => void;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
    >
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'rgba(0,229,255,0.2)',
          p: 2.5,
          bgcolor: 'rgba(0,229,255,0.03)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(0,229,255,0.07)', transform: 'translateY(-2px)', boxShadow: `0 8px 32px ${theme.palette.primary.main}22` },
        }}
      >
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <Box key={pos} sx={{ position: 'absolute', width: 10, height: 10, ...(pos === 'tl' && { top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid', borderColor: 'primary.main' }), ...(pos === 'tr' && { top: 0, right: 0, borderTop: '1px solid', borderRight: '1px solid', borderColor: 'primary.main' }), ...(pos === 'bl' && { bottom: 0, left: 0, borderBottom: '1px solid', borderLeft: '1px solid', borderColor: 'primary.main' }), ...(pos === 'br' && { bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid', borderColor: 'primary.main' }) }} />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.5rem', letterSpacing: '0.1em' }}>
            {project.id.toUpperCase()}
          </Typography>
          <Typography variant="caption" sx={{ color: STATUS_COLORS[project.status], fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', textShadow: `0 0 6px ${STATUS_COLORS[project.status]}` }}>
            {project.status.toUpperCase()}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ color: 'primary.main', fontSize: '1rem', letterSpacing: '0.1em', mb: 1 }}>
          {project.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.75rem', lineHeight: 1.6, mb: 2, flex: 1 }}>
          {project.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
          {project.technologies.map((tech) => (
            <Chip key={tech} label={tech} size="small" sx={{ bgcolor: 'rgba(0,229,255,0.08)', color: 'primary.main', border: '1px solid rgba(0,229,255,0.2)', fontSize: '0.55rem', height: 20, '& .MuiChip-label': { px: 0.75 } }} />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {project.githubUrl && (
            <IconButton size="small" href={project.githubUrl} target="_blank" rel="noopener noreferrer" sx={{ color: 'text.disabled', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 1, '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}>
              <GitHubIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          )}
          {project.liveDemoUrl && (
            <IconButton size="small" href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" sx={{ color: 'text.disabled', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 1, '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}>
              <OpenInNewIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}

export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const theme = useTheme();
  return (
    <SectionWrapper id="projects" title="PROJECTS" subtitle="Build Log // Project Registry" onNavigate={onNavigate}>
      <Box sx={{ px: { xs: 3, md: 6, lg: 10 }, py: { xs: 4, md: 6 } }}>
        <Box component={motion.div as React.ElementType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: '0.55rem', letterSpacing: '0.4em', display: 'block', mb: 1 }}>
            BUILD LOG
          </Typography>
          <Typography variant="h2" sx={{ color: 'primary.main', fontSize: { xs: '1.8rem', md: '2.5rem' }, letterSpacing: '0.15em', mb: 1, textShadow: `0 0 30px ${theme.palette.primary.main}66` }}>
            PROJECTS
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 5 }}>
            {projects.length > 0 ? `${projects.length} project${projects.length > 1 ? 's' : ''} in registry.` : 'Project registry is empty. Add your builds.'}
          </Typography>
        </Box>

        {projects.length > 0 ? (
          <Grid container spacing={3}>
            {projects.map((project, i) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ProjectCard project={project} index={i} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            component={motion.div as React.ElementType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{ border: '1px dashed rgba(0,229,255,0.2)', p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, maxWidth: 500 }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: '2.5rem', color: 'rgba(0,229,255,0.3)' }} />
            <Typography variant="h6" sx={{ color: 'text.disabled', fontSize: '0.8rem', letterSpacing: '0.2em', fontFamily: '"Orbitron", sans-serif' }}>
              NO PROJECTS LOGGED
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.7 }}>
              Add your projects to{' '}
              <Box component="span" sx={{ color: 'primary.main', fontFamily: '"Share Tech Mono", monospace' }}>
                src/data/projects.ts
              </Box>{' '}
              to populate this section.
            </Typography>
          </Box>
        )}
      </Box>
    </SectionWrapper>
  );
}

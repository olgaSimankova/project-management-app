import { Box, Button, Container, Typography } from '@mui/material';
import AboutUs from '../components/AboutUs/AboutUs';
import UsedTechnologies from 'components/UsedTechnologies/UsedTechnologies';
import React from 'react';
import { useTranslation } from 'react-i18next';
import bgLight from '../assets/img/bgLight.png';
import bgDark from '../assets/img/bgDark.png';
import { Theme } from '@mui/system';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';

export const Welcome = () => {
  const { theme, appTheme } = useUserSystemTheme();

  const createStyles = (currentTheme: Theme) => ({
    heroBG: {
      height: 680,
      backgroundImage: theme === 'light' ? `url(${bgLight})` : `url(${bgDark})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    heroWrapper: {
      maxWidth: 1400,
      margin: '0 auto',
      [currentTheme.breakpoints.down('md')]: {
        h1: {
          fontSize: '4rem',
        },
      },
      [currentTheme.breakpoints.between('xs', 'sm')]: {
        h1: {
          fontSize: '2.5rem',
        },
      },
    },
    sectionHeading: {
      [currentTheme.breakpoints.between('xs', 'sm')]: {
        fontSize: '2rem',
        mb: 2,
      },
    },
    teamAndTechnologiesWrapper: {
      maxWidth: 1400,
      margin: '0 auto',
    },
    heroContainer: {
      width: 800,
      minHeight: 150,
      [currentTheme.breakpoints.down('md')]: {
        width: '100%',
        marginBottom: 5,
      },
      [currentTheme.breakpoints.between('xs', 'sm')]: {
        h5: {
          fontSize: '1.3rem',
        },
      },
    },
    aboutUsCintainer: {
      maxWidth: 1150,
      m: 0,
      paddingTop: '2rem',
    },
  });

  const { t } = useTranslation();
  const styles = createStyles(appTheme as Theme);
  return (
    <main>
      <Container sx={styles.heroBG} maxWidth={false}>
        <Box sx={styles.heroWrapper}>
          <Typography variant="h1" gutterBottom>
            Project Management App
          </Typography>
          <Container sx={styles.heroContainer} maxWidth={false}>
            <Box sx={styles.heroContainer}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {t('welcomeHero')}
              </Typography>
            </Box>
            <Button variant="contained" onClick={() => localStorage.clear()}>
              {t('heroAboutBtn')}
            </Button>
          </Container>
        </Box>
      </Container>
      <Box sx={styles.teamAndTechnologiesWrapper}>
        <Container sx={styles.aboutUsCintainer} maxWidth={false}>
          <Typography variant="h2" sx={styles.sectionHeading}>
            {t('teamHeading')}
          </Typography>
          <AboutUs />
        </Container>
        <Container>
          <Typography variant="h2" sx={styles.sectionHeading}>
            {t('usedTechnologies')}
          </Typography>
          <UsedTechnologies />
        </Container>
      </Box>
    </main>
  );
};

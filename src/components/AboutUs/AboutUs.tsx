import { Container } from '@mui/material';
import React from 'react';
import sasha from '../../assets/img/sasha.jpg';
import dima from '../../assets/img/dima.jpg';
import aleh from '../../assets/img/aleh.jpg';
import olya from '../../assets/img/olya.jpg';
import { AboutUsElement } from 'components/AboutUsElement/AboutUsElement';

const AboutUs = () => {
  const createStyles = () => ({
    teamContainer: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
  });

  const styles = createStyles();

  const theBestDevelopersEver = ['Sasha', 'Dima', 'Olya', 'Aleh'];
  const avatars = [sasha, dima, olya, aleh];

  return (
    <Container sx={styles.teamContainer}>
      {theBestDevelopersEver.map((name, idx) => (
        <AboutUsElement key={name} name={name} avatar={avatars[idx]} revert={Boolean(idx % 2)} />
      ))}
    </Container>
  );
};

export default AboutUs;

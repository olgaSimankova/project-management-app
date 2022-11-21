import { Box, Card, CardContent, CardMedia, Container, Link, Typography } from '@mui/material';
import React from 'react';
import reactIcon from '../../assets/icons/ReactIcon.png';
import TSIcon from '../../assets/icons/TSLogo.png';
import ReactRouterIcon from '../../assets/icons/ReactRouter.png';
import ReduxIcon from '../../assets/icons/redux.svg';
import MUIIcon from '../../assets/icons/materialUI.svg';
import i18nextIcon from '../../assets/icons/i18nextLogo.png';
import ReactHookFormIcon from '../../assets/icons/ReactHookForm.png';

interface iTechnology {
  name: string;
  link: string;
  icon: string;
}

const technologiesData: iTechnology[] = [
  {
    name: 'React',
    link: 'https://reactjs.org/',
    icon: `${reactIcon}`,
  },
  {
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    icon: `${TSIcon}`,
  },
  {
    name: 'React Router',
    link: 'https://reactrouter.com/en/main',
    icon: `${ReactRouterIcon}`,
  },
  {
    name: 'Redux Toolkit',
    link: 'https://react-redux.js.org/',
    icon: `${ReduxIcon}`,
  },
  {
    name: 'Material UI',
    link: 'https://mui.com/',
    icon: `${MUIIcon}`,
  },
  {
    name: 'i18next',
    link: 'https://www.i18next.com/',
    icon: `${i18nextIcon}`,
  },
  {
    name: 'React Hook Form',
    link: 'https://react-hook-form.com/',
    icon: `${ReactHookFormIcon}`,
  },
];

const UsedTechnologies = () => {
  const styles = {
    container: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      paddingTop: 2,
      justifyContent: 'center',
    },
    item: {
      minWidth: '12rem',
      minHeight: '8rem',
      paddingTop: 2,
    },
    image: {
      margin: '0 auto',
      width: 'auto',
      height: '8rem',
      paddingBottom: '1rem',
    },
  };

  return (
    <Container sx={styles.container}>
      {technologiesData.map((item) => (
        <Box key={item.name}>
          <Link href={item.link} target="_blank" underline="hover">
            <Card sx={styles.item} variant="outlined">
              <CardMedia sx={styles.image} component="img" image={item.icon} title="React" />
              <CardContent sx={{ padding: '5px 5px 5px 5px' }}>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Box>
      ))}
    </Container>
  );
};

export default UsedTechnologies;

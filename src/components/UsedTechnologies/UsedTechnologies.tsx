import { Card, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import reactIcon from '../../assets/icons/ReactIcon.png';
import TSIcon from '../../assets/icons/TSLogo.png';
import ReactRouterIcon from '../../assets/icons/ReactRouter.png';
import ReduxIcon from '../../assets/icons/redux.svg';
import MUIIcon from '../../assets/icons/materialUI.svg';
import i18nextIcon from '../../assets/icons/i18nextLogo.png';
import ReactHookFormIcon from '../../assets/icons/ReactHookForm.png';

const UsedTechnologies = () => {
  const styles = {
    container: {
      padding: 20,
      justifyContent: 'center',
    },
    root: {
      maxWidth: 345,
      minHeight: 240,
      margin: '0 auto',
      padding: '1em',
    },
  };

  return (
    <>
      <Grid container spacing={2} style={styles.container}>
        <Grid item lg={2}>
          <Link href="https://reactjs.org/" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={reactIcon} title="React" />
              <CardContent>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  React
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item lg={2}>
          <Link href="https://www.typescriptlang.org/" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={TSIcon} title="React" />
              <CardContent>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  TypeScript
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item lg={2}>
          <Link href="https://reactrouter.com/en/main" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={ReactRouterIcon} title="React" />
              <CardContent>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  React Router
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item lg={2}>
          <Link href="https://react-redux.js.org/" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={ReduxIcon} title="React" />
              <CardContent style={{ paddingInline: 0 }}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  Redux Toolkit
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item lg={2}>
          <Link href="https://mui.com/" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={MUIIcon} title="React" />
              <CardContent>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  Material UI
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item lg={2}>
          <Link href="https://www.i18next.com/" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={i18nextIcon} title="React" />
              <CardContent>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  i18next
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item lg={2}>
          <Link href="https://react-hook-form.com/" target="_blank" underline="hover">
            <Card style={styles.root} variant="outlined">
              <CardMedia component="img" image={ReactHookFormIcon} title="React" />
              <CardContent style={{ paddingInline: 0 }}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  React Hook Form
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default UsedTechnologies;

import { Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            {/* <TopSellingTable /> */}
            {/* <StatCards2 /> */}

            {/* <H4>Ongoing Projects</H4> */}
            {/* <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
          <StatCards2 />


            {/* <UpgradeCard />
            <Campaigns /> */}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;

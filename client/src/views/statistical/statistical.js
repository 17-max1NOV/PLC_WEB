import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Grid, Box } from '@mui/material';
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from '../dashboard/components/YearlyBreakup';
import MonthlyEarnings from '../dashboard/components/MonthlyEarnings';
import PlanStaticcal from './components/planStatical';


const Statiscal = () => {
  return (
    <div>
      <DashboardCard title="Thống kê">
        <PageContainer title="Dashboard" description="this is Dashboard">
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <SalesOverview />
              </Grid>
              {/* <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <YearlyBreakup />
                  </Grid>
                  <Grid item xs={12}>
                    <MonthlyEarnings />
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <PlanStaticcal />
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid> */}

            </Grid>
          </Box>
        </PageContainer>
      </DashboardCard>
    </div>

  );
};

export default Statiscal;

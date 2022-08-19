// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import  AnalyticsWebsiteVisits  from '../../sections/@dashboard/alterChartResources/AnalyticsWebsiteVisits';
import  AnalyticsWidgetSummary from '../../sections/@dashboard/alterChartResources/AnalyticsWidgetSummary';
import  AppCurrentDownload  from '../../sections/@dashboard/alterChartResources/AppCurrentDownload';
import  BookingTotalIncomes  from '../../sections/@dashboard/alterChartResources/BookingTotalIncomes';
import  EcommerceWidgetSummary  from '../../sections/@dashboard/chartResources/EcommerceWidgetSummary';

// ----------------------------------------------------------------------

GeneralAnalytics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="年度运营额" total={71400000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="年度用户增长量" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="年度周转量"
              total={1723315}
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="年度利润率" total={23.4} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="项目结算"
              chartColors={[
                theme.palette.primary.lighter,
                theme.palette.primary.light,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
              chartData={[
                { label: '预付款', value: 72244 },
                { label: '中期款', value: 73345 },
                { label: '尾款', value: 74313 },
                { label: '维护费用', value: 32244 },
              ]}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="用户及合作商数量"
              subheader="较上年度增长43%"
              chartLabels={[
                '01/02/2022',
                '02/02/2022',
                '03/02/2022',
                '04/02/2022',
                '05/02/2022',
                '06/02/2022',
                '07/02/2022',
                '08/02/2022',
                '09/02/2022',
                '10/02/2022',
                '11/02/2022',
                '12/02/2022',
              ]}
              chartData={[
                {
                  name: '合作商数量',
                  type: 'column',
                  fill: 'solid',
                  data: [10, 11, 20, 40, 45, 50, 52, 60, 67, 75, 100, 150],
                },
                {
                  name: '用户数量',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 25, 100, 150, 175, 180, 200, 230, 270, 300, 350, 420],
                },
              ]}
            />
          </Grid>



          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="周装箱使用率"
              subheader="较行业标准提高26%"
              chartLabels={[
                '01/02/2012',
                '02/02/2013',
                '03/02/2014',
                '04/02/2015',
                '05/02/2016',
                '06/02/2017',
                '07/02/2018',
                '08/02/2019',
                '09/02/2020',
                '10/02/2021',
                '11/02/2022',
              ]}
              chartData={[
                {
                  name: '公司周转箱使用率',
                  type: 'area',
                  fill: 'gradient',
                  data: [55, 57, 60, 65, 70, 82, 83, 85, 87, 90, 91],
                },
                {
                  name: '行业平均周转箱使用率',
                  type: 'area',
                  fill: 'gradient',
                  data: [50, 52, 52.5, 55, 56, 56, 57, 62, 65, 65, 65],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
          <EcommerceWidgetSummary
              title="2022年年度支出"
              percent={-0.1}
              total={18765}
              chartColor={theme.palette.chart.green[0]}
              chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68, 24, 67]}
            />
            <br />
            <BookingTotalIncomes total={98765} percent={2.6} chartData={[111, 136, 76, 108, 74, 54, 57, 84, 74, 54, 57, 84]} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

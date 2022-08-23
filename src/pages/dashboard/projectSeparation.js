// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Stack, Divider, Autocomplete, TextField ,Button} from '@mui/material';
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
  const projectChoice = [
    { label: '项目1', year: 1994 },
    { label: '项目2', year: 1972 },
  ];
  const customerChoice = [
    { label: '客户1', year: 1994 },
    { label: '客户2', year: 1972 },
  ];
  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          项目分离
        </Typography> */}

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
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
          </Grid> */}
          <Grid item xs={12} md={6} lg={12}>
            <Card sx={{ py: 3 }}>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
                        <Stack width={1} textAlign="center">
                            <Typography variant="h4">项目查看</Typography>
                            <Typography variant="body2" sx={{ mb: 3,p:3}}>
                                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
                                    <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={projectChoice}
                                            sx={{ width: 350 }}
                                            renderInput={(params) => <TextField {...params} label="项目名" 
                                            />}
                                        />
                                    <Button type="submit" variant="contained" sx={{ width: 100 }}>
                                        {'查看'}
                                    </Button>
                                    <Button type="submit" variant="contained" sx={{ width: 100 }}>
                                        {'重置'}
                                    </Button>
                                </Stack>
                            </Typography>
                        </Stack>

                        <Stack width={1} textAlign="center">
                            <Typography variant="h4">项目创建</Typography>
                            <Typography variant="body2" sx={{ mb: 3,p:3}}>
                                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
                                    <TextField name="projectName" label="项目名称" sx={{ width: 300 }}/>
                                    <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={customerChoice}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="客户名称" 
                                            />}
                                        />
                                    <Button type="submit" variant="contained" sx={{ width: 100 }}>
                                        {'提交'}
                                    </Button>
                                </Stack>
                            </Typography>
                        </Stack>
                    </Stack>
                </Card>
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
              title="项目周转情况"
              subheader="项目相关周转单完成情况"
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
                  name: '新增周转单',
                  type: 'area',
                  fill: 'gradient',
                  data: [10, 11, 20, 40, 45, 50, 52, 60, 67, 75, 100, 150],
                },
                {
                  name: '已完成周转单',
                  type: 'area',
                  fill: 'gradient',
                  data: [23, 25, 100, 150, 175, 180, 200, 230, 270, 300, 350, 420],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

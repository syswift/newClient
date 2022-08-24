// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Autocomplete, TextField } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
// sections
import  AnalyticsWebsiteVisits  from '../../../sections/@dashboard/alterChartResources/AnalyticsWebsiteVisits';
import  AppCurrentDownload  from '../../../sections/@dashboard/alterChartResources/AppCurrentDownload';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../api';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingScreen from '../../../components/LoadingScreen'; //import载入画面
  // routes
  import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------

ProjectDataView.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProjectDataView() {
  const theme = useTheme();

  const { themeStretch } = useSettings();
  const [ PROJECTS , setPROJECTS ] = useState([]);
  const [ CUSTOMERS , setCUSTOMERS ] = useState([]);
  const [ projectChoice , setprojectChoice ] = useState([]);

  const [ customerChoice , setcustomerChoice ] = useState([]);

  const [isInitialized, setisInitialized] = useState(true); 

  useEffect(()=>{
    async function fetchData()
    {
      setisInitialized(false);

      const processPer = supabase.auth.user().id;
      const all = await supabase.from('project').select();
      //console.log(all.data);

      setPROJECTS(all.data);

      const temp = [];
      for(const project of all.data)
      {     
        temp.push(project.projectName);
      }
      setprojectChoice(temp);

      const all2 = await supabase.from('customer').select();
      //console.log(all.data);

      setCUSTOMERS(all2.data);

      const temp2 = [];
      for(const customer of all2.data)
      {     
        temp2.push(customer.customerId);
      }
      setcustomerChoice(temp2);

      setisInitialized(true);
    }
    fetchData();
  },[]);

  const submitProject = async () =>{
    const projectSelected = document.getElementById('project').value;

    console.log(projectSelected);

    const id = supabase.auth.user().id;

    try {
      const{data, error} = await supabase.from('profiles').update({currentProject: projectSelected}).match({id: id});

      if(error) throw error;
      else{
        alert('选择成功');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const leaveProject = async () =>{

    const id = supabase.auth.user().id;

    try {
      const{data, error} = await supabase.from('profiles').update({currentProject:''}).match({id: id});

      if(error) throw error;
      else{
        alert('离开项目成功');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  else{
  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <HeaderBreadcrumbs
          heading="项目数据"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '查看项目'},
          ]}
          action={
            <Autocomplete
            //disablePortal
            id="combo-box-demo"
            options={projectChoice}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="项目名" 
            />}
        />
          }
        />
        <Grid container spacing={3}>
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
}

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
  const [ projectChoice , setprojectChoice ] = useState([]);

  const [ allTrans , setallTrans ] = useState([]);
  const [ newTrans , setnewTrans ] = useState([]);

  const [isInitialized, setisInitialized] = useState(true); 

  useEffect(()=>{
    async function fetchData()
    {
      setisInitialized(false);

      const processPer = supabase.auth.user().id;
      const all = await supabase.from('project').select();
      //console.log(all.data);

      const temp = [];
      for(const project of all.data)
      {     
        temp.push(project.projectName);
      }
      setprojectChoice(temp);


      setisInitialized(true);
      submitProject();
    }
    fetchData();
  },[]);

  const submitProject = async (event, values) =>{

    setPROJECTS(values);
    //console.log(values);

    let all = [];
    setisInitialized(false);
    if(values)
    {
      all = await supabase.from('trans').select().match({
        projectName: values
      });
    }
    else{
      all = await supabase.from('trans').select();
    }
    setisInitialized(true);

    const temp1 = [];

    for(const tran of all.data)
    {
      if(tran.transState === true) temp1.push(tran);
    }
    console.log(temp1.length);
    console.log(all.data.length);
    setnewTrans(temp1);
    setallTrans(all.data);
    
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
            value={PROJECTS === [] ? null : PROJECTS}
            options={projectChoice}
            onChange={submitProject}
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
                  data: [Math.ceil(newTrans.length*0.25),
                    Math.ceil(newTrans.length*0.37), 
                    Math.ceil(newTrans.length*0.43), 
                    Math.ceil(newTrans.length*0.54), 
                    Math.ceil(newTrans.length*0.6), 
                    Math.ceil(newTrans.length*0.65), 
                    Math.ceil(newTrans.length*0.7), 
                    Math.ceil(newTrans.length*0.75), 
                    Math.ceil(newTrans.length*0.8), 
                    Math.ceil(newTrans.length*0.85), 
                    Math.ceil(newTrans.length*0.9), 
                        newTrans.length],
                },
                {
                  name: '所有周转单',
                  type: 'area',
                  fill: 'gradient',
                  data: [Math.ceil(allTrans.length*0.25),
                    Math.ceil(allTrans.length*0.3), 
                    Math.ceil(allTrans.length*0.4), 
                    Math.ceil(allTrans.length*0.5), 
                    Math.ceil(allTrans.length*0.6), 
                    Math.ceil(allTrans.length*0.65),
                    Math.ceil(allTrans.length*0.7), 
                    Math.ceil(allTrans.length*0.75), 
                    Math.ceil(allTrans.length*0.8), 
                    Math.ceil(allTrans.length*0.85),
                    Math.ceil(allTrans.length*0.9), 
                        allTrans.length],
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

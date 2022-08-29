import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// @mui
import {
  Container,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import {fetchTable} from '../../../../../../api/fetchTable';
import LoadingScreen from '../../../../../components/LoadingScreen';
import CustomerViewForm from './customerViewForm'


NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
NewSupplier.prototype = {
    
}

// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const [cus, setcus] = useState({});
  const [isInitialized, setisInitialized] = useState(true);


  useEffect(()=>{
    
    async function fetchData()
    {
      setisInitialized(false);
      //获得当前用户
      const all = await fetchTable('customer',id);
      console.log('以下为打印的数据');
      console.log(all);
      console.log('以上为打印的数据');
      setcus(all.data);

      setisInitialized(true);
    }

    fetchData();
    
    },[]);

  

    if (!isInitialized) {
      return <LoadingScreen />;
    }

    else{
    return ( 
      <Page title="查看信息">
        <Container maxWidth={themeStretch ? false : 'lg'}>
        
          <HeaderBreadcrumbs
            heading="查看信息"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '基础配置', href: PATH_DASHBOARD.root },
              { name: '客户信息', href: PATH_DASHBOARD.basicConfiguration.customerInformation },
              { name: '查看信息' },
            ]}
          />
          <CustomerViewForm />
        </Container>
      </Page>
    );
    }
}

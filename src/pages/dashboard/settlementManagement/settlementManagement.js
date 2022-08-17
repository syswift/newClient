// @mui
import {
    Card,
    Container,
  } from '@mui/material';
  // routes
  import { PATH_DASHBOARD } from '../../../routes/paths';
  // hooks
  import useSettings from '../../../hooks/useSettings';
  // layouts
  import Layout from '../../../layouts';
  // components
  import Page from '../../../components/Page';
  import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
  
  SettlementManagement.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function SettlementManagement() {
    const { themeStretch } = useSettings();
    return (
      <Page title="结算管理">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="结算管理"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '结算管理' },
              { name: '结算管理' },
            ]}
          />
          <Card>
              <div>1</div>
          </Card>
        </Container>
      </Page>
    );
  }
  
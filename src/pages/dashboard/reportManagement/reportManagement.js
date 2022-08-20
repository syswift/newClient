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
  
  ReportManagement.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function ReportManagement() {
    const { themeStretch } = useSettings();
    return (
      <Page title="报表管理">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="报表管理"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '报表管理', href: PATH_DASHBOARD.reportManagement.reportManagement},
              { name: '报表管理' },
            ]}
          />
          <Card>
              <div>1</div>
          </Card>
        </Container>
      </Page>
    );
  }
  
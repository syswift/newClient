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
  
  TerminalCustomerInformation.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function TerminalCustomerInformation() {
    const { themeStretch } = useSettings();
    return (
      <Page title="终端客户信息">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="终端客户信息"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '基础配置' },
              { name: '终端客户信息' },
            ]}
          />
          <Card>
              <div>1</div>
          </Card>
        </Container>
      </Page>
    );
  }
  
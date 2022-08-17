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
  
  SupplierSupply.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function SupplierSupply() {
    const { themeStretch } = useSettings();
    return (
      <Page title="供应商来货">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="供应商来货"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '库存管理' },
              { name: '供应商来货' },
            ]}
          />
          <Card>
              <div>1</div>
          </Card>
        </Container>
      </Page>
    );
  }
  
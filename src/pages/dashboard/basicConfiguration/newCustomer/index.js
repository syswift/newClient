// @mui
  import Container from '@mui/material/Container';
  // routes
  import { PATH_DASHBOARD } from '../../../../routes/paths';
  // hooks
  import useSettings from '../../../../hooks/useSettings';
  // layouts
  import Layout from '../../../../layouts';
  // components
  import Page from '../../../../components/Page';
  import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

  import NewCustomerForm from './newCustomerForm';
  
  NewCustomer.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function NewCustomer() {
    const { themeStretch } = useSettings();
    return (
      <Page title="新增客户">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="新增客户"
            links={[
              { name: '基础配置', href: PATH_DASHBOARD.root },
              { name: '客户管理', href: PATH_DASHBOARD.basicConfiguration.customerInformation },
              { name: '新增客户' },
            ]}
          />
          <NewCustomerForm />
        </Container>
      </Page>
    );
  }
  
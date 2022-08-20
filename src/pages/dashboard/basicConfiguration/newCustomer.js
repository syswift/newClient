// @mui
  import Card from '@mui/material/Card';
  import Container from '@mui/material/Container';
  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import Select from '@mui/material/Select';
  import Stack from '@mui/material/Stack';
  import Button from '@mui/material/Button';
  // routes
  import { PATH_DASHBOARD } from '../../../routes/paths';
  // hooks
  import useSettings from '../../../hooks/useSettings';
  // layouts
  import Layout from '../../../layouts';
  // components
  import Page from '../../../components/Page';
  import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

  import InvoiceNewEditForm from '../../../sections/@dashboard/basicConfiguration/newCustomerForm';
  
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
          <InvoiceNewEditForm />
        </Container>
      </Page>
    );
  }
  
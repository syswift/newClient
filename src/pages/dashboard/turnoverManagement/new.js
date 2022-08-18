// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import  TransNewEditForm from '../../../sections/@dashboard/trans/new-edit-form';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="新增周转单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增周转单"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '周转管理', herf: PATH_DASHBOARD.turnoverManagement.root },
            { name: '周转单管理', herf: PATH_DASHBOARD.turnoverManagement.turnoverOrderManagement },
            { name: '周转单创建', herf: PATH_DASHBOARD.turnoverManagement.new }
          ]}
        />

        <TransNewEditForm />
      </Container>
    </Page>
  );
}

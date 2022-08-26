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

import NewSupplierForm from './newSupplierForm';

NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增供应商">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增供应商"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '基础配置', href: PATH_DASHBOARD.root },
            { name: '供应商信息', href: PATH_DASHBOARD.basicConfiguration.supplierInformation },
            { name: '新增供应商' },
          ]}
        />
        <NewSupplierForm />
      </Container>
    </Page>
  );
}

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
import NewSupplyForm from './newSupplyForm';

NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增来货信息">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增来货信息"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '周转管理', href: PATH_DASHBOARD.root },
            { name: '供应商来货', href: PATH_DASHBOARD.turnoverManagement.supplierSupply },
            { name: '新增来货信息' },
          ]}
        />
        <NewSupplyForm />
      </Container>
    </Page>
  );
}

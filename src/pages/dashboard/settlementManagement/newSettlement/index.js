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
import NewSettlementForm from './newSettlementForm';

NewWorkOrderForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewWorkOrderForm() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增结算">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增结算"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '结算管理', href: PATH_DASHBOARD.root },
            { name: '结算管理', href: PATH_DASHBOARD.settlementManagement.settlementManagement1 },
            { name: '新增结算' },
          ]}
        />
        <NewSettlementForm />
      </Container>
    </Page>
  );
}

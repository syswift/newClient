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
import NewReportForm from './newReportForm';

NewReport.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewReport() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增报表">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增报表"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '报表管理', href: PATH_DASHBOARD.root },
            { name: '报表管理', href: PATH_DASHBOARD.reportManagement.reportManagement },
            { name: '新增报表' },
          ]}
        />
        <NewReportForm />
      </Container>
    </Page>
  );
}

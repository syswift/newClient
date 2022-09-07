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

import AskForLeaveForm from './askForLeaveForm';

AskForLeave.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function AskForLeave() {
  const { themeStretch } = useSettings();
  return (
    <Page title="请假申请">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="请假申请"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '审批管理', href: PATH_DASHBOARD.root },
            { name: '请假申请' },
          ]}
        />
        <AskForLeaveForm />
      </Container>
    </Page>
  );
}

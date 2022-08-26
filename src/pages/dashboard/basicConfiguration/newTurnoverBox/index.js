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
import NewTurnoverBoxForm from './newTurnoverBoxForm';

NewTurnoverBox.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewTurnoverBox() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增周转箱">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增周转箱"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '基础配置', href: PATH_DASHBOARD.root },
            { name: '周转箱信息', href: PATH_DASHBOARD.basicConfiguration.turnoverBoxInformation },
            { name: '新增周转箱' },
          ]}
        />
        <NewTurnoverBoxForm />
      </Container>
    </Page>
  );
}

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
  
  ChangeUserInformation.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function ChangeUserInformation() {
    const { themeStretch } = useSettings();
    return (
      <Page title="编辑信息">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="编辑信息"
            links={[
              { name: '系统管理', href: PATH_DASHBOARD.root },
              { name: '用户管理', href: PATH_DASHBOARD.systemManagement.userManagement },
              { name: '编辑信息', href: PATH_DASHBOARD.systemManagement.changeUserInformation },
            ]}
          />
          <Card>
              <div>1</div>
          </Card>
        </Container>
      </Page>
    );
  }
  
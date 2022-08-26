// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useLocales from '../../../hooks/useLocales';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { translate } = useLocales();

  const { themeStretch } = useSettings();

  return (
    <Page title="用户: 创建新用户">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('CNU')}
          links={[
            { name: (translate('main.Dashboard')), href: PATH_DASHBOARD.root },
            { name: (translate('main.User')), href: PATH_DASHBOARD.user.list },
            { name: (translate('NU')) },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </Page>
  );
}

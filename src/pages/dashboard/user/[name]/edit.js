import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from '../../../../hooks/useLocales';
// _mock_
import { _userList } from '../../../../_mock';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();

  const { query } = useRouter();

  const { name } = query;

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="用户: 编辑">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('EU')}
          links={[
            { name: (translate('main.Dashboard')), href: PATH_DASHBOARD.root },
            { name: (translate('main.User')), href: PATH_DASHBOARD.user.list },
            { name: capitalCase(name) },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  );
}

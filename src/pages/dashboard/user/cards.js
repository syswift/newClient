// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userCards } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { UserCard } from '../../../sections/@dashboard/user/cards';
//hooks
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

UserCards.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();

  return (
    <Page title="用户: 用户名片">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('UC')}
          links={[
            { name: (translate('main.Dashboard')), href: PATH_DASHBOARD.root },
            { name: (translate('main.User')), href: PATH_DASHBOARD.user.root },
            { name: (translate('cards')) },
          ]}
        />

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {_userCards.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}

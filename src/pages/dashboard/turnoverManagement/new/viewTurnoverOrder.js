import PropTypes from 'prop-types';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

ViewTurnoverOrder.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
ViewTurnoverOrder.prototype = {
    row: PropTypes.object.isRequired
}
// ----------------------------------------------------------------------

export default function ViewTurnoverOrder() {
  const { themeStretch } = useSettings();
  return (
    <Page title="查看周转单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="查看周转单"
          links={[
            { name: '周转管理', href: PATH_DASHBOARD.root },
            { name: '周转单管理', href: PATH_DASHBOARD.turnoverManagement.turnoverManagement },
            { name: '查看周转单' },
          ]}
        />
        <Card>
            <div>1</div>
        </Card>
      </Container>
    </Page>
  );
}

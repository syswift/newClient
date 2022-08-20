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

import NewTerminalCustomerForm from '../../../sections/@dashboard/basicConfiguration/newTerminalCustomerForm';

NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增终端客户">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增终端客户"
          links={[
            { name: '基础配置', href: PATH_DASHBOARD.root },
            { name: '终端客户信息', href: PATH_DASHBOARD.basicConfiguration.terminalCustomerInformation },
            { name: '新增终端客户' },
          ]}
        />
        <NewTerminalCustomerForm />
      </Container>
    </Page>
  );
}

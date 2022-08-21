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

NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
NewSupplier.prototype = {
    
}
// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();
  return (
    <Page title="绑定终端">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="绑定终端"
          links={[
            { name: '基础配置', href: PATH_DASHBOARD.root },
            { name: '终端客户信息', href: PATH_DASHBOARD.basicConfiguration.customerInformation },
            { name: '绑定终端' },
          ]}
        />
        <Card>
            <div>1</div>
        </Card>
      </Container>
    </Page>
  );
}

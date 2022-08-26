// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import NewWorkOrderForm from './newWorkOrderForm';
NewCustomer.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewCustomer() {
  const { themeStretch } = useSettings();
  const dataStateChoice = [
    { label: '完成', value: '完成' },
    { label: '新增', value: '新增' },
  ]
  const jobTypeChoice = [
    { label: '正常', value: '正常' },
    { label: '报废', value: '报废' },
  ]
  return (
    <Page title="新增工单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增工单"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '工单管理', href: PATH_DASHBOARD.root },
            { name: '工单管理', href: PATH_DASHBOARD.workOrderManagement.workOrderManagement1 },
            { name: '新增工单' },
          ]}
        />
        <NewWorkOrderForm />
      </Container>
    </Page>
  );
}

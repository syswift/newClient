// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

NewCustomer.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewCustomer() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增工单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增工单"
          links={[
            { name: '工单管理', href: PATH_DASHBOARD.root },
            { name: '工单管理', href: PATH_DASHBOARD.workOrderManagement.workOrderManagement1 },
            { name: '新增工单' },
          ]}
        />
        <Card>
          <br />
          <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                p: 3
              }}
            >
              <TextField name="jobNumber" label="工单单号" />
              <TextField name="customerCode" label="客户名称" />

              <Select name="dataState" label="工单状态" placeholder="">
              <MenuItem value='完成'>完成</MenuItem>
                <MenuItem value='新增'>新增</MenuItem>
              </Select>
              <Select name="jobType" label="工单类型" placeholder="">
                <MenuItem value='正常'>正常</MenuItem>
                <MenuItem value='报废'>报废</MenuItem>
              </Select>

              <TextField name="jobAddition" label="工单备注" />
              <TextField name="createTime" label="创建时间" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button type="submit" variant="contained">
                {'提交'}
              </Button>
            </Stack>
            <br />
        </Card>
      </Container>
    </Page>
  );
}

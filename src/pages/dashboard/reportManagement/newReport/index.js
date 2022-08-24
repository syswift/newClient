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
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';


NewReport.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewReport() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增报表">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增报表"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '报表管理', href: PATH_DASHBOARD.root },
            { name: '报表管理', href: PATH_DASHBOARD.reportManagement.reportManagement },
            { name: '新增报表' },
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
              <TextField name="reportCode" label="报表单号" />
              <TextField name="reportNumber" label="报表代码" />

              <TextField name="note" label="备注" />
              <TextField name="operationPerson" label="操作人" />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" >
                {'提交'}
              </Button>
            </Stack>
            <br />
        </Card>
      </Container>
    </Page>
  );
}

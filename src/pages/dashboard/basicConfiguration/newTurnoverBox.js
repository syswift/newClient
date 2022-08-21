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


NewTurnoverBox.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewTurnoverBox() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增周转箱">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增周转箱"
          links={[
            { name: '基础配置', href: PATH_DASHBOARD.root },
            { name: '周转箱信息', href: PATH_DASHBOARD.basicConfiguration.turnoverBoxInformation },
            { name: '新增周转箱' },
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
              <TextField name="ID" label="编号" />
              <TextField name="putDate" label="入库时间" />

              <TextField name="outDate" label="出库时间" />
              <Select name="inWarehouse" label="是否在库" placeholder="">
                <MenuItem value='在库'>在库</MenuItem>
                <MenuItem value='不在库'>不在库</MenuItem>
              </Select>

              <TextField name="sentDate" label="租期" />
              <TextField name="status" label="类别" />
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

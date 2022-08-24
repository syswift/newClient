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


NewTurnoverBox.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewTurnoverBox() {
  const supplyChoice = [
    { label: '供应商1', value: '供应商1' },
    { label: '供应商2', value: '供应商2' },
  ]
  const { themeStretch } = useSettings();
  return (
    <Page title="新增周转箱">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增周转箱"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
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
              <TextField name="ID" label="编号" sx={{ width: '100%' }}/>
              <Autocomplete
                // disablePortal
                id="supply"
                options={supplyChoice}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="供应商" />}
              />

              <TextField name="boxName" label="箱子名称" />
              <TextField name="creatTime" label="创建时间" disabled/>
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

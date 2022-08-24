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
import { supabase } from '../../../../api';


NewTurnoverBox.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewTurnoverBox() {
  const { themeStretch } = useSettings();

  const onSubmit = async () => {
    const boxId = document.getElementById('ID').value;
    const boxName = document.getElementById('name').value;
    const supId = document.getElementById('sup').value;

    //console.log(boxId,boxName,supId);

    try {
      const error = await supabase.from('boxInfo').insert({
        boxId: boxId,
        supplierId: supId,
        boxName: boxName
      });

      if(error) throw error;
      else alert('创建成功');
    } catch (error) {
      console.log(error);
    }
  }
  
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
          <form autoComplete="on" onSubmit={onSubmit}>
          <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                p: 3
              }}
            >
              <TextField id="boxId" label="编号" />
              <TextField id="createDate" label="创建时间" />
              <TextField id="supId" label="供应商" />
              <TextField id="boxName" label="箱子名称" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3,mx: 3}}>
              <Button type="submit" variant="contained">
                {'提交'}
              </Button>
            </Stack>
          </form>
        <br />
        </Card>    
      </Container>
    </Page>
  );
}

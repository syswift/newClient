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


NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增来货信息">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增来货信息"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '周转管理', href: PATH_DASHBOARD.root },
            { name: '供应商来货', href: PATH_DASHBOARD.turnoverManagement.supplierSupply },
            { name: '新增来货信息' },
          ]}
        />
        <Card>
          <br />
          <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 4,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                p: 3
              }}
            >
              <TextField name="goodsCode" label="商品代码" />
              <TextField name="supplierCode" label="供应商代码" />

              <TextField name="supplierName" label="供应商名称" />
              <TextField name="companyCode" label="公司编码" />

              <TextField name="turnoverBoxCode" label="周转箱代码" />
              <TextField name="turnoverBoxNmae" label="周转箱名称" />

              <TextField name="supplyNumber" label="数量" />
              <TextField name="createTime" label="操作时间" disabled/>
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

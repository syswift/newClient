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
  
  NewCustomer.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function NewCustomer() {
    const { themeStretch } = useSettings();
    return (
      <Page title="新增客户">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="新增客户"
            links={[
              { name: '基础配置', href: PATH_DASHBOARD.root },
              { name: '客户管理', href: PATH_DASHBOARD.customerInformation },
              { name: '新增客户' },
            ]}
          />
          <Card>
            <br />
            <Box
                sx={{
                  display: 'grid',
                  columnGap: 3,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField name="customerCode" label="客户代码" />
                <TextField name="customerName" label="客户名称" />
                <TextField name="companyCode" label="公司编码" />

                <Select name="dataState" label="状态" placeholder="">
                  <option value="正常" />
                  <option value="暂不可用" />
                </Select>

                <TextField name="province" label="省" />
                <TextField name="city" label="市" />
                <TextField name="district" label="区" />
                <TextField name="address" label="地址" />
                <TextField name="country" label="国家" />
                <TextField name="countryCode" label="国家代码" />
                <TextField name="contact1" label="联系人1" />
                <TextField name="position1" label="职位1" />
                <TextField name="phone1" label="联系方式1" />
                <TextField name="email1" label="邮箱1" />
                <TextField name="contact2" label="联系人2" />
                <TextField name="position2" label="职位2" />
                <TextField name="phone2" label="联系方式2" />
                <TextField name="email2" label="邮箱2" />
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
  
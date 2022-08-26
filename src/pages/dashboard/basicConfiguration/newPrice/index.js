// @mui
import Container from '@mui/material/Container';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import NewPriceForm from './newPriceForm';


NewPrice.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function NewPrice() {
  const { themeStretch } = useSettings();
  return (
    <Page title="新增价格信息">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新增价格信息"
          links={[
            { name: '基础配置', href: PATH_DASHBOARD.root },
            { name: '价格信息', href: PATH_DASHBOARD.basicConfiguration.priceInformation },
            { name: '新增价格信息' },
          ]}
        />
        <NewPriceForm />
      </Container>
    </Page>
  );
}

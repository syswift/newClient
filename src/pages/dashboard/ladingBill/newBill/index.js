// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import NewBillForm from '../../../../sections/@dashboard/landBill/newBillForm';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();


  return (
    <Page title="新建提单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="新建提单"
          links={[
            { name: "主页", href: PATH_DASHBOARD.root },
            { name: "提单管理", href: PATH_DASHBOARD.ladingBill.newBill },
            { name: "新建提单" },
          ]}
        />
        <NewBillForm />
      </Container>
    </Page>
  );
}

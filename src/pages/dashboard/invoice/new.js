// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useLocales from '../../../hooks/useLocales';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();

  return (
    <Page title={"发票: 创建新发票"}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('main.CreateNew')}
          links={[
            { name: (translate('main.Dashboard')), href: PATH_DASHBOARD.root },
            { name: (translate('main.Invoice')), href: PATH_DASHBOARD.invoice.list },
            { name: (translate('main.New')) },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </Page>
  );
}

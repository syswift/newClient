// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from '../../../../hooks/useLocales';
// layouts
import Layout from '../../../../layouts';
// _mock_
import { _invoices } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

InvoiceEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();

  const { query } = useRouter();

  const { id } = query;

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="发票: 编辑">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('main.Edit')+" : "+translate('main.Invoice')}
          links={[
            { name: (translate('main.Dashboard')), href: PATH_DASHBOARD.root },
            { name: (translate('main.Invoice')), href: PATH_DASHBOARD.invoice.list },
            { name: `INV-${currentInvoice?.invoiceNumber}` || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </Page>
  );
}

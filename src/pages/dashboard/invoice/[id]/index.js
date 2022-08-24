// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../_mock';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from '../../../../hooks/useLocales';

// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import Invoice from '../../../../sections/@dashboard/invoice/details';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { translate } = useLocales();

  const { id } = query;

  const invoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="发票: 查询">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('main.Detail')}
          links={[
            { name: (translate('main.Dashboard')), href: PATH_DASHBOARD.root },
            {
              name: (translate('main.Invoice')),
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `INV-${invoice?.invoiceNumber}` || '' },
          ]}
        />

        <Invoice invoice={invoice} />
      </Container>
    </Page>
  );
}

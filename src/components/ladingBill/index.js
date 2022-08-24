// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mock';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../Page';
import HeaderBreadcrumbs from '../HeaderBreadcrumbs';
// sections
import Invoice from './details';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const invoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="提单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="提单"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            {
              name: '提单管理',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: '提单'},
          ]}
        />

        <Invoice/>
      </Container>
    </Page>
  );
}

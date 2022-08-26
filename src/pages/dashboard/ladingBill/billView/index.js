// next
import { useRouter } from 'next/router';
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
import Invoice from './details';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  return (
    <Page title="查看提单">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="查看提单"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            {
              name: '提单管理',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: '查看提单'},
          ]}
        />
        <Invoice/>
      </Container>
    </Page>
  );
}

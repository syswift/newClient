import PropTypes from 'prop-types';
// @mui
import { Stack, Link, Button, Typography } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
//hooks
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------

AccountBillingInvoiceHistory.propTypes = {
  invoices: PropTypes.array,
};

export default function AccountBillingInvoiceHistory({ invoices }) {
  const { translate } = useLocales();

  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        {translate('main.Invoice')} {translate('History')}
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack key={invoice.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {fDate(invoice.createdAt)}
            </Typography>
            <Typography variant="body2">{fCurrency(invoice.price)}</Typography>
            <Link>PDF</Link>
          </Stack>
        ))}
      </Stack>

      <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
      {translate('main.All')} {translate('main.Invoice')} 
      </Button>
    </Stack>
  );
}

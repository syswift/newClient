import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Typography, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LandBillBottom() {
  const {
    watch,
    formState: { errors },
  } = useFormContext();


  const values = watch();

  const TRANSPORT_OPTIONS = ['海运', '空运'];
  const PAYMENT_OPTIONS = ['预付', '到付'];

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }}>
    <RHFTextField
      name="shippingMarks"
      label='唛头'
      InputLabelProps={{ shrink: true }}
      sx={{ width: '25%' }}
      value={values.shippingMarks}
    />

    <RHFSelect
      name="transportationMode"
      label="运输方式"
      InputLabelProps={{ shrink: true }}
      SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      sx={{ width: '25%' }}
    >
      {TRANSPORT_OPTIONS.map((option) => (
        <MenuItem
          key={option}
          value={option}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {option}
        </MenuItem>
      ))}
    </RHFSelect>

    <RHFSelect
      name="payment"
      label="运费"
      InputLabelProps={{ shrink: true }}
      SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      sx={{ width: '25%' }}
    >
      {PAYMENT_OPTIONS.map((option) => (
        <MenuItem
          key={option}
          value={option}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {option}
        </MenuItem>
      ))}
    </RHFSelect>
    <RHFTextField name="shipperContact" label="发货方单证联系人" sx={{ width: '25%' }} value={values.shipperContact}/>
  </Stack>
  );
}


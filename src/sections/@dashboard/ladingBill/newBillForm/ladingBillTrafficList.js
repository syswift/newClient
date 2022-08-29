// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const TERMS_OPTIONS = ['CFR', 'EXW', 'FOB', 'CIF', 'DAP', 'DDU', 'DDP'];

// ----------------------------------------------------------------------

export default function LandBillTrafficList() {
  const { watch } = useFormContext();

  const values = watch();

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <RHFTextField
        name="departurePort"
        label='出货地'
        InputLabelProps={{ shrink: true }}
        sx={{ width: '25%' }}
        value={values.departurePort}
      />
      <RHFTextField
        name="destinationPort"
        label='目的地'
        InputLabelProps={{ shrink: true }}
        sx={{ width: '25%' }}
        value={values.destinationPort}
      />

      <RHFSelect
        fullWidth
        name="status"
        label="贸易条款"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
        sx={{ width: '25%' }}
      >
        {TERMS_OPTIONS.map((option) => (
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
      <RHFTextField disabled name="landBillNumber" label="提单" value={`TD-5134867`} sx={{ width: '25%' }} />
    </Stack>
  );
}

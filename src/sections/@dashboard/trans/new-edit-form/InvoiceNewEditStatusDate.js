// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <RHFTextField name="invoiceNumber" label="周转单号" value={`INV-${values.invoiceNumber}`} />

      <RHFSelect
        fullWidth
        name="status"
        label="客户代码"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {STATUS_OPTIONS.map((option) => (
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
        fullWidth
        name="status"
        label="终端代码"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {STATUS_OPTIONS.map((option) => (
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
        fullWidth
        name="status"
        label="周转单类型"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {STATUS_OPTIONS.map((option) => (
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
    </Stack>
  );
}

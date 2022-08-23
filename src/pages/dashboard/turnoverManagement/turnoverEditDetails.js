import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import { RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const CUSTOMER_OPTIONS = [
  
];

// ----------------------------------------------------------------------

export default function TurnoverEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalPrice = sum(totalOnRow) - values.discount + values.taxes;

  useEffect(() => {
    setValue('totalPrice', totalPrice);
  }, [setValue, totalPrice]);

  const handleAdd = () => {
    append({
      invoiceNumber: '',
      dueDate: '',
      price: '',
      sent: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  // const handleClearService = useCallback(
  //   (index) => {
  //     resetField(`items[${index}].quantity`);
  //     resetField(`items[${index}].price`);
  //     resetField(`items[${index}].total`);
  //   },
  //   [resetField]
  // );

  // const handleSelectService = useCallback(
  //   (index, option) => {
  //     setValue(`items[${index}].price`, CUSTOMER_OPTIONS.find((service) => service.name === option)?.price);
  //     setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
  //   },
  //   [setValue, values.items]
  // );

  // const handleChangeQuantity = useCallback(
  //   (event, index) => {
  //     setValue(`items[${index}].quantity`, Number(event.target.value));
  //     setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
  //   },
  //   [setValue, values.items]
  // );

  // const handleChangePrice = useCallback(
  //   (event, index) => {
  //     setValue(`items[${index}].price`, Number(event.target.value));
  //     setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
  //   },
  //   [setValue, values.items]
  // );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`items[${index}].invoiceNumber`}
                label="周转单号"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`items[${index}].dueDate`}
                label="客户代码"
                InputLabelProps={{ shrink: true }}
              />

              <RHFSelect
                name={`items[${index}].price`}
                size="small"
                label="终端代码"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                {/* <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>

                <Divider />

                {CUSTOMER_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    onClick={() => handleSelectService(index, option.name)}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))} */}
              </RHFSelect>

              <RHFSelect
                name={`items[${index}].sent`}
                size="small"
                label="周转单类型"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                {}
              </RHFSelect>
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          Add new detail
        </Button>

        {/* <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
          <RHFTextField
            size="small"
            label="Discount"
            name="discount"
            onChange={(event) => setValue('discount', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />

          <RHFTextField
            size="small"
            label="Taxes"
            name="taxes"
            onChange={(event) => setValue('taxes', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack> */}
      </Stack>

      {/* <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="flex-end">
          <Typography>Subtotal :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120 }}>{fCurrency(sum(totalOnRow))}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography>Discount :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120, ...(values.discount && { color: 'error.main' }) }}>
            {values.discount ? `- ${fCurrency(values.discount)}` : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography>Taxes :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120 }}>
            {values.taxes ? fCurrency(values.taxes) : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h6">Total price :</Typography>
          <Typography variant="h6" sx={{ textAlign: 'right', width: 120 }}>
            {fCurrency(totalPrice)}
          </Typography>
        </Stack>
      </Stack> */}
    </Box>
  );
}
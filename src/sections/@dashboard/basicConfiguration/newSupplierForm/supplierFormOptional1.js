import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS1 = [
  { id: 1, name: '北京市', price: 90.99 },
  { id: 2, name: '上海市', price: 80.99 },
  { id: 3, name: '河北省', price: 70.99 },
  { id: 4, name: '山东省', price: 60.99 },
];
const SERVICE_OPTIONS2 = [
  { id: 1, name: '海淀区', price: 90.99 },
  { id: 2, name: '静安区', price: 80.99 },
  { id: 3, name: '石家庄市', price: 70.99 },
  { id: 4, name: '济南市', price: 60.99 },
];
const SERVICE_OPTIONS3 = [
  { id: 1, name: '长安区', price: 90.99 },
  { id: 2, name: '桥西区', price: 80.99 },
  { id: 3, name: '新华区', price: 70.99 },
  { id: 4, name: '裕华区', price: 60.99 },
];
const SERVICE_OPTIONS4 = [
  { id: 1, name: '中国', price: 90.99 },
  { id: 2, name: '美国', price: 80.99 },
  { id: 3, name: '加拿大', price: 70.99 },
  { id: 4, name: '新加坡', price: 60.99 },
];

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
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

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(`items[${index}].price`, SERVICE_OPTIONS1.find((service) => service.name === option)?.price);
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        选填项1:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <RHFSelect
                name={`items[${index}].province`}
                size="small"
                label="省份"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
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

                {SERVICE_OPTIONS1.map((option) => (
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
                ))}
              </RHFSelect>

              <RHFSelect
                name={`items[${index}].city`}
                size="small"
                label="城市"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
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

                {SERVICE_OPTIONS2.map((option) => (
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
                ))}
              </RHFSelect>

              <RHFSelect
                name={`items[${index}].district`}
                size="small"
                label="县区"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                <MenuItem
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

                {SERVICE_OPTIONS3.map((option) => (
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
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                name={`items[${index}].address`}
                label="详细地址"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Divider /><Divider /><Divider />
          </Stack>
        ))}
      </Stack>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <RHFSelect
                name={`items[${index}].country`}
                size="small"
                label="国家"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 335 } }}
              >
                <MenuItem
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

                {SERVICE_OPTIONS4.map((option) => (
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
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                name={`items[${index}].countryCode`}
                label="国家代码"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

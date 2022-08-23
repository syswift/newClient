import sum from 'lodash/sum';
import { useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
// components
import Iconify from '../../../../../components/Iconify';
import { RHFTextField } from '../../../../../components/hook-form';


// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();

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
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        选填项2:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`items[${index}].contact`}
                label="联系人"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                size="small"
                name={`items[${index}].position`}
                label="职位"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                size="small"
                name={`items[${index}].phone`}
                label="联系方式"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                size="small"
                name={`items[${index}].email`}
                label="邮箱"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              移除此行
            </Button>
          </Stack>
        ))}
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          添加新的联系人信息
        </Button>
      </Stack>
    </Box>
  );
}

// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography } from '@mui/material';
// components
import {  RHFTextField } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function PriceFormMandatory() {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        必填项:
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                name="goodsName"
                label="商品名称"
                InputLabelProps={{ shrink: true }}
                value={values.goodsName}
              />

              <RHFTextField
                name="goodsCode"
                label="商品代码"
                InputLabelProps={{ shrink: true }}
                value={values.goodsCode}
              />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="goodsNumber"
                  label="商品数量"
                  InputLabelProps={{ shrink: true }}
                  value={values.goodsNumber}
                />

                <RHFTextField
                  name="goodsPrice"
                  label="商品单价"
                  InputLabelProps={{ shrink: true }}
                  value={values.goodsPrice}
                />
            </Stack>

          </Stack>
      </Stack>
    </Box>
  );
}

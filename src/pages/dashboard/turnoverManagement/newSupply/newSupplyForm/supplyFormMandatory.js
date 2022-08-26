// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography } from '@mui/material';
// components
import {  RHFTextField } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function SupplyFormMandatory() {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        必填项:
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack  alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                name="goodsCode"
                label="商品代码"
                InputLabelProps={{ shrink: true }}
                value={values.goodsCode}
              />

              <RHFTextField
                name="supplierCode"
                label="供应商代码"
                InputLabelProps={{ shrink: true }}
                value={values.supplierCode}
              />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="supplierName"
                  label="供应商名称"
                  InputLabelProps={{ shrink: true }}
                  value={values.supplierName}
                />

                <RHFTextField
                  name="companyCode"
                  label="公司编码"
                  InputLabelProps={{ shrink: true }}
                  value={values.companyCode}
                />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="turnoverBoxCode"
                  label="周转箱代码"
                  InputLabelProps={{ shrink: true }}
                  value={values.turnoverBoxCode}
                />

                <RHFTextField
                  name="turnoverBoxNmae"
                  label="周转箱名称"
                  InputLabelProps={{ shrink: true }}
                  value={values.turnoverBoxNmae}
                />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="supplyNumber"
                  label="数量"
                  InputLabelProps={{ shrink: true }}
                  value={values.supplyNumber}
                />

                <RHFTextField
                  name="createTime"
                  label="操作时间"
                  InputLabelProps={{ shrink: true }}
                  value={'2022-08-26 07:55:56'}
                  disabled
                />
            </Stack>
          </Stack>
      </Stack>
    </Box>
  );
}

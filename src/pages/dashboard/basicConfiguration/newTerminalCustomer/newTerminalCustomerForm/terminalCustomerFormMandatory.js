// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

const STATE_OPTIONS = ['可用','暂不可用'];

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, watch } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        必填项:
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name="terminalCustomerCode"
                label="终端客户代码"
                InputLabelProps={{ shrink: true }}
                value={values.terminalCustomerCode}
              />

              <RHFTextField
                size="small"
                name="terminalCustomerName"
                label="终端客户名称"
                InputLabelProps={{ shrink: true }}
                value={values.terminalCustomerName}
              />

              <RHFTextField
                size="small"
                name="companyCode"
                label="公司编码"
                InputLabelProps={{ shrink: true }}
                value={values.companyCode}
              />
              
              <RHFSelect
                name="dataState"
                size="small"
                label="状态"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                {STATE_OPTIONS.map((option) => (
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
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

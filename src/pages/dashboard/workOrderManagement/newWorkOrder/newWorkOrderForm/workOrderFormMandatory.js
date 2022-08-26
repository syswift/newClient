// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography, MenuItem } from '@mui/material';
// components
import {  RHFTextField, RHFSelect } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function WorkOrderFormMandatory() {
  const { control, watch } = useFormContext();


  const values = watch();
  const STATE_OPTIONS = ['完成','新增']
  const TYPE_OPTIONS = ['正常','报废']
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        必填项:
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                name="jobNumber"
                label="工单单号"
                InputLabelProps={{ shrink: true }}
                value={values.jobNumber}
                sx={{ width: '50%' }}
              />

              <RHFTextField
                name="customerCode"
                label="客户代码"
                InputLabelProps={{ shrink: true }}
                value={values.customerCode}
                sx={{ width: '50%' }}
              />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <RHFSelect
                name="dataState"
                label="工单状态"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ width: '50%' }}
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
              <RHFSelect
                name="jobType"
                label="工单类型"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ width: '50%' }}
              >
                {TYPE_OPTIONS.map((option) => (
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
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="jobAddition"
                  label="工单备注"
                  InputLabelProps={{ shrink: true }}
                  value={values.jobAddition}
                  sx={{ width: '50%' }}
                />

                <RHFTextField
                  name="createTime"
                  label="操作时间"
                  InputLabelProps={{ shrink: true }}
                  value={'2022-08-26 07:56:58'}
                  disabled
                  sx={{ width: '50%' }}
                />
            </Stack>

          </Stack>
      </Stack>
    </Box>
  );
}

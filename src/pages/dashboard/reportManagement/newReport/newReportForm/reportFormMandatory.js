// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography } from '@mui/material';
// components
import {  RHFTextField } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function ReportFormMandatory() {
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
                name="reportCode"
                label="报表单号"
                InputLabelProps={{ shrink: true }}
                value={values.reportCode}
              />

              <RHFTextField
                name="reportNumber"
                label="报表代码"
                InputLabelProps={{ shrink: true }}
                value={values.reportNumber}
              />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="note"
                  label="备注"
                  InputLabelProps={{ shrink: true }}
                  value={values.note}
                />

                <RHFTextField
                  name="operationPerson"
                  label="操作人"
                  InputLabelProps={{ shrink: true }}
                  value={values.operationPerson}
                />
            </Stack>
          </Stack>
      </Stack>
    </Box>
  );
}

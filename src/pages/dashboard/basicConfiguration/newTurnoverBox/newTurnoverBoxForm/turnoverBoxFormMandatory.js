// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography,MenuItem } from '@mui/material';
// components
import {  RHFTextField,RHFSelect } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function TurnoverBoxFormMandatory() {
  const { control, watch } = useFormContext();

  const values = watch();
  const SUPPLY_OPTIONS = ['供应商1','供应商2']

  let time = new Date()
  values.createTime = time.toLocaleString()
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        必填项:
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                name="boxId"
                label="编号"
                InputLabelProps={{ shrink: true }}
                value={values.goodsName}
                sx={{ width:"50%" }}
              />

              <RHFSelect
                name="supply"
                label="供应商"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ width:"50%" }}
              >
                {SUPPLY_OPTIONS.map((option) => (
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
            <Divider />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                  name="boxName"
                  label="箱子名称"
                  InputLabelProps={{ shrink: true }}
                  value={values.boxName}
                />

                <RHFTextField
                  name="creatTime"
                  label="创建时间"
                  InputLabelProps={{ shrink: true }}
                  value={values.createTime}
                  disabled
                />
            </Stack>

          </Stack>
      </Stack>
    </Box>
  );
}

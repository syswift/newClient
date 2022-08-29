// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const BoxChoice = ['SU_AN_0001', 'SU_AN_0002','DU_AN_0001', 'OU_AN_0001','WU_AN_0001'];
const BoxSize = ['32cm*500cm*600cm', '32cm*100cm*600cm', '32cm*600cm*300cm'];
// ----------------------------------------------------------------------

export default function LandBillGoodInformation() {
  const { control,  watch  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();


  const handleAdd = () => {
    append({
      boxDescription: '',
      boxID: '',
      boxWeight: '',
      boxSize: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        货品信息
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>

              <RHFTextField
                size="small"
                name={`items[${index}].boxDescription`}
                label='货品描述'
                InputLabelProps={{ shrink: true }}
                sx={{ width: '45%' }}
                value={values.boxDescription}
              />

              <RHFSelect
                name={`items[${index}].boxID`}
                size="small"
                label="箱号"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ width: '20%' }}
              >
                {BoxChoice.map((option) => (
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

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].boxWeight`}
                label="重量"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '15%' }}
                value={values.boxWeight}
              />

              <RHFSelect
                name={`items[${index}].boxSize`}
                size="small"
                label="尺寸"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ width: '20%' }}
              >
                {BoxSize.map((option) => (
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

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              删除此行
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
          添加一行
        </Button>

        <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
          <RHFTextField
            type="number"
            name="priceTotal"
            label="费用"
            placeholder="0"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ width: '26.5%' }}
            value={values.priceTotal}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

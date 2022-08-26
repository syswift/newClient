// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import { RHFTextField } from '../../../../components/hook-form';


// ----------------------------------------------------------------------

export default function LandBillContactList() {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const upMd = useResponsive('up', 'md');
  const values = watch();
  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            发货人信息
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <RHFTextField
            size="small"
            name="shipperName"
            label='姓名'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.shipperName}
          />
          <RHFTextField
            size="small"
            name="shipperAddress"
            label='地址'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.shipperAddress}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <RHFTextField
            size="small"
            name="shipperData"
            label='详细资料'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.shipperData}
          />
        </Stack>
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            收货人信息
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <RHFTextField
            size="small"
            name="consigneeCompanyName"
            label='公司名称'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.consigneeCompanyName}
          />
          <RHFTextField
            size="small"
            name="consigneeAddress"
            label='地址'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.consigneeAddress}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <RHFTextField
            size="small"
            name="consigneeContact"
            label='联系人'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.consigneeContact}
          />
          <RHFTextField
            size="small"
            name="consigneePhone"
            label='联系电话'
            InputLabelProps={{ shrink: true }}
            sx={{ width: '45%' }}
            value={values.consigneePhone}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

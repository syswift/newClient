// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../../../components/hook-form';
// 获取原有数据
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {fetchTable} from '../../../../../../../api/fetchTable';

// ----------------------------------------------------------------------

const STATE_OPTIONS = ['可用','暂不可用'];

// ----------------------------------------------------------------------

export default function CustomerFormMandatory() {
  // 获取原有数据
  const [cus, setcus] = useState({});
  const { query } = useRouter();
  const { id } = query;
  useEffect(()=>{
    async function fetchData()
    {
      //获得当前用户
      const all = await fetchTable('customer',id);
      // console.log(all);
      setcus(all.data);
    }
    fetchData();
    },[]
  );

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
                size="small"
                name="customerCode"
                label="客户代码"
                InputLabelProps={{ shrink: true }}
                // value={values.customerCode}
                value={cus.customerId}
              />

              <RHFTextField
                size="small"
                name="customerName"
                label="客户名称"
                InputLabelProps={{ shrink: true }}
                // value={values.customerName}
                value={cus.customerName}
              />

              <RHFTextField
                size="small"
                name="companyCode"
                label="公司编码"
                InputLabelProps={{ shrink: true }}
                // value={values.companyCode}
                value={cus.companyCode}
              />
              
              <RHFSelect
                name="dataState"
                size="small"
                label="状态"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
                disabled
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
                    {/* {cus.status} */}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Stack>
      </Stack>
    </Box>
  );
}

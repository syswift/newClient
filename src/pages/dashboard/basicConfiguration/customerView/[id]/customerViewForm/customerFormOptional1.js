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

const PROVINCE_OPTIONS = ['北京市','上海市','河北省','山东省'];
const CITY_OPTIONS = ['海淀区','静安区','石家庄市','济南市'];
const DISTRICT_OPTIONS = ['长安区','桥西区','新华区','裕华区'];
const COUNTRY_OPTIONS = ['中国','美国','加拿大','新加坡'];

// ----------------------------------------------------------------------

export default function CustomerFormOptional1() {
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
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        选填项1:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <RHFSelect
                name="province"
                size="small"
                label="省份"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                {PROVINCE_OPTIONS.map((option) => (
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
                name="city"
                size="small"
                label="城市"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                {CITY_OPTIONS.map((option) => (
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
                name="district"
                size="small"
                label="县区"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
              >
                {DISTRICT_OPTIONS.map((option) => (
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
                name="address"
                label="详细地址"
                InputLabelProps={{ shrink: true }}
                value={values.address}
              />
            </Stack>
            <Divider /><Divider /><Divider />
          </Stack>
      </Stack>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack  alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <RHFSelect
                name="country"
                size="small"
                label="国家"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 335 } }}
              >
                {COUNTRY_OPTIONS.map((option) => (
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
                name="countryCode"
                label="国家代码"
                InputLabelProps={{ shrink: true }}
                value={values.countryCode}
              />
            </Stack>
          </Stack>
      </Stack>
    </Box>
  );
}

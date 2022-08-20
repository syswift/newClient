// form
import { useFormContext, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import PropTypes from 'prop-types';
import {fetchCusId} from '../../../../../api/fetchCusId';
import {fetchTermId} from '../../../../../api/fetchTermId';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();

  const values = watch();

  //后端数据存放
  const [CUSID_STATUS, setCUSID_STATUS] = useState([]);
  const [TERMID_STATUS, setTERMID_STATUS] = useState([]);
  const TRANS_TYPE = ['正向周转','逆向周转'];

  useEffect(()=>{
    async function fetchData()
    {     
     
      const all = await fetchCusId(); //客户代码
      const all2 = await fetchTermId(); //终端代码
      let temp = [];

      for(const cus of all.data)
      {
          console.log(cus.customerId);
          temp.push(cus.customerId);
      }
      setCUSID_STATUS(temp);
      temp = [];

      for(const term of all2.data)
      {
          console.log(term.termId);
          temp.push(term.termId);
      }
      setTERMID_STATUS(temp);
    }
    fetchData();
    },[])

  
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <RHFTextField name="invoiceNumber" label="周转单号" value={`RT`} />

      <RHFSelect
        fullWidth
        name="cusid"
        label="客户代码"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {CUSID_STATUS.map((option) => (
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
        fullWidth
        name="termid"
        label="终端代码"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {TERMID_STATUS.map((option) => (
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
        fullWidth
        name="type"
        label="周转单类型"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {TRANS_TYPE.map((option) => (
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
  );
}
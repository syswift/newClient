// form
import { useFormContext, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../../components/hook-form';
import PropTypes from 'prop-types';
import {fetchCusId} from '../../../../../../api/fetchCusId';
import {fetchTermId} from '../../../../../../api/fetchTermId';
import LoadingScreen from '../../../../../components/LoadingScreen';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();

  const values = watch();

  //后端数据存放
  const [CUSID_STATUS, setCUSID_STATUS] = useState([]);
  const [SALES_TEAM, setSALES_TEAM] = useState([
    '销售团队1',
    '销售团队2',
  ]);
  const [OPERATION_TEAM, setOPERATION_TEAM] = useState([
    '运营团队1',
    '运营团队2',
  ]);
  const [isInitialized, setisInitialized] = useState(true);

  useEffect(()=>{
    async function fetchData()
    {     
     
      setisInitialized(false);
      const all = await fetchCusId(); //客户代码
      let temp = [];
      setisInitialized(true);

      for(const cus of all.data)
      {
          //console.log(cus.customerId);
          temp.push(cus.customerId);
      }
      setCUSID_STATUS(temp);
    }
    fetchData();
    },[])

    if (!isInitialized) {
      return <LoadingScreen />;
    }

    else{
      return (
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.neutral' }}>
          <RHFTextField name="projectName" label="项目名称" value={values.projectName} />

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
            name="salesTeam"
            label="销售团队"
            InputLabelProps={{ shrink: true }}
            SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
          >
            {SALES_TEAM.map((option) => (
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
            name="operationsTeam"
            label="运营团队"
            InputLabelProps={{ shrink: true }}
            SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
          >
            {OPERATION_TEAM.map((option) => (
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
}
import { useEffect, useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography, MenuItem,Card, CardHeader, CardContent } from '@mui/material';
// components
import { RHFSelect, RHFTextField,RHFUploadSingleFile } from '../../../../../components/hook-form';
import { useCallback  } from 'react';
import { getDataFromLeave } from '../../../../../../api/getDataFromLeave';
// ----------------------------------------------------------------------

const STATE_OPTIONS = ['年假','事假','病假','调休假','婚嫁','产假','陪产假','其他'];

// ----------------------------------------------------------------------

export default function CustomerFormMandatory() {
  const { control, watch } = useFormContext();
  const [file, setFile] = useState(null);
  const [ask, setask] = useState({});
  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file1 = acceptedFiles[0];
    if (file1) {
      setFile(
        Object.assign(file1, {
          preview: URL.createObjectURL(file1),
        })
      );
    }
  }, []);

  const values = watch();

  useEffect(()=>{
    async function fetchData()
    {
      //获得当前用户
      const all = await getDataFromLeave();
      //console.log(all);
      setask(all.data);
      console.log(ask);
    }
    fetchData();
  },[]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        请假详情:
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          <Stack alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>       
              <RHFSelect
                name="adkForLeaveType"
                size="small"
                label="请假类型"
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

              <RHFTextField
                size="small"
                name="reasonForLeave"
                label="请假事由"
                InputLabelProps={{ shrink: true }}
                value={values.reasonForLeave}
              />
            </Stack>
          </Stack>
      </Stack>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>   
        <Card>
          <CardHeader title="说明附件" />
          <CardContent>
            <RHFUploadSingleFile id="file" name="file" file={file} maxSize={3145728} onDrop={handleDropSingleFile} />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

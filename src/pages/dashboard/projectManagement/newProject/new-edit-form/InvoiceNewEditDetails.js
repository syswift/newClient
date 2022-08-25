import sum from 'lodash/sum';
import { useCallback, useEffect, useState } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Divider, Typography, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// components
import { RHFSelect, RHFTextField, RHFUploadSingleFile } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS1 = [
  { id: 1, name: '北京市', price: 90.99 },
  { id: 2, name: '上海市', price: 80.99 },
  { id: 3, name: '河北省', price: 70.99 },
  { id: 4, name: '山东省', price: 60.99 },
];
const SERVICE_OPTIONS2 = [
  { id: 1, name: '海淀区', price: 90.99 },
  { id: 2, name: '静安区', price: 80.99 },
  { id: 3, name: '石家庄市', price: 70.99 },
  { id: 4, name: '济南市', price: 60.99 },
];
const SERVICE_OPTIONS3 = [
  { id: 1, name: '长安区', price: 90.99 },
  { id: 2, name: '桥西区', price: 80.99 },
  { id: 3, name: '新华区', price: 70.99 },
  { id: 4, name: '裕华区', price: 60.99 },
];
const SERVICE_OPTIONS4 = [
  { id: 1, name: '中国', price: 90.99 },
  { id: 2, name: '美国', price: 80.99 },
  { id: 3, name: '加拿大', price: 70.99 },
  { id: 4, name: '新加坡', price: 60.99 },
];

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const [file, setFile] = useState(null);
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
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  return (
    <Box sx={{ p: 3 }}>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Stack spacing={2} sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="项目文件上传" />
          <CardContent>
              <RHFUploadSingleFile id="file" name="file" file={file} maxSize={3145728} onDrop={handleDropSingleFile} />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

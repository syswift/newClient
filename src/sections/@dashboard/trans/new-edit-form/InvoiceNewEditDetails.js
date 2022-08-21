import sum from 'lodash/sum';
import { useCallback, useEffect, useState } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem,
         Card, CardHeader, CardContent} from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { fetchBox } from '../../../../../api/fetchBox';
import { UploadSingleFile } from '../../../../components/upload';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const [SERVICE_OPTIONS, setSERVICE_OPTIONS] = useState([]);
  const [file, setFile] = useState(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalPrice = sum(totalOnRow) - values.discount + values.taxes;

  const totalquantity = sum(totalOnRow);

  useEffect(() => {
    setValue('totalPrice', totalPrice);

    async function fetchData()
    {     
     
      const all = await fetchBox(); //箱子代码
      let temp = [];

      for(const cus of all.data)
      {
          temp.push(cus.boxId);
      }
      setSERVICE_OPTIONS(temp);
      //console.log(SERVICE_OPTIONS);
    }
    fetchData();
  }, [setValue, totalPrice]);

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

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(`items[${index}].price`, SERVICE_OPTIONS.find((service) => service.name === option)?.price);
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        增加周转箱:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>

              <RHFSelect
                name={`items[${index}].service`}
                size="small"
                label="周转箱代码"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 300 } }}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>

                <Divider />

                {SERVICE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={() => handleSelectService(index, option)}
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
                name={`items[${index}].quantity`}
                label="周转箱数量"
                placeholder="0"
                onChange={(event) => handleChangeQuantity(event, index)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 100 } }}
              />

            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              移除
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
          增加新的周转箱
        </Button>

        {/*upload*/}
      </Stack>

      <Stack spacing={2} sx={{ mt: 3 }}>

      <Card>
      <CardHeader title="合同上传" />
            <CardContent>
                <UploadSingleFile file={file} onDrop={handleDropSingleFile} />
            </CardContent>
      </Card>
      </Stack>
    </Box>
  );
}

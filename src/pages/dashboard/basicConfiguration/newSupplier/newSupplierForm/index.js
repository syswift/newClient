import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// components
import { FormProvider } from '../../../../../components/hook-form';
//
import SupplierFormMandatory from './supplierFormMandatory';
import SupplierFormOptional1 from './supplierFormOptional1';
import SupplierFormOptional2 from './supplierFormOptional2';

// ----------------------------------------------------------------------

NewSupplierForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function NewSupplierForm({ isEdit, currentInvoice }) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    supplierCode: Yup.string().nullable().required('请完善相关信息！'),
    supplierName: Yup.string().nullable().required('请完善相关信息！'),
    companyCode: Yup.mixed().nullable().required('请完善相关信息！'),
    dataState: Yup.mixed().nullable().required('请完善相关信息！'),
    address: Yup.mixed().nullable().required('请完善相关信息！'),
    country: Yup.mixed().nullable().required('请完善相关信息！'),
  });

  const defaultValues = useMemo(
    () => ({
      supplierCode: currentInvoice?.supplierCode || '',
      supplierName: currentInvoice?.supplierName || '',
      companyCode: currentInvoice?.companyCode || '',
      dataState: currentInvoice?.dataState || '',
      province: currentInvoice?.province || '',
      city: currentInvoice?.city || '',
      district: currentInvoice?.district || '',
      address: currentInvoice?.address || '',
      country: currentInvoice?.country || '',
      countryCode: currentInvoice?.countryCode || '',
      items: currentInvoice?.items || [{ contact: '', position: '', phone: '', email: ''}],
    }),
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  console.log('values', values);

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const handleSaveAsDraft = async (data) => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(true);
      push(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async (data) => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      push(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <SupplierFormMandatory />
        <SupplierFormOptional1 />
        <SupplierFormOptional2 />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          保存为草稿
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          提交
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

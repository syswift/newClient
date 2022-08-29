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
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { FormProvider } from '../../../../components/hook-form';
//
import LadingBillContactList from './ladingBillContactList';
import LadingBillGoodInformation from './ladingBillGoodInformation';
import LadingBillTrafficList from './ladingBillTrafficList';
import LadingBillBottom from './ladingBillBottom';


// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    shipperName: Yup.string().nullable().required('请完善相关信息！'),
    shipperAddress: Yup.string().nullable().required('请完善相关信息！'),
    shipperData: Yup.mixed().nullable().required('请完善相关信息！'),
    consigneeCompanyName: Yup.mixed().nullable().required('请完善相关信息！'),
    consigneeAddress: Yup.mixed().nullable().required('请完善相关信息！'),
    consigneeContact: Yup.mixed().nullable().required('请完善相关信息！'),
    consigneePhone: Yup.mixed().nullable().required('请完善相关信息！'),
    departurePort: Yup.mixed().nullable().required('请完善相关信息！'),
    destinationPort: Yup.mixed().nullable().required('请完善相关信息！'),
    status: Yup.mixed().nullable().required('请完善相关信息！'),
    landBillNumber: Yup.mixed().nullable().required('请完善相关信息！'),
    priceTotal: Yup.mixed().nullable().required('请完善相关信息！'),
    shippingMarks: Yup.mixed().nullable().required('请完善相关信息！'),
    transportationMode: Yup.mixed().nullable().required('请完善相关信息！'),
    payment: Yup.mixed().nullable().required('请完善相关信息！'),
    shipperContact: Yup.mixed().nullable().required('请完善相关信息！'),
  });

  const defaultValues = useMemo(
    () => ({
      shipperName: currentInvoice?.shipperName || '',
      shipperAddress: currentInvoice?.shipperAddress || '',
      shipperData: currentInvoice?.shipperData || '',
      consigneeCompanyName: currentInvoice?.consigneeCompanyName || '',
      consigneeAddress: currentInvoice?.consigneeAddress || '',
      consigneeContact: currentInvoice?.consigneeContact || '',
      consigneePhone: currentInvoice?.consigneePhone || '',
      departurePort: currentInvoice?.departurePort || '',
      destinationPort: currentInvoice?.destinationPort || '',
      status: currentInvoice?.status || '',
      landBillNumber: currentInvoice?.landBillNumber || '',
      items: currentInvoice?.items || [{ boxDescription: '', boxID: '', boxWeight: '', boxSize: ''}],
      priceTotal: currentInvoice?.priceTotal || '',
      shippingMarks: currentInvoice?.shippingMarks || '',      
      transportationMode: currentInvoice?.transportationMode || '',
      payment: currentInvoice?.payment || '',
      shipperContact: currentInvoice?.shipperContact || '',
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

  // console.log('values', values);

  useEffect(() => {
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

  function subDataTest(dataTest){
    console.log(dataTest);
  }
  return (
    <FormProvider methods={methods}>
      <Card>
        <LadingBillContactList />

        <LadingBillTrafficList />

        <LadingBillGoodInformation />

        <LadingBillBottom />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          存为草稿
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          // onClick={handleSubmit(handleCreateAndSend)}
          onClick={subDataTest(values)}
        >
          提交新提单
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

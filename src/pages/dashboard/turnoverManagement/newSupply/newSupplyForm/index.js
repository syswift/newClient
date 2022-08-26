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
import SupplyFormMandatory from './supplyFormMandatory';

// ----------------------------------------------------------------------

NewSupplyForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function NewSupplyForm({ isEdit, currentInvoice }) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    goodsCode: Yup.string().nullable().required('请完善相关信息！'),
    supplierCode: Yup.string().nullable().required('请完善相关信息！'),
    supplierName: Yup.mixed().nullable().required('请完善相关信息！'),
    companyCode: Yup.mixed().nullable().required('请完善相关信息！'),
    turnoverBoxCode: Yup.string().nullable().required('请完善相关信息！'),
    turnoverBoxNmae: Yup.string().nullable().required('请完善相关信息！'),
    createTime: Yup.mixed().nullable().required('请完善相关信息！'),
    goodsPrice: Yup.mixed().nullable().required('请完善相关信息！'),
  });

  const defaultValues = useMemo(
    () => ({
      goodsCode: currentInvoice?.goodsCode || '',
      supplierCode: currentInvoice?.supplierCode || '',
      supplierName: currentInvoice?.supplierName || '',
      companyCode: currentInvoice?.companyCode || '',
      turnoverBoxCode: currentInvoice?.turnoverBoxCode || '',
      turnoverBoxNmae: currentInvoice?.turnoverBoxNmae || '',
      supplyNumber: currentInvoice?.supplyNumber || '',
      createTime: currentInvoice?.createTime || '',
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
        <SupplyFormMandatory />
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

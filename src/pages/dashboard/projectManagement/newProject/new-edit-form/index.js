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
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import { supabase } from '../../../../../../api';
import { format } from "date-fns";

// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTrans: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentTrans }) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    projectName: Yup.string().nullable().required('请填写'),
    cusid: Yup.string().nullable().required('请填写'),
    salesTeam: Yup.string().nullable().required('请填写'),
    operationsTeam: Yup.string().nullable().required('请填写'),
  });

  //传参在这
  const defaultValues = useMemo(
    () => ({
      projectName: currentTrans?.projectName || '',
      cusid: currentTrans?.customerCode || '',
      salesTeam: currentTrans?.salesTeam || '',
      operationsTeam: currentTrans?.operationsTeam || '',
    }),
    [currentTrans]
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

  //console.log('values', values);

  useEffect(() => {
    if (isEdit && currentTrans) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTrans]);

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

  const getDate = () =>{
    const today = new Date();

    //const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +' '+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let date = '';
    date = format(today, "MMMM do, yyyy H:mma");

    return date;
  }

  const handleCreateAndSend = async (data) => {
    setLoadingSend(true);

    try {
      console.log('test');
      const {data1,error} = await supabase.from('project').insert({
        projectName: values.projectName,
        customerId: values.cusid,
        operationsTeam: values.operationsTeam,
        salesTeam: values.salesTeam,
        processPer: supabase.auth.user().id,
        state: true,
      });
      if(error) throw error;
      else
      { console.log(data1);
      }

      const element = document.getElementById('file');
      console.log(element);
      reset();
      setLoadingSend(false);
      push(PATH_DASHBOARD.projectManagement.projectView);
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>

        <InvoiceNewEditStatusDate />

        <InvoiceNewEditDetails />
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
          {isEdit ? '更新' : '创建'} & 发送
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

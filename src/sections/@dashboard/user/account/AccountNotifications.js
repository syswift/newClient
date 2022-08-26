import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFSwitch } from '../../../../components/hook-form';
//hooks
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------



const NOTIFICATION_SETTINGS = {
  activityComments: true,
  activityAnswers: true,
  activityFollows: false,
  applicationNews: true,
  applicationProduct: false,
  applicationBlog: false,
};

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { translate } = useLocales();

  const ACTIVITY_OPTIONS = [
    {
      value: 'activityComments',
      label: (translate('EMWA')),
    },
    {
      value: 'activityAnswers',
      label: (translate('EMWS')),
    },
    { value: 'activityFollows', label: (translate('EMHS')) },
  ];
  
  const APPLICATION_OPTIONS = [
    { value: 'applicationNews', label: (translate('NAA')) },
    { value: 'applicationProduct', label: (translate('WPU')) },
    { value: 'applicationBlog', label: (translate('WBD')) },
  ];
  
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    activityComments: NOTIFICATION_SETTINGS.activityComments,
    activityAnswers: NOTIFICATION_SETTINGS.activityAnswers,
    activityFollows: NOTIFICATION_SETTINGS.activityFollows,
    applicationNews: NOTIFICATION_SETTINGS.applicationNews,
    applicationProduct: NOTIFICATION_SETTINGS.applicationProduct,
    applicationBlog: NOTIFICATION_SETTINGS.applicationBlog,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar(translate('US'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {translate('Activity')}
            </Typography>

            <Stack spacing={1}>
              {ACTIVITY_OPTIONS.map((activity) => (
                <RHFSwitch key={activity.value} name={activity.value} label={activity.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {translate('Application')}
            </Typography>
            <Stack spacing={1}>
              {APPLICATION_OPTIONS.map((application) => (
                <RHFSwitch key={application.value} name={application.value} label={application.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {translate('Save')}{translate('main.Change')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

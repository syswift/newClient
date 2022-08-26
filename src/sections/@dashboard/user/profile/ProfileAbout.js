import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
//hooks
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
  const { quote, country, email, role, company, school } = profile;

  const { translate } = useLocales();

  return (
    <Card>
      <CardHeader title={translate('About')} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            {translate('Live')} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {role} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
          {translate('Studied')} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

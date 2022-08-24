import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Tooltip, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 40,
  zIndex: 99,
  opacity: 0,
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(1),
  right: theme.spacing(1),
  bottom: theme.spacing(1),
  justifyContent: 'center',
  padding: theme.spacing(0, 0.75),
  boxShadow: theme.customShadows.z12,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create('opacity'),
}));

// ----------------------------------------------------------------------

MailItemAction.propTypes = {
  handleArchive: PropTypes.func,
  handleDelete: PropTypes.func,
  handleMarkRead: PropTypes.func,
  handleHidden: PropTypes.func,
};

export default function MailItemAction({ handleArchive, handleDelete, handleMarkRead, handleHidden, ...other }) {
  const MAIL_ACTIONS = [
    {
      name: '存档',
      icon: 'eva:archive-fill',
      action: handleArchive,
    },
    {
      name: '删除',
      icon: 'eva:trash-2-outline',
      action: handleDelete,
    },
    {
      name: '标为已读',
      icon: 'ic:round-mark-email-read',
      action: handleMarkRead,
    },
    {
      name: '隐藏邮件',
      icon: 'eva:eye-off-fill',
      action: handleHidden,
    },
  ];

  return (
    <RootStyle {...other}>
      {MAIL_ACTIONS.map((action) => (
        <Tooltip key={action.name} title={action.name}>
          <IconButton
            size="small"
            onClick={action.action}
            sx={{
              mx: 0.75,
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <Iconify icon={action.icon} width={24} height={24} />
          </IconButton>
        </Tooltip>
      ))}
    </RootStyle>
  );
}

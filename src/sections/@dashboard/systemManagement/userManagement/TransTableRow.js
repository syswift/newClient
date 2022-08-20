import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem, Button } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { supabase } from '../../../../../api';

import { PATH_DASHBOARD } from '../../../../routes/paths';
import NextLink from 'next/link';
// ----------------------------------------------------------------------

TransTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function TransTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow}) {

  const theme = useTheme();

  const { id, userName, userType, password, email} = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    //<Button variant="contained" onClick={()=>console.log(row)}>Contained</Button>
    
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{userName}</TableCell>
      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (userType === '管理' && 'success') ||
            (userType === '运营' && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {userType}
        </Label>
      </TableCell>
      <TableCell align="center">{password}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">
        <NextLink href={PATH_DASHBOARD.systemManagement.changeUserInformation} passHref>
          <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'}  align="center"/>}>
            编辑
          </Button>
        </NextLink>
      </TableCell>
    </TableRow> 
  );
}
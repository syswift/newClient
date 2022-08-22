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

  const { customerId, customerName, companyCode, status, province, city, district, address, country, countryCode, contact1, position1, phone1, email1, contact2, position2, phone2, email2 } = row;

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
      <TableCell align="center">{customerId}</TableCell>
      <TableCell align="center">{customerName}</TableCell>
      <TableCell align="center">{companyCode}</TableCell>
      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === true && 'success') ||
            (status === false && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status === true ? '可用' : '不可用'}
        </Label>
      </TableCell>
      <TableCell align="center">{province}</TableCell>
      <TableCell align="center">{city}</TableCell>
      <TableCell align="center">{district}</TableCell>
      <TableCell align="center">{address}</TableCell>
      <TableCell align="center">{country}</TableCell>
      <TableCell align="center">{countryCode}</TableCell>
      <TableCell align="center">{contact1}</TableCell>
      <TableCell align="center">{position1}</TableCell>
      <TableCell align="center">{phone1}</TableCell>
      <TableCell align="center">{email1}</TableCell>
      <TableCell align="center">{contact2}</TableCell>
      <TableCell align="center">{position2}</TableCell>
      <TableCell align="center">{phone2}</TableCell>
      <TableCell align="center">{email2}</TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}>
                <Iconify icon={'eva:edit-fill'} />
                  编辑
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}>
                <Iconify icon={'eva:eye-fill'} />
                  绑定终端
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow> 
  );
}
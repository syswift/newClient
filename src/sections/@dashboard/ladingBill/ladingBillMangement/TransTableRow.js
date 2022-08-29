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

  const { shipperName, shipperAddress, shipperData,
     consigneeCompanyName, consigneeAddress, consigneeContact, consigneePhone,
     departurePort, destinationPort, status, landBillNumber, 
     boxDescription1, boxID1, boxWeight1, boxSize1, 
     boxDescription2, boxID2, boxWeight2, boxSize2,
     priceTotal, shippingMarks, transportationMode, payment,shipperContact
    } = row;

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
      <TableCell align="center">{shipperName}</TableCell>
      <TableCell align="center">{shipperAddress}</TableCell>
      <TableCell align="center">{shipperData}</TableCell>
      {/* <TableCell align="center">
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
      </TableCell> */}
      <TableCell align="center">{consigneeCompanyName}</TableCell>
      <TableCell align="center">{consigneeAddress}</TableCell>
      <TableCell align="center">{consigneeContact}</TableCell>
      <TableCell align="center">{consigneePhone}</TableCell>
      <TableCell align="center">{departurePort}</TableCell>
      <TableCell align="center">{destinationPort}</TableCell>
      <TableCell align="center">{status}</TableCell>
      <TableCell align="center">{landBillNumber}</TableCell>
      <TableCell align="center">{boxDescription1}</TableCell>
      <TableCell align="center">{boxID1}</TableCell>
      <TableCell align="center">{boxWeight1}</TableCell>
      <TableCell align="center">{boxSize1}</TableCell>
      <TableCell align="center">{boxDescription2}</TableCell>
      <TableCell align="center">{boxID2}</TableCell>
      <TableCell align="center">{boxWeight2}</TableCell>
      <TableCell align="center">{boxSize2}</TableCell>
      <TableCell align="center">{priceTotal}</TableCell>
      <TableCell align="center">{shippingMarks}</TableCell>
      <TableCell align="center">{transportationMode}</TableCell>
      <TableCell align="center">{payment}</TableCell>
      <TableCell align="center">{shipperContact}</TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}>
                <Iconify icon={'eva:eye-fill'} />
                  查看
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow> 
  );
}
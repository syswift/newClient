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

  const { customerCode, terminalCode, supplierCode, turnoverBoxCode, inventoryType, inventoryNumber, turnoverBoxNmae, createTime} = row;

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
      <TableCell align="center">{customerCode}</TableCell>
      <TableCell align="center">{terminalCode}</TableCell>
      <TableCell align="center">{supplierCode}</TableCell>
      <TableCell align="center">{turnoverBoxCode}</TableCell>
      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (inventoryType === '正常库存' && 'success') ||
            (inventoryType === '非正常库存' && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {inventoryType}
        </Label>
      </TableCell>
      <TableCell align="center">{inventoryNumber}</TableCell>
      <TableCell align="center">{turnoverBoxNmae}</TableCell>
      <TableCell align="center">{createTime}</TableCell>
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
                  调整客户库存
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow> 
  );
}
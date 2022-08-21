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

  const { statementNumber, statementCode, note, operationPerson, operationTime  } = row;
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
      <TableCell align="center">{statementNumber}</TableCell>
      <TableCell align="center">{statementCode}</TableCell>
      <TableCell align="center">{note}</TableCell>
      <TableCell align="center">{operationPerson}</TableCell>
      <TableCell align="center">{operationTime}</TableCell>
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
            </>
          }
        />
      </TableCell>
    </TableRow> 
  );
}
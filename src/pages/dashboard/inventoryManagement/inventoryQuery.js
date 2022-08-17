// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
  // routes
  import { PATH_DASHBOARD } from '../../../routes/paths';
  // hooks
  import useSettings from '../../../hooks/useSettings';
  // layouts
  import Layout from '../../../layouts';
  // components
  import Page from '../../../components/Page';
  import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

  import PropTypes from 'prop-types';
  import React from 'react';
  import windowsData from '../../../../globalData';
  import * as ReactDOM from 'react-dom';
  import { supabase } from '../../../../api';
  
  InventoryQuery.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function InventoryQuery() {
    const { themeStretch } = useSettings();
    // 弹窗
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
      '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
      },
      '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
      },
  }));

  const BootstrapDialogTitle = (props) => {
      const { children, onClose, ...other } = props;

      return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
              {children}
              {onClose ? (
                  <IconButton
                      aria-label="close"
                      onClick={onClose}
                      sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          // color: (theme) => theme.palette.grey[500],
                      }}
                  >
                      <CloseIcon />
                  </IconButton>
              ) : null}
          </DialogTitle>
      );
  };

  BootstrapDialogTitle.propTypes = {
      children: PropTypes.node,
      onClose: PropTypes.func.isRequired,
  };

  function createData(customerCode,terminalCode,supplierCode,turnoverBoxCode,inventoryType,inventoryNumber,turnoverBoxNmae,createTime,operation) {
      return { customerCode,terminalCode,supplierCode,turnoverBoxCode,inventoryType,inventoryNumber,turnoverBoxNmae,createTime,operation };
  }
  function operationStateSet(flag) {
      if (flag) {
          return <Button variant="outlined" color="primary">调整客户库存</Button>
      } else {
          return ''
      }
  }

  const rows = [];


  // 选项卡
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  // 弹窗
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  // 表格
  const columns = [
      // ,,,,,,,,
      { id: 'customerCode', label: '客户代码', minWidth: 100 },
      { id: 'terminalCode', label: '终端代码', minWidth: 100 },
      { id: 'supplierCode', label: '供应商代码', minWidth: 100 },
      { id: 'turnoverBoxCode', label: '周转箱代码', minWidth: 100 },
      { id: 'inventoryType', label: '库存类型', minWidth: 50 },
      { id: 'inventoryNumber', label: '数量', minWidth: 50 },
      { id: 'turnoverBoxNmae', label: '周转箱名称', minWidth: 50 },
      { id: 'createTime', label: '创建时间', minWidth: 100 },
      { id: 'operation', label: '操作', minWidth: 50 },
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const search = async () => {
      //console.log('i am here');

      rows= [];
      const boxId = document.getElementById('SboxId').value;
      const customerId = document.getElementById('ScustomerSelect').innerText;
      const termId = document.getElementById('SterminalSelect').innerText;
      const providerId = document.getElementById('SsupplierSelect').innerText;
      const boxType = document.getElementById('SinventoryTypeSelect').innerText;

      const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

      const project = processObj.body.currentProject;

      console.log(boxId,customerId,termId,providerId,boxType );
      
      try {
          const {data, error} = await supabase.from('box_storage').select().match({
              projectName: project
          });
          if(error) throw error;

          console.log(data);

          for(const box of data)
          {
              //rows.push(createData(box.customerId,box.termId,box.providerId,box.boxId,box.boxType,box.amount,box.boxName,box.create_at,true));
              if(
                  (boxId !== null || boxId === box.boxId) &&
                  (customerId.length < 2 || customerId === box.customerId) &&
                  (termId.length < 2 || termId === box.termId) &&
                  (providerId.length < 2 || providerId === box.providerId) &&
                  (boxType.length < 2 || boxType === box.boxType)
                  )
                {
                  rows.push(createData(box.customerId,box.termId,box.providerId,box.boxId,box.boxType,box.amount,box.boxName,box.created_at,true));
                }
                else{
                  console.log('没找到对应库存');
                }
              
          } 
          
          console.log(rows);

          const element = document.getElementById('storageTable');

          ReactDOM.render(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                      const value = row[column.id];
                      return (
                      <TableCell key={column.id} align={column.align}>
                          {typeof value === 'boolean' ? operationStateSet(value) : value}
                      </TableCell>
                      );
                  })}
                  </TableRow>
              )),element);

         
      } catch (error) {
          console.log(error);
      }  
  }

  const resetSearch = () =>{
      const boxId = document.getElementById('SboxId').value;
      const customerId = document.getElementById('ScustomerSelect').innerText;
      const termId = document.getElementById('SterminalSelect').innerText;
      const providerId = document.getElementById('SsupplierSelect').innerText;
      const boxType = document.getElementById('SinventoryTypeSelect').innerText;

  if(boxId !== '') document.getElementById('SboxId').value = '';
  if(customerId .length > 2) document.getElementById('ScustomerSelect').innerText = '';
  if(termId.length > 2) document.getElementById('SterminalSelect').innerText = '';
  if(providerId.length > 2) document.getElementById('SsupplierSelect').innerText = '';
  if(boxType.length > 2) document.getElementById('SinventoryTypeSelect').innerText = '';
  }
    return (
      <Page title="库存查询">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="库存查询"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '库存管理' },
              { name: '库存查询' },
            ]}
          />
          <Card>
            <div>
              <table>
                <br />
                <tr>
                  <td style={{ width: '10%', textAlign: 'right' }}>周转箱代码:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                      <Input placeholder="请输入周转箱代码" id="SboxId" inputProps={{ 'aria-label': 'description' }} />
                  </td>
                  <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }} id='ScustomerDiv' />
                  <td style={{ width: '10%', textAlign: 'right' }}>终端代码:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                    <Select labelId="terminalLabel" id="SterminalSelect" style={{ width: '100%' }} >
                      <MenuItem value="EU_HB_00001">EU_HB_00001</MenuItem>
                      <MenuItem value="EU_AH_00001">EU_AH_00001</MenuItem>
                      <MenuItem value="EU_AH_00002">EU_AH_00002</MenuItem>
                      <MenuItem value="EU_NMG_00001">EU_NMG_00001</MenuItem>
                      <MenuItem value="EU_BJ_00001">EU_BJ_00001</MenuItem>
                      <MenuItem value="EU_SC_00001">EU_SC_00001</MenuItem>
                      <MenuItem value="EU_SH_00001">EU_SH_00001</MenuItem>
                      <MenuItem value="EU_HN_00001">EU_HN_00001</MenuItem>
                      <MenuItem value="EU_AH_00003">EU_AH_00003</MenuItem>
                      <MenuItem value="EU_AH_00004">EU_AH_00004</MenuItem>
                    </Select>
                  </td>
                  <td style={{ width: '10%', textAlign: 'right' }}>供应商代码:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                    <Select labelId="supplierLabel" id="SsupplierSelect" style={{ width: '100%' }}>
                      <MenuItem value="CU_JS00001">GY_JS00001</MenuItem>
                      <MenuItem value="CU_JS00002">GY_JS00002</MenuItem>
                      <MenuItem value="CU_JS00003">GY_JS00003</MenuItem>
                      <MenuItem value="CU_JS00004">GY_JS00004</MenuItem>
                      <MenuItem value="CU_JS00005">GY_JS00005</MenuItem>
                      <MenuItem value="CU_JS00006">GY_JS00006</MenuItem>
                    </Select>
                  </td>
                  <td />
                </tr>
                <br />
                <tr>
                  <td style={{ width: '10%', textAlign: 'right' }}>库存类型:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                    <Select labelId="inventoryTypeLabel" id="SinventoryTypeSelect" style={{ width: '100%' }}>
                      <MenuItem value="正常库存">正常库存</MenuItem>
                      <MenuItem value="非正常库存">非正常库存</MenuItem>
                    </Select>
                      </td>
                </tr>
              </table>
            </div>
            <div>
              <center>
                <Button variant="outlined" color="primary" onClick={search}>查询</Button>
                &emsp;&emsp;
                <span>
                  <Button variant="outlined" onClick={resetSearch} color="primary">
                    重置
                  </Button>
                </span>
                <br />
                <br />
              </center>
            </div>
            <TableContainer component={Paper} sx={{maxHeight: '500px'}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                  <TableBody id="storageTable" />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    );
  }
  
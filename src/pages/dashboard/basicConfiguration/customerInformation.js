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

  CustomerInformation.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function CustomerInformation() {
    const { themeStretch } = useSettings();
    const { useState, useEffect } = React;
    function CheckAll() {
        const [checkAll, setCheckAll] = useState(false);
        const [isCheckAllClicked, setCheckAllClick] = useState(false); // 因为点击单按钮和全选按钮，都会改变checkALll从而触发useEffect，导致点击单按钮还会影响其他按钮的选中效果，所以设置这个数据，为了确保仅在点击全选的按钮状态下改变对应的数据
        const [list, setList] = useState([
          {
            id: 1,
            name: "EU_HB_00001",
            checked: true,
          },
          {
            id: 2,
            name: "EU_HB_00002",
            checked: false,
          },
          {
            id: 3,
            name: "EU_HB_00003",
            checked: false,
          },
          {
            id: 4,
            name: "EU_HB_00004",
            checked: false,
          },
        ]);
        useEffect(() => {
          // console.count("设置全选");
          setCheckAll(
            list.filter((item) => item.checked).length == list.length
          );
        }, [list]);

        // 全选按钮改变之后
        useEffect(() => {
          if (isCheckAllClicked) {
            setList(
              list.map((item) => {
                item.checked = checkAll;
                return item; //  需要有一个返回值，否则会出错
              })
            );
            setCheckAllClick(false);
          }
        }, [checkAll]);
        return (
          <div>
            <p>
              <label
                onClick={() => {
                  setCheckAllClick(true);
                  setCheckAll(!checkAll);
                }}
              >
                <input onChange={() => {}} type="checkbox" checked={checkAll} />
                全选
              </label>
            </p>
            <ul>
              {list.map((item) => (
                <li key={item.id}>
                  <label
                    onClick={() => {
                      // console.count(111);
                      list.find((i) => i.id == item.id).checked = !list.find(
                        (i) => i.id == item.id
                      ).checked;
                      setList([...list]); //  如果不浅拷贝的话，尽管效果变了，但是 list.checked值不会随着点击而改变
                    }}
                  >
                    <input
                      onChange={() => {}}
                      checked={item.checked}
                      type="checkbox"
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      }
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
    function dataStateSet(flag) {
        if (flag) {
            return <Button variant="outlined" color="primary">可用</Button>
        } else {
            return <Button variant="outlined">暂不可用</Button>
        }
    }
    function createData(customerCode, customerName, companyCode, dataState, province, city, district, address, country, countryCode, contact1, position1, phone1, email1, contact2, position2, phone2, email2) {
        return { customerCode, customerName, companyCode, dataState, province, city, district, address, country, countryCode, contact1, position1, phone1, email1, contact2, position2, phone2, email2 };
    }
    

    const onSubmit = () => {

    }

    const rows = [
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', false, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
    ];

    // 选项卡
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // 弹窗
    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);
    // const handleClickOpen2 = (customerCode,customerName,companyCode) => {
    //     windowsData.customerCode=customerCode
    //     windowsData.customerName=customerName
    //     windowsData.companyCode=companyCode
    //     setOpen2(true);
    // };
    function handleClickOpen2  (customerCode,customerName,companyCode)  {
        windowsData.customerCode=customerCode
        windowsData.customerName=customerName
        windowsData.companyCode=companyCode
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    // 表格
    const columns = [
        { id: 'customerCode', label: '客户代码', minWidth: 100 },
        { id: 'customerName', label: '客户名称', minWidth: 100 },
        { id: 'companyCode', label: '公司编码', minWidth: 100 },
        { id: 'dataState', label: '状态', minWidth: 100 },
        { id: 'province', label: '省', minWidth: 50 },
        { id: 'city', label: '市', minWidth: 50 },
        { id: 'district', label: '区', minWidth: 50 },
        { id: 'address', label: '地址', minWidth: 100 },
        { id: 'country', label: '国家', minWidth: 50 },
        { id: 'countryCode', label: '国家代码', minWidth: 80 },
        { id: 'contact1', label: '联系人1', minWidth: 80 },
        { id: 'position1', label: '职位1', minWidth: 80 },
        { id: 'phone1', label: '联系方式1', minWidth: 80 },
        { id: 'email1', label: '邮箱1', minWidth: 80 },
        { id: 'contact2', label: '联系人2', minWidth: 80 },
        { id: 'position2', label: '职位2', minWidth: 80 },
        { id: 'phone2', label: '联系方式2', minWidth: 80 },
        { id: 'email2', label: '邮箱2', minWidth: 80 },
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
    return (
      <Page title="客户信息">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="客户信息"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '基础配置' },
              { name: '客户信息' },
            ]}
          />
          <Card>
            <div>
              <table>
                <br />
                <tr>
                  <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                      <Input placeholder="请输入供应商代码" inputProps={{ 'aria-label': 'description' }} />
                  </td>
                  <td style={{ width: '10%', textAlign: 'right' }}>客户名称:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                      <Input placeholder="请输入供应商名称" inputProps={{ 'aria-label': 'description' }} />
                  </td>
                  <td style={{ width: '10%', textAlign: 'right' }}>联系人:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                      <Input placeholder="请输入联系人" inputProps={{ 'aria-label': 'description' }} />
                  </td>
                  <td style={{ width: '10%', textAlign: 'right' }}>联系方式:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                      <Input placeholder="请输入联系方式" inputProps={{ 'aria-label': 'description' }} />
                  </td>
                  <td />
                </tr>
                <br />
                <tr>
                  <td style={{ width: '10%', textAlign: 'right' }}>状态:</td>
                  <td style={{ width: '2%' }} />
                  <td style={{ width: '10%' }}>
                    <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '100%' }}>
                      <MenuItem value="正向周转">可用</MenuItem>
                      <MenuItem value="逆向周转">暂不可用</MenuItem>
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <center>
                <br />
                <form id="sinsertForm" autoComplete="on" onSubmit={onSubmit}>
                    <span>
                        <Button variant="contained" onClick={handleClickOpen1} size="medium" color="primary">
                            + 新增客户
                        </Button>
                        <BootstrapDialog
                            onClose={handleClose1}
                            aria-labelledby="customized-dialog-title"
                            open={open1}>
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
                                新增客户
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <table>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            *客户代码:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            *状态:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            *客户名称:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%' }}>
                                            <Input placeholder="请输入客户代码" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%' }}>
                                            <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '100%' }}>
                                                <MenuItem value="可用">可用</MenuItem>
                                                <MenuItem value="暂不可用">暂不可用</MenuItem>
                                            </Select>
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%' }}>
                                            <Input placeholder="请输入客户名称" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            *公司编码:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            省:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            市:
                                        </td>
                                    </tr>
                                    <tr style={{ width: '100%' }}>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入公司编码" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入省" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            区:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td colSpan="2" style={{ width: '60%', textAlign: 'left' }}>
                                            地址:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td colSpan="2" style={{ width: '100%', textAlign: 'left' }}>
                                            <Input placeholder="请输入地址" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            邮编:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            国家:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            国家代码:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            联系人1:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            职位1:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            联系方式1:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" style={{ width: '100%', textAlign: 'left' }}>
                                            邮箱1:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" style={{ width: '100%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            联系人2:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            职位2:
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            联系方式2:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                        <td style={{ width: '3%' }} />
                                        <td style={{ width: '30%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" style={{ width: '60%', textAlign: 'left' }}>
                                            邮箱2:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" style={{ width: '100%', textAlign: 'left' }}>
                                            <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                        </td>
                                    </tr>
                                </table>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus variant="contained" onClick={handleClickOpen1} size="medium" color="primary" style={{ margin: 'auto' }}>
                                    提交
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </span>
                    &emsp;&emsp;
                    <span>
                        <Button variant="outlined" color="primary">
                            查询
                        </Button>
                    </span>
                </form>
                  <br />
                  <br />
              </center>
            </div>
            <TableContainer component={Paper} sx={{maxHeight: '500px'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                if(column.id !== 'customerCode'){
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {typeof value === 'boolean' ? dataStateSet(value) : value}
                                        </TableCell>
                                    );
                                }
                                else{
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            <Button id={column.id} variant="outlined" onClick={()=>{handleClickOpen2(row.customerCode,row.customerName,row.companyCode)}}>{typeof value === 'boolean' ? dataStateSet(value) : value}</Button>
                                            <BootstrapDialog
                                                onClose={handleClose2}
                                                aria-labelledby="customized-dialog-title1"
                                                open={open2}>
                                                <BootstrapDialogTitle id="customized-dialog-title1" onClose={handleClose2}>
                                                    绑定终端
                                                </BootstrapDialogTitle>
                                                <DialogContent dividers>
                                                    <table style={{ minWidth: '565px'}}>
                                                        <tr>
                                                            <td style={{ width: '15%', textAlign: 'left' }}>
                                                                客户代码:
                                                            </td>
                                                            <td style={{ width: '20%', textAlign: 'center' ,fontWeight:'bold' }}>
                                                                {windowsData.customerCode}
                                                            </td>
                                                            <td style={{ width: '15%', textAlign: 'left' }}>
                                                                客户名称:
                                                            </td>
                                                            <td style={{ width: '13%', textAlign: 'center' ,fontWeight:'bold' }}>
                                                                {windowsData.customerName}
                                                            </td>
                                                            <td style={{ width: '15%', textAlign: 'left' }}>
                                                                公司编码:
                                                            </td>
                                                            <td style={{ width: '15%', textAlign: 'center' ,fontWeight:'bold'}}>
                                                                {windowsData.companyCode}  
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <br /><br />
                                                    <div>终端列表</div>
                                                    <hr />
                                                    <CheckAll />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus variant="contained" onClick={handleClickOpen2} size="medium" color="primary" style={{ margin: 'auto' }}>
                                                        提交
                                                    </Button>
                                                </DialogActions>
                                            </BootstrapDialog>

                                        </TableCell>
                                    )
                                }
                                
                            })}
                            </TableRow>
                        ))}
                    </TableBody>
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
  
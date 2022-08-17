// @mui
import {
    Card,
    Container,
  } from '@mui/material';
  // routes
  import { PATH_DASHBOARD } from '../../../routes/paths';
  // hooks
  import useSettings from '../../../hooks/useSettings';
  // layouts
  import Layout from '../../../layouts';
  // components
  import Page from '../../../components/Page';
  import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
  import React from 'react';
import windowsData from '../../../../globalData'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';

  UserManagement.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function UserManagement() {
    // const { themeStretch } = useSettings();
    // 表格内容
    const columns = [
        { id: 'id', label: 'ID', align:'center', minWidth: 170 },
        { id: 'userName', label: '用户名', align:'center', minWidth: 100 },
        { id: 'userType', label: '用户类型', align:'center', minWidth: 100 },
        { id: 'password', label: '密码', align:'center', minWidth: 100 },
        { id: 'email', label: '注册邮箱', align:'center', minWidth: 100 },
        { id: 'operation', label: '操作', align:'center', minWidth: 100 }
    ];
    function createData(id, userName, userType,password, email,operation) {
        return { id, userName, userType,password, email,operation};
    }
    const rows = [
        createData('1', 'test1', '管理', '123456', '1123456@qq.com',false),
        createData('2', 'test2',  '运营','123456', '2123456@qq.com',true),
        createData('3', 'test3',  '运营','123456', '3123456@qq.com',true),
        createData('4', 'test4',  '运营','123456', '4123456@qq.com',true),
        createData('5', 'test5',  '运营','123456', '5123456@qq.com',true),
        createData('6', 'test6',  '运营','123456', '6123456@qq.com',true),
        createData('7', 'test7',  '运营','123456', '7123456@qq.com',true),
        createData('8', 'test8',  '运营','123456', '8123456@qq.com',true),
        createData('9', 'test9',  '运营','123456', '9123456@qq.com',true),
        createData('10', 'test10',  '运营','123456', '10123456@qq.com',true),
        createData('11', 'test11',  '运营','123456', '11123456@qq.com',true),
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (userName,userType,password,email) => {
        windowsData.userName=userName,
        windowsData.userType=userType,
        windowsData.password=password,
        windowsData.email=email,
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
    function dataManageSet(flag,row) {
        if (flag) {
            return (
                <div>
                    <Button variant="outlined" color="primary" onClick={()=>{handleClickOpen(row.userName,row.userType,row.password,row.email)}}>编辑</Button>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            信息编辑
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <table style={{ minWidth: '565px'}}>
                                <tr>
                                    <td style={{ width: '20%', textAlign: 'left' }}>
                                        用户名:
                                    </td>
                                    <td style={{ width: '30%', textAlign: 'center'}}>
                                        <Input placeholder={windowsData.userName} id="userName" inputProps={{ 'aria-label': 'description' }} />
                                    </td>
                                    <td style={{ width: '20%', textAlign: 'left' }}>
                                        用户类型:
                                    </td>
                                    <td style={{ width: '30%', textAlign: 'center'}}>
                                        <Input placeholder={windowsData.userType} id="userType" inputProps={{ 'aria-label': 'description' }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%', textAlign: 'left' }}>
                                        密码:
                                    </td>
                                    <td style={{ width: '30%', textAlign: 'center'}}>
                                        <Input placeholder={windowsData.password} id="password" inputProps={{ 'aria-label': 'description' }} />
                                    </td>
                                    <td style={{ width: '20%', textAlign: 'left' }}>
                                        注册邮箱:
                                    </td>
                                    <td style={{ width: '30%', textAlign: 'center'}}>
                                        <Input placeholder={windowsData.email} id="email" inputProps={{ 'aria-label': 'description' }} />
                                    </td>
                                </tr>
                            </table>
                            <br /><br />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus variant="contained" onClick={handleClickOpen} size="medium" color="primary">
                                提交
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            )
        } else {
            return <Button variant="outlined" disabled>编辑</Button>
        }
    }
    return (
      <Page title="用户管理">
        {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <Container maxWidth={ 400 }>
          <HeaderBreadcrumbs
            heading="用户管理"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '系统管理' },
              { name: '用户管理' },
            ]}
          />
          <Card>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return(
                                    <TableCell key={column.id} align={column.align}>
                                        {typeof value === 'boolean' ? dataManageSet(value,row) : value}
                                    </TableCell>
                                )
                            })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
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
  
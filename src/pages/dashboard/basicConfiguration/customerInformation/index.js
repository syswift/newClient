import sumBy from 'lodash/sumBy';0
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { useTheme } from '@mui/material/styles';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
  // routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
  // hooks
import useTabs from '../../../../hooks/useTabs';
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
  // layouts
import Layout from '../../../../layouts';
  // components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../components/table';
// sections
import InvoiceAnalytic from '../../../../sections/@dashboard/invoice/InvoiceAnalytic';
import {TransTableRow, TransTableToolbar} from '../../../../sections/@dashboard/basicConfiguration/customerInformationList';
import { supabase } from '../../../../../api';
import LoadingScreen from '../../../../components/LoadingScreen'; //import载入画面

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];
const TABLE_HEAD = [
  { id: 'customerCode', label: '客户代码', align: 'center', width: 100 },
  { id: 'customerName', label: '客户名称', align: 'center', width: 100  },
  { id: 'companyCode', label: '公司编码', align: 'center' , width: 100 },
  { id: 'dataState', label: '状态', align: 'center', width: 100 },
  { id: 'province', label: '省', align: 'center', width: 50 },
  { id: 'city', label: '市', align: 'center', width: 50  },
  { id: 'district', label: '区', align: 'center', width: 50  },
  { id: 'address', label: '地址', align: 'center', width: 100  },
  { id: 'country', label: '国家', align: 'center', width: 50  },
  { id: 'countryCode', label: '国家代码', align: 'center', width: 100  },
  { id: 'contact1', label: '联系人1', align: 'center' , width: 100 },
  { id: 'position1', label: '职位1', align: 'center' , width: 80 },
  { id: 'phone1', label: '联系方式1', align: 'center' , width: 100 },
  { id: 'email1', label: '邮箱1', align: 'center' , width: 80 },
  { id: 'contact2', label: '联系人2', align: 'center' , width: 100 },
  { id: 'position2', label: '职位2', align: 'center', width: 80  },
  { id: 'phone2', label: '联系方式2', align: 'center', width: 100  },
  { id: 'email2', label: '邮箱2', align: 'center', width: 80  },
  { id: '' ,align: 'center'},
];

// ----------------------------------------------------------------------

CustomerInformation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CustomerInformation() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const [allTrans, setallTrans] = useState([]);
  const [isInitialized, setisInitialized] = useState(true);  //判断是否在loading

  useEffect(()=>{
    async function fetchData()
    {
        //console.log(supabase.auth.user().id);
        setisInitialized(false); //await抓取database数据前改成false

        const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
        try {
            let all = {};
            if(processObj.body.currentProject)
            {
                all = await supabase.from('customer').select().match({
                    processPer: processObj.body.name,
                    projectName: processObj.body.currentProject
                });
            }
            else if(await processObj.body.auth_level === '管理')
            {
                all = await supabase.from('customer').select();
            }
            else{
                all = await supabase.from('customer').select().match({
                    processPer: processObj.body.name
                });
            }
            setallTrans(all.data);

            setisInitialized(true); //await都运行完了改成true
        } catch (error) {
            console.log(error);
        }
        console.log(allTrans);
    }
    fetchData();
    },[])

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = allTrans.filter((row) => row.id !== id);
    setSelected([]);
    setallTrans(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = allTrans.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setallTrans(deleteRows);
  };

  const handleEditRow = (id) => {
    // push(PATH_DASHBOARD.basicConfiguration.editCustomer(id));
    push(PATH_DASHBOARD.basicConfiguration.customerView(id));
  };

  const handleViewRow = (id) => {
    // push(PATH_DASHBOARD.invoice.view(id));
    push(PATH_DASHBOARD.basicConfiguration.bindingTerminal(id));
  };

  const dataFiltered = applySortFilter({
    allTrans,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status) => allTrans.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      allTrans.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / allTrans.length) * 100;

  const TABS = [
    { value: 'all', label: '全部', color: 'info', count: allTrans.length },
    { value: true, label: '可用', color: 'success', count: getLengthByStatus(true) },
    { value: false, label: '不可用', color: 'warning', count: getLengthByStatus(false) },
  ];

  //如果没载入好显示loading页面
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  else{
    return (
      <Page title="客户信息">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="客户信息"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '基础配置', herf: PATH_DASHBOARD.customerInformation },
              { name: '客户信息'},
            ]}
            action={
              <NextLink href={PATH_DASHBOARD.basicConfiguration.newCustomer} passHref>
                  <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                      新增客户
                  </Button>
              </NextLink>
            }
          />
          <Card sx={{ mb: 3 }}>
            <Scrollbar>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2 }}
              >
                <InvoiceAnalytic
                  title="合计"
                  total={allTrans.length}
                  percent={100}
                  price={sumBy(allTrans, 'totalPrice')}
                  icon="ic:round-receipt"
                  color={theme.palette.info.main}
                />
                <InvoiceAnalytic
                  title="可用"
                  total={getLengthByStatus(true)}
                  percent={getPercentByStatus(true)}
                  price={getTotalPriceByStatus(true)}
                  icon="eva:checkmark-circle-2-fill"
                  color={theme.palette.success.main}
                />
                <InvoiceAnalytic
                  title="不可用"
                  total={getLengthByStatus(false)}
                  percent={getPercentByStatus(false)}
                  price={getTotalPriceByStatus(false)}
                  icon="eva:clock-fill"
                  color={theme.palette.warning.main}
                />
              </Stack>
            </Scrollbar>
          </Card>
          <Card>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatus}
              onChange={onFilterStatus}
              sx={{ px: 2, bgcolor: 'background.neutral' }}
            >
              {TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={<Label color={tab.color}> {tab.count} </Label>}
                  label={tab.label}
                />
              ))}
            </Tabs>

            <Divider />

            <TransTableToolbar
              filterName={filterName}
              filterService={filterService}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              onFilterName={handleFilterName}
              onFilterService={handleFilterService}
              onFilterStartDate={(newValue) => {
                setFilterStartDate(newValue);
              }}
              onFilterEndDate={(newValue) => {
                setFilterEndDate(newValue);
              }}
              optionsService={SERVICE_OPTIONS}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 1750, position: 'relative' }}>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={allTrans.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        allTrans.map((row) => row.id)
                      )
                    }
                    actions={
                      <Stack spacing={1} direction="row">
                        <Tooltip title="Sent">
                          <IconButton color="primary">
                            <Iconify icon={'ic:round-send'} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Download">
                          <IconButton color="primary">
                            <Iconify icon={'eva:download-outline'} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Print">
                          <IconButton color="primary">
                            <Iconify icon={'eva:printer-fill'} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    }
                  />
                )}

                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={allTrans.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        allTrans.map((row) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TransTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, allTrans.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />

              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="紧凑"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Card>
        </Container>
      </Page>
    );
  }
}

// ----------------------------------------------------------------------

function applySortFilter({
  allTrans,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = allTrans.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  allTrans = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    allTrans = allTrans.filter(
      (item) =>
        item.customerId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.customerName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    allTrans = allTrans.filter((item) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    allTrans = allTrans.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    allTrans = allTrans.filter(
      (item) =>
        item.createDate.getTime() >= filterStartDate.getTime() && item.createDate.getTime() <= filterEndDate.getTime()
    );
  }

  return allTrans;
}
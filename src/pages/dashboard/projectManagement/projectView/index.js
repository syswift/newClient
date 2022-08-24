import sumBy from 'lodash/sumBy';
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
  // _mock_
import { _invoices } from '../../../../_mock';
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
import {TransTableRow, TransTableToolbar} from '../../../../sections/@dashboard/trans/list';
import { supabase } from '../../../../../api';
import LoadingScreen from '../../../../components/LoadingScreen';

// ----------------------------------------------------------------------

const CUSTOMER_OPTIONS = [];

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: '周转单号', align: 'center' },
  { id: 'createDate', label: '创建日期', align: 'center' },
  { id: 'dueDate', label: '客户代码', align: 'center' },
  { id: 'price', label: '终端代码', align: 'center', width: 140 },
  { id: 'sent', label: '周转单类型', align: 'center', width: 140 },
  { id: 'status', label: '周转单状态', align: 'center' },
  { id: 'processPer', label: '创建人', align: 'center' },
  { id: '' ,align:'center'},
];

// ----------------------------------------------------------------------

TurnoverOrderManagement.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TurnoverOrderManagement() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const [allTrans, setallTrans] = useState([]);
  const [isInitialized, setisInitialized] = useState(true);

  useEffect(()=>{
    async function fetchData()
    {
        setisInitialized(false);
        const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
        try {
            let all = {};
            if(processObj.body.currentProject)
            {
                all = await supabase.from('trans').select().match({
                    processPer: processObj.body.name,
                    projectName: processObj.body.currentProject
                });
            }
            else if(await processObj.body.auth_level === '管理')
            {
                all = await supabase.from('trans').select();
            }
            else{
                all = await supabase.from('trans').select().match({
                    processPer: processObj.body.name
                });
            }
            setallTrans(all.data);
            setisInitialized(true);

        } catch (error) {
            console.log(error);
        }        
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
  } = useTable({ defaultOrderBy: 'processPer' });

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
    push(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (row) => {
    // push(PATH_DASHBOARD.invoice.view(id));
    push(PATH_DASHBOARD.turnoverManagement.viewTurnoverOrder);
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

  const getLengthByStatus = (status) => allTrans.filter((item) => item.transState === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      allTrans.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / allTrans.length) * 100;

  const TABS = [    //filter的值
    { value: 'all', label: '全部', color: 'info', count: allTrans.length },
    { value: '完成', label: '完成', color: 'success', count: getLengthByStatus(false) },
    { value: '新增', label: '新增', color: 'warning', count: getLengthByStatus(true) },
  ];

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  else{
  return (
    <Page title="查看项目">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="查看项目"
          links={[
            { name: '主页', href: PATH_DASHBOARD.root },
            { name: '项目管理', herf: PATH_DASHBOARD.projectManagement.root },
          ]}
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
                title="完成"
                total={getLengthByStatus(false)}
                percent={getPercentByStatus(false)}
                price={getTotalPriceByStatus(false)}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="新增"
                total={getLengthByStatus(true)}
                percent={getPercentByStatus(true)}
                price={getTotalPriceByStatus(true)}
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
            optionsService={CUSTOMER_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000, position: 'relative', overflow:'unset' }}>
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

  //搜索框
  if (filterName) {
    allTrans = allTrans.filter(
      (item) =>
        item.transId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.processPer.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.customerId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.termId.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.transType.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  //console.log(filterStatus);

  if (filterStatus !== 'all') {
    allTrans = allTrans.filter((item) => (item.transState === true ? '新增' : '完成') === filterStatus);
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

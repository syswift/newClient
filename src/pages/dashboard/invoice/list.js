import sumBy from 'lodash/sumBy';
import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { useTheme } from '@mui/material/styles';
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
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import useLocales from '../../../hooks/useLocales';
// _mock_
import { _invoices } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import InvoiceAnalytic from '../../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../../sections/@dashboard/invoice/list';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

// ----------------------------------------------------------------------

InvoiceList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceList() {

  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'invoiceNumber', label:(translate('main.User')) , align: 'left' },
    { id: 'createDate', label:(translate('main.Dcreate')), align: 'left' },
    { id: 'dueDate', label:(translate('main.Ddue')), align: 'left' },
    { id: 'price', label:(translate('main.Sum')), align: 'center', width: 140 },
    { id: 'sent', label:(translate('main.Sent')), align: 'center', width: 140 },
    { id: 'status', label:(translate('main.Status')), align: 'left' },
    { id: '' },
  ];

  const theme = useTheme();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

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

  const [tableData, setTableData] = useState(_invoices);

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
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    push(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
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

  const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;



  const TABS = [
    { value: 'all', label: (translate('main.All')), color: 'info', count: tableData.length },
    { value: 'paid', label: (translate('main.Paid')), color: 'success', count: getLengthByStatus('paid') },
    { value: 'unpaid', label: (translate('main.Unpaid')), color: 'warning', count: getLengthByStatus('unpaid') },
    { value: 'overdue', label: (translate('main.Overdue')), color: 'error', count: getLengthByStatus('overdue') },
    { value: 'draft', label: (translate('main.Draft')), color: 'default', count: getLengthByStatus('draft') },
  ];

  return (
    <Page title={translate('main.InvoiceList')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('main.InvoiceList')}
          links={[
            { name: (translate('main.InvoiceList')), href: PATH_DASHBOARD.root },
            { name: (translate('main.Invoice')), href: PATH_DASHBOARD.invoice.root },
            { name: (translate('main.List')) },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.invoice.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                {translate('main.New')}
              </Button>
            </NextLink>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title={translate('main.All')}
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalPrice')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title={translate('main.Paid')}
                total={getLengthByStatus('paid')}
                percent={getPercentByStatus('paid')}
                price={getTotalPriceByStatus('paid')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title={translate('main.Unpaid')}
                total={getLengthByStatus('unpaid')}
                percent={getPercentByStatus('unpaid')}
                price={getTotalPriceByStatus('unpaid')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title={translate('main.Overdue')}
                total={getLengthByStatus('overdue')}
                percent={getPercentByStatus('overdue')}
                price={getTotalPriceByStatus('overdue')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
              <InvoiceAnalytic
                title={translate('main.Draft')}
                total={getLengthByStatus('draft')}
                percent={getPercentByStatus('draft')}
                price={getTotalPriceByStatus('draft')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
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

          <InvoiceTableToolbar
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
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title={translate('main.Send')}>
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={translate('main.Download')}>
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={translate('main.Print')}>
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={translate('main.Delete')}>
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
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InvoiceTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

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
              label={translate('main.Dense')}
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) =>
        item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        item.createDate.getTime() >= filterStartDate.getTime() && item.createDate.getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}

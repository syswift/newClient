import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails() {
  const theme = useTheme();

  const ladingBillFrom={
    name: '李先生',
    address: '北京市昌平区',
    information: '略'
  }
  const ladingBillTo={
    companyName: '科技有限公司',
    address: '上海市徐汇区',
    name: '王先生',
    phone: '152XXXXXXXX',
  }
  const ladingBillData={
    notify: '李先生',
    transportationMode: '空运',
    paymentMethod: '预付款',
    departurePort:'北京',
    destinationPort: '上海',
    tradeTerms: 'CFR',
    ladingBill: '略',
    marks: '略'
  }
  const tableData=[
    {
      description:'该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。',
      boxID:'789D2S',
      weight:'32kg',
      size:'32cm*500cm*600cm',
    },
    {
      description:'该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。',
      boxID:'284Y5S',
      weight:'40kg',
      size:'32cm*100cm*600cm',
    },
    {
      description:'该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。该段为商品的一段描述。',
      boxID:'439Q5Q',
      weight:'50kg',
      size:'32cm*600cm*300cm',
    }
  ]

  return (
    <>
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image disabledEffect visibleByDefault alt="logo" src="/logo/logo_single.svg" sx={{ maxWidth: 120 }} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="h6">TD-{'5146354'}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
              发货人信息
            </Typography>
            <Typography variant="body1">名称:{ladingBillFrom.name}</Typography>
            <Typography variant="body1">地址:{ladingBillFrom.address}</Typography>
            <Typography variant="body1">详细资料: {ladingBillFrom.information}</Typography>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
              收货人信息
            </Typography>
            <Typography variant="body1">公司名称:{ladingBillTo.companyName}</Typography>
            <Typography variant="body1">地址:{ladingBillTo.address}</Typography>
            <Typography variant="body1">联系人:{ladingBillTo.name}</Typography>
            <Typography variant="body1">联系电话: {ladingBillTo.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
              通知人
            </Typography>
            <Typography variant="body1">{ladingBillData.notify}</Typography>
            {/* <Typography variant="body1">唛头:{ladingBillData.marks}</Typography> */}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
              运输信息
            </Typography>
            <Typography variant="body1">运输方式:{ladingBillData.transportationMode}</Typography>
            <Typography variant="body1">运费:{ladingBillData.paymentMethod}</Typography>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
              出货地
            </Typography>
            <Typography variant="body1">{ladingBillData.departurePort}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
            目的地
            </Typography>
            <Typography variant="body1">{ladingBillData.destinationPort}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
            贸易条款
            </Typography>
            <Typography variant="body1">{ladingBillData.tradeTerms}</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
            提单
            </Typography>
            <Typography variant="body1">{ladingBillData.ladingBill}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={90}>编号</TableCell>
                  <TableCell align="center">商品描述</TableCell>
                  <TableCell align="center">箱号</TableCell>
                  <TableCell align="center">重量</TableCell>
                  <TableCell align="center">尺寸</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.description}</Typography>

                      </Box>
                    </TableCell>
                    <TableCell align="center">{row.boxID}</TableCell>
                    <TableCell align="center">{row.weight}</TableCell>
                    <TableCell align="center">{row.size}</TableCell>
                  </TableRow>
                ))}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">费用</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{'$89.05'}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }} >
              唛头
            </Typography>
            <Typography variant="body1">{ladingBillData.marks}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6" sx={{ color: 'text.disabled' }}>
            发货方单证联系人
            </Typography>
            <Typography variant="body1">{ladingBillData.notify}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">补充</Typography>
            <Typography variant="body2">
              感谢您的信任。如果您需要我们增加增值税或额外的票据，请告诉我们!
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">如有其它疑问</Typography>
            <Typography variant="body2">请联系XXXXXX@163.COM</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

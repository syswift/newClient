import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Container,
  List,
  Paper,
  Avatar,
  Switch,
  Divider,
  Collapse,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import {supabase} from '../../../../../../api';
import {fetchTable} from '../../../../../../api/fetchTable';
import { Block } from '../../../../../sections/overview/Block';
import Iconify from '../../../../../components/Iconify';
import LoadingScreen from '../../../../../components/LoadingScreen';

NewSupplier.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
NewSupplier.prototype = {
    
}

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`,
}));
// ----------------------------------------------------------------------

export default function NewSupplier() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const [cus, setcus] = useState({});
  const [allTerm, setallTerm] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [isInitialized, setisInitialized] = useState(true);

  const handleCheck = (value) => async () => {
    console.log(checked);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    setisInitialized(false);
    if (currentIndex === -1) {
     try {
        const error = await supabase.from('terminal').update({
          customerId: cus.customerId
        }).match({
          id: value
        });
        if(error) throw error;
      } catch (error) {
        console.log(error);
      }
      //const temp = allTerm;
      newChecked.push(value);
    } else {
      try {
        const error = await supabase.from('terminal').update({
          customerId: null
        }).match({
          id: value
        });
        if(error) throw error;
      } catch (error) {
        console.log(error);
      }
      newChecked.splice(currentIndex, 1); 
    }
    setisInitialized(true);
    setChecked(newChecked);
    //Router.reload();
  };

  useEffect(()=>{
    
    async function fetchData()
    {
      setisInitialized(false);
      //获得当前用户
      const all = await fetchTable('customer',id);
      //console.log(all);
      setcus(all.data);

      //获得所有终端
      const all2 = await fetchTable('terminal');
      //console.log(all2);
      setallTerm(all2.data);

      setisInitialized(true);

      const newChecked = [...checked];
      for(const term of all2.data)
      {
        //console.log(all.data.customerId,term.customerId);
        if (all.data.customerId === term.customerId) {
          newChecked.push(term.id);
        } 
      }
      setChecked(newChecked);
      console.log(checked);
    }

    fetchData();
    
    },[]);

    const handleCheck1 = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };
  

    if (!isInitialized) {
      return <LoadingScreen />;
    }

    else{
    return ( 
      <Page title="绑定终端">
        <Container maxWidth={themeStretch ? false : 'lg'}>
        
          <HeaderBreadcrumbs
            heading="绑定终端"
            links={[
              { name: '基础配置', href: PATH_DASHBOARD.root },
              { name: '终端客户信息', href: PATH_DASHBOARD.basicConfiguration.customerInformation },
              { name: '绑定终端' },
            ]}
          />
          <Card sx={{ mb: 3,p:3}}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            请选择该客户绑定的终端
          </Typography>
          <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
          <table >
              <tr style={{textAlign:'center'}} fullWidth>
                  <td style={{ width: '25%', textAlign: 'center',fontSize: '20px' }}>
                      客户代码:
                  </td>
                  <td style={{ width: '25%', textAlign: 'center' ,fontWeight:'bold',fontSize: '20px' }}>
                      {cus.customerId}
                  </td>
                  <td style={{ width: '25%', textAlign: 'left',fontSize: '20px' }}>
                      客户名称:
                  </td>
                  <td style={{ width: '25%', textAlign: 'center' ,fontWeight:'bold' ,fontSize: '20px'}}>
                      {cus.customerName}
                  </td>
              </tr>
          </table>
          <Block title="终端列表">
              <ListWrapperStyle>
                <List>
                  {allTerm.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                      <ListItemButton key={value.id} role={undefined} dense onClick={handleCheck(value.id)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value.termId}`} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end">
                            <Iconify icon="ic:round-mode-comment" width={24} height={24} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItemButton>
                    );
                  })}
                </List>
              </ListWrapperStyle>
            </Block>
              {/* </Block> */}
          </Card>
        </Container>
      </Page>
    );
    }
}

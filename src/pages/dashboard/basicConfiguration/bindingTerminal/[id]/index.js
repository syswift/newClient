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

  const handleCheck = (value) => async () => {
    const currentIndex = checked.indexOf(value);
    console.log(currentIndex);
    const newChecked = [...checked];
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
      const temp = allTerm;
      console.log(temp);
      newChecked.push(value);
      //Router.reload();
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
      //Router.reload();
    }
    setChecked(newChecked);
  };

  useEffect(()=>{
    async function fetchData()
    {
      //获得当前用户
      const all = await fetchTable('customer',id);
      //console.log(all);
      setcus(all.data);

      //获得所有终端
      const all2 = await fetchTable('terminal');
      //console.log(all2);
      setallTerm(all2.data);
    }
    fetchData();
    },[]);

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
        <Card>
        <Block title='勾选要绑定给此客户的终端'>
          {'客户代码: '+cus.customerId+' '+'客户名称: '+cus.customerName}
              <ListWrapperStyle>
                <List>
                  {allTerm.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                      <ListItemButton key={value.id} role={undefined} dense onClick={handleCheck(value.id)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={value.customerId === cus.customerId}
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
        </Card>
      </Container>
    </Page>
  );
}

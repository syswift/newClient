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
  
import React, { useReducer } from "react";
import styles from "../../../../styles/Home.module.css";
import Allfiles from '../../../components/allFiles';


  FileDownload.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function FileDownload() {
    const { themeStretch } = useSettings();
    return (
      <Page title="文件下载">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="文件下载"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '系统管理' },
              { name: '文件下载' },
            ]}
          />
          <Card>
            <Allfiles />
          </Card>
        </Container>
      </Page>
    );
  }
  
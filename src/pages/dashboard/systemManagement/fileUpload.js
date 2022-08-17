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
  import DropZone from "../../../components/DropZone";

  FileUpload.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  // ----------------------------------------------------------------------
  
  export default function FileUpload() {
    const { themeStretch } = useSettings();
    const reducer = (state, action) => {
      switch (action.type) {
        case "SET_IN_DROP_ZONE":
          return { ...state, inDropZone: action.inDropZone };
        case "ADD_FILE_TO_LIST":
          return { ...state, fileList: state.fileList.concat(action.files) };
        default:
          return state;
      }
    };
    // destructuring state and dispatch, initializing fileList to empty array
    const [data, dispatch] = useReducer(reducer, {
      inDropZone: false,
      fileList: [],
    });

    return (
      <Page title="文件上传">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="文件上传"
            links={[
              { name: '主页', href: PATH_DASHBOARD.root },
              { name: '系统管理' },
              { name: '文件上传' },
            ]}
          />
          <Card>
            <DropZone data={data} dispatch={dispatch} bucket='userfiles' />
          </Card>
        </Container>
      </Page>
    );
  }
  
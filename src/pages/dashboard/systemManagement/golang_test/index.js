import Page from '../../../../components/Page';
import LoadingScreen from '../../../../components/LoadingScreen'; //import载入画面
import { useEffect,useState } from 'react';
import {
    Typography,
    Paper,
    Stack,
    Card,
    Button,
    Container,
    Divider,
} from '@mui/material';
import useSettings from '../../../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Scrollbar from '../../../../components/Scrollbar';
// layouts
import Layout from '../../../../layouts';
// utils
import PropTypes from 'prop-types';
// utils
import axios from '../../../../utils/axios';
import * as ReactDOM from 'react-dom';

// ----------------------------------------------------------------------

Golang_test.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const TYPOGRAPHYS = [
    { label: 'output', variant: 'h2' },
    { label: 'send', variant: 'h2' },
    { label: 'received', variant: 'h2' },
];
  
BlockVariant.propTypes = {
    font: PropTypes.shape({
      label: PropTypes.string,
      variant: PropTypes.oneOf([
        'h2',
      ]),
    }),
  };
  
// ----------------------------------------------------------------------

export default function Golang_test() {

    const { themeStretch } = useSettings();
    const [isInitialized, setisInitialized] = useState(true);  //判断是否在loading

    useEffect(() => {
        async function fetchData()
        {
            setisInitialized(false);
            setisInitialized(true);
        }

        fetchData();
    },[])

    const test = async () => {
        const Output = document.getElementById('output');
        const Send = document.getElementById('send');
        const Received = document.getElementById('received');

        setisInitialized(false);
            const response = await axios.post("http://localhost:5000");

            Send.innerHTML = "empty post request";
            Received.innerHTML = JSON.stringify(response.data, undefined, 4);
            Output.innerHTML = response.data.message;
            console.log(response.data);
        setisInitialized(true);
    }

    if (!isInitialized) {
        return <LoadingScreen />;
      }
      else{
        return (
            <Page title="golang测试">
                <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="golang测试"
                    links={[
                        { name: '主页', href: PATH_DASHBOARD.root },
                        { name: 'golang测试', herf: PATH_DASHBOARD.systemManagement.golang_test },
                    ]}
                />
                <Card sx={{ mb: 3 }}>
                    <Scrollbar>
                        <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                        sx={{ px: 2, py: 2 }}
                        >
                            <Button variant="contained" onClick={test}>
                                测试
                            </Button>
                        </Stack>
                    </Scrollbar>
                </Card>
                <Card>
                    <Stack spacing={3}>
                        {TYPOGRAPHYS.map((font) => (
                        <BlockVariant key={font.variant} font={font} />
                        ))}
                    </Stack>
                </Card>
                </Container>
            </Page>
        );
    }
}

function BlockVariant({ font }) {  
    const { variant, label } = font;
  
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 1}}>
        <Typography variant={variant} gutterBottom>
          {label}
        </Typography>
  
        <Typography id={label} variant="body2" sx={{ color: 'text.secondary' }}>
            Nothing {label} yet ....
        </Typography>
      </Paper>
    );
  }
  
import * as React from 'react';
import './Layout.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Sidebar from '../Sidebar/Index';
const DrawerHeader = styled('div')(({ theme }) => ({    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));
export default function Layout({ children, refState, setRefState, setRefStatenew, refStatenew }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar setRefState={setRefState} refState={refState} setRefStatenew={setRefStatenew} refStatenew={refStatenew} />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }} className='padding-set'>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
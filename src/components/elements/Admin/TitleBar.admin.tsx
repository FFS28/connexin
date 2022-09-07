import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import React, {useContext} from 'react';
import { Button, Divider } from "@mui/material";
import { styled } from '@mui/material/styles';

import { AppContext } from '../../../provider/index.provider';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(2),
    color: "black",
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: "8vh",
    },
}));

export default function TitleBar({ icon, title }: { icon : any, title: string }) {

    const {appState, setAppState} = useContext(AppContext)

    const logout = ()=>{
        setAppState({...appState, pageState: {...appState.pageState, curLayout: "WelcomeLayout", curPage : "SignIn"}})
    }

    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <AppBar position="static" sx={{ background: "none", transition: "none", boxShadow: "none", padding: 0 }}>
                <StyledToolbar>
                    {icon} 
                    <Typography variant="h5" component="label" sx={{ color: "black", justifyContent: "center", fontWeight: 300, marginLeft: "10px" }} >{title}</Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Button color="secondary" size='small' variant="outlined" onClick={logout} endIcon={<LogoutIcon />} >Logout</Button>
                </StyledToolbar>
            </AppBar>
            <Divider />
        </Box>
    );
}
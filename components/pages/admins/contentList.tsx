import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import StreamIcon from '@mui/icons-material/Stream';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import DvrIcon from '@mui/icons-material/Dvr';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import DraftsIcon from '@mui/icons-material/Drafts';
import DescriptionIcon from '@mui/icons-material/Description';
import React, { ReactNode, useContext } from 'react';
import { AppContext } from '../../../utils/providers/context';
import { styled } from '@mui/system';

const AdminListArray = [
    [
        {
            Label : "Patients",
            Icon : <GroupsIcon fontSize='small' />,
        },
        {
            Label : "Procedure",
            Icon : <DraftsIcon />,
        },
        {
            Label : "QuestionNiare",
            Icon : <DraftsIcon />,
        }
    ],
    [
        {
            Label : "Role Management",
            Icon : <GroupsIcon fontSize='small' />,
        },
        {
            Label : "Service Management",
            Icon : <DraftsIcon />,
        },
        {
            Label : "Consultant Management",
            Icon : <DraftsIcon />,
        },
        {
            Label : "Procedure Management",
            Icon : <DraftsIcon />,
        },
        {
            Label : "Pre-op Questionnaire",
            Icon : <DraftsIcon />,
        },
        {
            Label : "Text Reminder",
            Icon : <DraftsIcon />,
        },
        {
            Label : "Service Email",
            Icon : <DraftsIcon />,
        }
    ],
    [
        {
            Label : "Dashboard",
            Icon : <DvrIcon fontSize='small' />
        },
        {
            Label : "Add User",
            Icon : <PeopleAltIcon fontSize='small' />,
        },
        {
            Label : "Add Role",
            Icon : <SettingsSuggestIcon fontSize='small' />,
        },
        {
            Label : "Access Right",
            Icon : <StackedBarChartIcon fontSize='small' />,
        },
        {
            Label : "Service Directory",
            Icon : <WifiTetheringIcon fontSize='small' />,
        },
        {
            Label : "Set Up Consultant",
            Icon : <StreamIcon fontSize='small' />,
        },
        {
            Label : "Set Up Procedure",
            Icon : <AccountTreeIcon fontSize='small' />,
        },
        {
            Label : "Send Pre-Op Questionnaire",
            Icon : <SendIcon fontSize='small' />,
        },
        {
            Label : "Set Up Text Reminder",
            Icon : <MessageIcon fontSize='small' />,
        },
        {
            Label : "Add, Amend Questions",
            Icon : <DynamicFormIcon fontSize='small' />,
        },
        {
            Label : "Report",
            Icon : <DescriptionIcon fontSize='small' />,
        },
    ]
]

const CustomList = styled(List)({
    root: {
        "& .Mui-selected": {
            backgroundColor: "lightgrey",
            color: "black",
            fontWeight: "bold"
        },
        "& .Mui-selected:hover": {
            backgroundColor: "pink"
        }
    }
})

export default function ContentList({index, handleChange}: {index: number, handleChange: (param: number) => void}) {
    const {appState} = useContext(AppContext)

    return (
        <Box sx={{ width: '100%'}}>
            <CustomList>
                {AdminListArray[appState.user.level - 1].map((item : {Label: string, Icon: ReactNode}, selindex: number) => {
                    return (
                        <ListItemButton key={selindex} selected={selindex === index} onClick={ () => {handleChange(selindex)}} >
                            <ListItemIcon sx={{ color: selindex === index ? "black" : "white", minWidth : "30px" }}> {item.Icon} </ListItemIcon>
                            <ListItemText primaryTypographyProps={{fontSize: '12px'}} primary={item.Label} sx={{color: selindex === index ? "black" : "white"}} />
                        </ListItemButton>        
                    )
                })}
            </CustomList>
        </Box>
    );
}

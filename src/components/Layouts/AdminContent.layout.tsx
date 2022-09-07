import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
import DescriptionIcon from '@mui/icons-material/Description';
import React, {useContext, useEffect, useState} from 'react';
import { Box, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageMark from '../elements/ImageMark';
import AdminList from '../subPages/Admin/ManageUser/List.admin';
import TitleBar from '../elements/Admin/TitleBar.admin';
import AccessRight from '../subPages/Admin/ManageUser/AccessRight.admin';
import SetupEmailAddress from '../subPages/Admin/ManageUser/SetupEmailAddress.admin';
import UserManagement from '../subPages/Admin/pages/userManagement';
import RoleManagement from '../subPages/Admin/pages/RoleManagement';
import ServiceManagement from '../subPages/Admin/pages/ServiceManagement';
import ConsultantManagement from '../subPages/Admin/pages/ConsultantManagement';
import ProcedureManagement from '../subPages/Admin/pages/procedureManagement';
import TextRemainderManagement from '../subPages/Admin/pages/TextRemainderManagement';
import PreOpQusManagement from '../subPages/Admin/pages/preOpQusManagement';
import QuestionSectionsManagement from '../subPages/Admin/pages/QuestionSectionsManagement';
import ReportManagement from '../subPages/Admin/pages/ReportManagement';

import { AppContext } from '../../provider/index.provider';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    borderRadius: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: "100vh",
    color: theme.palette.text.secondary,
}));


const AdminTitle = [
    [
        {title : "Add New Patients", icons: <ManageAccountsIcon fontSize='large' />},
        {title : "Set Procedure", icons : <ManageAccountsIcon fontSize='large' />},
        {title : "Add/Edit QuestionNiare", icons : <ManageAccountsIcon fontSize='large' />}
    ],
    [
        {title : "Role Management", icons : <ManageAccountsIcon fontSize='large' />},
        {title : "Service Management", icona : <ManageAccountsIcon fontSize='large' />},
        {title : "Consultant Management", icons : <ManageAccountsIcon fontSize='large' />},
        {title : "Procedure Management", icons : <ManageAccountsIcon fontSize='large' />},
        {title : "Pre-op Questionnaire Management", icons : <ManageAccountsIcon fontSize='large' />},
        {title : "Text Reminder Management", icons : "users"},
        {title : "Service Email Management", icons : "users"}
    ],
    [
        {title : "Setup User", icons : <PeopleAltIcon fontSize='large' /> },
        {title : "Add Role", icons : <SettingsSuggestIcon fontSize='large' /> },
        {title : "Access Right", icons : <StackedBarChartIcon fontSize='large' /> },
        {title : "Service Directory", icons : <WifiTetheringIcon fontSize='large' /> },
        {title : "Setup Consultant", icons : <StreamIcon fontSize='large' /> },
        {title : "Set up Procedure", icons : <AccountTreeIcon fontSize='large' /> },
        {title : "Send Pre-Op Questionnaire", icons : <SendIcon fontSize='large' /> },
        {title : "Setup Text Reminder", icons : <MessageIcon fontSize='large' /> },
        {title : "Add, Amend Questions", icons : <DynamicFormIcon fontSize='large' /> },
        {title : "Report", icons : <DescriptionIcon fontSize='large' />}
    ]
]

const ShowContent = [
    [],
    [
        <RoleManagement key={1} />, 
        <ServiceManagement key={2} />, 
        <ConsultantManagement key={3} />, 
        <ProcedureManagement key={4} />, 
        <PreOpQusManagement key={5} />,
        <TextRemainderManagement key={6} />, 
        <SetupEmailAddress key={7} />
    ],
    [
        <UserManagement key={1} />, 
        <RoleManagement key={2} />, 
        <AccessRight key={3} />, 
        <ServiceManagement key={4} />, 
        <ConsultantManagement key={5} />, 
        <ProcedureManagement key={6} />, 
        <PreOpQusManagement key={7} />, 
        <TextRemainderManagement key={8} />, 
        <QuestionSectionsManagement key={9} />, 
        <ReportManagement key={10} />
    ]
]

export default function AdminContent() {
        
    const [category, setCategory] = useState(0)
    const {appState, setAppState} = useContext(AppContext)

    const changeCategory = (value: number) => {
        setCategory(value)
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <Stack direction={"row"} >
                <Box sx={{minWidth: "250px", width: "16%"}} style={{background: "linear-gradient(#1559da, #3073ea, #5092ff)"}}>
                    <Box sx={{mt: 1, mb: 1, minHeight: "10vh"}}>
                        <ImageMark type="big1" />
                    </Box>
                    <Box sx={{mt: 1, mb: 1, minHeight: "10vh"}}>
                        <AdminList index={category} handleChange={changeCategory} />
                    </Box>
                </Box>
                <Box sx={{width : "100%"}} >
                    <Item sx={{pr: 4, pl: 8}} style={{background: '#f9f9f9'}}>
                        <Box sx={{pt: 1, pb: 1, pl: 2, pr: 2}} >
                            <TitleBar icon={AdminTitle[ appState.users.admin.level - 1 ][ category ].icons} title={AdminTitle[ appState.users.admin.level - 1 ][ category ].title} />
                        </Box>
                        <Box sx={{pt: 1, pb: 1, pl: 2, pr: 2}} >
                            {ShowContent[ appState.users.admin.level - 1 ][ category ]}
                        </Box>
                    </Item>
                </Box>
            </Stack>
        </Box>
    );
}

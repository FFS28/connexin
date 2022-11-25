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

// import AdminList from '../subPages/Admin/ManageUser/List.admin';
// import TitleBar from '../elements/Admin/TitleBar.admin';
// import AccessRight from '../subPages/Admin/ManageUser/AccessRight.admin';
// import SetupEmailAddress from '../subPages/Admin/ManageUser/SetupEmailAddress.admin';
// import UserManagement from '../subPages/Admin/pages/userManagement';
// import RoleManagement from '../subPages/Admin/pages/RoleManagement';
// import ServiceManagement from '../subPages/Admin/pages/ServiceManagement';
// import ConsultantManagement from '../subPages/Admin/pages/ConsultantManagement';
// import ProcedureManagement from '../subPages/Admin/pages/procedureManagement';
// import TextRemainderManagement from '../subPages/Admin/pages/TextRemainderManagement';
// import PreOpQusManagement from '../subPages/Admin/pages/preOpQusManagement';
// import QuestionSectionsManagement from '../subPages/Admin/pages/QuestionSectionsManagement';
// import ReportManagement from '../subPages/Admin/pages/ReportManagement';
// import Dashboard from '../subPages/Admin/ManageUser/Dashboard.admin';

import ImageMarker from '../../elements/markups/ImageMarker';
import { AppContext } from '../../../utils/providers/context';
import ContentList from './contentList';
import ContentTitle from './contentTitle';
import Dashboard from './subContents/Dashboard';
import UserSetting from './subContents/UserSetting';
import RoleSetting from './subContents/Rolesetting';
import LevelSetting from './subContents/LevelSetting';


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
        {title : "Dashboard", icons : <DvrIcon fontSize='large' /> },
        {title : "Add User", icons : <PeopleAltIcon fontSize='large' /> },
        {title : "Add Role", icons : <SettingsSuggestIcon fontSize='large' /> },
        {title : "Access Right", icons : <StackedBarChartIcon fontSize='large' /> },
        {title : "Service Directory", icons : <WifiTetheringIcon fontSize='large' /> },
        {title : "Set Up Consultant", icons : <StreamIcon fontSize='large' /> },
        {title : "Set Up Procedure", icons : <AccountTreeIcon fontSize='large' /> },
        {title : "Send Pre-Op Questionnaire", icons : <SendIcon fontSize='large' /> },
        {title : "Set Up Text Reminder", icons : <MessageIcon fontSize='large' /> },
        {title : "Add, Amend Questions", icons : <DynamicFormIcon fontSize='large' /> },
        {title : "Report", icons : <DescriptionIcon fontSize='large' />}
    ]
]

const CustomBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    minWidth: "250px", 
    width: "16%"
}));

const ShowContent = [
    [],
    [],
    [
        <Dashboard key={1} />,
        <UserSetting key={2} />, 
        <RoleSetting key={3} />, 
        <LevelSetting key={4} />, 
        // <ServiceManagement key={5} />, 
        // <ConsultantManagement key={6} />, 
        // <ProcedureManagement key={7} />, 
        // <PreOpQusManagement key={8} />, 
        // <TextRemainderManagement key={9} />, 
        // <QuestionSectionsManagement key={10} />, 
        // <ReportManagement key={11} />
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
                <CustomBox>
                    <Box sx={{ my: 1, minHeight: "10vh", textAlign: "center" }}>
                        <ImageMarker type="big1" />
                    </Box>
                    <Box sx={{ my: 1 }}>
                        <ContentList index={category} handleChange={changeCategory} />
                    </Box>
                </CustomBox>
                <Box sx={{width : "100%"}} >
                    <Item sx={{pr: 4, pl: 8}} style={{background: '#f9f9f9'}}>
                        <Box sx={{py: 4, px: 2}} >
                            <ContentTitle icon={AdminTitle[appState.user.level - 1][category].icons} title={AdminTitle[appState.user.level - 1][category].title} />
                        </Box>
                        <Box sx={{py: 4, px: 2}} >
                            {ShowContent[appState.user.level - 1][category]}
                        </Box>
                    </Item>
                </Box>
            </Stack>
        </Box>
    );
}

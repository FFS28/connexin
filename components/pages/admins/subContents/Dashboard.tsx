import React, {useState, useEffect, useContext} from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { makeJSON } from '../../../../utils/customFuntions/convertFunctions';
import { CallPostAPI } from '../../../../utils/customFuntions/callAPIFuntions';
import { FilterData } from '../../../../utils/customTypes/apiData';
import { AppContext } from '../../../../utils/providers/context';
import { ALERT_TYPE_ERROR } from '../../../../utils/constants';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));


function Dashboard() {
    const {appState, setAppState} = useContext(AppContext)
    const [filter, setFilter] = useState(0);
    const [sentCount, setSentCount] = useState(0);
    const [awaitCount, setAwaitCount] = useState(0);
    const [overdueCount, setOverdueCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const handleChange = (event: SelectChangeEvent<number>) => {
        setFilter(event.target.value as number);
    }

    useEffect(() => {
        CallPostAPI('/api/admins/filter', makeJSON({filterOption: filter})).then(res => {
            const data = res as FilterData;
            setSentCount(data.sent);
            setAwaitCount(data.await);
            setOverdueCount(data.overdue);
            setCompletedCount(data.completed);
        }).catch(rej => {
            setAppState({...appState, alert: {...appState.alert, open: true, messages: rej, type: ALERT_TYPE_ERROR}})
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    return (
        <div>
            <Box style={{padding: '12px 4px', height: '60px'}} >
                <Typography variant='h6' component={'h6'} align={'left'} style={{float: 'left'}} >Active filters</Typography>
                <FormControl variant='standard' style={{width: '200px', float: 'right'}}>
                    <Select value={filter} label="Age" onChange={ handleChange } >
                        <MenuItem value={0}>Last 28 days</MenuItem>
                        <MenuItem value={1}>Today</MenuItem>
                        <MenuItem value={2}>Last 7 days</MenuItem>
                        <MenuItem value={3}>Last 90 days</MenuItem>
                        <MenuItem value={4}>All time</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Paper elevation={0}>
                <Box style={{padding: '20px'}}>
                    <Typography variant='h5' component={'h5'} align={'left'} >Overview</Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{p:2}}>
                    <Item sx={{width: '25%', padding: '32px'}}>
                        <Typography variant='h3' component={'h3'} style={{marginBottom: '16px'}} >
                            { sentCount }
                        </Typography>
                        <Typography variant='subtitle1' component={'p'} >Questionnaires sent out</Typography>
                    </Item>
                    <Item sx={{width: '25%', padding: '32px'}}>
                        <Typography variant='h3' component={'h3'} style={{marginBottom: '16px'}} >
                            { awaitCount }
                        </Typography>
                        <Typography variant='subtitle1' component={'p'} >Questionnaires awaiting return</Typography>
                    </Item>
                    <Item sx={{width: '25%', padding: '32px'}}>
                        <Typography variant='h3' component={'h3'} style={{marginBottom: '16px'}} >
                            { overdueCount }
                        </Typography>
                        <Typography variant='subtitle1' component={'p'} >Questionnaires overdue</Typography>
                    </Item>
                    <Item sx={{width: '25%', padding: '32px'}}>
                        <Typography variant='h3' component={'h3'} style={{marginBottom: '16px'}} >
                            { completedCount }
                        </Typography>
                        <Typography variant='subtitle1' component={'p'} >Completed questionnaires</Typography>
                    </Item>
                </Stack>
            </Paper>
        </div>
    );
}

export default Dashboard;
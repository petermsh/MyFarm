import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import FarmList from "./FarmList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {observer} from "mobx-react-lite";


export default observer(function FarmDashboard() {
    
    const {farmStore} = useStore();
    const {loadFarms, farmRegistry} = farmStore;

    useEffect(() => {
        if (farmRegistry.size <= 1) loadFarms();
    }, [loadFarms, farmRegistry.size])
    
    if (farmStore.loadingInitial) return <LoadingComponent content='Loading farms...' />

    return (
        <Grid>
            <Grid.Column width='12'>
                <FarmList farms={[...farmRegistry.values()]}/>
            </Grid.Column>
        </Grid>
        
    )
})
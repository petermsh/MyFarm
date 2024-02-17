import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";
import {Button, Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import SeasonList from "./SeasonList";


export default observer(function SeasonDashboard() {
    
    const {seasonStore} = useStore();
    const {loadSeasons, seasonRegistry} = seasonStore;

    useEffect(() => {
        if (seasonRegistry.size <= 1) loadSeasons();
    }, [loadSeasons, seasonRegistry.size])
    
    if (seasonStore.loadingInitial) return <LoadingComponent content='Loading seasons...' />

    return (
        <>
            <Grid>
                <Grid.Column width='12'>
                    <SeasonList seasons={[...seasonRegistry.values()]}/>
                </Grid.Column>
            </Grid>
            <Button as={NavLink} to='/seasons/create' positive content='Create Season' />
        </>
        
    )
})
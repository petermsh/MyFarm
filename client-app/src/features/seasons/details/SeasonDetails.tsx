import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Grid} from "semantic-ui-react";
import SeasonDetailsHeader from "./SeasonDetailsHeader";
import SeasonDetailsOperationList from "./SeasonDetailsOperationList";


export default observer(function SeasonDetails() {
    const { seasonStore } = useStore();
    const { selectedSeason: season, loadSeason, loadingInitial } = seasonStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadSeason(id);
    }, [id, loadSeason]);

    if (loadingInitial || !season) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='14'>
                <SeasonDetailsHeader season={season} />
                <SeasonDetailsOperationList season={season} />
            </Grid.Column>
        </Grid>
    )
})
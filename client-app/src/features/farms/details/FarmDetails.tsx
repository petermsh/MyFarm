import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Grid} from "semantic-ui-react";
import FarmDetailedHeader from "./FarmDetailedHeader";
import FarmDetailedInfo from "./FarmDetailedInfo";
import FarmDetailedSeasonList from "./FarmDetailedSeasonList";


export default observer(function FarmDetails() {
    const { farmStore } = useStore();
    const { selectedFarm: farm, loadFarm, loadingInitial } = farmStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadFarm(id);
    }, [id, loadFarm]);

    if (loadingInitial || !farm) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='14'>
                <FarmDetailedHeader farm={farm} />
                <FarmDetailedInfo farm={farm} />
                <FarmDetailedSeasonList farm={farm} />
            </Grid.Column>
        </Grid>
    )
})
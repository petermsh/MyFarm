import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Grid} from "semantic-ui-react";
import SeasonDetailsHeader from "./SeasonDetailsHeader";
import SeasonDetailsOperationList from "./SeasonDetailsOperationList";
import {Operation} from "../../../app/models/operation";
import agent from "../../../app/api/agent";


export default observer(function SeasonDetails() {
    const { seasonStore } = useStore();
    const { selectedSeason: season, loadSeason, loadingInitial } = seasonStore;
    const { id } = useParams();

    const [operations, setOperations] = useState<Operation[]>([]);

    const loadOperations = async (seasonId: string) => {
        try {
            const operations = await agent.Operations.list({ seasonId });
            return operations;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await loadSeason(id);
                const loadedOperations = await loadOperations(id);
                setOperations(loadedOperations);
            }
        };

        fetchData();

    }, [id, loadSeason]);


    if (loadingInitial || !season) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width='14'>
                <SeasonDetailsHeader season={season} />
                <SeasonDetailsOperationList seasonId={season.id} operations={operations} />
            </Grid.Column>
        </Grid>
    );
});

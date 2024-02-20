import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Grid} from "semantic-ui-react";
import FarmDetailedHeader from "./FarmDetailedHeader";
import FarmDetailedInfo from "./FarmDetailedInfo";
import FarmDetailedSeasonList from "./FarmDetailedSeasonList";
import FarmDetailedFieldList from "./FarmDetailedFieldList";
import {Field} from "../../../app/models/field";
import agent from "../../../app/api/agent";
import {Season} from "../../../app/models/season";


export default observer(function FarmDetails() {
    const { farmStore } = useStore();
    const { selectedFarm: farm, loadFarm, loadingInitial } = farmStore;
    const { id } = useParams();
    const prevFarmIdRef = useRef<string | undefined>();

    const [fields, setFields] = useState<Field[]>([]);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const loadFields = async (farmId: string) => {
        try {
            const fields = await agent.Fields.list({farmId});
            setFields(fields);
        } catch (error) {
            console.log(error);
        }
    };

    const loadSeasons = async (farmId: string) => {
        try {
            const seasons = await agent.Seasons.list({farmId});
            setSeasons(seasons);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            
            if(id)
                await loadFarm(id);
            if (farm && farm.id && farm.id !== prevFarmIdRef.current) {
                await loadFields(farm.id);
                await loadSeasons(farm.id);
                prevFarmIdRef.current = farm.id;
            }
        };

        fetchData();
    }, [id, loadFarm, farm?.id]);

    if (loadingInitial || !farm) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='14'>
                <FarmDetailedHeader farm={farm} />
                <FarmDetailedInfo farm={farm} fields={fields} />
                <FarmDetailedSeasonList seasons={seasons} />
                <FarmDetailedFieldList fields={fields} />
            </Grid.Column>
        </Grid>
    )
})
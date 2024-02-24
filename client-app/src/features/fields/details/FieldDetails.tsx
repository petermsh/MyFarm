import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Grid} from "semantic-ui-react";
import FieldDetailsHeader from "./FieldDetailsHeader";
import FieldDetailsOperationList from "./FieldDetailsOperationList";


export default observer(function FieldDetails() {
    const { fieldStore, operationStore } = useStore();
    const { selectedField: field, loadField, loadingInitial } = fieldStore;
    const { loadGroupedOperations, groupedOperationRegistry, clearGroupedOperations } = operationStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadField(id);
            clearGroupedOperations();
            loadGroupedOperations(id);
        }
    }, [id, loadField, loadGroupedOperations, clearGroupedOperations]);
    

    if (loadingInitial || !field) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='14'>
                <FieldDetailsHeader field={field} />
                <FieldDetailsOperationList operations={[...groupedOperationRegistry.values()]}/>
            </Grid.Column>
        </Grid>
    )
})
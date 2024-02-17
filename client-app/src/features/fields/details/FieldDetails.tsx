import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Grid} from "semantic-ui-react";


export default observer(function FieldDetails() {
    const { fieldStore } = useStore();
    const { selectedField: field, loadField, loadingInitial } = fieldStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadField(id);
    }, [id, loadField]);

    if (loadingInitial || !field) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='14'>
                {field.location}
            </Grid.Column>
        </Grid>
    )
})
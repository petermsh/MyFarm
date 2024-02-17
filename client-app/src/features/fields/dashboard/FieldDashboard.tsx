import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";
import {Button, Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import FieldList from "./FieldList";


export default observer(function FieldDashboard() {
    
    const {fieldStore} = useStore();
    const {loadFields, fieldRegistry} = fieldStore;

    useEffect(() => {
        if (fieldRegistry.size <= 1) loadFields();
    }, [loadFields, fieldRegistry.size])
    
    if (fieldStore.loadingInitial) return <LoadingComponent content='Loading fields...' />

    return (
        <>
            <Grid>
                <Grid.Column width='12'>
                    <FieldList fields={[...fieldRegistry.values()]}/>
                </Grid.Column>
            </Grid>
            <Button as={NavLink} to='/fields/create' positive content='Create Field' />
        </>
        
    )
})
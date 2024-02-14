import * as Yup from 'yup';
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Farm} from "../../../app/models/farm";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import MyTextInput from "../../../app/common/MyTextInput";

export default observer(function FarmForm() {
    const { farmStore } = useStore();
    const { createFarm, updateFarm,
        loading, loadFarm, loadingInitial } = farmStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [farm, setFarm] = useState<Farm>({
        id: '',
        address: '',
    });

    const validationSchema = Yup.object({
        address: Yup.string().required('The farm title is required'),
    });

    useEffect(() => {
        if (id) loadFarm(id).then(farm => setFarm(farm!));
    }, [id, loadFarm]);

    function handleFormSubmit(farm: Farm) {
        console.log(farm);
        if (farm.id.length === 0) {
            let newFarm = {
                ...farm,
                id: uuid()
            };
            createFarm(newFarm).then(() => navigate(`/farms/${newFarm.id}`))
        } else {
            updateFarm(farm).then(() => navigate(`/farms/${farm.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='Farm Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={farm}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='address' placeholder='Address' />

                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/farms' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
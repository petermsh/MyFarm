import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Season} from "../../../app/models/season";
import * as Yup from "yup";
import {v4 as uuid} from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import MyTextInput from "../../../app/common/MyTextInput";
import MySelectInput from "../../../app/common/MySelectInput";


export default observer(function SeasonForm() {
    const { seasonStore, farmStore } = useStore();
    const { createSeason, updateSeason,
        loading, loadSeason, loadingInitial } = seasonStore;
    const { loadFarms, farmRegistry } = farmStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [season, setSeason] = useState<Season>({
        id: '',
        name: '',
        farmId: '',
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The season name is required'),
        farmId: Yup.string().required('The Farm is required'),
    });

    useEffect(() => {
        if (id) loadSeason(id).then(season => setSeason(season!));
    }, [id, loadSeason]);

    useEffect(() => {
        loadFarms();
    }, [loadFarms]);

    const farmOptions = Array.from(farmRegistry.values()).map(farm => ({
        key: farm.id,
        value: farm.id,
        text: farm.name
    }));
    
    function handleFormSubmit(season: Season) {
        console.log(season);
        if (season.id.length === 0) {
            let newSeason = {
                ...season,
                id: uuid()
            };
            createSeason(newSeason).then(() => navigate(`/seasons/${newSeason.id}`))
        } else {
            updateSeason(season).then(() => navigate(`/seasons/${season.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='Season Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={season}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MySelectInput
                            options={farmOptions}
                            placeholder='Choose Farm'
                            name='farmId'
                            label='Farm'
                        />

                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/seasons' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
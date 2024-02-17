import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Field} from "../../../app/models/field";
import * as Yup from "yup";
import {v4 as uuid} from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Button, Header, Segment} from "semantic-ui-react";
import {Form, Formik} from "formik";
import MyTextInput from "../../../app/common/MyTextInput";
import MySelectInput from "../../../app/common/MySelectInput";
import MyNumberInput from "../../../app/common/MyNumberInput";


export default observer(function FieldForm() {
    const { fieldStore, farmStore } = useStore();
    const { createField, updateField,
        loading, loadField, loadingInitial } = fieldStore;
    const { loadFarms, farmRegistry } = farmStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [field, setField] = useState<Field>({
        id: '',
        location: '',
        area: 0,
        number: 0,
        farmId: '',
    });

    const validationSchema = Yup.object({
        location: Yup.string().required('The field location is required'),
        area: Yup.string().required('The field area is required'),
        number: Yup.string().required('The field number is required'),
        farmId: Yup.string().required('The Farm is required'),
    });

    useEffect(() => {
        if (id) loadField(id).then(field => setField(field!));
    }, [id, loadField]);

    useEffect(() => {
        loadFarms();
    }, [loadFarms]);

    const farmOptions = Array.from(farmRegistry.values()).map(farm => ({
        key: farm.id,
        value: farm.id,
        text: farm.name
    }));
    
    function handleFormSubmit(field: Field) {
        console.log(field);
        if (field.id.length === 0) {
            let newField = {
                ...field,
                id: uuid()
            };
            createField(newField).then(() => navigate(`/fields/${newField.id}`))
        } else {
            updateField(field).then(() => navigate(`/fields/${field.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading season...' />

    return (
        <Segment clearing>
            <Header content='Field Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={field}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='location' placeholder='Location'/>
                        <MyNumberInput name='area' placeholder='Area' label='Area' />
                        <MyNumberInput name='number' placeholder='Number' label='Number' />
                        <MySelectInput
                            options={farmOptions}
                            placeholder='Choose Farm'
                            name='farmId'
                            label='Farm'
                        />

                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/fields' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
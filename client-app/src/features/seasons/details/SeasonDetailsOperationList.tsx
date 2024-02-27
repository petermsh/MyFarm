import {observer} from "mobx-react-lite";
import {Button, Form, Modal, Table} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store";
import {format} from "date-fns";
import {Operation} from "../../../app/models/operation";
import MyTextInput from "../../../app/common/MyTextInput";
import MyNumberInput from "../../../app/common/MyNumberInput";
import MySelectInput from "../../../app/common/MySelectInput";
import {operationOptions} from "../../../app/options/operationOptions";
import {Formik} from "formik";
import * as Yup from "yup";
import MyDateInput from "../../../app/common/MyDateInput";

interface Props {
    operations: Operation[];
    seasonId: string;
    farmId?: string;
}

export default observer(function SeasonDetailsOperationList({operations, seasonId, farmId}: Props) {
    
    const { operationStore, fieldStore } = useStore();
    const { deleteOperation, createOperation, loading, loadOperations } = operationStore;
    const { loadFields, fieldRegistry } = fieldStore;
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const { earnings, expenses } = operations.reduce((acc, operation) => {
        const { operationType, value } = operation;
        if (operationType === 'Earning') {
            acc.earnings += value;
        } else if (operationType === 'Expense') {
            acc.expenses += value;
        }
        return acc;
    }, { earnings: 0, expenses: 0 });
    
    const income = earnings - expenses;
    
    const [initialOperation, setInitialOperation] = useState<Operation>({
        id: '',
        name: '',
        operationType: '',
        value: 0,
        fieldId: '',
        date: null
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The Operation name is required'),
        value: Yup.string().required('The Operation value is required'),
        operationType: Yup.string().required('The Operation type is required'),
        fieldId: Yup.string().required('The Field is required'),
        date: Yup.string().required('The Operation date is required'),
    });

    function handleFormSubmit(operation: Operation) {
        operation.seasonId = seasonId;
        console.log(operation);
        createOperation(operation).then(() => {
            loadOperations(seasonId);
            closeModal();
        });
    }

    useEffect(() => {
        loadFields(farmId);
    }, [loadFields]);

    const fieldOptions = Array.from(fieldRegistry.values()).map(field => ({
        key: field.id,
        value: field.id,
        text: field.name
    }));
    
    console.log(fieldOptions);

    function handleEditOperation(operation: Operation) {
        setInitialOperation(operation);
        openModal();
    }

    return (
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content={'Operacje'} colSpan={6} textAlign='center' />
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Nazwa</Table.HeaderCell>
                        <Table.HeaderCell>Przychód</Table.HeaderCell>
                        <Table.HeaderCell>Wydatek</Table.HeaderCell>
                        <Table.HeaderCell>Data</Table.HeaderCell>
                        <Table.HeaderCell>Pole</Table.HeaderCell>
                        <Table.HeaderCell>Akcje</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {operations?.map(operation => (
                        <Table.Row key={operation.id}>
                            <Table.Cell>{operation.name}</Table.Cell>
                            <Table.Cell>{operation.operationType === 'Earning' ? operation.value : 0}</Table.Cell>
                            <Table.Cell>{operation.operationType === 'Expense' ? operation.value : 0}</Table.Cell>
                            <Table.Cell>{format(operation.date!, 'dd MMM yyyy')}</Table.Cell>
                            <Table.Cell>{operation.fieldNumber}</Table.Cell>
                            <Table.Cell>
                                <Button icon='edit' onClick={() => handleEditOperation(operation)} />
                                <Button icon='trash' onClick={() => deleteOperation(operation.id)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Podsumowanie</Table.HeaderCell>
                        <Table.HeaderCell>{earnings}</Table.HeaderCell>
                        <Table.HeaderCell>{expenses}</Table.HeaderCell>
                        <Table.HeaderCell colSpan={3} textAlign='center' >Dochód: {income}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            <Button positive onClick={openModal} content='Dodaj operację' />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

            <Modal open={showModal} onClose={closeModal} size='tiny'>
                <Modal.Header>Dodaj operację</Modal.Header>
                <Modal.Content>
                    <Formik
                        enableReinitialize
                        validationSchema={validationSchema}
                        initialValues={initialOperation}
                        onSubmit={values => handleFormSubmit(values)}>
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name='name' placeholder='Name' />
                                <MyNumberInput placeholder={'Kwota'} name={'value'} />
                                <MySelectInput
                                    options={operationOptions}
                                    placeholder='OperationType'
                                    name='operationType'
                                />
                                <MySelectInput
                                    options={fieldOptions}
                                    placeholder='Choose Field'
                                    name='fieldId'
                                    label='Field'
                                />
                                <MyDateInput placeholderText='Date'
                                             name='date'
                                             showTimeSelect
                                             timeCaption={'time'}
                                             dateFormat={'MMMM d, yyyy h:mm aa'} />

                                <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                                <Button onClick={closeModal} floated='right' type='button' content='Cancel' />
                            </Form>
                        )}
                    </Formik>
                </Modal.Content>
            </Modal>
        </>
    );
})
import {GroupedOperation} from "../../../app/models/operation";
import {observer} from "mobx-react-lite";
import {Button, Table} from "semantic-ui-react";
import {format} from "date-fns";

interface Props {
    operations: GroupedOperation[];
}

export default observer(function FieldDetailsOperationList({operations}: Props) {
    
    //const { operationStore, fieldStore } = useStore();
    //const { handleDeleteOperation, createOperation, loading, loadOperations } = operationStore;
    //const { loadFields, fieldRegistry } = fieldStore;
    //const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //     setShowModal(true);
    // }
    //
    // const closeModal = () => {
    //     setShowModal(false);
    // }

    const seasonSummaries: { [key: string]: { earnings: number; expenses: number; income: number } } = {};

    operations.forEach(groupedOperation => {
        const seasonKey = `${groupedOperation.seasonName}-${groupedOperation.plantName}`;
        if (!seasonSummaries[seasonKey]) {
            seasonSummaries[seasonKey] = { earnings: 0, expenses: 0, income: 0 };
        }
        groupedOperation.operations?.forEach(operation => {
            if (operation.operationType === 'Earning') {
                seasonSummaries[seasonKey].earnings += operation.value;
            } else if (operation.operationType === 'Expense') {
                seasonSummaries[seasonKey].expenses += operation.value;
            }
        });
        seasonSummaries[seasonKey].income = seasonSummaries[seasonKey].earnings - seasonSummaries[seasonKey].expenses;
    });

    const totalSummary = Object.values(seasonSummaries).reduce((acc, seasonSummary) => {
        acc.earnings += seasonSummary.earnings;
        acc.expenses += seasonSummary.expenses;
        return acc;
    }, { earnings: 0, expenses: 0 });

    const totalIncome = totalSummary.earnings - totalSummary.expenses;
    
    // let [initialOperation] = useState<GroupedOperation>({
    //     seasonName: '',
    //     plantName: '',
    // });

    // const validationSchema = Yup.object({
    //     name: Yup.string().required('The Operation name is required'),
    //     value: Yup.string().required('The Operation value is required'),
    //     operationType: Yup.string().required('The Operation type is required'),
    //     fieldId: Yup.string().required('The Field is required'),
    //     date: Yup.string().required('The Operation date is required'),
    // });

    // function handleFormSubmit(operation: Operation) {
    //     operation.seasonId = seasonId;
    //     console.log(operation);
    //     createOperation(operation).then(() => closeModal());
    // }

    // useEffect(() => {
    //     console.log("useEffect");
    //     if (!showModal) { // Sprawdzenie, czy modal został zamknięty
    //         loadOperations(seasonId); // Wywołanie funkcji odświeżającej dane
    //     }
    // }, [showModal]);

    // useEffect(() => {
    //     loadFields(farmId);
    // }, [loadFields]);

    // const fieldOptions = Array.from(fieldRegistry.values()).map(field => ({
    //     key: field.id,
    //     value: field.id,
    //     text: field.number
    // }));
    
    // function handleEditOperation(operation: Operation) {
    //     initialOperation = operation;
    //     openModal();
    // }

    return (
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content={'Operacje'} colSpan={6} textAlign='center' />
                    </Table.Row>
                </Table.Header>
                {operations?.map(groupedOperation => (
                    <>
                        <Table.Row key={`${groupedOperation.seasonName}-${groupedOperation.plantName}`}>
                            <Table.HeaderCell content={groupedOperation.seasonName} colSpan={6} textAlign='center' />
                        </Table.Row>
                        <Table.Row key={`${groupedOperation.seasonName}-${groupedOperation.plantName}-plant`}>
                            <Table.HeaderCell content={groupedOperation.plantName} colSpan={6} textAlign='center' />
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Nazwa</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Przychód</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Wydatek</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Data</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Akcje</Table.HeaderCell>
                        </Table.Row>
                        {groupedOperation.operations?.map(operation => (
                            <Table.Row key={operation.id}>
                                <Table.Cell>{operation.name}</Table.Cell>
                                <Table.Cell>{operation.operationType === 'Earning' ? operation.value : 0}</Table.Cell>
                                <Table.Cell>{operation.operationType === 'Expense' ? operation.value : 0}</Table.Cell>
                                <Table.Cell>{operation.date ? format(operation.date, 'dd MMM yyyy') : ''}</Table.Cell>
                                <Table.Cell>
                                    <Button icon='edit' />
                                    <Button icon='trash' />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        <Table.Row positive>
                            <Table.HeaderCell textAlign='center'>Podsumowanie sezonu:</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>{seasonSummaries[`${groupedOperation.seasonName}-${groupedOperation.plantName}`]?.earnings}</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>{seasonSummaries[`${groupedOperation.seasonName}-${groupedOperation.plantName}`]?.expenses}</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' colSpan={2}>Dochód: {seasonSummaries[`${groupedOperation.seasonName}-${groupedOperation.plantName}`]?.income}</Table.HeaderCell>
                        </Table.Row>
                    </>
                ))}
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell>Podsumowanie</Table.HeaderCell>
                        <Table.HeaderCell>{totalSummary.earnings}</Table.HeaderCell>
                        <Table.HeaderCell>{totalSummary.expenses}</Table.HeaderCell>
                        <Table.HeaderCell colSpan={3} textAlign='center'>Dochód: {totalIncome}</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            {/* <Button positive onClick={openModal} content='Dodaj operację' /> */}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

            {/*<Modal open={showModal} onClose={closeModal} size='tiny'>*/}
            {/*    <Modal.Header>Dodaj operację</Modal.Header>*/}
            {/*    <Modal.Content>*/}
            {/*        <Formik*/}
            {/*            enableReinitialize*/}
            {/*            validationSchema={validationSchema}*/}
            {/*            initialValues={initialOperation}*/}
            {/*            onSubmit={values => handleFormSubmit(values)}>*/}
            {/*            {({ handleSubmit, isValid, isSubmitting, dirty }) => (*/}
            {/*                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>*/}
            {/*                    <MyTextInput name='name' placeholder='Name' />*/}
            {/*                    <MyNumberInput placeholder={'Kwota'} name={'value'} />*/}
            {/*                    <MySelectInput*/}
            {/*                        options={operationOptions}*/}
            {/*                        placeholder='OperationType'*/}
            {/*                        name='operationType'*/}
            {/*                    />*/}
            {/*                    <MySelectInput*/}
            {/*                        options={fieldOptions}*/}
            {/*                        placeholder='Choose Field'*/}
            {/*                        name='fieldId'*/}
            {/*                        label='Field'*/}
            {/*                    />*/}
            {/*                    <MyDateInput placeholderText='Date'*/}
            {/*                                 name='date'*/}
            {/*                                 showTimeSelect*/}
            {/*                                 timeCaption={'time'}*/}
            {/*                                 dateFormat={'MMMM d, yyyy h:mm aa'} />*/}
            
            {/*                    <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />*/}
            {/*                    <Button onClick={closeModal} floated='right' type='button' content='Cancel' />*/}
            {/*                </Form>*/}
            {/*            )}*/}
            {/*        </Formik>*/}
            {/*    </Modal.Content>*/}
            {/*</Modal>*/}
        </>
    );
})
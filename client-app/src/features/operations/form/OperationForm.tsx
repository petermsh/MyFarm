// import {Button, Form, Segment} from "semantic-ui-react";
// import {observer} from "mobx-react-lite";
// import MyTextInput from "../../../app/common/MyTextInput";
// import MySelectInput from "../../../app/common/MySelectInput";
// import MyNumberInput from "../../../app/common/MyNumberInput";
// import {Formik} from "formik";
// import {useNavigate} from "react-router-dom";
// import * as Yup from "yup";
// import {Operation} from "../../../app/models/operation";
// import {operationOptions} from "../../../app/options/operationOptions";
// import {useStore} from "../../../app/stores/store";
// import {useState} from "react";
//
// interface Props {
//     seasonId: string;
//     showModal: boolean;
// }
//
// export default observer(function OperationForm({seasonId, showModal}: Props)  {
//    
//     const {operationStore} = useStore();
//     const {createOperation, loading} = operationStore;
//     const navigate = useNavigate();
//    
//     const closeModal = () => {
//         showModal = false;
//     }
//    
//     const [operation] = useState<Operation>({
//         id: '',
//         name: '',
//         operationType: '',
//         value: 0,
//         date: null
//     });
//    
//     const validationSchema = Yup.object({
//         name: Yup.string().required('The Operation name is required'),
//         value: Yup.string().required('The Operation value is required'),
//         operationType: Yup.string().required('The Operation type is required'),
//         date: Yup.string().required('The Operation date is required'),
//     });
//
//     function handleFormSubmit(operation: Operation) {
//         createOperation(operation).then(() => navigate(`/seasons/${seasonId}`));
//     }
//    
//
//     return (
//         <Segment clearing>
//             <Formik
//                 enableReinitialize
//                 validationSchema={validationSchema}
//                 initialValues={operation}
//                 onSubmit={values => handleFormSubmit(values)}>
//                 {({ handleSubmit, isValid, isSubmitting, dirty }) => (
//                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
//                         <MyTextInput name='name' placeholder='Name' />
//                         <MyNumberInput placeholder={'Kwota'} name={'value'} />
//                         <MySelectInput
//                             options={operationOptions}
//                             placeholder='Choose operation type'
//                             name='operationType'
//                             label='Rodzaj'
//                         />
//
//                         <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
//                         <Button onClick={closeModal} floated='right' type='button' content='Cancel' />
//                     </Form>
//                 )}
//             </Formik>
//         </Segment>
//     );
// })
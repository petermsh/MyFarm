﻿import {observer} from "mobx-react-lite";
import {ErrorMessage, Form, Formik} from "formik";
import {Button, Header, Label} from "semantic-ui-react";
import MyTextInput from "../../app/common/MyTextInput";
import {useStore} from "../../app/stores/store";


export default observer(function LoginForm() {

    const {userStore} = useStore();

    return (
        <Formik initialValues={{email: '', password: '', error: null}}
                onSubmit={(values, {setErrors}) => userStore.login(values).catch(() => setErrors({error: 'Invalid email or password'}))}>
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <Header as={'h2'} content={'Login to MyFarm'} color={'teal'} textAlign={'center'}  />
                    <MyTextInput placeholder={"Email"} name={'email'} />
                    <MyTextInput placeholder={"Password"} name={'password'} type={'password'} />
                    <ErrorMessage name={'error'} render={() => <Label style={{marginTop: 10}} basic color={'red'} content={errors.error} />} />
                    <Button loading={isSubmitting} positive content={"Sign In"} type={"submit"} fluid />
                </Form>
            )}
        </Formik>
    )
})
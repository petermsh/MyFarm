﻿import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyNumberInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} type="number" />
            {meta.touched && meta.error && (
                <Label basic color='red'>{meta.error}</Label>
            )}
        </Form.Field>
    );
}
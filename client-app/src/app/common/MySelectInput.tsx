import {Form, Label, Select} from "semantic-ui-react";
import {useField} from "formik";
import {useStore} from "../stores/store";

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}
export default function MySelectInput(props: Props) {

    const { farmStore } = useStore();
    const { farmRegistry } = farmStore;
    const [field, meta, helpers] = useField(props.name);

    const farmOptions = Array.from(farmRegistry.values()).map(farm => ({
        key: farm.id,
        value: farm.id,
        text: farm.name
    }));
    
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                options={farmOptions}
                value={field.value || null}
                onChange={(_, data) => helpers.setValue(data.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color={"red"}>
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    )
}
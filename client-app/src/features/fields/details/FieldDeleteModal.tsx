import { Modal, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useNavigate} from "react-router-dom";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    fieldId: string;
}

export default observer(function FieldDeleteModal({ open, setOpen, fieldId }: Props) {

    const { fieldStore } = useStore();
    const navigate = useNavigate();

    const handleDeleteField = async () => {
        try {
            await fieldStore.deleteField(fieldId);
            setOpen(false);
            navigate('/fields');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
        navigate(`/fields/${fieldId}`);
    };

    return (
        <Modal onClose={handleCloseModal} open={open}>
            <Modal.Header>Confirm deletion</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this field?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    content="Ok"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={handleDeleteField}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
});
import { Modal, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useNavigate} from "react-router-dom";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    farmId: string;
}

export default observer(function DeleteFarmModal({ open, setOpen, farmId }: Props) {
    const { farmStore } = useStore();
    const navigate = useNavigate(); // Używamy useNavigate zamiast useHistory

    const handleDeleteFarm = async () => {
        try {
            await farmStore.deleteFarm(farmId);
            setOpen(false); // Zamyka modal po usunięciu farmy
            navigate('/farms'); // Przechodzi do listy farm po usunięciu farmy
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setOpen(false); // Zamyka modal po kliknięciu "Cancel"
        navigate(-1); // Wraca do poprzedniej ścieżki po kliknięciu "Cancel"
    };

    return (
        <Modal onClose={handleCloseModal} open={open}>
            <Modal.Header>Confirm deletion</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this farm?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    content="Ok"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={handleDeleteFarm}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
});
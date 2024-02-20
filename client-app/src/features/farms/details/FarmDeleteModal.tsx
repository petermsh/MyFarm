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
    const navigate = useNavigate(); 

    const handleDeleteFarm = async () => {
        try {
            await farmStore.deleteFarm(farmId);
            setOpen(false); 
            navigate('/farms');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setOpen(false); 
        navigate(`/farms/${farmId}`); 
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
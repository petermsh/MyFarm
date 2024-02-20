import { Modal, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useNavigate} from "react-router-dom";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    seasonId: string;
}

export default observer(function SeasonDeleteModal({ open, setOpen, seasonId }: Props) {
    
    const { seasonStore } = useStore();
    const navigate = useNavigate(); 

    const handleDeleteSeason = async () => {
        try {
            await seasonStore.deleteSeason(seasonId);
            setOpen(false); 
            navigate('/seasons');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setOpen(false); 
        navigate(`/seasons/${seasonId}`); 
    };

    return (
        <Modal onClose={handleCloseModal} open={open}>
            <Modal.Header>Confirm deletion</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this season?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    content="Ok"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={handleDeleteSeason}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
});
import {Farm} from "../../../app/models/farm";
import {observer} from "mobx-react-lite";
import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import FarmDeleteModal from "./FarmDeleteModal";

interface Props {
    farm: Farm
}

export default observer (function FarmDetailedHeader({farm}: Props) {
    
    const [open, setOpen] = useState(false);

    return (
        <Segment clearing attached='bottom'>
            <Header
                size='huge'
                content={farm.name}
            />
            <Button color="red" floated="right" onClick={() => setOpen(true)}>
                Usuń
            </Button>
            <Button as={Link} to={`/farms/update/${farm.id}`} color='orange' floated='right'>
                Edytuj
            </Button>
            <FarmDeleteModal open={open} setOpen={setOpen} farmId={farm.id} />
        </Segment>
    )
})
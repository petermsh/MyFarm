import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Season} from "../../../app/models/season";
import {useState} from "react";
import SeasonDeleteModal from "./SeasonDeleteModal";

interface Props {
    season: Season;
}

export default observer(function SeasonDetailsHeader({season}: Props) {

    const [open, setOpen] = useState(false);
    
    return (
        <Segment clearing attached='bottom'>
            <Header
                size='huge'
                content={season.name}
            />
            {season.status}
            <Button color="red" floated="right" onClick={() => setOpen(true)}>
                Usuń
            </Button>
            <Button as={Link} to={`/seasons/update/${season.id}`} color='orange' floated='right'>
                Edytuj
            </Button>
            <SeasonDeleteModal open={open} setOpen={setOpen} seasonId={season.id} />
        </Segment>
    )
})
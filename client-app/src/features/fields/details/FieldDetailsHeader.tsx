import {Field} from "../../../app/models/field";
import {observer} from "mobx-react-lite";
import {Button, Grid, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import FieldDeleteModal from "./FieldDeleteModal";

interface Props {
    field: Field
}

export default observer (function FieldDetailedHeader({field}: Props) {

    const [open, setOpen] = useState(false);
    
    return (
        <Segment.Group>

            <Segment clearing attached='bottom'>
                <Header
                    size='huge'
                    content={field.number}
                />
                <Button color="red" floated="right" onClick={() => setOpen(true)}>
                    Usuń
                </Button>
                <Button as={Link} to={`/fields/update/${field.id}`} color='orange' floated='right'>
                    Edytuj
                </Button>
                <FieldDeleteModal open={open} setOpen={setOpen} fieldId={field.id} />
            </Segment>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='green' name='map marker alternate' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Lokalizacja: {field.location}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='green' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Powierzchnia: {field.area} ha</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
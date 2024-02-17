import {Field} from "../../../app/models/field";
import {observer} from "mobx-react-lite";
import {Button, Grid, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface Props {
    field: Field
}

export default observer (function FieldDetailedHeader({field}: Props) {
    return (
        <Segment.Group>
        
            <Segment clearing attached='bottom'>
                <Header
                    size='huge'
                    content={field.number}
                />
                <Button as={Link} to={`/fields/delete/${field.id}`} color='red' floated='right'>
                    Delete field
                </Button>
                <Button as={Link} to={`/fields/update/${field.id}`} color='orange' floated='right'>
                    Update info
                </Button>
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
import {Farm} from "../../../app/models/farm";
import {observer} from "mobx-react-lite";
import {Grid, Icon, Segment} from "semantic-ui-react";


interface Props {
    farm: Farm
}

export default observer (function FarmDetailedInfo({farm}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='green' name='map marker alternate' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{farm.address}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='green' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Liczba hektarów: </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='green' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Liczba pól: </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
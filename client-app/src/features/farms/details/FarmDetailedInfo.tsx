import {Farm} from "../../../app/models/farm";
import {observer} from "mobx-react-lite";
import {Grid, Icon, Segment} from "semantic-ui-react";
import {Field} from "../../../app/models/field";


interface Props {
    farm: Farm
    fields: Field[]
}

export default observer (function FarmDetailedInfo({farm, fields}: Props) {
    
    const totalArea = fields.reduce((acc, curr) => acc + curr.area, 0);
    
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
                        <span>Liczba hektarów: {totalArea}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='green' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Liczba pól: {fields.length}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
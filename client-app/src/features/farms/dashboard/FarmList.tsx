import {observer} from "mobx-react-lite";
import {FarmListResponse} from "../../../app/models/farm";
import {Button, Card} from 'semantic-ui-react';


interface Props {
    farms: FarmListResponse[];
}

export default observer(function FarmList({farms}: Props) {

    return (
        <Card.Group>
            {farms && farms.map(farm => (
                <Card key={farm.id}>
                    <Card.Content>
                        <Card.Header>{farm.name}</Card.Header>
                        <Card.Meta>{farm.address}</Card.Meta>
                        <Card.Description>
                            {farm.totalArea} ha
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button
                            as='a'
                            href={`/farms/${farm.id}`}
                            color='teal'
                            floated='right'
                            content='Szczegóły'
                        />
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
})
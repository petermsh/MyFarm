import {observer} from "mobx-react-lite";
import {Farm} from "../../../app/models/farm";
import {Button, Card} from 'semantic-ui-react';


interface Props {
    farms: Farm[];
}

export default observer(function FarmList({farms}: Props) {

    return (
        <Card.Group>
            {farms && farms.map(farm => (
                <Card key={farm.id}>
                    <Card.Content>
                        <Card.Header>Nazwa</Card.Header>
                        <Card.Meta>{farm.address}</Card.Meta>
                        <Card.Description>
                            Opis:
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <span>Liczba hektarów: 10</span>
                        <Button
                            as='a'
                            href={`/farms/${farm.id}`}
                            color='teal'
                            floated='right'
                            content='Zobacz farmę'
                        />
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
})
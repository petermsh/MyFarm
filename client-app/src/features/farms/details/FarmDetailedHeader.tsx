import {Farm} from "../../../app/models/farm";
import {observer} from "mobx-react-lite";
import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface Props {
    farm: Farm
}

export default observer (function FarmDetailedHeader({farm}: Props) {
    return (
        <Segment clearing attached='bottom'>
            <Header
                size='huge'
                content={farm.name}
            />
                <Button as={Link} to={`/farms/delete/${farm.id}`} color='red' floated='right'>
                    Delete farm
                </Button>
                <Button as={Link} to={`/farms/update/${farm.id}`} color='orange' floated='right'>
                    Update info
                </Button>
        </Segment>
    )
})
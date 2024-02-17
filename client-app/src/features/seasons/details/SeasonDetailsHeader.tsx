import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Season} from "../../../app/models/season";

interface Props {
    season: Season;
}

export default observer(function SeasonDetailsHeader({season}: Props) {
    return (
        <Segment clearing attached='bottom'>
            <Header
                size='huge'
                content={season.name}
            />
            {season.status}
            <Button as={Link} to={`/seasons/delete/${season.id}`} color='red' floated='right'>
                Delete season
            </Button>
            <Button as={Link} to={`/seasons/update/${season.id}`} color='orange' floated='right'>
                Update info
            </Button>
        </Segment>
    )
})
import {observer} from "mobx-react-lite";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from 'semantic-ui-react';
import {Season} from "../../../app/models/season";
import {NavLink} from "react-router-dom";


interface Props {
    seasons: Season[];
}

export default observer(function SeasonList({seasons}: Props) {

    return (
        <Table celled>
            <TableHeader>
                <TableHeaderCell content={'Sezony'} colSpan={6} textAlign='center' />
                <TableRow>
                    <TableHeaderCell>Nazwa</TableHeaderCell>
                    <TableHeaderCell>Przychody</TableHeaderCell>
                    <TableHeaderCell>Wydatki</TableHeaderCell>
                    <TableHeaderCell>Dochód</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
            </TableHeader>

            {seasons.map(season => (
                <TableBody>
                    <TableRow>
                        <TableCell>{season.name}</TableCell>
                        <TableCell>20000</TableCell>
                        <TableCell>12000</TableCell>
                        <TableCell>8000</TableCell>
                        <TableCell>{season.status}</TableCell>
                        <Button as={NavLink} to={`/seasons/${season.id}`} positive content={'Szczegóły'} />
                    </TableRow>
                </TableBody>
            ))}

        </Table>
    )
})
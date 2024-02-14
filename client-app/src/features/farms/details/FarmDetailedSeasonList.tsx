import {observer} from "mobx-react-lite";
import {Farm} from "../../../app/models/farm";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";


interface Props {
    farm: Farm
}
export default observer(function FarmDetailedSeasonList({farm}: Props) {
    return (
        <Table celled>
            <TableHeader content={'Sezony'}>
                <TableRow>
                    <TableHeaderCell>Nazwa</TableHeaderCell>
                    <TableHeaderCell>Przychody</TableHeaderCell>
                    <TableHeaderCell>Wydatki</TableHeaderCell>
                    <TableHeaderCell>Dochód</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                <TableRow>
                    <TableCell>Sezon 2023/2024</TableCell>
                    <TableCell>20000</TableCell>
                    <TableCell>12000</TableCell>
                    <TableCell>8000</TableCell>
                    <TableCell>Trwa</TableCell>
                    <Button positive content={'Szczegóły'} />
                </TableRow>
            </TableBody>
            
        </Table>
    )
})
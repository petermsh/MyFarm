import {observer} from "mobx-react-lite";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Season} from "../../../app/models/season";
import {NavLink} from "react-router-dom";
import {Operation} from "../../../app/models/operation";

interface Props {
    season: Season;
    operations: Operation[];
}

export default observer(function SeasonDetailsOperationList({season, operations}: Props) {
    
    return (
        <>
            <Table celled>
                <TableHeader>
                    <TableHeaderCell content={'Operacje'} colSpan={6} textAlign='center' />
                    <TableRow>
                        <TableHeaderCell>Nazwa</TableHeaderCell>
                        <TableHeaderCell>Przychód</TableHeaderCell>
                        <TableHeaderCell>Wydatek</TableHeaderCell>
                        <TableHeaderCell>Data</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    
                    {operations?.map(operation =>(
                        <TableRow key={operation.id}>
                        <TableCell>{operation.name}</TableCell>
                        <TableCell>{operation.operationType === 'Income' ? operation.value : 0}</TableCell>
                        <TableCell>{operation.operationType === 'Expense' ? operation.value : 0}</TableCell>
                        <TableCell>data</TableCell>
                        </TableRow>
                    
                    ) )}
                </TableBody>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Suma</TableHeaderCell>
                        <TableHeaderCell>{season.earnings}</TableHeaderCell>
                        <TableHeaderCell>{season.expenses}</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                </TableHeader>
            </Table>
            <Button as={NavLink} to='/operations/create' positive content='Add Operation' />

        </>
    )
})
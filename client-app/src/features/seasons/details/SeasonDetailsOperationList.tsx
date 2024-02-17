import {observer} from "mobx-react-lite";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Season} from "../../../app/models/season";
import {NavLink} from "react-router-dom";

interface Props {
    season: Season;
}

export default observer(function SeasonDetailsOperationList({season}: Props) {
    
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
                    <TableRow>
                        <TableCell>Zakup saletry</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>3000</TableCell>
                        <TableCell>01.02.2024</TableCell>
                    </TableRow>
                </TableBody>

                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Suma</TableHeaderCell>
                        <TableHeaderCell>1000</TableHeaderCell>
                        <TableHeaderCell>3000</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                </TableHeader>
            </Table>
            <Button as={NavLink} to='/operations/create' positive content='Add Operation' />

        </>
    )
})
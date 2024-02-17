import {observer} from "mobx-react-lite";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from 'semantic-ui-react';
import {Field} from "../../../app/models/field";


interface Props {
    fields: Field[];
}

export default observer(function FieldList({fields}: Props) {

    return (
        <Table celled>
            <TableHeader>
                <TableHeaderCell content={'Pola'} colSpan={6} textAlign='center' />
                <TableRow>
                    <TableHeaderCell>Numer</TableHeaderCell>
                    <TableHeaderCell>Powierzchnia [ha]</TableHeaderCell>
                    <TableHeaderCell>Lokalizacja</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
            </TableHeader>

            {fields.map(field => (
                <TableBody>
                    <TableRow key={field.id}>
                        <TableCell>{field.number}</TableCell>
                        <TableCell>{field.area}</TableCell>
                        <TableCell>{field.location}</TableCell>
                        <Button positive content={'Szczegóły'} />
                    </TableRow>
                </TableBody>
            ))}

        </Table>
    )
})
import {observer} from "mobx-react-lite";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Season} from "../../../app/models/season";


interface Props {
    seasons: Season[]
}
export default observer(function FarmDetailedSeasonList({seasons}: Props) {
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

            
            <TableBody>
                {seasons.map((season) => {

                    console.log(season);
                    
                    const income = !isNaN(season.earnings) ? season.earnings : 0;
                    const expenses = !isNaN(season.expenses) ? season.expenses : 0;
                    const profit = income - expenses;

                    return (
                        <TableRow>
                            <TableCell>{season.name}</TableCell>
                            <TableCell>{income}</TableCell>
                            <TableCell>{expenses}</TableCell>
                            <TableCell>{profit}</TableCell>
                            <TableCell>{season.status}</TableCell>
                            <Button positive content={'Szczegóły'}/>
                        </TableRow>
                    );
                })}
            </TableBody>
            
        </Table>
    )
})
import {observer} from "mobx-react-lite";
import {Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Season} from "../../../app/models/season";
import {Link} from "react-router-dom";


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

                    const income = season.earnings ?? 0;
                    const expenses = season.expenses ?? 0;
                    const profit = income - expenses;

                    let statusText = "";
                    let statusColor = "";
                    
                    switch (season.status) {
                        case "Active":
                            statusText = "Aktywny";
                            statusColor = "green";
                            break;
                        case "Finished":
                            statusText = "Zakończony";
                            statusColor = "red";
                            break;
                        default:
                            statusText = "Brak danych";
                            break;
                    }
                    
                    return (
                        <TableRow key={season.id}>
                            <TableCell>{season.name}</TableCell>
                            <TableCell>{income}</TableCell>
                            <TableCell>{expenses}</TableCell>
                            <TableCell>{profit}</TableCell>
                            <TableCell style={{ color: statusColor }}>{statusText}</TableCell>
                            
                            <Button as={Link} to={`/seasons/${season.id}`} positive content='Szczegóły' />
                        </TableRow>
                    );
                })}
            </TableBody>
            
        </Table>
    )
})
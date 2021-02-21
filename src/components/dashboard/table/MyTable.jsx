import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import TableData from "./table_data/TableData";
import { db } from "../../api/firebase";
import { useState, useEffect } from "react";

const MyTable = ({ userUID }) => {
	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		db.collection(`users/${userUID}/tables`)
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setTableData(snapshot.docs.map((doc) => doc.data()));
			});
	}, [userUID]);

	return (
		<>
			<TableContainer component={Paper}>
				<Table className="table__style" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">
								<strong>Created</strong>
							</TableCell>
							{
								// <TableCell align="left">
								// 	<strong>Clicked</strong>
								// </TableCell>
							}
							<TableCell align="left">
								<strong>Short Link</strong>
							</TableCell>
							<TableCell align="left">
								<strong>Full Link</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((data) => (
							<TableData
								key={data.timestamp}
								shortID={data.shortID}
								fullLink={data.fullLink}
								time={data.time}
								date={data.date}
								timestamp={data.timestamp}
								clicked={data.clicked}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default MyTable;

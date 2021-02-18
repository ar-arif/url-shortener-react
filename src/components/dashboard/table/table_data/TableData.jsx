import { TableRow, TableCell } from "@material-ui/core";

const TableData = ({ shortID, fullLink, time, date, timestamp }) => {
	const domain = window.location.host;
	const domainLink = window.location.href;
	return (
		<>
			<TableRow>
				<TableCell align="left">{date}</TableCell>
				<TableCell align="left">
					<a href={domainLink + shortID} target="_blank" rel="noreferrer" className="url__link">
						{domain + "/#/" + shortID}
					</a>
				</TableCell>
				<TableCell align="left">
					<a href={fullLink} target="_blank" rel="noreferrer" className="url__link">
						{fullLink}
					</a>
				</TableCell>
			</TableRow>
		</>
	);
};

export default TableData;

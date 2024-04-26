import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {
  TableCellProps,
  tableCellClasses,
} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar, Box } from "@mui/material";
import { stringAvatar } from "../services/genericFunctions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export interface Headings {
  id: string;
  text: string;
  align?: TableCellProps["align"];
}

const TableColumnCells = ({
  data,
  columnId,
  align,
  onClick,
}: {
  data: string;
  columnId: string;
  onClick: () => void;
  align?: TableCellProps["align"];
}) => {
  if (columnId === "action") {
    return (
      <ListItemIcon
        sx={{ margin: "auto", justifyContent: "center", padding: "16px" }}
        onClick={onClick}
      >
        <VisibilityIcon />
      </ListItemIcon>
    );
  } else if (columnId === "name") {
    return (
      <StyledTableCell align={align}>
        <span style={{ display: "flex", gap: 8 }}>
          <Avatar {...stringAvatar(data)} sx={{ width: 32, height: 32 }} />
          <span style={{ margin: "auto 0" }}>{data}</span>
        </span>
      </StyledTableCell>
    );
  }
  return <StyledTableCell align={align}>{data}</StyledTableCell>;
};

export default function Tables({
  headings,
  data,
  showDetails,
}: {
  headings: Array<Headings>;
  data: Array<any>;
  showDetails: (row: any) => void;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headings.map(({ text, align }) => (
              <StyledTableCell
                align={align}
                key={text}
                style={{ backgroundColor: "#3e79a3" }}
              >
                {text}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              {headings.map(({ align, id: columnId }) => (
                <TableColumnCells
                  align={align}
                  columnId={columnId}
                  data={row[columnId]}
                  onClick={() => showDetails(row)}
                  key={columnId}
                />
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {!data.length ? (
        <div style={{ width: "100%", height: 200, display: "flex" }}>
          <h3 style={{ margin: "auto" }}>No Data available</h3>
        </div>
      ) : null}
    </TableContainer>
  );
}

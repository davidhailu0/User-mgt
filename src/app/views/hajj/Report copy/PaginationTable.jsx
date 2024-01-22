import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  OutlinedInput, InputAdornment,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
];

const PaginationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSortChange = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(direction, column) {
    return direction === "desc"
      ? (a, b) => descendingComparator(a, b, column)
      : (a, b) => -descendingComparator(a, b, column);
  }

  function descendingComparator(a, b, column) {
    if (column === "amount") {
      return b[column] - a[column];
    }
    
    const valueA = a[column] || "";
    const valueB = b[column] || "";
  
    return valueA.localeCompare(valueB);
  }


  return (
    <Box width="100%" overflow="auto">
      <Box width="100%" overflow="auto" display="flex" justifyContent="flex-end" alignItems="center" marginBottom={2}>
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search..."
  />
</Box>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <TableSortLabel
                active={sortColumn === "name"}
                direction={sortColumn === "name" ? sortDirection : "asc"}
                onClick={() => handleSortChange("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "company"}
                direction={sortColumn === "company" ? sortDirection : "asc"}
                onClick={() => handleSortChange("company")}
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "date"}
                direction={sortColumn === "date" ? sortDirection : "asc"}
                onClick={() => handleSortChange("date")}
              >
                Start Date
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "status"}
                direction={sortColumn === "status" ? sortDirection : "asc"}
                onClick={() => handleSortChange("status")}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "amount"}
                direction={sortColumn === "amount" ? sortDirection : "asc"}
                onClick={() => handleSortChange("amount")}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
{stableSort(subscribarList, getComparator(sortDirection, sortColumn))
      .filter((subscriber) => {
        if (searchTerm.trim() === "") return true;
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(subscriber.name) ||
          searchRegex.test(subscriber.company) ||
          searchRegex.test(subscriber.date) ||
          searchRegex.test(subscriber.status) ||
          searchRegex.test(subscriber.amount)
        );
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((subscriber, index) => (
        <TableRow key={index}>
          <TableCell align="left">{subscriber.name}</TableCell>
          <TableCell align="center">{subscriber.company}</TableCell>
          <TableCell align="center">{subscriber.date}</TableCell>
          <TableCell align="center">{subscriber.status}</TableCell>
          <TableCell align="center">{subscriber.amount}</TableCell>
          <TableCell align="right">
            <IconButton>
              <Icon>edit</Icon>
            </IconButton>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
      </StyledTable>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={subscribarList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default PaginationTable;

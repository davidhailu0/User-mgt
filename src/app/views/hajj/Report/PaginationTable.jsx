import { useState, useEffect } from "react";
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
import { getPaidHujjaj } from "app/service/PaymentService";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const PaginationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [hujjajList, setHujjajList] = useState([]);

  useEffect(() => {
    listAllHujjajList()
  }, []);

  function listAllHujjajList(){
    getPaidHujjaj().then((response) => {
      console.log(response.data);
      setHujjajList(response.data);
    }).catch(error => {
        console.error(error);
    })
}


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
                active={sortColumn === "branch_name"}
                direction={sortColumn === "branch_name" ? sortDirection : "asc"}
                onClick={() => handleSortChange("branch_name")}
              >
                Branch name
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "paymentCode"}
                direction={sortColumn === "paymentCode" ? sortDirection : "asc"}
                onClick={() => handleSortChange("paymentCode")}
              >
                Payment Code
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "trn_dt"}
                direction={sortColumn === "trn_dt" ? sortDirection : "asc"}
                onClick={() => handleSortChange("trn_dt")}
              >
                Start trn_dt
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortColumn === "trn_ref_no"}
                direction={sortColumn === "trn_ref_no" ? sortDirection : "asc"}
                onClick={() => handleSortChange("trn_ref_no")}
              >
                TRN Ref No
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
            
          </TableRow>
        </TableHead>
        <TableBody>
         
{stableSort(hujjajList, getComparator(sortDirection, sortColumn))
      .filter((subscriber) => {
        if (searchTerm.trim() === "") return true;
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(subscriber.branch_name) ||
          searchRegex.test(subscriber.paymentCode) ||
          searchRegex.test(subscriber.trn_dt) ||
          searchRegex.test(subscriber.trn_ref_no) ||
          searchRegex.test(subscriber.amount)
        );
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((subscriber, index) => (
        <TableRow key={index}>
          <TableCell align="left">{subscriber.branch_name}</TableCell>
          <TableCell align="center">{subscriber.payment_code}</TableCell>
          <TableCell align="center">{subscriber.trn_DT}</TableCell>
          <TableCell align="center">{subscriber.trans_ref_no}</TableCell>
          <TableCell align="center">{subscriber.amount}</TableCell>
         
        </TableRow>
      ))}
      </TableBody>
      </StyledTable>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hujjajList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default PaginationTable;

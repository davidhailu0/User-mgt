import { useState, useEffect } from "react";
import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  Typography,
  OutlinedInput, InputAdornment,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { getUnpaidHujjaj,authorizeTransation   } from "app/service/PaymentService";
import PrintInvoce from './PrintInvoce';
import swal from 'sweetalert';

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const CustomIconButton = styled(IconButton)`
  background-color: #0A8588;
  border-radius: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  &:hover {
    background-color: #123456; /* Set your desired hover background color here */
  }
`;



const PaginationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [hujjajList, setHujjajList] = useState([]);
const [singleHujjajList, setSingleHujjajList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const handleCheckTransaction = (hujaj) => {
    
    //console.log("editedhujaj",hujaj)
    const { payment_code, account_number, amount, account_holder, narration } = hujaj;
const newData = { payment_code, account_number, amount, account_holder, narration };
console.log("editedhujaj",newData)

    try {
      authorizeTransation(newData).then((response) => {
        console.log(response.data)
         if (response.data.success) {
          swal("Success", "TRANSACTION MADE SUCESSFULY", "success", {
            buttons: false,
            timer: 2000,
          })
        //  setSearchResult(null)
      } else {
        console.log(response.data.error)
        swal('No Results', response.data.error, 'error');
        
      }
        
    }).catch(error => {
        //console.error(error);
        swal('No Results', error.message, 'error');
    })

     
    } catch (error) {
      // Handle network errors
      swal('No Results', 'Network error:', 'error');
      
    }
   // handleClickOpen()
  };

  useEffect(() => {
    listAllHujjajList()
  }, []);

  function listAllHujjajList(){
    getUnpaidHujjaj().then((response) => {
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
                active={sortColumn === "payment_code"}
                direction={sortColumn === "payment_code" ? sortDirection : "asc"}
                onClick={() => handleSortChange("payment_code")}
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
                Transaction Date
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
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
{stableSort(hujjajList, getComparator(sortDirection, sortColumn))
      .filter((subscriber) => {
        if (searchTerm.trim() === "") return true;
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(subscriber.branch_name) ||
          searchRegex.test(subscriber.payment_code) ||
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
          <TableCell align="center">{subscriber.trn_dt}</TableCell>
          <TableCell align="center">{subscriber.trn_ref_no}</TableCell>
          <TableCell align="center">{subscriber.amount}</TableCell>
          {/* <TableCell align="center">
            <IconButton  onClick={() => handleCheckTransaction(subscriber.payment_code)} >
              <Icon>Edit</Icon>
              
            </IconButton>
            <Typography variant="body2">Edit</Typography>
            <IconButton>
              <Icon>Print</Icon>
            </IconButton>
          </TableCell> */}
          <TableCell align="center">
            <CustomIconButton onClick={() => handleCheckTransaction(subscriber)}>
              <Icon  sx={{ color: 'white' }}>key</Icon>
              <Typography variant="body2" sx={{ color: 'white' }}>  Authorize</Typography>
            </CustomIconButton>
            
          </TableCell>


         
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
       {open && <PrintInvoce open={open} setOpen={setOpen} handleClose={handleClose} handleClickOpen={handleClickOpen} singleHujjajList={singleHujjajList}  />}
    </Box>
  );
};

export default PaginationTable;

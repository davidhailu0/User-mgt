import React, { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { forwardRef, useState } from 'react';
import { useTheme } from '@mui/material';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { H6 } from 'app/components/Typography';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
//import image from "../../../img/tile.png"
import LeftImage from '../../../../img/tile.png';
import RightImage from '../../../../img/maka.png';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrintInvoce({ singleHujjajList,open, setOpen, handleClose, handleClickOpen }) {

  const theme = useTheme();
  const contentRef = useRef(null);
  const generatePDF = () => {
    handleClose();
    const input = contentRef.current;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/:/g, '-').slice(0, -5);
        // Delay the PDF generation to ensure the content is rendered
        setTimeout(() => {
          const fileName = `hajjinvoice_${formattedDate}.pdf`;
          pdf.save(fileName);
        }, 100); // Adjust the delay time as needed
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });

  };

  const printPDF = () => {
    const input = contentRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.autoPrint(); // Enable auto-printing
        window.open(pdf.output('bloburl'), '_blank'); // Open the PDF in a new tab for printing
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };



  return (
    <Box>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative',backgroundColor:'#0A8588' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>

            <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>Invoice</H6>

            <Button color="inherit" onClick={generatePDF} sx={{ backgroundColor: 'grey', marginRight: '20px' }}>
              Download
            </Button>
            <Button color="inherit" onClick={printPDF} sx={{ backgroundColor: 'grey', marginRight: '20px' }}>
              Print
            </Button>
          </Toolbar>
        </AppBar>

        <Card sx={{ margin: '20px', paddingRight: '40px' }}>
          <CardContent ref={contentRef}>

            <Grid container spacing={3} sx={{ margin: '20px' }}>
              <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }}>
                    <img src={LeftImage} alt="Left" style={{ width: '200px', height: '50px', marginHorizontal: '16px' }} />
                  </Box>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Hajj Payment Detail
                  </Typography>
                  <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <img src={RightImage} alt="Right" style={{ width: '50px', height: '50px', marginHorizontal: '16px' }} />
                  </Box>
                </Toolbar>
                <Divider />
              </AppBar>
              <Grid item xs={4}>
                {/* Column 1 */}

                <Typography variant="h6" sx={{ margin: '10px' }}>From</Typography>
                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Account Holder:</Typography>{' '} {singleHujjajList?.account_holder}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Account No:</Typography>{' '} {singleHujjajList?.account_number}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Paid Amount:</Typography>{' '} {singleHujjajList?.amount}</Typography>
                
                {/* Add more relevant details as needed */}

              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ margin: '5px' }}>For</Typography>
                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Payment Code:</Typography>{' '} {singleHujjajList?.payment_code}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Full Name:</Typography>{' '} {singleHujjajList?.first_name}{' '} {singleHujjajList?.middle_name}{' '} {singleHujjajList?.last_name}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Amount:</Typography>{' '} {singleHujjajList?.amount}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Passport Number:</Typography>{' '} {singleHujjajList?.passport_number}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Birth Date::</Typography>{' '} {singleHujjajList?.birth_date}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Service Package:</Typography>{' '} {singleHujjajList?.service_package}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ margin: '5px' }}>To</Typography>
                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Account Holder:</Typography>{' '}  Mr./Ms. Hajj</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Account Number:</Typography>{' '} 0010934520400</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Transferd Amount:</Typography>{' '} {singleHujjajList?.amount}</Typography>
              </Grid>

            </Grid>
            <Divider sx={{ marginLeft: '25px', marginRight: '25px', marginTop: '1px', marginBottom: '1px' }} />
            <Grid container spacing={3} sx={{ marginLeft: '20px', marginRight: '20px', marginTop: '1px' }}>
              <Grid item xs={4}>
                {/* Column 1 */}


                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Payment Branch:</Typography>{' '} {singleHujjajList?.ac_BRANCH}</Typography>
                {/* Add more relevant details as needed */}

              </Grid>
              <Grid item xs={4}>

                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Payment Date:</Typography>{' '} {singleHujjajList?.trn_DT}</Typography>

              </Grid>
              <Grid item xs={4}>

              <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Paid Amount:</Typography>{' '} {singleHujjajList?.amount}</Typography>
              <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Narration:</Typography>{' '} {singleHujjajList?.narration}</Typography>
              </Grid>

            </Grid>
            <Divider sx={{ marginLeft: '25px', marginRight: '25px', marginTop: '1px', marginBottom: '1px' }} />
            <Grid container spacing={3} sx={{ marginLeft: '20px', marginRight: '20px', marginTop: '1px' }}>
              <Grid item xs={4}>
                {/* Column 1 */}


                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Branch Name(Printing):</Typography>{' '} Director IT System</Typography>
                
                {/* Add more relevant details as needed */}

              </Grid>
              <Grid item xs={4}>

                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Tailer Name:</Typography>{' '} {singleHujjajList?.userid}</Typography>
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Authorizor Name:</Typography>{' '} {singleHujjajList?.auth_ID}</Typography>

              </Grid>
              <Grid item xs={4}>

                
                <Typography variant="body1"><Typography component="span" sx={{ fontWeight: 'bold' }}>Signature:</Typography>{' '} _________________</Typography>

              </Grid>

            </Grid>
            <Divider sx={{ marginLeft: '25px', marginRight: '25px', marginTop: '1px', marginBottom: '1px' }} />
            <Card sx={{ borderRadius: 6, backgroundColor: '#CCE5FF', marginTop: '5px', marginBottom: '5px' }}>
              <CardContent>
                <Typography variant="body2" color="textSecondary" align="center">
                  ዘምዘም ባንክ ሀጅዎ የተሳካ እና አላህ ዘንድ ተቀባይነት ያለው ሀጅ እንዲሆንልዎ ከወዲሁ መልካም ምኞቱን እየገለፀ ክፍያዎ በትክክል መፈጸሙን በማረጋገጥ ይህንን የክፍያ ማረጋገጫ ሲያበስርዎ ከታላቅ አክብሮት ጋር ነው፡፡


                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  N.B: ይህ መረጃ የባንኩ ቅርንጫፍ ማህተም እና ፊርማ ካላረፈበት ተቀባይነት አይኖረውም፡፡ መረጃውንም በጥንቃቄ እንዲያስቀምጡ አደራ እንላለን
                </Typography>
              </CardContent>
            </Card>
          </CardContent>

        </Card>



      </Dialog>
    </Box>
  );
}

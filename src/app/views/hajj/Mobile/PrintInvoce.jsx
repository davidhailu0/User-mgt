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

export default function PrintInvoce({ open, setOpen, handleClose, handleClickOpen }) {
  
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



  return (
    <Box>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>

            <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>Sound</H6>

            <Button color="inherit" onClick={generatePDF}>
              save
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
                <Typography variant="body1">Account Holder: XYZ123</Typography>
                <Typography variant="body1">Account No: City A</Typography>
                <Typography variant="body1">Paid Amount: City B</Typography>
                {/* Add more relevant details as needed */}

              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ margin: '5px' }}>For</Typography>
                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body1">Payment Code: XYZ123</Typography>
                <Typography variant="body1">Full Name: City A</Typography>
                <Typography variant="body1">Amount: City B</Typography>
                <Typography variant="body1">Passport Number: City B</Typography>
                <Typography variant="body1">Birth Date: City B</Typography>
                <Typography variant="body1">Service Package: City B</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ margin: '5px' }}>To</Typography>
                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body1">Account Holder: XYZ123</Typography>
                <Typography variant="body1">Account Number: City A</Typography>
                <Typography variant="body1">Transferd Amount: 285,600.00</Typography>
              </Grid>

            </Grid>
            <Divider sx={{ marginLeft: '25px', marginRight: '25px', marginTop: '1px', marginBottom: '1px' }} />
            <Grid container spacing={3} sx={{ marginLeft: '20px', marginRight: '20px', marginTop: '1px' }}>
              <Grid item xs={4}>
                {/* Column 1 */}


                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body2">Payment Branch: Jijiga</Typography>
                {/* Add more relevant details as needed */}

              </Grid>
              <Grid item xs={4}>

                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body1">Payment Date: 05/24/2023</Typography>

              </Grid>
              <Grid item xs={4}>

                <Typography variant="body1">Paid Amount: 285600</Typography>
                <Typography variant="body1">Narration :BKMRIVAV</Typography>
              </Grid>

            </Grid>
            <Divider sx={{ marginLeft: '25px', marginRight: '25px', marginTop: '1px', marginBottom: '1px' }} />
            <Grid container spacing={3} sx={{ marginLeft: '20px', marginRight: '20px', marginTop: '1px' }}>
              <Grid item xs={4}>
                {/* Column 1 */}


                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body2">Branch Name(Printing):Director IT System</Typography>
                {/* Add more relevant details as needed */}

              </Grid>
              <Grid item xs={4}>

                {/* <Typography variant="subtitle1">Flight Details:</Typography> */}
                <Typography variant="body1">Tailer Name: Authorizor Name:ADENJA</Typography>

              </Grid>
              <Grid item xs={4}>

                <Typography variant="body1">Signature:________________</Typography>

              </Grid>

            </Grid>
            <Divider sx={{ marginLeft: '25px', marginRight: '25px', marginTop: '1px', marginBottom: '1px' }} />
          <Card sx={{ borderRadius: 6, backgroundColor: '#CCE5FF',marginTop: '5px',marginBottom: '5px' }}>
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

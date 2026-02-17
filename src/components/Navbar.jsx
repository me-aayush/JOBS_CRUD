import React from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
  } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: '#1a3a52' }}>
      <Toolbar variant="dense">
        <Typography 
          variant="h4" 
          align='left' 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontFamily: "revert", 
            fontSize: "500", 
            color: "white", 
            fontWeight: "bold" 
          }}
        >
          📋 Job Portal
        </Typography>

        <Box sx={{ m: 0.5, mx: 'auto', width: 80 }}>
          <Button 
            variant="outlined" 
            href='http://localhost:3000'
            sx={{ 
              color: "white", 
              borderColor: "#7a9cb8",
              "&:hover": { 
                backgroundColor: "#2d5f85",
                borderColor: "white"
              }
            }}
          >
            Home
          </Button>
        </Box>

        <Box sx={{ m: 0.5, mx: 'auto', width: 100 }}>
          <Button 
            variant="outlined" 
            href='http://localhost:3000/create'
            sx={{ 
              color: "white", 
              borderColor: "#7a9cb8",
              "&:hover": { 
                backgroundColor: "#2d5f85",
                borderColor: "white"
              }
            }}
          >
            Add Job
          </Button>
        </Box>

        <Box sx={{ m: 0.5, mx: 'auto', width: 180 }}>
          <Button 
            variant="outlined" 
            href='https://github.com/me-aayush'
            sx={{ 
              color: "white", 
              borderColor: "#7a9cb8",
              "&:hover": { 
                backgroundColor: "#2d5f85",
                borderColor: "white"
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
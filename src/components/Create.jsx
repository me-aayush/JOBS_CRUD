import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const initial = { postId:"",postProfile: "", reqExperience: 0, postTechStack: [], postDesc:"" };


const Create = () => {
  const skillSet = [
    {
      name: "Javascript"
    },
    {
      name: "Java"
    },
    {
      name: "Python"
    },
    {
      name: "Django"
    },
    {
      name: "Rust"
    }
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/Jobposts",form)
      .then((resp) => {
        console.log(resp.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { postId, postProfile, reqExperience, postDesc } = form;

  const handleChange = (e) => {
    setForm({...form , postTechStack : [...form.postTechStack, e.target.value]});
  }

  

  return (
    <Paper sx={{ padding:"3%", backgroundColor: "#f0f4f8", minHeight: "100vh" }} elevation={0}>
      <Typography sx={{ margin: "3% auto", color: "#1a3a52", fontWeight: "bold" }} align="center" variant="h4">
        ➕ Create New Job Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: "0 2px 8px rgba(26, 58, 82, 0.1)"
          }}
        >
           <TextField
            min="0"
            type="number"
            sx={{ 
              width: "100%", 
              margin: "15px auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2d5f85"
                },
                "&:hover fieldset": {
                  borderColor: "#1a3a52"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#2d5f85"
              }
            }}
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            label="Enter your Post ID"
            variant="outlined"
            value={postId}
          />
          <TextField
            type="string"
            sx={{ 
              width: "100%", 
              margin: "15px auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2d5f85"
                },
                "&:hover fieldset": {
                  borderColor: "#1a3a52"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#2d5f85"
              }
            }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ 
              width: "100%", 
              margin: "15px auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2d5f85"
                },
                "&:hover fieldset": {
                  borderColor: "#1a3a52"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#2d5f85"
              }
            }}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={reqExperience}
          />
           <TextField
            type="string"
            sx={{ 
              width: "100%", 
              margin: "15px auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2d5f85"
                },
                "&:hover fieldset": {
                  borderColor: "#1a3a52"
                }
              },
              "& .MuiInputLabel-root": {
                color: "#2d5f85"
              }
            }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={postDesc}
          />
          <Box sx={{ margin:"20px auto", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "6px", border: "1px solid #e0e7f1", width: "100%" }}>
            <h3 style={{ color: "#1a3a52", marginTop: 0, marginBottom: "15px" }}>💼 Please mention required skills</h3>
           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {skillSet.map(({ name }, index) => {
              return (
                <li key={index} style={{ marginBottom: "12px" }}>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        onChange={handleChange}
                        style={{
                          marginRight: "8px",
                          cursor: "pointer",
                          accentColor: "#2d5f85"
                        }}
                      />
                      <label 
                        htmlFor={`custom-checkbox-${index}`}
                        style={{
                          cursor: "pointer",
                          color: "#2d5f85",
                          fontWeight: "500"
                        }}
                      >
                        {name}
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
           </ul>
          </Box>
          <Button
            sx={{ 
              width: "100%", 
              margin: "20px auto",
              padding: "12px",
              backgroundColor: "#1a3a52",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#2d5f85"
              }
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Create
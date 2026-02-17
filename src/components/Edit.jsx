import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Container,
  Card,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state?.id);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const skillSet = [
    { name: "Javascript", icon: "🟨" },
    { name: "Java", icon: "☕" },
    { name: "Python", icon: "🐍" },
    { name: "Django", icon: "🟢" },
    { name: "Rust", icon: "🦀" },
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "📦" },
    { name: "SQL", icon: "🗄️" },
  ];

  useEffect(() => {
    const fetchInitialPosts = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/Jobposts/${id}`);
        setForm(response.data);
        setSelectedSkills(response.data.postTechStack || []);
      } catch (error) {
        setErrorMessage("Error loading job post");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (currId) {
      fetchInitialPosts(currId);
    }
  }, [currId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.postProfile.trim()) {
      setErrorMessage("Job Profile is required");
      return;
    }
    if (!form.postDesc.trim()) {
      setErrorMessage("Job Description is required");
      return;
    }
    if (form.reqExperience < 0) {
      setErrorMessage("Experience must be non-negative");
      return;
    }

    setSubmitting(true);
    const formData = {
      ...form,
      postTechStack: selectedSkills,
    };

    try {
      await axios.put(`http://localhost:8080/Jobposts/${currId}`, formData);
      setSuccessMessage("Job updated successfully! Redirecting...");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error updating job post");
      setSuccessMessage("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#667eea' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}
        elevation={0}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <EditIcon sx={{ fontSize: 32, color: '#667eea' }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Edit Job Posting
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Update the job details below
          </Typography>
        </Box>

        {/* Alert Messages */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            {/* Post ID (Read-only) */}
            <TextField
              type="number"
              inputProps={{ min: "0" }}
              onChange={(e) => setForm({ ...form, postId: e.target.value })}
              label="Post ID"
              placeholder="e.g., 101"
              variant="outlined"
              value={form.postId}
              fullWidth
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                  }
                }
              }}
            />

            {/* Job Profile */}
            <TextField
              type="text"
              required
              onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
              label="Job Title"
              placeholder="e.g., Senior Software Engineer"
              variant="outlined"
              value={form.postProfile}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                  }
                }
              }}
            />

            {/* Experience */}
            <TextField
              type="number"
              inputProps={{ min: "0" }}
              required
              onChange={(e) =>
                setForm({ ...form, reqExperience: parseInt(e.target.value) || 0 })
              }
              label="Years of Experience Required"
              placeholder="e.g., 5"
              variant="outlined"
              value={form.reqExperience}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                  }
                }
              }}
            />

            {/* Job Description */}
            <TextField
              type="text"
              required
              multiline
              rows={5}
              onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
              label="Job Description"
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              variant="outlined"
              value={form.postDesc}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                  }
                }
              }}
            />

            {/* Skills Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#333',
                  mb: 2,
                }}
              >
                Required Skills
              </Typography>
              <FormGroup>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1 }}>
                  {skillSet.map(({ name, icon }, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={selectedSkills.includes(name)}
                          onChange={() => handleSkillChange(name)}
                          sx={{
                            color: '#667eea',
                            '&.Mui-checked': {
                              color: '#667eea',
                            }
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{icon}</span>
                          <span>{name}</span>
                        </Box>
                      }
                      sx={{
                        backgroundColor: '#fff',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        margin: 0,
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.1)',
                          borderColor: '#667eea',
                        }
                      }}
                    />
                  ))}
                </Box>
              </FormGroup>
              {selectedSkills.length > 0 && (
                <Typography variant="body2" sx={{ color: '#667eea', mt: 1, fontWeight: 600 }}>
                  {selectedSkills.length} skill(s) selected
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                sx={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    opacity: 0.6,
                  }
                }}
              >
                {submitting ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Update Job'}
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outlined"
                sx={{
                  flex: 1,
                  padding: '12px',
                  color: '#667eea',
                  borderColor: '#667eea',
                  fontWeight: 700,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    borderColor: '#764ba2',
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Edit;
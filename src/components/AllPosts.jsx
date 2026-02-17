import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
    Card,
    Grid,
    Typography,
    Box,
    Container,
    TextField,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
    const [post, setPost] = useState(null);
    const [filteredPost, setFilteredPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate("/edit", { state: { id } });
    }

    useEffect(() => {
        const fetchInitialPosts = async () => {
            const response = await axios.get(`http://localhost:8080/Jobposts`);
            setPost(response.data);
            setFilteredPost(response.data);
        }
        fetchInitialPosts();
    }, []);

    // Search functionality
    useEffect(() => {
        if (post) {
            const filtered = post.filter(p =>
                p.postProfile.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.postDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.postTechStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredPost(filtered);
        }
    }, [searchTerm, post]);

    const handleDeleteClick = (id) => {
        setDeleteConfirm({ open: true, id });
    }

    const handleConfirmDelete = async () => {
        const id = deleteConfirm.id;
        try {
            await axios.delete(`http://localhost:8080/Jobposts/${id}`);
            setPost(post.filter(p => p.postId !== id));
            setDeleteConfirm({ open: false, id: null });
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(135deg, #1a3a52 0%, #2d5f85 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        📋 Available Jobs
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#5a6c7d', mb: 3 }}>
                        Explore amazing job opportunities from top companies
                    </Typography>

                    {/* Search Bar */}
                    <TextField
                        fullWidth
                        placeholder="Search by job title, description, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 2, color: '#2d5f85' }} />,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#ffffff',
                                transition: 'all 0.3s ease',
                                borderColor: '#2d5f85',
                                '& fieldset': {
                                    borderColor: '#2d5f85',
                                },
                                '&:hover': {
                                    backgroundColor: '#f8fafb',
                                    boxShadow: '0 4px 12px rgba(26, 58, 82, 0.1)',
                                    '& fieldset': {
                                        borderColor: '#1a3a52',
                                    }
                                },
                                '&.Mui-focused': {
                                    boxShadow: '0 4px 20px rgba(26, 58, 82, 0.2)',
                                    '& fieldset': {
                                        borderColor: '#1a3a52',
                                    }
                                }
                            },
                            '& .MuiOutlinedInput-input::placeholder': {
                                color: '#9ca3af',
                                opacity: 1,
                            }
                        }}
                    />
                </Box>

                {/* Results Count */}
                {filteredPost && (
                    <Typography variant="body2" sx={{ color: '#7a9cb8', mb: 2 }}>
                        Found {filteredPost.length} {filteredPost.length === 1 ? 'job' : 'jobs'}
                    </Typography>
                )}

                {/* Jobs Grid */}
                <Grid container spacing={3}>
                    {filteredPost && filteredPost.length > 0 ? (
                        filteredPost.map((p) => {
                            return (
                                <Grid key={p.postId} item xs={12} sm={6} lg={4}>
                                    <Card
                                        sx={{
                                            padding: '24px',
                                            height: '100%',
                                            backgroundColor: '#ffffff',
                                            border: '2px solid #e0e7f1',
                                            borderLeft: '6px solid #1a3a52',
                                            borderRadius: '12px',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 12px 40px rgba(26, 58, 82, 0.15)',
                                                borderColor: '#2d5f85',
                                                borderLeftColor: '#2d5f85',
                                            }
                                        }}
                                    >
                                        {/* Job Title */}
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: '1.5rem',
                                                fontWeight: 700,
                                                color: '#1a3a52',
                                                mb: 1,
                                            }}
                                        >
                                            {p.postProfile}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            sx={{
                                                color: '#5a6c7d',
                                                mb: 2,
                                                fontSize: '0.95rem',
                                                lineHeight: 1.6,
                                                flex: 1,
                                            }}
                                            variant="body2"
                                        >
                                            {p.postDesc}
                                        </Typography>

                                        {/* Experience */}
                                        <Box sx={{ mb: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#2d5f85',
                                                    mb: 0.5,
                                                }}
                                            >
                                                ⏳ Experience Required
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#1a3a52' }}>
                                                {p.reqExperience} {p.reqExperience === 1 ? 'year' : 'years'}
                                            </Typography>
                                        </Box>

                                        {/* Skills */}
                                        <Box sx={{ mb: 3 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#2d5f85',
                                                    mb: 1,
                                                }}
                                            >
                                                💼 Required Skills
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {p.postTechStack && p.postTechStack.length > 0 ? (
                                                    p.postTechStack.map((skill, idx) => (
                                                        <Chip
                                                            key={idx}
                                                            label={skill}
                                                            sx={{
                                                                backgroundColor: '#2d5f85',
                                                                color: '#fff',
                                                                fontWeight: 600,
                                                                borderRadius: '8px',
                                                                transition: 'all 0.3s ease',
                                                                '&:hover': {
                                                                    backgroundColor: '#1a3a52',
                                                                    transform: 'scale(1.05)',
                                                                }
                                                            }}
                                                        />
                                                    ))
                                                ) : (
                                                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                                        No specific skills required
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                                            <Button
                                                startIcon={<EditIcon />}
                                                onClick={() => handleEdit(p.postId)}
                                                sx={{
                                                    flex: 1,
                                                    backgroundColor: '#2d5f85',
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: '#1a3a52',
                                                        boxShadow: '0 4px 12px rgba(26, 58, 82, 0.3)',
                                                    }
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteClick(p.postId)}
                                                sx={{
                                                    flex: 1,
                                                    backgroundColor: '#e74c3c',
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: '#c0392b',
                                                        boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : (
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Typography variant="h6" sx={{ color: '#7a9cb8', mb: 1 }}>
                                    {post ? 'No jobs found matching your search' : 'Loading jobs...'}
                                </Typography>
                                {searchTerm && (
                                    <Button
                                        onClick={() => setSearchTerm('')}
                                        sx={{ mt: 2, color: '#2d5f85', fontWeight: 600 }}
                                    >
                                        Clear Search
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null })}
            >
                <DialogTitle sx={{ fontWeight: 700, color: '#1a3a52' }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#5a6c7d' }}>
                        Are you sure you want to delete this job posting? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={() => setDeleteConfirm({ open: false, id: null })}
                        sx={{ color: '#2d5f85', fontWeight: 600 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        sx={{
                            backgroundColor: '#e74c3c',
                            color: '#fff',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#c0392b' }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AllPosts
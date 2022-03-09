import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { commentContext } from '../Comments/CommentContext';


const AddComment = () => {

    const [values, setValues] = useState({
        username: '',
        title: '',
        text: ''
    })

    const { addComment } = useContext(commentContext)
    const navigate = useNavigate()

    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        if(!values.title) values.title = ''
        addComment({...values})
        navigate('/commentList')
    }
        
    return (
        <Box
        sx={{   
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: '40px auto',
            maxwidth: 1000,
            height: 'auto',
          },
        }}
      >
        <Paper elevation={3}>
          <h1 style={{textAlign: 'center'}}>Добавить Комментарий</h1>
          <div style={{display: 'flex', justifyContent: 'space-around', color: 'black'}}>
              <div style={{margin: '10px'}}>
                  <img width='300' src={values.image ? values.image : 'https://content.onliner.by/news/1100x5616/472baa6904f365c4bae96d6b77c13010.jpeg' } />
              </div>
              <div style={{
                  width: '450px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center'
              }}>
                  <form  autoComplete='off' style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                      <TextField style={{padding: '10px'}} name='username' onChange={handleInp} value={values.username} variant='outlined' label='Username'/>
                      <TextField style={{padding: '10px'}} name='title' onChange={handleInp} value={values.title} variant='outlined' label='Title'/>
                      <TextField style={{padding: '10px'}} name='text' onChange={handleInp} value={values.text} variant='outlined' label='Text'/>
                  </form>
                  <Button onClick={handleSave} variant="contained" color='warning'>Добавить комментарий</Button>
              </div>
          </div>
        </Paper>
      </Box>
    );
};

export default AddComment;
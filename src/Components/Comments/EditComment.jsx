import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { commentContext } from './CommentContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

export default function EditComment () {
    const [values, setValues] = useState ({
        username: '',
        title: '',
        text: '' 
    })

    const { edit, editComment, saveEditComment } = useContext(commentContext)

    const { id } = useParams()

    useEffect(() => {
        editComment(id)
    }, [id])

    useEffect(()=> {
        if(edit) {
            setValues(edit)
        }
    }, [edit])


    const handleEditInp = (e) => {
        let obj = {
            ...values, 
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        saveEditComment(values)
    }

    return (
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m:'40px auto',
          maxWidth: 1000,
          height: 'auto',
          padding: '10px'
        },
      }}
    >
        <Paper elevation={3}>
            <h1>Изменить данные</h1>
                <div style={{
                    display: 'flex',
                    justifyContent:'space-around',
                    color: 'black'
                }}>
                    {/* <div>
                        <img width='300' src={values.image} alt={values.title} />
                    </div> */}
                    <div style={{
                         width: '450 px',
                         display: 'flex',
                         alignItems:'center',
                         flexDirection: 'column',
                         justifyContent: 'center'
                    }}>
                        <form noValidate
                        autoComplete='off' style={{
                            display: 'flex', 
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <TextField 
                        style={{padding: '10px'}} name='username' 
                        onChange={handleEditInp} 
                        value={values.username} variant='outlined' 
                        label='Username'/>
                        <TextField 
                        style={{padding: '10px'}} name='title' 
                        onChange={handleEditInp} 
                        value={values.title} variant='outlined' 
                        label='Title'/>
                    <TextField 
                        style={{padding: '10px'}} name='text' 
                        onChange={handleEditInp} 
                        value={values.text} variant='outlined' 
                        label='Text'/>
                </form>
                <Link to='/commentList'>
                    <Button onClick={handleSave} variant='contained' color='warning'>Сохранить комментарий</Button>
                </Link>
                    </div>
            </div>
      </Paper>
    </Box>
    );
};


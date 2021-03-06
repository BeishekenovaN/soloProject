import { Box, Grid, Pagination, Stack , Button} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link} from 'react-router-dom';
// import SideBar from '../../Home/SideBar/SideBar'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { commentContext } from '../Comments/CommentContext';
import CommentCard from './CommentCard';




const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const CommentList = () => {
    const { comments, getComments, paginatedPages } = useContext(commentContext)
    const search = new URLSearchParams(window.location.search)
    const [searchParams, setSearchParams] = useSearchParams()
    const [limit, setLimit] = useState(10)
    const[ searchVal, setSearchVal ] = React.useState(searchParams.get('q') ? searchParams.get('q') : '')
    const [page, setPage] = useState(searchParams.get('_page') ? searchParams.get("_page") : 1)
    const navigate = useNavigate()

    useEffect(() => {
        setSearchParams({
            '_limit': limit,
            "_page": page
        })
    }, [limit, page])

    useEffect(() => {
        getComments()
    }, [])

    const handleValue = (e) => {
        const search = new URLSearchParams(window.location.search)
        search.set('q', e.target.value)
        setSearchVal(e.target.value)
        setSearchParams({
            'q': searchVal,
            '_limit': 3,
            '_page': 1
        })
        getComments()
    }

    const handlePage = (e, pageVal) => {
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setSearchParams({'_page': pageVal, '_limit': limit})
        getComments()
        setPage(pageVal)
    }
    return (
        <div style={{background: 'pink'}}>
        <div style={{backgroundColor: 'black', width: '100%',height:' 100px'}}></div>
        {/* <SideBar />   */}
        <Search sx={{display: 'flex', justifyContent: 'space-between', paddingTop: 5}} >
          <SearchIconWrapper  >
            <SearchIcon sx={{paddingTop: 5}}/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search???"
            inputProps={{ 'aria-label': 'search' }}
            value={searchVal}
            onChange={handleValue}
            sx={{border: '2px solid'}} 
          />
          <Link to={'/addComment'}>
          <Button sx={{marginRight: 5}} 
        variant='contained'
        color='primary'>
          ???????????????? ??????????
        </Button>
        </Link>
      
      </Search>

        <Box sx={{flexGrow: 1, margin: 4}}>
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 1, sm: 2, md: 4}}>
                {
                    comments ? (
                        comments.map((item, index) => (
                                <Grid sx={{display: 'flex', justifyContent: 'center'}} item xs={1} sm={4} md={4}  key={index}>
                                    <CommentCard item={item} key={index}/>
                                </Grid>
                        ))
                    ): (<h1>Loading...</h1>)
                }
            </Grid>
            <Stack spacing={2}>
                <Pagination 
                    count={paginatedPages}
                    onChange={handlePage}
                    page={+page}
                    sx={{display: 'flex', justifyContent: 'center', padding: 4}}
                />
            </Stack>
        </Box>
    </div>
);
};


export default CommentList;
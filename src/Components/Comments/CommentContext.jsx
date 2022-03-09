import axios from 'axios';
import React, { createContext, useReducer, useState, useEffect } from 'react';
import { API_COMMENTS } from '../../Helpers/Constants';

export const commentContext = createContext () 

const INIT_STATE = {
    comments: null,
    edit: null,
    paginatedPages: 1
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case "GET_COMMENTS":
            return {...state, comments: action.payload.data,
            paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 8)}
        case "GET_EDIT_PRODUCT":
            return{ ...state, edit: action.payload} 
        default:
            return state
    }
}

const CommentContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)


//! create
const addComment = async (newComment) => {
    try {
        await axios.post(API_COMMENTS, newComment)
        getComments()
    } catch (error) {
        alert(error)
    }
}
//! Read 
const getComments = async () => {
    try {
        let res = await axios.get(`${API_COMMENTS}${window.location.search}`)
        let action = {
            type: "GET_COMMENTS",
            payload: res
        }
        dispatch(action)
    }catch(error){
        alert(error)
    }
}

//! Delete 
const deleteComment = async (id) => {
    await axios.delete(`${API_COMMENTS}/${id}`)
    getComments()
}

//! Edit Product
const editComment = async (id) => {
    try {
        let res = await axios(`${API_COMMENTS}/${id}`)
        let action = {
            type: "GET_EDIT_COMMENT",
            payload: res.data
        }
        dispatch(action) 
    } catch (error) {
        console.log(error);
    }
}

//! save edited comment

const saveEditedComment = async (updatedComment) => {
    try {
        await axios.patch(`${API_COMMENTS}/${updatedComment.id}`, updatedComment)
        getComments()
    }catch (error) {
        console.log(error);
    }
}


    return (
        <commentContext.Provider value ={{
            addComment,
            getComments,
            deleteComment,
            editComment,
            saveEditedComment,
            edit: state.edit,
            comments: state.comments,
            paginatedPages: state.paginatedPages
        }}>
            {children}
        </commentContext.Provider>
    );
};
export default CommentContextProvider;
import axios from 'axios';
import { SAVE_ADD_ITEM } from '../constants/savedConsants';

export const addToSave = (id) => async (dispatch, getState) => {

    const {data} = await axios.get(`/api/posts/${id}`)


    dispatch({
        type: SAVE_ADD_ITEM,
        payload:{
            post: data._id,
            name: data.name,
            imgurl: data.imgurl,

        }
    })
    localStorage.setItem('savedItems', JSON.stringify(getState().save.savedItems))

}
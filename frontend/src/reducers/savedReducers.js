import { SAVE_ADD_ITEM } from '../constants/savedConsants';

export const savedReducer = (state={savedItems:[]}, action) => {
    switch(action.type){
        case SAVE_ADD_ITEM:
            const item = action.payload
            const existItem = state.savedItems.find(x => x.post === item.post)

            if(existItem) {

                return

            }else{
                return{
                    ...state,
                    savedItems:[...state.savedItems, item]
                }
            }




        default: 
            return state
    }
}
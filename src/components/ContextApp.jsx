import React, {useReducer, useRef} from "react";
import Context from "./Context";
import ContextForm from "./ContextForm";

const ACTIONS = {
    ADD_ITEM: 'add-item',
    DELETE_ITEM: 'delete-item',
    EDIT_ITEM: 'edit-item',
    UPDATE_ITEM: 'update-item',
  }

export const reducer = (items, action) => {
    switch(action.type){
      case ACTIONS.ADD_ITEM:
        return [...items, action.payload];
        break;
      case ACTIONS.DELETE_ITEM:
        return items.map(item => {
          if(item.id === action.id){
            item.isDelete = !action.isDelete;
          }
          return item;
        });
        break;
      
      case ACTIONS.EDIT_ITEM:
        return items.map(item => {
          if(item.id === action.id){
            item.isEdit = !action.isEdit
          }
          return item;
        });
        break;
  
      case ACTIONS.UPDATE_ITEM:
        return items.map(item => {
          if(item.id === action.id){
            return {...item, isEdit: false, name: action.name }
          }
          return item;
        });
        break;
  
        default: 
        return items;
    }
  }
  

export default function ContextApp()  {
    const [items, dispatch] = useReducer(reducer,[]);
    let itemRef = useRef();
    let newItemRef = useRef();

    const handleSubmit = (e) => {
        if(itemRef.current.value === "") return false;
        const items =  {
              id: Date.now(),
              name: itemRef.current.value,
              isDelete: false,
              isEdit: false,
            } 
            e.preventDefault();
            dispatch({type: ACTIONS.ADD_ITEM, payload: items})
            itemRef.current.value = "";
      };
    return(
        <Context.Provider value={{items, dispatch, handleSubmit, itemRef, newItemRef}}>
            <ContextForm />
        </Context.Provider>
    )
}
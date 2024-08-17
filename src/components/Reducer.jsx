import React, { useContext, useReducer, useRef,} from "react";
import "./State.css";
import Context from "./Context";

const Item = ({ id, name }) => {
  return (
    <li>
     {name}
    </li>
  );
};

export const ACTIONS = {
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


const State = () => {
  
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
  
  const handleUpdate = (event)=> {
    if(event.key === "Enter"){
      dispatch({type: ACTIONS.UPDATE_ITEM});
    }
  }
  
  console.log("Itemms",items)

  return (
    <div
      style={{
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "30%",
      }}
    >
      <h2>Add Item Here!</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={itemRef}
            autoFocus
          />
        <button onClick={handleSubmit}>Add Item</button>
        </form>
      </div>
      <div>
        <ul>
          {items.filter(obj=>obj.isDelete === false).map((i) => {
            return (
              <div key={i.id}>
                <Item id={i.id} name={i.name} />
                <button onClick={()=>dispatch({type: ACTIONS.DELETE_ITEM, id: i.id, isDelete: i.isDelete})}>Delete</button>
                <button onClick={() => dispatch({type: ACTIONS.EDIT_ITEM, id: i.id, isEdit: i.isEdit})}>Edit</button>

                {i.isEdit && 
                  <div>
                    <input type="text" autoFocus defaultValue={i.name} ref={newItemRef} onKeyUp={handleUpdate}/>
                    <button onClick={() => dispatch({type: ACTIONS.UPDATE_ITEM, id: i.id, isEdit: i.isEdit, name: newItemRef.current.value })}>Update</button>
                  </div>
                }
              </div>
            );
          })}
        </ul>
      </div>

      <p style={{ borderTop: "5px solid red", width: "50%" }}></p>
       <div>
        <ul>
          {items.filter(obj=>obj.isDelete === true).map((i) => {
            return (
              <div key={i.id}>
                
                <Item id={i.id} name={i.name} />
                <button onClick={()=>dispatch({type: ACTIONS.DELETE_ITEM, id: i.id, isDelete: i.isDelete})}>Undo</button>
                {items.filter(d => d.isDelete === true) ? "" : 
                  <button>Edit</button>
                }
              </div>
            );
          })}
        </ul>
      </div>

      

      
    </div>
  );
};

export default State;

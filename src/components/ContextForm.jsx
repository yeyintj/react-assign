import React, { useContext } from "react";
import Context from "./Context";
import { ACTIONS } from "./Reducer";

const Item = ({ items, dispatch, newItemRef}) => {
    return (
      <div>
       {items.filter(f => f.isDelete === false).map(i => {
        return (
                <div key={i.id} >
                    <ul style={{display: "flex", gap: 10, marginTop: 10, listStyle: 'none'}}>
                        <li>{i.name}</li>
                        <button onClick={()=>dispatch({type: ACTIONS.DELETE_ITEM, id: i.id, isDelete: i.isDelete})}>Delete</button>
                        <button onClick={() => dispatch({type: ACTIONS.EDIT_ITEM, id: i.id, isEdit: i.isEdit})}>Edit</button>
                    </ul>

                    {i.isEdit && 
                            <div>
                                <input 
                                type="text" 
                                autoFocus 
                                defaultValue={i.name} 
                                ref={newItemRef}
                                style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid blue', outlineWidth: 'thin',outlineColor: 'blue', marginRight: 10, padding: 7}}
                                 />
                                <button onClick={() => dispatch({type: ACTIONS.UPDATE_ITEM, id: i.id, isEdit: i.isEdit, name: newItemRef.current.value })}>Update</button>
                            </div>
                            }
                </div>
            )
        })}

            

                        <p style={{ borderTop: "5px solid red", width: "50%" }}></p>
                        <div>
                            
                            {items.filter(f => f.isDelete === true).map(i => {
                            return (
                                <ul key={i.id} style={{listStyle: "none", display: "flex", gap: 10, marginTop: 10}}>
                                    <li>{i.name}</li>
                                    <button onClick={()=>dispatch({type: ACTIONS.DELETE_ITEM, id: i.id, isDelete: i.isDelete})}>Undo</button>
                                </ul>
                            )
                            })}
                        </div>
      </div>
    );
  };

export default function ContextForm(){
    const {items, dispatch, handleSubmit, itemRef, newItemRef} = useContext(Context);
    

    
    return(
        <div style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "30%",
          }}>
           <h2>Add Item Here!</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        ref={itemRef}
                        autoFocus
                        placeholder="Enter Item"
                        style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid blue', outlineWidth: 'thin',outlineColor: 'blue', marginRight: 10, padding: 7}}
                    />
                    <button onClick={handleSubmit}>Add Item</button>
                </form>
            </div>
            <div>
                <ul>
                    <Item items={items} dispatch={dispatch} newItemRef={newItemRef}/>
                </ul>
            </div>

            
        </div>
    )
}
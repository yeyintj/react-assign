import React, { useState } from "react";

const IncrementButton = ({setCount}) => {
    const increatment = ()=>{
        setCount(prev => prev + 1);
    }
    return(
            <button style={{borderRadius: '100%', padding: '50px', fontSize: '50px'}} onClick={increatment}>+</button>
       
    )
}

const DecreatmentButton = ({count,setCount})=> {

    const decreatment = ()=>{
        return count > 0 && setCount(prev => prev - 1);
    }

    return(
        <button style={{borderRadius: '100%', padding: '50px', fontSize: '50px'}} onClick={decreatment}>-</button>
    )
}

const Count = ({count})=> {
    return(
        <h3 style={{marginLeft: '10px', marginRight: '10px', border: '2px solid #000', padding: '50px', borderRadius: '50%',}}> Count: {count} </h3>
    )
}

export default function App() {

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    
    return(
        <div>
            <ul style={{display: "flex"}}>
                <IncrementButton setCount={setCount1}/>
                <Count count={count1}/>
                <DecreatmentButton count={count1} setCount={setCount1}/>
            </ul>
            <ul style={{display: "flex"}}>
                <IncrementButton setCount={setCount2}/>
                <Count count={count2}/>
                <DecreatmentButton count={count2} setCount={setCount2}/>
            </ul>
            <ul style={{display: "flex"}}>
                <IncrementButton setCount={setCount3}/>
                <Count count={count3}/>
                <DecreatmentButton count={count3} setCount={setCount3}/>
            </ul>
        </div>
    )
}


// import React, { useReducer } from 'react'
// import Item from './Item';

// const ACTIONS = {
//     ADD_COUNT: 'add-count',
//     SUBTRACT_COUNT: 'subtrat-count',
// }
// const reducer = (state, action)=>{
//     switch(action.type){
//         case ACTIONS.ADD_COUNT:
//             return {...state, count: state.count + 1}
        
//         case ACTIONS.SUBTRACT_COUNT:
//             return {count: Math.max(state.count - 1, 0)};
//     }
// }
// export default function Reducer() {
//     const [state, dispatch] = useReducer(reducer, {count: 0})

//     const increatment = ()=>{
//         dispatch({type: ACTIONS.ADD_COUNT});
//     }

//     const decreatment = ()=>{
//         dispatch({type: ACTIONS.SUBTRACT_COUNT});
//     }
//   return (
//     <div>
//         <Item count={state.count} increatment={increatment} decreatment={decreatment}/>
//         {/* <h3>Count: {state.count}</h3>
        
//         <button onClick={increatment}>+</button>
//         <button onClick={decreatment}>-</button> */}
//     </div>
//   )
// }

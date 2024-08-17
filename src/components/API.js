import React, { useEffect, useState } from "react";

const API = () => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            setUsers(json);
        });
    }, [])
    console.log(users)

    const add = () => {
        fetch('https://fakestoreapi.com/products', {
            method: 'Post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({title: 'Adidas', price: 0.99}),
        }).then(res => res.json()).then(i => {
            setUsers([...users, i]);
        });
    }
    return(
        <div>
            <h1>API!</h1>
            <ul>
                {users.map(i => 
                     <li key={i.id}>Title: {i.title} / Price: (${i.price})</li>
                )}
                <button onClick={add}>Add</button>
            </ul>
        </div>
    )
}

export default API;
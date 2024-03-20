import * as React from 'react';
import './TypePicker.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';

function TypePicker (props) {
    const [TypePost , setType] = useState("");
    const [IsValid , setIsValid] = useState(false);
    const [IsClicked , setClicked] = useState(false);
    useEffect (() => {
        if(props.data.Post !== "")
        {
            setType(props.data.Post)
        }
    },[])
    const handlechange = (e) => {
        setType(e.target.value)
    }
    const callhandlestep  = (e) => {
        if (IsValid)
        {props.handlestep();
        props.sendDataToParent(TypePost);}
        else
        setClicked(true)
    }
    useEffect (() => {
        if(TypePost !== "")
        {setIsValid(true)}
        else
        {setIsValid(false)}
    }, [TypePost])
    return (
        <div className='Type-box'>
            <span className='Title-Type' >Choose the type of the post</span>
            <select className='Type-Select' value={TypePost} onChange={handlechange}>
                <option value="">Select a type</option>
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Podcast">Podcast</option>
            </select>
            <button onClick={callhandlestep} className={'Type-button'}>Next</button>
            {IsValid == false && IsClicked ?<Alert variant="filled" severity="error">
                You need to pick a type to go to the next step
            </Alert> : null}
        </div>
    );
}
export default TypePicker;
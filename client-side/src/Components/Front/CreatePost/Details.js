import * as React from 'react';
import { useState, useRef } from 'react';
import './Details.css'
import { useDispatch, useSelector } from 'react-redux';
import {getTags} from '../../../Redux/actions/tags';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


function Details (props) {
    const dispatch = useDispatch();
    const [IsValid , setIsValid] = useState(false);
    const [Empty , setEmpty] = useState(true);
    const [IsClicked , setClicked] = useState(false);
    const [data, setData] = useState(
        {
            Title : "",
            Tags : [],
            Description : ""
        }
    )
    React.useEffect (() => {
        if(props.data.Title !== "")
        {
            setData({
                Title :  props.data.Title,
                Tags : props.data.Tags,
                Description : props.data.Description,
            })
        }
    },[])
    React.useEffect(() => {
        dispatch(getTags())
      }, [dispatch]);
    const Tags = useSelector((state) => state.tagReducer.tags );
    const callhandlestep  = (e) => {
        if (IsValid)
        {props.handlestep();
        props.sendDataToParent(data);}
        else
        setClicked(true)
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handletagchange = (e , value) => {
        data.Tags = [];
        if( value.length !==0 )
        {
            data.Tags.push(...value);
            setEmpty(false);
        }else setEmpty(true)
        
    }
    React.useEffect (() => {
        if(data.Title !== "" && Empty === false && data.Description !== "")
        {
            setIsValid(true)
        }
        else
        {
            setIsValid(false)
        }
    }, [data])
    const handlestepdown = () => {
        props.handlestepdown()
    }
    return (
        <div className='DetailsWrapper'>
                <div className='inputWrapper'>   
                    <input className='input' type="text" name='Title' onChange={handleChange} required/>
                    <span className='span'>Title</span>
                </div>
                <div className='inputWrapper'>
                    {Array.isArray(Tags) ? 
                            <Autocomplete
                            className={Empty ?'Autocomplete': 'AutocompleteFilled'}
                            multiple  
                            options={ Tags.map((option) => option.name)}
                            freeSolo
                            onChange={handletagchange}
                            renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip 
                                        variant="outlined" 
                                        label={option} {...getTagProps({ index })} 
                                        
                                    />
                            ))
                            }
                            renderInput={(params) => (
                            <TextField
                                    className='TextField'
                                {...params}
                                label="Tags"
                                
                            />
                            )}
                        />:
                                null
                            }
                </div>
                <div className='inputWrapper'>
                    <textarea  name='Description' onChange={handleChange}  type="text" rows="4" cols="50" required/>
                    <span className='span'>Description</span>
                </div>
                <div className='ButtonWrapper'>
                    <button onClick={handlestepdown}  className='Details-Goback-button'>Go Back</button>
                    <button onClick={callhandlestep} className='Details-submit-button'>Next</button>  
                </div>
                {IsValid === false && IsClicked ?
                <Alert variant="filled" severity="error" sx={{marginTop: "20px", right: "100"}}>
                You need to fill all fields to go to the next step
                </Alert> : null}
                      
                   
        </div>
    )
}
export default Details;
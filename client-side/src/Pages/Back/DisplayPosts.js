import * as React from 'react';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DisplayPosts from '../../Components/Back/DisplayPosts';
import { GetAllPost } from '../../Redux/actions/posts';




function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function DisplayAllPosts() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(GetAllPost());
  },[dispatch])
  const AllPost = useSelector((state) => state.postReducer.AllPost);
 
  return (
    <DisplayPosts  /*Delete={deletePodcast} */  list={AllPost}/>
  );
}
export default DisplayAllPosts;
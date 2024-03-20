import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from '../../Redux/actions/user';
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideMenu from '../../Components/Back/Basic/SideMenu';
import AppBar from '../../Components/Back/Basic/AppBar';
import './Dashboard.css'

function Dashboard () {
    
    const [isAdmin, setIsAdmin] = React.useState(false); 
    const [loading, setLoading] = React.useState(true); // Add loading state
    const user = useSelector((state) => state.userReducer.user);
   const dispatch = useDispatch();
   React.useEffect(() => {
    dispatch(currentUser()).then(() => {
        setLoading(false); // Set loading to false after action is complete
    });
}, [dispatch, user]);
  React.useEffect(() => {
    if(user && user.isAdmin === true)
    {
      setIsAdmin(true);
    } else {
        setIsAdmin(false);
    }
   
  }, [user])

    if (loading) {
        return <div></div>;
        }
    return (
        <>
        { isAdmin === false ?  
        <Navigate to='/' replace />
        : 
        <>
            <SideMenu />
            <AppBar user={user}   /> 
                <div className='main'> 
                    <Outlet />
                </div>
        </>
        
        }
        </>
    );
}
export default Dashboard ; 
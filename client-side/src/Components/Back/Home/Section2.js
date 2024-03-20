import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GetAllUsers} from '../../../Redux/actions/user';
import './Section2.css';

function Section2 () {
    const dispatch = useDispatch();
    const [sortedusers, setsortedusers] = React.useState([]);
    React.useEffect(  () => {
        dispatch(GetAllUsers());
    }, [dispatch]);
    const users = useSelector((state) =>state.userReducer.users)
    const Status = (bool) =>{
        if(bool === false)
        return(
            <td ><span className='status NotYet'>Not yet</span></td>
        )
        else 
        return(
            <td><span className='status Confirmed'> Confirmed</span></td>
        )
    } 
    const listUsers = users.slice(0, 10).map((user) =>
        <tr>
            <td>{user.Firstname}</td>
            <td>{user.Mail}</td>
            <td>{user.PhoneNumber}</td>
            {Status(user.IsMailConfirmed)}
        </tr>
    );
      React.useEffect(  () => {

        const sortedUsers = [...users].sort((a, b) =>
          new Date(b.LastConnexion) - new Date(a.LastConnexion)
        );
        setsortedusers(sortedUsers)
    }, [users]);
    return(
        <div className='details'>
            <div className='AllUsers'>
                <div className='cardHeader'>
                    <h2>All users</h2>
                    <a href="/Dashboard/Users" className='btn'>View All</a>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone Number</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers}
                        </tbody>
                    </table>    
            </div> 
            <div className='recentUser'>
                <h2>Recent Users</h2>
                <table>
                    {
                        sortedusers.slice(0, 7).map((user) =>
                        <tr>
                            <td width={'60px'}><div className='imgBx'><img src={user.Image}  /></div></td>
                            <td><h4>{user.Firstname}<br/><span>{user.Lastname}</span></h4></td>
                        </tr>
                        )
                    }
                </table>
            </div>           
        </div>
    );
}
export default Section2;
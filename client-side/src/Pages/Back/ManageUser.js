import * as React from 'react';
import './UserPage.css';
import DisplayUsers from '../../Components/Back/Users/DisplayUser';
import UserForm from '../../Components/Back/Users/UserForm'

function ManageUser (){
    
    return (
        <div className='Usercontainer'>
            <DisplayUsers />
            <UserForm />
        </div>
    );
}
export default ManageUser;
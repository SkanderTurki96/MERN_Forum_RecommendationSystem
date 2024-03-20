import * as React from 'react';
import '../../../Pages/Back/UserPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {GetAllUsers, DeleteUser} from '../../../Redux/actions/user';
import ReactPaginate from 'react-paginate';

function DisplayUsers () {
    const dispatch = useDispatch();
    React.useEffect(  () => {
        dispatch(GetAllUsers());
    }, [dispatch]);
    const users = useSelector((state) =>state.userReducer.users)
    /***************** PAGINATION  */
    const [itemOffset, setItemOffset] = React.useState(0);
    const endOffset = itemOffset + 5;
    const currentUsers= users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(users.length / 5);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 5) % users.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const listUsers = currentUsers.map((user) =>
        <tr>
            <td>{user.Firstname}</td>
            <td>{user.Mail}</td>
            <td>{user.PhoneNumber}</td>
            <td>
                <span className='icon'>
                    <span ><ion-icon name="eye-outline"></ion-icon></span>
                    <span onClick={DeleteUser(user._id)}><ion-icon name="trash-outline"></ion-icon></span>
                </span>
                    
            </td>
        </tr>
    );
    return(
            <div className='DisplayUsers'>
                <div className='Header'>
                    <h2>All users</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers}  
                    </tbody>
                </table>
                    <ReactPaginate
                        activeClassName={'itemactive '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={pageCount}
                        nextClassName={"item next "}
                        nextLabel={<ion-icon style={{ fontSize: 18, width: 150 }} name="arrow-forward-outline"></ion-icon> }
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={5}
                        previousClassName={"item previous"}
                        previousLabel={<ion-icon style={{ fontSize: 18, width: 150 }} name="arrow-back-outline"></ion-icon>}
                    />
            </div>
    );
}
export default DisplayUsers;
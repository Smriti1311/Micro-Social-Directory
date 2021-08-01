import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
//import UserDetails from './UserDetails';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './ListUsers.scss';

function ListUsers(props) {
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 24;
    const usersVisited = pageNumber * usersPerPage;
    let serialNumber = ( pageNumber ) * usersPerPage;

    const usersOnCurrentPage = props.usersData.slice(usersVisited, usersVisited + usersPerPage);
    
    //TODO: Why its not setting the initial value on displayUsersOnPage
    const [displayUsersOnPage, setdisplayUsersOnPage] = useState(usersOnCurrentPage);
    console.log(displayUsersOnPage);
    //setdisplayUsersOnPage(usersOnCurrentPage);
    const sortUsersHandler = () => {
        console.log('sort user handler');
      //  usersOnCurrentPage.map((user)=>(console.log(user.name)));

       usersOnCurrentPage.sort((a,b)=>(a.name.first > b.name.first ? 1 : -1));
     console.log(usersOnCurrentPage);

     // sortedUsersList.map((user)=>(console.log(user.name)));
   //  usersOnCurrentPage.sort((a,b)=>(a.name > b.name ? 1 : -1));
    // displayUsers();

    }

      const displayUsers = usersOnCurrentPage
        .map((user, index) => {
            serialNumber = serialNumber + 1;
            return <tr key={index} >
                <td>{serialNumber}</td>
                <td>{user.name.first + ' ' + user.name.last}</td>
                <td><img src={user.picture.thumbnail} alt={user.title} onClick={sortUsersHandler}/></td>
            </tr>
        })

        const totalUsers = props.usersData.length;
        const pageCount = Math.ceil(totalUsers / usersPerPage);

    const changePageHandler = ({ selected }) => {
        console.log(selected);
        setPageNumber(selected);
      //  setusersOnCurrentPage( props.usersData.slice(usersVisited, usersVisited + usersPerPage));
    }

   

    return (
        <>
            <Table  bordered hover className=' w-75 mx-auto my-5 text-center'>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name<img src='./media/sort-asc.png' height='25px' onClick={sortUsersHandler}></img></th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel='Previous'
                nextLabel='Next'
                pageCount={pageCount}
                onPageChange={changePageHandler}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </>
    );
}

export default ListUsers;
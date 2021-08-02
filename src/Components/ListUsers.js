import React, { Component } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';
import './ListUsers.scss';

const usersPerPage = 24;
class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            displayUsersOnPage: [],
            pageNumber: 0,
            sortImage: './media/sort-asc.png'
        }
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=100')
            .then(response => {
                const usersData = response.data.results;
                this.setState({
                    usersData: usersData,
                    displayUsersOnPage: usersData.slice(0, usersPerPage)
                });
            })
    }

    sortUsersHandler = () => {
        if (this.state.sortImage === './media/sort-asc.png') {
            this.setState({
                displayUsersOnPage: this.state.displayUsersOnPage.sort(
                    (a, b) => (a.name.first > b.name.first ? 1 : -1)),
                sortImage: './media/sort-desc.png'
            })
        }
        else {
            this.setState({
                displayUsersOnPage: this.state.displayUsersOnPage.sort(
                    (a, b) => (a.name.first < b.name.first ? 1 : -1)),
                sortImage: './media/sort-asc.png'
            })
        }
    }

    changePageHandler = ({ selected }) => {
        const usersVisited = selected * usersPerPage;
        this.setState({
            pageNumber: selected,
            displayUsersOnPage: this.state.usersData.slice(usersVisited, usersVisited + usersPerPage)
        });
    }

    userDetailsHandler = (userPhoneNum) => {
        this.props.history.push(`/userDetails/${userPhoneNum}`);
    }

    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {this.state.sortImage === './media/sort-asc.png' ? 'Sort By Name(Ascending)' : 'Sort By Name(Descending)'}
        </Tooltip>
      );

    render() {
        const { pageNumber, usersData, displayUsersOnPage, sortImage } = this.state;
        let serialNumber = (pageNumber) * usersPerPage;
        const totalUsers = usersData.length;
        const pageCount = Math.ceil(totalUsers / usersPerPage);
        const displayUsers = displayUsersOnPage
            .map((user, index) => {
                serialNumber = serialNumber + 1;
                return <tr key={index} onClick={() => this.userDetailsHandler(user.phone)}>
                    <td>{serialNumber}</td>
                    <td>{user.name.first + ' ' + user.name.last}</td>
                    <td><img src={user.picture.thumbnail} alt={user.title} /></td>
                </tr>
            })
        return (
            <>
                <Table bordered hover className=' w-75 mx-auto my-5 text-center'>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name
                                <OverlayTrigger placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip}>
                                    <img src={sortImage} alt='Sort' height='25px'
                                        onClick={this.sortUsersHandler}></img>
                                </OverlayTrigger>
                            </th>
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
                    onPageChange={this.changePageHandler}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </>
        );
    }
}

export default withRouter(ListUsers);
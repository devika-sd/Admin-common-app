import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import * as actionTypes from "../../store/actions";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/book/book.png';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux';
import * as bookactions from '../../Actions/book-action';
import NavLeft from '../../App/layout/AdminLayout/NavBar/NavLeft/index';
import BookSearch from '../../App/layout/AdminLayout/NavBar/NavLeft/NavSearch/booksearch';
import Notification from '../../Admin-part1/Notification/Notification';

class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { books: [], word: '', active: 1, maxpage: 1, limit: 5, pageno: [1, 2, 3], open: false }
    }

    componentDidMount() {
       this.getBooks();
    }

    async changepage(value) {
        await this.setState({ active: value });
        this.props.word === '' ? await this.getBooks() : await this.props.onfilterBooks(this.props.word, this.state.active, this.state.limit);
    }
    async getBooks() {
        await this.props.onGetBooks("page=" + this.state.active + "&limit=" + this.state.limit);
    }

    
    async updatepagination(current) {
        var max = 1;
        max = this.props.total / this.state.limit;
        console.log(")((((((((((())()"+max);
        this.setState({ maxpage: max });
        if (current === 'initial') {
            let temparrr = [1, 2, 3];
            await this.setState({ pageno: temparrr, active: 1 });
            this.props.word === '' ? await this.getBooks() : await this.props.onfilterBooks(this.props.word, this.state.active, this.state.limit);
        }
        if (current === 'final') {
            let temp = max > Math.floor(this.props.total / this.state.limit) ? Math.floor(max) + 1 : Math.floor(max);
            console.log(temp)
            let temparrr = [temp - 2, temp - 1, temp];
            await this.setState({ pageno: temparrr, active: temp });
            this.props.word === '' ? await this.getBooks() : await this.props.onfilterBooks(this.props.word, this.state.active, this.state.limit);
        }
        if (this.state.pageno[2] < max) {
            if (current === "next") {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] + 1;
                }
                let tempactive = temparr[0];
                await this.setState({ pageno: temparr, active: tempactive });
                this.props.word === '' ? await this.getBooks() : await this.props.onfilterBooks(this.props.word, this.state.active, this.state.limit);
            }
        }
        if (current === "prev") {
            if (this.state.pageno[0] !== 1) {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] - 1;
                }
                let tempactive = temparr[0];
                await this.setState({ pageno: temparr, active: tempactive });
                this.props.word === '' ? await this.getBooks() : await this.props.onfilterBooks(this.props.word, this.state.active, this.state.limit);
            }
        }
    }

    async onDeleteBook(title) {
        await this.props.onDelete(title, "page=" + this.state.active + "&limit=" + this.state.limit);
        if(this.props.message.length>0)
        {
            await this.setState({notify:true})
            setTimeout(()=>{
                this.setState({notify:false})
            },2000)
        }
        else
        {
            this.setState({notify:false})
        }
    }

   
    onUpdateBook(title) {
        this.props.history.push("/viewbook/" + title);
    }
    
    render() {
        
        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }
        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }
        let items = this.state.pageno.map((value) => {
            return (<Pagination.Item key={value} onClick={() => { this.changepage(value) }} active={value === this.state.active}>
                {value}
            </Pagination.Item>)

        })
        let bookList = this.props.books.map((book, i) => {
            return (<tr className="unread" key={i}>
                <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                <td>
                    <h6 className="mb-1">{book.title}</h6>
                    <p className="m-0">{book.price} RS</p>
                </td>
              
                <td>
                    <h6 className="text-muted">{book.authors}</h6>
                </td>
                <td>
                    <Link to={"/viewbook/" + i}><span style={{ width: '100px', display: 'inline-block', textAlign: 'center' }} className="label theme-bg2 text-white f-12">View/Update</span></Link>
                     <span style={{ width: '70px', display: 'inline-block', textAlign: 'center' }} className="label theme-bg3 text-white f-12" onClick={() => { this.onDeleteBook(book.title) }}>Delete</span>
                </td>
            </tr>)
        })
        return (
            <Aux>
                {this.props.message.includes('Book is deleted successfully') ? <Notification open={true} variant="success" msg={this.props.message}/> : null}
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                        <Card.Header style={{marginLeft:"0",background: 'transparent',width:"100%",paddingTop:"10px",paddingBottom:"10px"}} className="navbar pcoded-header navbar-expand-lg">
                                        <div style={{background: 'transparent'}} className="collapse navbar-collapse">
                                        <Card.Title as='h5'>Books</Card.Title>
                                            <BookSearch role={this.state.isAdmin} />
                                            
                                        </div>  
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        {bookList}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <div>
                            <Pagination style={{ display: 'flex', width: '220px', margin: 'auto' }}>
                                <Pagination.First onClick={() => { this.updatepagination("initial") }} />
                                <Pagination.Prev onClick={() => { this.updatepagination("prev") }} />
                                {items}
                                <Pagination.Next onClick={() => { this.updatepagination("next") }} />
                                <Pagination.Last onClick={() => { this.updatepagination("final") }} />
                            </Pagination>
                        </div>
                    </Col>
                </Row>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        word:state.reducer.searchword,
        rtlLayout: state.reducer.rtlLayout,
        headerBackColor: state.reducer.headerBackColor,
        headerFixedLayout: state.reducer.headerFixedLayout,
        collapseMenu: state.reducer.collapseMenu,
        books: state.bookReducer.books,
        total: state.bookReducer.totalbook,
        message: state.bookReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onDelete: (title, filter) => dispatch(bookactions.deletebooks(title, filter)),
        onGetBooks: (filter) => dispatch(bookactions.fetchbooks(filter)),
        onfilterBooks: (word,page,limit) => dispatch(bookactions.filterbookbytitle(word,page,limit))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
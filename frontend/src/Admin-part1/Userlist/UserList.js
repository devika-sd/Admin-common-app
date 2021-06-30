import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import * as actionTypes from "../../store/actions";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux';
import * as useractions from '../../Actions/user-action';
import NavLeft from '../../App/layout/AdminLayout/NavBar/NavLeft/index';
import NavSearch from '../../App/layout/AdminLayout/NavBar/NavLeft/NavSearch';
import Notification from '../Notification/Notification';

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [], word: '', active: 1, maxpage: 1, limit: 5, pageno: [1, 2, 3], open: false,isAdmin:'' }
    }

    componentDidMount() {
       this.getUsers();
    }

    async changepage(value) {
        await this.setState({ active: value });
        this.props.word === '' ? await this.getUsers() : await this.props.onfilterUsers('email[regex]='+this.props.word+'&page='+this.state.active+'&limit='+this.state.limit+'&isAdmin='+this.props.role);
    }
    async getUsers() {
        if(this.state.isAdmin === '')
        {
            await this.props.onGetUsers("page=" + this.state.active + "&limit=" + this.state.limit);
        }
        else
        {
            await this.props.onGetUsers("page=" + this.state.active + "&limit=" + this.state.limit +"&isAdmin="+this.state.isAdmin);
        }
    }

    async setRole(value)
    {
        console.log("value **"+value )
        if(value === '')
        {
            this.props.onRoleBasedFilter('none');
        }
        else
        {
            this.props.onRoleBasedFilter(value);
        }
        await this.setState({isAdmin:value,active:1});
        
        this.getUsers();
    }
    async updatepagination(current) {
        var max = 1;
        max = this.props.total / this.state.limit;
        console.log(")((((((((((())()"+max);
        this.setState({ maxpage: max });
        if (current === 'initial') {
            let temparrr = [1, 2, 3];
            await this.setState({ pageno: temparrr, active: 1 });
            this.props.word === '' ? await this.getUsers() : await this.props.onfilterUsers('email[regex]='+this.props.word+'&page='+this.state.active+'&limit='+this.state.limit+'&isAdmin='+this.props.role);
        }
        if (current === 'final') {
            let temp = max > Math.floor(this.props.total / this.state.limit) ? Math.floor(max) + 1 : Math.floor(max);
            console.log(temp)
            let temparrr = [temp - 2, temp - 1, temp];
            await this.setState({ pageno: temparrr, active: temp });
            this.props.word === '' ? await this.getUsers() : await this.props.onfilterUsers('email[regex]='+this.props.word+'&page='+this.state.active+'&limit='+this.state.limit+'&isAdmin='+this.props.role);
        }
        if (this.state.pageno[2] < max) {
            if (current === "next") {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] + 1;
                }
                let tempactive = temparr[0];
                await this.setState({ pageno: temparr, active: tempactive });
                this.props.word === '' ? await this.getUsers() : await this.props.onfilterUsers('email[regex]='+this.props.word+'&page='+this.state.active+'&limit='+this.state.limit+'&isAdmin='+this.props.role);
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
                this.props.word === '' ? await this.getUsers() : await this.props.onfilterUsers('email[regex]='+this.props.word+'&page='+this.state.active+'&limit='+this.state.limit+'&isAdmin='+this.props.role);
            }
        }
    }

    onDeleteUser(email) {
        this.props.onDelete(email, "page=" + this.state.active + "&limit=" + this.state.limit);
    }

    onBlockUser(email, status) {
        this.props.onBlock(email, status, "page=" + this.state.active + "&limit=" + this.state.limit);
    }
    onUpdateUser(id) {
        this.props.history.push("/updateuser/" + id);
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
        let userList = this.props.users.map((user, i) => {
            return (<tr className="unread" key={i}>
                <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                <td>
                    <h6 className="mb-1">{user.name}</h6>
                    <p className="m-0">{user.email}</p>
                </td>
                <td>
                    <h6 className="mb-1">{user.address}</h6>
                    <p className="m-0">{user.phonenumber}</p>

                </td>
                <td>
                    <h6 className="text-muted">{user.phone}</h6>
                </td>
                <td>
                    <Link to={"/profile/" + user._id}><span style={{ width: '70px', display: 'inline-block', textAlign: 'center' }} className="label theme-bg2 text-white f-12">Update</span></Link>
                    <span style={{ width: '70px', display: 'inline-block', textAlign: 'center' }} className="label theme-bg text-white f-12" onClick={() => { this.onBlockUser(user.email, user.isBlocked) }}>{user.isBlocked ? "Unblock" : "Block"}</span>
                    <span style={{ width: '70px', display: 'inline-block', textAlign: 'center' }} className="label theme-bg3 text-white f-12" onClick={() => { this.onDeleteUser(user.email) }}>Delete</span>
                </td>
            </tr>)
        })
        return (
            <Aux>
                {this.props.message.includes('Unblocked') ? <Notification open={true} variant="info" msg={this.props.message}/> : null}
                {this.props.message.includes('user is blocked') ? <Notification open={true} variant="warning" msg={this.props.message}/> : null}
                {this.props.message.includes('deleted') ? <Notification open={true} variant='error' msg={this.props.message}/> : null}
                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header style={{marginLeft:"0",background: 'transparent',width:"100%",paddingTop:"10px",paddingBottom:"10px"}} className="navbar pcoded-header navbar-expand-lg">
                                        <div style={{background: 'transparent'}} className="collapse navbar-collapse">
                                        <Card.Title as='h5'>Users</Card.Title>
                                            <NavSearch/>
                                            <Col style={{textAlign:'right'}}>
                                                <i class="fa fa-users f-20" aria-hidden="true" onClick={()=>{this.setRole('')}}></i>&nbsp; &nbsp; &nbsp;
                                                <i class="fa fa-user f-20" aria-hidden="true" onClick={()=>{this.setRole(false)}}></i>  &nbsp; &nbsp; &nbsp; 
                                                <i class="fa fa-user-secret f-20" aria-hidden="true" onClick={()=>{this.setRole(true)}}></i>      
                                            </Col>
                                        </div>  
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        {userList}
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
        users: state.userReducer.users,
        total: state.userReducer.totaluser,
        role:state.userReducer.rolewisefilter,
        message: state.userReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onBlock: (email, status, filter) => dispatch(useractions.blockusers(email, status, filter)),
        onDelete: (email, filter) => dispatch(useractions.deleteusers(email, filter)),
        onGetUsers: (filter) => dispatch(useractions.fetchusers(filter)),
        onfilterUsers: (word,page,limit) => dispatch(useractions.filteruserbyname(word,page,limit)),
        onRoleBasedFilter: (isAdmin) =>  dispatch({type: useractions.SET_FILTER_ROLE,payload:isAdmin})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

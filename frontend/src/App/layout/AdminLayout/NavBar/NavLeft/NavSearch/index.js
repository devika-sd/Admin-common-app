import React, {Component} from 'react';
import windowSize from 'react-window-size';
import {connect} from 'react-redux';
import * as actionTypes from "../../../../../../store/actions";
import * as useractions from '../../../../../../Actions/user-action';

import Aux from "../../../../../../hoc/_Aux";
import DEMO from "../../../../../../store/constant";

class NavSearch extends Component {
    state = {
        searchWidth: (this.props.windowWidth < 992) ? 100 : 0,
        searchString: (this.props.windowWidth < 992) ? '100px' : '',
        isOpen: (this.props.windowWidth < 992),
        isAdmin:''
    };
    componentDidMount()
    {
        this.setState({isAdmin:this.props.role})
    }

    searchOnHandler = () => {
        this.setState({isOpen: true});
        const searchInterval = setInterval(() => {
            if (this.state.searchWidth >= 101) {
                clearInterval(searchInterval);
                return false;
            }
            this.setState(prevSate => {
                return {
                    searchWidth: prevSate.searchWidth + 100,
                    searchString: prevSate.searchWidth + 'px'
                }
            });
        }, 35);
    };

    searchOffHandler = () => {
        const searchInterval = setInterval(() => {
            if (this.state.searchWidth < 0) {
                this.setState({isOpen: false});
                clearInterval(searchInterval);
                return false;
            }
            this.setState(prevSate => {
                return {
                    searchWidth: prevSate.searchWidth - 100,
                    searchString: prevSate.searchWidth + 'px'
                }
            });
        }, 35);
    };

    async filterdata(e)
    {
        if(e.target.value.length>=3)
        {
            console.log("*&*&*&*&*&*&*&*&*&*"+this.props.role)
            if(this.props.role === '')
            {
                var filter='email[regex]='+e.target.value+'&page='+1+'&limit='+5+'&isAdmin='+this.props.role
                console.log("*&*&*&*&*&*&*&*&*&*"+this.props.role)
                this.props.onfilterUsers('email[regex]='+e.target.value+'&page='+1+'&limit='+5);
                this.props.onSearch(e.target.value);
            }
            else
            {
                console.log("*&*&*&*&*&*&*&*&*&*"+this.props.role)
                this.props.onfilterUsers('email[regex]='+e.target.value+'&page='+1+'&limit='+5+'&isAdmin='+this.props.role);
                this.props.onSearch(e.target.value);
            }
        }
        else
        {
            await this.props.onGetUsers("page=" + 1 + "&limit=" + 5)
        }
    }

    render() {
        let searchClass = ['main-search'];
        if (this.state.isOpen) {
            searchClass = [...searchClass, 'open'];
        }
        console.log("******from searchbar*******"+this.props.role)
        return (
            <Aux>
                <div id="main-search" className={searchClass.join(' ')}>
                    <div className="input-group">
                        <input type="text" id="m-search" onChange={this.filterdata.bind(this)} className="form-control" placeholder="Search . . ." style={{width: this.state.searchString}}/>
                        <a href={DEMO.BLANK_LINK} className="input-group-append search-close" onClick={this.searchOffHandler}>
                            <i className="feather icon-x input-group-text"/>
                        </a>
                        <span className="input-group-append search-btn btn btn-primary" onClick={this.searchOnHandler}>
                        <i className="feather icon-search input-group-text"/>
                    </span>
                    </div>
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        role: state.userReducer.rolewisefilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (word) => dispatch({type: actionTypes.SEARCH,payload:word}),
        onGetUsers: (filter) => dispatch(useractions.fetchusers(filter)),
        onfilterUsers: (word,page,limit) => dispatch(useractions.filteruserbyname(word,page,limit))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(NavSearch));

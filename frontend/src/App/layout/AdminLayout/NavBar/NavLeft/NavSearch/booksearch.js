
import React, {Component} from 'react';
import windowSize from 'react-window-size';
import {connect} from 'react-redux';
import * as actionTypes from "../../../../../../store/actions";
import * as bookactions from '../../../../../../Actions/book-action';
import Aux from "../../../../../../hoc/_Aux";
import DEMO from "../../../../../../store/constant";

class BookSearch extends Component {
    state = {
        searchWidth: (this.props.windowWidth < 992) ? 100 : 0,
        searchString: (this.props.windowWidth < 992) ? '100px' : '',
        isOpen: (this.props.windowWidth < 992),
        role:this.props.role
    };

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
        this.props.onSearch('')
    };

    changehandler(event)
    {
        this.props.onSearch(event.target.value)
    }

    async filterdata(e)
    {
        if(e.target.value.length>=1)
        {
            this.props.onfilterBooks(e.target.value,1,5);
            this.props.onSearch(e.target.value);
        }
        else
        {
            await this.props.onGetBooks("page=" + 1 + "&limit=" + 5)
        }
    }

    render() {
        let searchClass = ['main-search'];
        if (this.state.isOpen) {
            searchClass = [...searchClass, 'open'];
        }
        console.log("******from searchbar*******"+this.state.role)
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

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (word) => dispatch({type: actionTypes.SEARCH,payload:word}),
        onGetBooks: (filter) => dispatch(bookactions.fetchbooks(filter)),
        onfilterBooks: (word,page,limit) => dispatch(bookactions.filterbookbytitle(word,page,limit))
    }
};

export default connect(null, mapDispatchToProps) (windowSize(BookSearch));

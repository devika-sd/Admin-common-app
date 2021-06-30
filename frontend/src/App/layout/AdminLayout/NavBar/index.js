import React, {Component} from 'react';
import {connect} from 'react-redux';
import windowSize from 'react-window-size';

import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import Aux from "../../../../hoc/_Aux";
import DEMO from "../../../../store/constant";
import * as actionTypes from "../../../../store/actions";

class NavBar extends Component {
    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }

        return (
            <Aux>
                <header className={headerClass.join(' ')}>
                    <div className="m-header">
                        <a className={toggleClass.join(' ')} id="mobile-collapse1" href={DEMO.BLANK_LINK} onClick={this.props.onToggleNavigation}><span/></a>
                        <a href={DEMO.BLANK_LINK} className="b-brand">
                            <div className="b-bg">
                                <i className="feather icon-trending-up"/>
                            </div>
                            <span className="b-title">Book Store</span>
                        </a>
                    </div>
                    <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}><i className="feather icon-more-horizontal"/></a>
                    <div className="collapse navbar-collapse">
                        {/* <NavLeft/> */}
                        <a href={DEMO.BLANK_LINK} className="full-screen" style={{marginLeft:"20px"}} onClick={this.props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a>
                        <NavRight rtlLayout={this.props.rtlLayout} />
                    </div>
                </header>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.reducer.isFullScreen,
        rtlLayout: state.reducer.rtlLayout,
        headerBackColor: state.reducer.headerBackColor,
        headerFixedLayout: state.reducer.headerFixedLayout,
        collapseMenu: state.reducer.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onFullScreen: () => dispatch({type: actionTypes.FULL_SCREEN})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);

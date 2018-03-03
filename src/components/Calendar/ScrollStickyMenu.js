import React, {Component} from 'react';

import {Menu} from 'semantic-ui-react';


class ScrollStickyMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {isScrollingDown: false, heightFromTop: 0, shouldShowTopMenu: false}
    }


    fixedStyle = {
        top: '0',
        height: '80px',
        position: 'fixed',
        display: 'flex',
        left: 0,
        width: '100%',
        margin: 0
    };

    normalStyle = {
        display: 'flex',
        width: '100%',
        borderWidth: 0
    };

    prevScrollTop = 0;
    prevTotalHeight = document.documentElement.scrollHeight;
    minDistanceFromTop = 100;

    componentDidMount() {
        window.addEventListener('scroll', (event) => {
            let heightFromTop = document.documentElement.scrollTop;
            let totalDocumentHeight = document.documentElement.scrollHeight;
            // Check that the user is scrolling down, and that the window did not get smaller which might be
            // mistaken for the user scrolling down. The latter can happen when the total document height gets
            // smaller because one year has less squeezed days than another.
            let isScrollingDown = this.prevScrollTop < heightFromTop;
            let documentHeightResized = this.prevTotalHeight !== totalDocumentHeight;
            let shouldShowTopMenu = isScrollingDown || documentHeightResized;
            let topMenuShouldBeFixed = heightFromTop > this.minDistanceFromTop;

            this.setState({
                isScrollingDown: isScrollingDown,
                heightFromTop: heightFromTop,
                shouldShowTopMenu: shouldShowTopMenu,
                topMenuShouldBeFixed: topMenuShouldBeFixed
            });

            this.prevTotalHeight = totalDocumentHeight;
            this.prevScrollTop = heightFromTop;
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll');
    }

    render() {
        return (
            <Menu vertical borderless={true}
                  style={this.state.topMenuShouldBeFixed ? this.fixedStyle : this.normalStyle}>
                {this.props.children}
            </Menu>
        )
    }
}

export default ScrollStickyMenu;
import React from 'react';
import {Container} from 'semantic-ui-react';
import FacebookProvider, {Like} from 'react-facebook';
import Header from './Header';
import Footer from '../Footer';
import CalendarContainer from "../Calendar/CalendarContainer";

class Layout extends React.Component {

    render() {
        return (
            <div>
                <FacebookProvider appId="1749300428641975" style={{float: 'right'}}>
                    <Like href={"https://www.facebook.com/inneklemtedager/"}/>
                </FacebookProvider>
                <div>
                    <Header />
                    <Container>
                        <CalendarContainer/>
                        <Footer />
                    </Container>
                </div>
            </div>
        );
    }
}

export default Layout;

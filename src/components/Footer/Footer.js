import React from 'react';
import {Segment, Container} from 'semantic-ui-react';

function Footer() {
    return (
        <footer style={{backgroundColor: 'rgb(80, 80, 80)'}}>
            <Segment vertical style={{padding: '2em 0'}}>
                <Container>
                    <div>
                        <div style={{color: 'whitesmoke', fontSize: '1.4em'}}>© inneklemtedager.no</div>
                        <br/>
                        <div><a href="https://github.com/viktorfa/squeezed-days">GitHub</a></div>
                        <div><a href="https://www.facebook.com/inneklemtedager/">Facebook</a></div>

                    </div>
                </Container>
            </Segment>
        </footer>
    );
}

export default Footer;

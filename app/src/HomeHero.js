import React from 'react';
import {Container, Row, Col} from 'reactstrap';

const styles = {
    style: {
        backgroundImage: `url(http://source.unsplash.com/0BhSKStVtdM)`,

    }
};

export default class HomeHero extends React.Component {
    render() {
        return (
            <Container fluid style={styles.style}>

                <Row>
                    <Col sm="12" md={{size: 'auto', offset: 5}}>
                        <h1>A BETTER EXPERIENCE</h1>
                        <h3>PLANTS JUST RIGHT</h3>
                    </Col>
                </Row>

            </Container>
        );
    }
}
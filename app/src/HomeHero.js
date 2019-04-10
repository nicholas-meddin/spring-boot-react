import React from 'react';
import {Container, Button} from 'reactstrap';

export default class HomeHero extends React.Component {
    render() {

        return (
            <Container id="Hero" fluid>

                <div id="HeroHeader">
                    <h1>A BETTER EXPERIENCE</h1>
                    <h3>PLANTS JUST RIGHT</h3>
                </div>

                <div className="d-flex align-items-center flex-column bd-highlight mb-3">
                    <Button> Button 1 </Button>
                    <br/>
                    <Button> Button 2 </Button>
                    <br/>
                    <Button> Button 3 </Button>
                </div>


            </Container>

        );
    }
}
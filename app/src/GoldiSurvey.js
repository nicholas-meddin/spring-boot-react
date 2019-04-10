import React, {Component} from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import {Col, Container, Row} from 'reactstrap';

export default class GoldiSurvey extends Component {

    surveyJSON = {
        pages: [
            {
                name: "page1",
                elements: [
                    {
                        type: "text",
                        name: "name",
                        title: "What's your name?"
                    }
                ]
            },
            {
                name: "page2",
                elements: [
                    {
                        type: "radiogroup",
                        name: "gender",
                        title: "Which gender do you identify with?",
                        choices: [
                            "Male",
                            "Female",
                            "Non-binary"
                        ]
                    }
                ]
            },
            {
                name: "page3",
                elements: [
                    {
                        type: "text",
                        name: "age",
                        title: "How old are you?",
                        inputType: "number"
                    }
                ]
            },
            {
                name: "page5",
                elements: [
                    {
                        type: "checkbox",
                        name: "desired_effects",
                        title: "How do you want to feel?",
                        description: "Please choose up to three.",
                        isRequired: true,
                        validators: [
                            {
                                type: "answercount",
                                text: "Choose up to three",
                                maxCount: 3
                            }
                        ],
                        choices: [
                            "Relaxed",
                            "Happy",
                            "Energetic",
                            "Social",
                            "Aroused",
                            "Focused",
                            "Creative",
                            "Hungry",
                            "Sleepy"
                        ],
                        colCount: 3
                    }
                ]
            },
            {
                name: "page6",
                elements: [
                    {
                        type: "checkbox",
                        name: "intent",
                        title: "What's your intent?",
                        validators: [
                            {
                                type: "answercount",
                                minCount: 1,
                                maxCount: 1
                            }
                        ],
                        choices: [
                            "Party",
                            "Chill",
                            {
                                value: "Intimacy",
                                text: "Sexy Time"
                            },
                            "Focus",
                            "Sleep",
                            "Eat",
                            "Relieve Pain"
                        ],
                        colCount: 2
                    }
                ]
            },
            {
                name: "page7",
                elements: [
                    {
                        type: "checkbox",
                        name: "side_effects",
                        title: "Have you ever felt any of these side effects?",
                        choices: [
                            "Anxious",
                            "Spacey",
                            "Anti-Social",
                            "Tired",
                            "Sad",
                            "Dry Mouth",
                            "Headache",
                            "Dizzy"
                        ],
                        colCount: 2
                    }
                ]
            },
            {
                name: "page8",
                elements: [
                    {
                        type: "checkbox",
                        name: "consumption_preference",
                        title: "How would you prefer to consume your cannabis?",
                        choices: [
                            "Oil",
                            "Flower",
                            "Edible",
                            "No preference"
                        ]
                    }
                ]
            },
            {
                name: "page11",
                elements: [
                    {
                        type: "text",
                        name: "Email",
                        title: "What's your email address?",
                        isRequired: true,
                        validators: [
                            {
                                type: "email"
                            }
                        ],
                        inputType: "email",
                        size: 30
                    },
                    {
                        type: "text",
                        name: "question11",
                        title: "Zip code?",
                        isRequired: true,
                        inputType: "number"
                    }
                ]
            }
        ]
    };

    onComplete(survey, options) {
        console.log(JSON.stringify(survey.data));
    }

    render() {
        let model = new Survey.Model(this.surveyJSON);
        return (
            <Container fluid>
                <Row>
                    <Col sm="12" md={{size: 'auto', offset: 5}}>
                        <Survey.Survey model={model} onComplete={this.onComplete}/>
                    </Col>
                </Row>
            </Container>
        );
    }

}
import React, { useState } from 'react';
import {Row, Col, Button, Card, CardTitle, CardText} from 'reactstrap'

const Workout = (props) => {

  return (
    <Col sm="6">  
      <Card body>
        <CardTitle tag="h5" className="text-center">{props.workout.description}</CardTitle>
        <CardText>
          Workout: {props.workout.definition} 
          <br/> 
          Result: {props.workout.result} 
          <br/>
          Date: {props.workout.createdAt}
        </CardText>
        <Row className="button-row">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Row>

      </Card>
    </Col>
  );
};

export default Workout;
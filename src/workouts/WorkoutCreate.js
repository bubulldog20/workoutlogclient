import React, { useState, useEffect } from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';

const WorkoutCreate = (props) => {

  const [description, setDescription] = useState('');
  const [definition, setDefinition] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/log/';
    fetch(url, 
      {
        method: 'POST',
        body: JSON.stringify(
          {
            description: description,
            definition: definition,
            result: result
          }
        ),
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': props.token
          }
        )
      }
    )
    .then(res => {
        return res.json();
      }
    )
    .then(json => {
        console.log(json);
        setDescription('');
        setDefinition('');
        setResult('');
        props.fetchWorkouts();
      }
    )
  }

  return (
    <> 
      <h3>Log a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='description'/>
          <Input name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='definition'/>
          <Input type='select' name='definition' value={definition} onChange={(e) => setDefinition(e.target.value)}>
            <option value="Time">Time</option>
            <option value="Weight">Weight</option>
            <option value="Distance">Distance</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='result'/>
          <Input name='result' value={result} onChange={(e) => setResult(e.target.value)}/>
        </FormGroup>
        <Button type='submit'>Click to Submit</Button>
      </Form>
    </>
   );
};
 
export default WorkoutCreate;
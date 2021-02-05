import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';
const WorkoutEdit = (props) => {

  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
  const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

  const workoutUpdate = (e, workout) => {
    e.preventDefault();
    const url = `http://localhost:3000/log/${props.workoutToUpdate.id}`
    fetch(url, {
        method: 'PUT',
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': props.token
          }
        ),
        body: JSON.stringify(
          {
            description: editDesc,
            definition: editDef,
            result: editRes
          }
        )
      }
    )
    .then(res => {
        return res.json();
      }
    )
    .then(json => {
      //console.log(json);
      props.fetchWorkouts();
      props.updateOff();
      }
    )
  }

  return ( 
    <>
      <Modal isOpen={true}>
        <ModalHeader>Log a Workout</ModalHeader>
        <ModalBody>
          <Form onSubmit={workoutUpdate}>
            <FormGroup>
              <Label htmlFor='result'>Edit Result:</Label>
              <Input name='result' value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='description'>Edit Description:</Label>
              <Input name='description' value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='definition'>Edit Definition:</Label>
              <Input type='select' name='definition' value={editDef} onChange={(e) => setEditDef(e.target.value)}>
              <option value=""></option>
              <option value="Time">Time</option>
              <option value="Weight">Weight</option>
              <option value="Distance">Distance</option>
              </Input>
            </FormGroup>
            <Button type='submit'>Update the Workout</Button>
          </Form>
        </ModalBody> 
      </Modal>
    </>
   );
}
 
export default WorkoutEdit;
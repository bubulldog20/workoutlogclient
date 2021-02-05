import React, { useEffect, useState } from 'react';
import {Container, Row, Col, Button, Card, CardTitle, CardText} from 'reactstrap'
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';
//import Workout from './Workout'

const WorkoutIndex = (props) => {
  
  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState({});

  const fetchWorkouts = () => {

    const url = 'http://localhost:3000/log/';
    fetch(url, 
      {
        method: 'GET',
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': props.token
          }
        )
      })
    .then(res => {
        return res.json();
      }
    )
    .then(json => {
      //console.log(json);
      setWorkouts(json);
    })
  }

  const editUpdateWorkout = (workout) => {
    setWorkoutToUpdate(workout);
    console.log(workout);
  }

  const updateOn = () => {
    setUpdateActive(true);
  }

  const updateOff = () => {
    setUpdateActive(false);
  }

  // const buildWorkouts = () => {
  //   if(workouts.length > 0){
  //     return(
  //       workouts.map(workout => {
  //         return <Workout workout={workout} />
  //       })
        
        
  //     )
  //   }
  // }

  useEffect(() => {fetchWorkouts()} , [])

  return ( 
    <div>
      <Container> 
        <Row>
          <Col md='3'>
            <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
          </Col>
          <Col md='9'>
            <WorkoutTable 
              workouts={workouts}  
              fetchWorkouts={fetchWorkouts} 
              token={props.token}
              editUpdateWorkout={editUpdateWorkout}
              updateOn={updateOn}  
            /> 
          </Col>
          {
            updateActive 
            ? <WorkoutEdit 
              workoutToUpdate={workoutToUpdate} 
              updateOff={updateOff} 
              token={props.token} 
              fetchWorkouts={fetchWorkouts}
              />
            : <></>
          }
        </Row>
      </Container>
      
    </div>
   );
}
 
export default WorkoutIndex;
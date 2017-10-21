import React, { Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import { withTracker } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks.js';
import Task from './Task.jsx';


class ListaTarea extends Component {


  renderTasks() {
     return this.props.tasks.map((task) => (
       <Task key={task._id} task={task} />
     ));
   }

   render() {
     return (
       <div className="container">
         <header>
           <h3>Tareas del Proyecto</h3>
         </header>
         
         <ul>
           {this.renderTasks()}
         </ul>
       </div>
     );
   }
 }

 ListaTarea.propTypes = {

   tasks: React.PropTypes.array.isRequired,
 };

 export default createContainer(() => {
   Meteor.subscribe('tasks');
   return {
     tasks: Tasks.find({}).fetch(),
   };
 }, ListaTarea);

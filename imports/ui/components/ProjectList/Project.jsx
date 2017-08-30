import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Project extends Component {
  render() {
    return (
      <tr>
      <td>dddd</td>
      <td>{this.props.project.text}</td>
    </tr>

    );
  }
}

Project.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  project: PropTypes.object.isRequired,
};

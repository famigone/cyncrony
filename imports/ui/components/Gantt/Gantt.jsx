/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {
  constructor(props){
    super(props);

  }

  setZoom(value){
    switch (value){
      case 'Horas':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';

        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
          {unit:'hour', step:1, date:'%H'}
        ];
        break;
      case 'Dias':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "#%W";
        gantt.config.subscales = [
          {unit: "day", step: 1, date: "%d %M"}
        ];
        gantt.config.scale_height = 60;
        break;
      case 'Meses':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F";
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
          {unit:"week", step:1, date:"#%W"}
        ];
        break;
      case 'Años':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "year";
        gantt.config.date_scale = "%Y";
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
          {unit:"month", step:1, date:"#%M"}
        ];
        break;  
      default:
        break;
    }
  }

  shouldComponentUpdate(nextProps ){
    return this.props.zoom !== nextProps.zoom;
    console.log("ComponentUpdate")
    console.log("Cant "+gantt.getTaskCount())
  }

  componentDidUpdate() {
    gantt.render();
 //   console.log("DidUpdate")
   // console.log("Cant "+gantt.getTaskCount())
  }
componentWillUnmount() {
  gantt.clearAll();
 // console.log("UnMount")
 // console.log("Cant "+gantt.getTaskCount())
  
}
  componentDidMount() {
    //console.log("DidMount")
    //console.log("Cant "+gantt.getTaskCount())
    gantt.attachEvent('onAfterTaskAdd', (id, task) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'inserted', task);
      }

    });

    gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'updated', task);
      }
    });

    gantt.attachEvent('onAfterTaskDelete', (id) => {
      if(this.props.onTaskDeleted) {
        this.props.onTaskDeleted(id, 'deleted');
      }
    });
/*******************************************************************/
    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'inserted', link);
      }
    });

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'updated', link);
      }
    });

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'deleted');
      }
    });
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
    console.log(this.props.tasks)
  }

  render() {    
    //console.log("Render")
    //console.log("Cant "+gantt.getTaskCount())
    
    this.setZoom(this.props.zoom);

    return (
        <div
            ref={(input) => { this.ganttContainer = input }}
            style={{width: '100%', height: '100%'}}
        ></div>
    );
  }
}
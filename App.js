import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let data = [
  {
    id: 0,
    title: "Pictures",
    parent: null },
  {
    id: 3,
    title: "Purple Lotus 1.jpg",
    parent: 0 },
  {
    id: 4,
    title: "Blue Orchid.png",
    parent: 0 },
  {
    id: 1,
    title: "Other Flowers",
    parent: null },
  {
    id: 2,
    title: "Tree",
    parent: null },
  {
    id: 5,
    title: "Branch",
    parent: 2 },
  {
    id: 6,
    title: "Another Branch",
    parent: 2 },
  {
    id: 8,
    title: "Good Branch",
    parent: 7 },
  {
    id: 9,
    title: "Bad Branch",
    parent: 7 },
  {
    id: 7,
    title: "A Leaf",
    parent: 6 }
];

//var tree = getTree(data);
//console.log(tree);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputArray: data,
                  elementID: data.length,
                  elementTitle: '',
                  elementParent: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {

      var title = (this.state.elementTitle === '' ? 'untitled' : this.state.elementTitle);
      var parent = (this.state.elementParent === '' ? null : this.state.elementParent);
      var newNode = data.push({id:this.state.elementID, title: title, parent: parent});
      event.preventDefault();
      this.setState({inputArray: newNode});
      this.state.elementID++;


  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Smirnov-app</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
            <input className="Form-element" type="number" placeholder="ID"   name="elementID" value={this.state.elementID} onChange={this.handleChange} />
            <input className="Form-element" type="number" placeholder="Parent" name="elementParent" value={this.state.elementParent} onChange={this.handleChange} />
            <input className="Form-element" type="text" placeholder="Title"  name="elementTitle" value={this.state.elementTitle} onChange={this.handleChange} />
            <input className="Form-element" type="submit" value="Добавить узел" />
        </form>
        <Tree treeArray={this.state.inputArray} />
        <InputData inputArray={this.state.inputArray} />

      </div>
    );
  }
}

class InputData extends Component {

  constructor(props) {
    super(props);
    this.state = {inputArray: this.props.inputArray};
  }

  render() {

    let inputArray = this.state.inputArray.map(function(item, index) {
      item.parent = (item.parent === null ? 'null' : item.parent);

      return (
        <div key={index}>
          <div className="InputData-row">
            &#123;id: {item.id}, title: "{item.title}", parent: {item.parent}  &#125;,
            </div>
            </div>
          )
    });

    return (
      <div>
        <div className="Input-data-title">
          Входные данные
        </div>
        <div className="Input-data">
          {inputArray}
        </div>
      </div>
    );
  }
}


class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {treeArray: getTree(this.props.treeArray)};
  }

deleteFun(){
  alert('delete');
}
  render() {


  let  list =  getList(this.state.treeArray);

  function getList(array) {
      return array.map(function (item, index) {

        if (item.children === null) {
          return <li key={index}>[{item.id}] {item.title}  <span className="delete">&#10006;</span>

                  </li>;
        } else {
          return <li key={index}>[{item.id}] {item.title} <span className="delete">&#10006;</span>
           <ul>{getList(item.children)}</ul></li>;
        }
      })

    }

    return (<div className="Tree">
      <ul>{ list }</ul>
      </div>
    );
  }
}


function getTree(data, level = 0, id = 0, index = 0) {

  let output = [];

  if (index < data.length && data[index]['parent'] === null ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]['parent'] === null && level === 0) {
        output.push(
          {
            id: data[i]['id'],
            title: data[i]['title'],
            level: 0,
            children: getTree(data, 1, data[i]['id'], i + 1)
          }
        );
      } else if (data[i]['parent'] === null && level !== 0) {
        return getTree(data, 1, id, i + 1);
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i]['parent'] === id) {
        output.push(
          {
            id: data[i]['id'],
            title: data[i]['title'],
            level: level,
            children: getTree(data, level + 1, data[i]['id'], index + 1)
          }
        );
      }
    }

    if (output.length === 0) {
      return null;
    } else {
      return output;
    }
  }
  return output;
}

export default App;

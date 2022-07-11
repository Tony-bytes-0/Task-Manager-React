import { Component } from 'react';

class SameMethods extends Component{
    viewAllTasks = async function (){
        fetch(this.state.baseUrl)
        .then(response => response.json())
        .then(data => {let x = [];let ALLDATA = []
            data.forEach(element => {x.push([element.name, element.description, element.id])});
            x.forEach(element => {ALLDATA.push(element)})
            this.setState({taskList : ALLDATA});
        })
    }
}
export default SameMethods;
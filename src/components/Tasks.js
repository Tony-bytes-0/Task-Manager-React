import React, { Component } from 'react';
// onClick={() => {document.getElementById('Tasks_taskList').appendChild(this.new(document.getElementById('TaskName').innerHTML,
//document.getElementById('TaskDescription').innerHTML,
//document.getElementById('incremental').innerHTML))
const base = {'display':'flex', 'width':'40%', 'height':'90%','padding':'1.5%', 
'background':'#6B22FF','flexDirection':'column','alignItems':'center','marginTop':'3%'}
const btnBox = {'display':'flex','flexDirection':'row','alignItems':'center'}
const btns = {'margin':'10px'}

class New extends Component {
    state = {  } 
    render() { 
        return(<>
                <div id={fk}
                className='border rounded'>
                    <h1 style={{'display':'flex'}}>{this.props.Name}</h1>
                    <h3 style={{'display':'flex'}}>{this.props.description}</h3>
                    <div style={btnBox}>
                        <button style={btns} onClick={() => {}} className='btn btn-primary'>View</button>
                        <button style={btns} onClick={() => {}} className='btn btn-primary'>Delete</button>
                    </div>   
                </div>
            </>)
        }
}
 



class Tasks extends Component {
    state={
        tasks:['titulo','sexote','key']
    }
    new = function(Name, description, fk){
        return (<>
            <div id={fk}
            className='border rounded'>
                <h1 style={{'display':'flex'}}>{Name}</h1>
                <h3 style={{'display':'flex'}}>{description}</h3>
                <div style={btnBox}>
                    <button style={btns} onClick={() => {}} className='btn btn-primary'>View</button>
                    <button style={btns} onClick={() => {}} className='btn btn-primary'>Delete</button>
                </div>   
            </div>
        </>)
    }
    newTask = function(Name, description ){
        let base = document.createElement('div')
        let nameBox = document.createElement('h1')
        let descriptionBox = document.createElement('h1')

        nameBox.style.display = 'flex'
        nameBox.innerHTML = Name

        descriptionBox.style = {'display':'flex','background':'green'}
        descriptionBox.innerHTML = description

        base.appendChild(nameBox)
        base.appendChild(descriptionBox)
       console.log( base.style.display )
        return base
    }

    render() { 
        return (<>
        <div id='Tasks' style={base} className='container'>
            <h1 className='align-self-center'>Task List</h1>
            <div id='Tasks_taskList' className='container' >
                {this.state.tasks.map(() =>{

                    <

                })}
                
            </div>
        </div>

        <div id='temporalContainer' style={{'display':'none','visibility':'hidden'}} 
            onClick={() => {
            let n = document.getElementById('TaskName').innerHTML;
            let d = document.getElementById('TaskDescription').innerHTML;
            document.getElementById('Tasks_taskList').appendChild((this.newTask(n,d)))
        }}>
            <p id='TaskName'></p>
            <p id='TaskDescription'></p>
            <p id='incremental'>a</p>
        </div>
        </>)
    }
}
 
export default Tasks;
import React, { Component } from 'react';

const base = {'display':'flex', 'width':'35%', 'height':'60%','padding':'1.5vw', 
'background':'#6B22FF','flexDirection':'column','alignItems':'center','marginTop':'3%'}
const inner = {'display':'flex', 'width':'100%', 'height':'40%', 'background':'#936EB0',
'flexDirection':'column','alignItems':'center','margin':'2%','padding':'3vw'}
const smallInner = {'display':'flex', 'width':'100%', 'height':'30%', 'background':'#936EB0',
'flexDirection':'column','alignItems':'center','margin':'2%','padding':'3vw'}
const btn = {'display':'flex','flexDirection':'row','alignItems':'center','margin':'5px','padding':'10px'}
const TaskStyles = {'display':'flex', 'width':'55%', 'height':'90%','padding':'1.5vw', 
'background':'#6B22FF','flexDirection':'column','alignItems':'center','marginTop':'3%'}
const btnBox = {'display':'flex','flexDirection':'row','alignItems':'center'}
const btns = {'margin':'1vw'}

const view = {'visibility':'hidden','display':'flex','position':'absolute','left':'3%','top':'3%','flexDirection':'column',
'alignItems':'center','width':'95%', 'height':'70%','padding':'1.5vw','zIndex':'100','background':'#6B22FF'}
const modalEdit ={'visibility':'hidden','display':'flex','position':'absolute','left':'5%','top':'5%','flexDirection':'column',
'alignItems':'center','width':'100%', 'height':'100%','padding':'1.5vw','zIndex':'200','background':'#2353BB'}
const viewTittle = {'display':'flex','width':'90%','justifyContent':'center'}
class SameMethods extends Component{
    viewAllTasks = async function (url){
        fetch(url)
        .then(response => response.json())
        .then(data => {let x = [];let ALLDATA = []
            data.forEach(element => {x.push([element.name, element.description, element.id])});
            x.forEach(element => {ALLDATA.push(element)})
            this.setState({taskList : ALLDATA});
        })
    }
}
class New extends SameMethods {
    state = {largeView:false,baseUrl:"http://127.0.0.1:3939/api/tasks"}
    delete = async function(id){console.log(id)
        //document.getElementById(child).remove()//accion vieja
        fetch(this.state.baseUrl + '/' + id,{ "method":"DELETE"})
        document.getElementById('fetchBtn').click()//debo arreglar esto luego
    }
    viewHide = function(rute){
        let x = rute
        if(x.style.visibility === 'visible')x.style.visibility = 'hidden';
        else{x.style.visibility = 'visible'}
    }
    captureInput = function(param){
        let x = document.getElementById(param).value
        return x
    }
    editContent = function(content, param){
        document.getElementById(param).innerHTML = content
    }
    clearInput = function(param){
        document.getElementById(param).value = ""
    }
    
    render(){return(<>
                    <div id={this.props.ID + 'view'} style={view} className='container rounded '>
                        <h1 id ={this.props.ID +'Name'} style={viewTittle} className='bg-primary rounded'>{this.props.Name}</h1>
                        <p id ={this.props.ID +'description'} style={{'display':'flex'}}>{this.props.description}</p>

                        <div id={this.props.ID + 'modalEdit'} style={modalEdit}>
                            <textarea id={this.props.ID + 'input'}
                            style={{'display':'flex','width':'100%','height':'100%','padding':'4vw','margin':'5%'}}></textarea>
                            <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}} 
                            className='container align-self-end d-grid gap-2'>
                                <button style={btns} className='btn btn-primary'
                                    onClick={() => {
                                    this.editContent(this.captureInput(this.props.ID + 'input'), this.props.ID +'Name');
                                    this.editContent(this.captureInput(this.props.ID + 'input'), this.props.ID +'h1Name');
                                    this.clearInput(this.props.ID + 'input')
                                    this.viewHide(document.getElementById(this.props.ID+'modalEdit'))
                                }}>Edit Tittle</button>

                                <button style={btns} className='btn btn-primary'
                                    onClick={() => {
                                    this.editContent(this.captureInput(this.props.ID + 'input'), this.props.ID +'description');
                                    this.clearInput(this.props.ID + 'input')
                                    this.viewHide(document.getElementById(this.props.ID+'modalEdit'))
                                }}>Edit Description</button>

                                <button style={btn} className='btn btn-warning' 
                                    onClick ={() => {
                                    this.viewHide(document.getElementById(this.props.ID+'modalEdit'));
                                    this.clearInput(this.props.ID + 'input')
                                }}>Cancel</button>
                            </div>
                        </div>

                        <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}
                        className='container align-items-center'>

                            <button style={btns} onClick={() => {this.viewHide(document.getElementById(this.props.ID+'view'))}}
                            className='btn btn-primary'>Minimize</button>
                            <button style={btns} className='btn btn-primary'
                            onClick={() => {this.viewHide(document.getElementById(this.props.ID+'modalEdit'))
                            }}>Edit</button>

                        </div>
                    </div>



                    <div id={this.props.ID}  className='border rounded'>
                        <h1 id={this.props.ID + 'h1Name'} style={{'display':'flex'}}>{this.props.Name}</h1>
                        <div style={btnBox} className='container row'>

                            <button style={btns} className='btn btn-primary col-3' onClick={() => {
                            this.viewHide(document.getElementById(this.props.ID+'view'))
                            }}>View</button>

                            <button style={btns} className='btn btn-primary col-3' onClick={() => {
                            this.delete(this.props.ID)
                            }}>Delete</button>

                        </div>   
                    </div>
    </>)}
}

class AddTask extends SameMethods {
    
    state = {
        taskList:[ ],
        keys:1,
        baseUrl:"http://127.0.0.1:3939/api/tasks"
    }
    captureData = function(){
        let x = document.getElementById('inputTaskDescription').value
        let y = document.getElementById('inputTaskName').value
        document.getElementById('inputTaskDescription').value = ""
        document.getElementById('inputTaskName').value = "" 
        let z = [y,x]
        return z
    } 
    send = function send(Rawdata, url){
        let data = {
                "method":"POST",
                "body":JSON.stringify({"name":Rawdata[0],"description":Rawdata[1]}),
            "headers": {'Content-Type': 'application/json'}
        }
        fetch(url, data)
        this.viewAllTasks(this.state.baseUrl)
    }

    render() { 
        return (<>
            <div id='AddTask Div' style={base} className='container rounded' >

                <div id='AddTask_taskName' className='container rounded' style={smallInner}> 
                <h1 style={{'display':'flex'}}>Task Name</h1>
                    <input id='inputTaskName' type='text' 
                        style={{'width':'100%','height':'5%','padding':'0.5vw','margin':'5%'}}>
                    </input>  
                </div>

                <div id='AddTask_Description' className='container rounded' style={inner}> 
                <h1 style={{'display':'flex'}}>Description</h1>
                    <textarea id='inputTaskDescription' 
                        style={{'width':'100%','height':'15%', 'padding':'0.5vw','margin':'1vw'}}>
                    </textarea> 
                </div>
                <div id='AddTask_ButtonBox' style={btn} className='row' >
                    <button style={btn} className='btn btn-primary col-5' 
                        onClick={() => {
                        let x = this.captureData()//esta es la lista con los datos capturados de los inputs
                        this.send(x,this.state.baseUrl)


                    }}>Add</button>

                    <button style={btn} className='btn btn-warning col-5' onClick ={() => {
                    this.captureData();//para borrar los inputs
                    }}>Cancel</button>

                    <button id='fetchBtn' style={btn} className='btn btn-warning col-5' onClick ={() => {
                    this.viewAllTasks(this.state.baseUrl)
                    }}>Force Server Update #DEV</button>


                </div>

            </div>

            <div id='Tasks' style={TaskStyles} className='container rounded'>
                <h1 className='align-self-center'>Task List</h1>
                <div id='Tasks_taskList' className='container  rounded' >
                    
                    {this.state.taskList.map( e => <New ID={e[2]} Name = {e[0]} description = {e[1]} key ={e[2]} />)}
                
                </div>
            </div>
        </>);
    }
}









export default AddTask;
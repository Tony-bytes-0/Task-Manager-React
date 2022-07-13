import SameMethods from './SameMethods'
import New from './New'

class AddTask extends SameMethods {
    
    state = {
        taskList:[ ],
        keys:1,
        baseUrl:"http://127.0.0.1:3939/api/tasks"
    }
    componentDidMount(){
        this.viewAllTasks()
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
        .then(prom => {this.viewAllTasks()})
    }

    render() { 
        return (<>
        <div id='spinner'>
            <h1 id='spinner_Text'></h1>
        </div>
            <div id='AddTask Div' className='base container rounded' >

                <div id='AddTask_taskName' className='container rounded inner'> 
                <h1 className='simpleCentrate content-align-center tittle'>Task Name</h1>
                    <input id='inputTaskName' type='text' 
                        style={{'width':'100%','height':'5%','padding':'0.5vw','margin':'5%'}}>
                    </input>  
                </div>

                <div id='AddTask_Description' className='container rounded inner'> 
                <h1 className='simpleCentrate tittle'>Description</h1>
                    <textarea id='inputTaskDescription' 
                        style={{'width':'100%','height':'15%', 'padding':'0.5vw','margin':'1vw'}}>
                    </textarea> 
                </div>

                <div id='AddTask_ButtonBox' className='container simpleCentrate'  >
                    <button className='btton btn btn-primary col-5 simpleCentrate' 
                        onClick={() => {
                        let x = this.captureData()//esta es la lista con los datos capturados de los inputs
                        this.send(x,this.state.baseUrl)
                    }}>Add</button>

                    <button className='btton btn btn-warning col-5 simpleCentrate' onClick ={() => {
                    this.captureData();//para borrar los inputs
                    }}>X</button>
                    <button id='fetchBtn' style={{'visibility':'hidden','display':'none'}} onClick={() => {this.viewAllTasks()}}></button>

                </div>

            </div>

            <div id='Tasks' className='taskStyles container rounded'>
                <h1 className='align-self-center tittle'>
                    <b>Task List</b>
                </h1>
                <div id='Tasks_taskList' className='container  rounded' >
                    
                    {this.state.taskList.map( e => <New ID={e[2]} Name = {e[0]} description = {e[1]} key ={e[2]} />)}
                
                </div>
            </div>
        </>);
    }
}

export default AddTask;
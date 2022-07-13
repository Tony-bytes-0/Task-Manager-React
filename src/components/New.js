import SameMethods from './SameMethods'

class New extends SameMethods {
    state = {largeView:false,baseUrl:"http://127.0.0.1:3939/api/tasks"}
    viewHide = function(rute){
        let x = rute
        if(x.style.visibility === 'visible'){x.style.visibility = 'hidden';x.style.opacity = '0'}
        else{x.style.visibility = 'visible';x.style.opacity = '100'}
        
    }
    captureInput = function(param){
        let x = document.getElementById(param).value;//console.log(x)
        return x
    }
    editContent = function(content, param){
        document.getElementById(param).innerHTML = content
    }
    clearInput = function(param){
        document.getElementById(param).value = ""
    }
    delete = async function(id){//console.log(id)
        fetch(this.state.baseUrl + '/' + id,{ "method":"DELETE"})
        .then(response => document.getElementById('fetchBtn').click() )//debo arreglar esto luego
        
    }
    fetchPlaceholders = function(url, id){
        fetch(url + '/' + id)
        .then(response => response.json())
        .then(data => {
            this.editContent(data.name, id +'modalInputTittle');
            this.editContent(data.description, id +'modalInputDescription')
        })
    }
    updateTask = function (id, Name, description){
        let data = {
            "method":"PUT",
            "body":JSON.stringify({"name":Name,"description":description}),
            "headers": {'Content-Type': 'application/json'}
        }
        fetch(this.state.baseUrl + '/' + id, data)
        .then(response => document.getElementById('fetchBtn').click() )//debo arreglar esto luego
    }
    
    render(){return(<>
                    <div id={this.props.ID + 'view'} className='container rounded view'>
                        <h1 id ={this.props.ID +'Name'} className='bg-primary rounded viewTittle'>{this.props.Name}</h1>
                        <p id ={this.props.ID +'description'} style={{'display':'flex'}}>{this.props.description}</p>

                        <div id={this.props.ID +'modalEdit'} className='modalEdit'>

                            <textarea id={this.props.ID + 'modalInputTittle'} className='modalInput'></textarea>
                            <textarea id={this.props.ID + 'modalInputDescription'} className='modalInput'></textarea>
                            
                            <div className='simpleCentrate container'>
                                <button  className='btn btn-primary'
                                    onClick={() => {// SUBMIT
                                    this.viewHide(document.getElementById(this.props.ID+'modalEdit'))
                                    let tittle = this.captureInput(this.props.ID +'modalInputTittle')
                                    let description = this.captureInput(this.props.ID +'modalInputDescription')
                                    this.updateTask(this.props.ID, tittle, description)}}>Submit
                                </button>

                                <button className='btn btn-warning' 
                                    onClick ={() => {// CANCEL
                                    this.viewHide(document.getElementById(this.props.ID+'modalEdit'));}}>Cancel
                                </button>

                            </div>
                        </div>

                        <div className='container align-items-center simpleCentrate'>

                            <button style={{'margin':'1vw'}} className='btn btn-primary' 
                                onClick={() => {this.viewHide(document.getElementById(this.props.ID+'view'))
                            }} >Minimize</button>

                            <button style={{'margin':'1vw'}} className='btn btn-primary'
                                onClick={() => {this.fetchPlaceholders(this.state.baseUrl,this.props.ID)//aqui se colocan los datos de la task
                                this.viewHide(document.getElementById(this.props.ID+'modalEdit'))//en el input
                            }}>Edit</button>

                        </div>
                    </div>
                    <div id={this.props.ID}  className='rounded mainTask'>
                        <h1 id={this.props.ID + 'h1Name'} className='simpleCentrate'>{this.props.Name}</h1>
                        <div className='btnBox container simpleCentrate'>

                            <button style={{'margin':'1vw'}} className='btn btn-primary col-3' onClick={() => {
                            this.viewHide(document.getElementById(this.props.ID+'view'))
                            }}>View</button>

                            <button style={{'margin':'1vw'}} className='btn btn-primary col-3' onClick={() => {
                            this.delete(this.props.ID)
                            }}>Delete</button>

                        </div>   
                    </div>
    </>)}
}
export default New
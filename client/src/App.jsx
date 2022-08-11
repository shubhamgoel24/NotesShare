import React from 'react';
import './App.css';
import axios from 'axios'
import List from './List.jsx';
import $ from 'jquery';
import Noty from 'noty';

let newnoteDom = (note) => {
    let x = note.createdAt;
    let y = new Date(Date.parse(x));
    return $(`
        <li class="row item justify-content-between" id="${note._id}">
            <input type="checkbox" class="col-1 listitem" id="${note._id}">
            <div class="col-7">
                <pre id="notedisc" class="row">${note.description}</pre>

            </div>
            <div class="col-3">
                <div id="notedate" class="row"> ${Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long', day: 'numeric' }).format(y)}</div>
            </div>
        </li>
    `);
}

class App extends React.Component {
    state = {
        list:[],
        loading :true
    }

    async componentDidMount(){
        // const data = await axios.get('https://todo.shubhamgoel24.me/data');
        const data = await axios.get('http://localhost:8005/data');
        this.setState({ 
            list : data.data.note,
            loading:false
        });
    }

    createnote = async (event) => {
        event.preventDefault();
        let newnoteForm = $('#new-note-form');
        await axios({
            method: 'post',
            // url: 'https://todo.shubhamgoel24.me/create-note',
            url: 'http://localhost:8005/create-note',
            data: newnoteForm.serialize(),
        })
        .then((response) => {
            if(response.status === 200){
                let newnote = newnoteDom(response.data.data.note);
                $('#notes-list-container').prepend(newnote);
                $('#textareac').val('');
                new Noty({
                    theme: 'relax',
                    text: response.data.message,
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            }
        });
    }
    

    delfunc = async() => {
        var listitems=$("input:checked");
        var delarry = [];
        if(listitems.length === 0){
            new Noty({
                theme: 'relax',
                text: 'Select Something to Delete',
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show();
            return;
        }
        $.each(listitems,function(i,x){
            delarry.push(x.id);
        });
        var arrStr = encodeURIComponent(JSON.stringify(delarry));
        await axios({
            method: 'get',
            // url: 'https://todo.shubhamgoel24.me/delete-note/?id=' + arrStr
            url: 'http://localhost:8005/delete-note/?id=' + arrStr
        })
        .then((response) => {
            if(response.status === 200){
                $.each(delarry,function(i,x){
                    let y = $('#notes-list-container').find(`#${x}`);
                    y.remove();
                });
                new Noty({
                    theme: 'relax',
                    text: response.data.message,
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            }
        });
    }
    
    render(){
        const {list,loading} = this.state;
        return (
            <div className="App">
              <div className="container">
                    <div className="row">
                        <h1>NotesShare</h1>
                    </div>
                    <form id="new-note-form" onSubmit={this.createnote}>
                        <div className="row">
                            <div id="description">
                                <h4>Note</h4>
                                <textarea name="description" placeholder="Write Here"  id='textareac'/>
                            </div>
                        </div>
                        
                        <div className= "row d-flex justify-content-center button_row">
                            <button id="del" className=" col-5 col-sm-4 col-md-3 col-lg-2" type="button" onClick={this.delfunc}><i className="fas fa-trash"></i> Delete</button>
                            <button id="add" className=" col-5 col-sm-4 col-md-3 col-lg-2" type="submit"><i className="fas fa-plus"></i> Add</button>
                        </div>
                    </form>
        
                    <div>
                        <ul className="container note_list" id="notes-list-container">
                            {loading && <h1>Loading...</h1>}
                            {
                                !loading &&
                                <List list={list}/>
                            }
                        </ul>
                        
                        <div>
                            To delete a note: <br></br>
                            First select the note using the checkbox.Then click the delete button.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

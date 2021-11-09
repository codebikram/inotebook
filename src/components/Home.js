import React  from 'react'
import Notes from './Notes';

function Home() {
    
       return (
        <div className="my-3">
            <h2 style={{marginTop:"70px"}}>Add a Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter title here" />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" placeholder="Enter tag here" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="form-control" name="description" rows="4" cols="50"  placeholder="Enter description here"/>
                </div>
                <button type="submit" className="btn btn-dark">Add</button>
            </form>
         <Notes/>
        </div>
    )
}

export default Home

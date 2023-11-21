import React from "react";

const DeleteModal =({setShowDeleteModal,handleDelete,bookTitle})=>{
    return(
        <div className="modal-wrapperr">
            <div className="modall">
                <h5>"{bookTitle}" silmek istiyor musunuz?</h5>
                <button onClick={()=>setShowDeleteModal(false)} className="btn btn-warning">Give Up</button>
                <button onClick={()=>handleDelete()} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}
export default DeleteModal
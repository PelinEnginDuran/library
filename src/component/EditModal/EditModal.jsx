import React from 'react'

const EditModal = ({ setShowEditModal, editItem, setEditItem,handleEditBook }) => {
  return (
    <div className="modal-wrapperr">
      <div className="modall">
        <h5>Kitap ismini düzenleyin</h5>
        <input
          onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
          type="text"
          value={editItem.title}
          className="form-control"
        />
        <div className="d-flex justify-content-between">
          <button
            onClick={() => setShowEditModal(false)}
            className="btn btn-warning">
            Give Up
          </button>
          <button 
         onClick={()=> handleEditBook()} className="btn btn-success">Save</button>
        </div>
      </div>
    </div>
  )
}
export default EditModal

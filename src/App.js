import { useState } from 'react'
import { toast } from 'react-toastify'
import Header from './component/Header'
import { v4 } from 'uuid'
import BookCard from './component/BookCard/BookCard'
import DeleteModal from './component/DeleteModal/DeleteModal'
import EditModal from './component/EditModal/EditModal'

function App() {
  const [bookName, setbookName] = useState('') //yeni kitap adının tutulduğu state
  const [books, setbooks] = useState([]) //tüm kitap verilerin tutulduğu state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteTitle, setDeleteTitle] = useState('')
  const [editItem,setEditItem]=useState({})





  const handleChance = (e) => {
    //inputun içeriğini almak için fonksiyon, input her değiştiğinde çalışır
    setbookName(e.target.value)
  }

  const handleSubmit = (e) => {
    //kitap ekleme fonksiyonu
    e.preventDefault() //varsayılan yenileme özelliğini kapatır
    if (!bookName) {
      //input boş ise alert mesaj gösterir
      toast.info('Lütfen Kitap ismi Giriniz.', { autoClose: 2000 })
      return //fonksiyonun aşağıya devam etmesini engeller
    }
    const newBook = {
      //yeni kitap oluşturma objesi
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    }

    setbooks([...books, newBook]) //spread operatör(...) yardımı ile state içinde bulunan tüm kitapları
    toast('Kitap Başarıyla Eklendi', { autoClose: 2000 })
    setbookName('') //dizi içine aktardık daha sonra üstüne yeni oluşturduğumuz kitabı ekledik. üç nokta önceki değerleri alır.
  }



  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId)
    setDeleteTitle(deleteBookTitle)
    setShowDeleteModal(true)
  }
  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId)
    setbooks(filteredBooks)
    setShowDeleteModal(false)
    toast.error('kitap başarıyla silindi', { autoClose: 2000 })
  }
  const handleEditModal = (editBook) => {
    setEditItem(editBook)
    setShowEditModal(true)
    
  }
  const handleEditBook=()=>{

    const editIndex=books.findIndex((book)=>book.id===editItem.id)
    const cloneBooks=[...books]
    cloneBooks.splice(editIndex,1,editItem)
    setbooks(cloneBooks)
    setShowEditModal(false)
    toast('Kitap ismi Başarıyla Güncellendi',{autoClose:2000})
    
  }

  const handleRead=(readBook)=>{
    const updateBook={...readBook,isRead:!readBook.isRead}
   const index=books.findIndex((book)=>book.id===readBook.id)
   const cloneBooks=[...books]
   cloneBooks[index]=updateBook
   setbooks(cloneBooks)

  }
  return (
    <div>
      <Header />
      <div className="container">
        <form className="d-flex gap-3 mt-4 " onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChance}
            placeholder="Kitap İsmi Giriniz"
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {books.length === 0 ? (
          <h4>Herhangi bir kitap eklenmedi</h4>
        ) : (
          books.map((book) => (
            <BookCard 
            handleEditModal={handleEditModal}
            handleModal={handleModal}
             bookInfo={book} 
             key={book.id}
             handleRead={handleRead} />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && <EditModal
      handleEditBook={handleEditBook}
      setShowEditModal={setShowEditModal}
      editItem={editItem}
      setEditItem={setEditItem}
      />}
    </div>
  )
}



export default App

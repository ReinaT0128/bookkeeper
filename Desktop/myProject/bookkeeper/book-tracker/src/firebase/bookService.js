import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

const booksRef = collection (db, "books");

export const createBook = (book) => addDoc(booksRef, book);

export const getAllBooks = async() => {
    const snapshot = await getDocs(booksRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const updateBook = (id, updatedData) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedData);
}

export const deleteBook = (id) => {
    const bookDoc = doc (db, "books", id);
    return deleteDoc(bookDoc);
}
import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind);
const DATA_BASE_NAME = 'kati';

const db = new PouchDB(DATA_BASE_NAME);

export const getAll = () => db.allDocs({ include_docs: true, descending: true }).then(({ rows }) => rows);

const getByAuthor = ({ keyword }) => {
    return db.find({selector: { author: keyword } }).then(({ docs }) => docs);
}

const getByTitle = ({ keyword }) => {
    return db.find({selector: { title: keyword } }).then(({ docs }) => docs);
}

export const insertBook = (book) => db.put({...book, _id: book.id});

export const get = (id) => db.get(id);

export const getBy = {
    author: getByAuthor,
    title: getByTitle
};
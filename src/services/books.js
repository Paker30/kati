import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';
import PouchDbUpsert from 'pouchdb-upsert';
PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDbUpsert);
const DATA_BASE_NAME = 'kati';

const db = new PouchDB(DATA_BASE_NAME);

export const getAll = () => db.allDocs({ include_docs: true, descending: true }).then(({ rows }) => rows);

const getByAuthor = ({ keyword }) => db.find({selector: { author: { $regex: keyword } } }).then(({ docs }) => docs);

const getByTitle = ({ keyword }) => db.find({selector: { title: {$regex: keyword} } }).then(({ docs }) => docs);

export const insertBook = (book) => db.put({ ...book, _id: book.id, updated: new Date().getTime() });

export const get = (id) => db.get(id);

export const update = (book) => db.upsert(book.id, (doc) => ({ ...doc, ...book, updated: new Date().getTime() }));

export const getAllCursor = () => db.getAllCursor();

export const getBy = {
    author: getByAuthor,
    title: getByTitle
};
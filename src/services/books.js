import PouchDB from 'pouchdb-browser';
const DATA_BASE_NAME = 'kati';

const db = new PouchDB(DATA_BASE_NAME);

export const getAll = () => db.allDocs({ include_docs: true, descending: true }).then(({ rows }) => rows);

export const insertBook = (book) => db.put({...book, _id: book.id});

export const get = (id) => db.get(id);
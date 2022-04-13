import PouchDB from 'pouchdb-browser';
const DATA_BASE_NAME = 'kati';

const db = new PouchDB(DATA_BASE_NAME);

export const fetchAll = () => db.allDocs({ include_docs: true, descending: true }).then(({ rows }) => rows);

export const insertBook = (book) => db.put({...book, _id: book.id});

export const fetch = (id) => db.get(id);
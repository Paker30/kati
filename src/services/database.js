import { openDB, unwrap } from 'idb/with-async-ittr';
// import { database } from 'config';

const objectStore = 'books';
const db = openDB('KATI', 1, {
    upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore('books', {
            // The 'id' property of the object will be the key.
            keyPath: 'id',
            // If it isn't explicitly set, create a value by auto incrementing.
            autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('date', 'date');
    }
});

export default db;

export {
    objectStore,
    unwrap
}
import { dbToCloud, drive } from 'db-to-cloud';
import { update, getAll, get } from './books';

const sync = dbToCloud({
    onGet: get,
    onFirstSync: async () => {
        return getAll()
            .then((books) =>
                Promise.all(books.map((book) =>{
                    return sync.put(book.doc._id, book.doc.updated)
                }))
            );
    },
    onPut: (book) => {
        update(book)
            .catch((error) => {
                if (error.type === 'outdateDoc') {
                    sync.put(book._id, book.updated);
                }
            })
    },
    getState: async (drive) => {
        try {
            return JSON.parse(localStorage.getItem(`cloudSync/${drive.name}/state`));
        } catch (err) { }
    },
    setState: async (drive, state) => {
        localStorage.setItem(`cloudSync/${drive.name}/state`, JSON.stringify(state));
    },
    compareRevision(rev1, rev2) {
        return rev1 - rev2;
    },
    onProgress: (progressEvent) => {
        console.log(progressEvent);
    },
});

export { sync, drive };
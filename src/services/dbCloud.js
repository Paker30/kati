import { dbToCloud, drive } from 'db-to-cloud';
import { update, getAll, get, insert } from './books';

const remove = (removeKey) => (object) => {
    return Object.keys(object).reduce((acc, key) => {
        if(key !== removeKey) {
            return {...acc, [key]: object[key]};
        }
        return acc;
    }, {});
};

const sync = dbToCloud({
    onGet: get,
    onFirstSync: async () => {
        return getAll()
            .then((books) =>
                Promise.all(books.map((book) => {
                    return sync.put(book.doc._id, book.doc.updated)
                }))
            );
    },
    onPut: (book) => {
        return get(book.id)
            .then((localeBook) => update({...localeBook, author: book.author, isRead: book.isRead, title: book.title}))
            .catch(() => insert(remove('_rev')(book)))
    },
    onDelete: (id) => {
        return sync.delete(id);
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
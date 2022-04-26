import { dbToCloud, drive } from 'db-to-cloud';
import { getAllCursor, update } from './books';

const sync = dbToCloud({
    onFirstSync: async () => {
        const cursor = getAllCursor();
        while (!cursor.end()) {
            const { _id, _rev } = await cursor.next();
            sync.put(_id, _rev);
        }
    },
    onPut: (book) => update(book)
    .catch((error) => {
        if(error.type === 'outdateDoc') {
            sync.put(book._id, book._rev);
        }
    })
});

export { sync, drive };
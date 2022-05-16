import React from 'react';
import IDBExportImport from 'indexeddb-export-import';
import db, { unwrap } from 'services/database.js';

export default function Download() {
    const handleClick = () => {
        db.then((store) => {
            IDBExportImport.exportToJsonString(unwrap(store), (error, jsonString) => {
                if (error) {
                    console.error(error);
                }

                const a = document.createElement("a");
                const file = new Blob([jsonString], { type: 'text/plain' });
                a.href = URL.createObjectURL(file);
                a.download = 'katibooks.json';
                a.click();
            });
        });
    };

    return (
        <button className='btn' onClick={handleClick}>
            <span aria-label="Download" role="img">
                📥
            </span>
        </button>
    )
}

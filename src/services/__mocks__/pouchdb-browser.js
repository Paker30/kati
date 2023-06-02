export const fakeGetAll = jest.fn();
export const fakePlugin = jest.fn();
export const fakePut = jest.fn();
export const fakeGet = jest.fn();
export const fakeFind = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return { allDocs: fakeGetAll, put: fakePut, get: fakeGet, update: fakePut, find: fakeFind };
});

mock.plugin = fakePlugin;

export default mock;
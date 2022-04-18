import { useReducer } from 'react';

const ACTIONS = {
    CHANGE_KEYWORD: 'change_keyword',
    CHANGE_CATEGORY: 'change_category'
};

const ACTIONS_REDUCERS = {
    [ACTIONS.CHANGE_CATEGORY]: (state, action) => ({
        ...state,
        category: action.payload
    }),
    [ACTIONS.CHANGE_KEYWORD]: (state, action) => ({
        ...state,
        keyword: action.payload
    })
};

const reducer = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type];
    return actionReducer ? actionReducer(state, action) : state;
};

export default function useForm({
    initialKeyword = '',
    initialCategory = 'title'
} = {}){
    const [{ keyword, category}, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        category: initialCategory
    });
    
    return {
        changeKeyword: ({ keyword }) => dispatch({ type: ACTIONS.CHANGE_KEYWORD, payload: keyword}),
        changeCategory: ({ category }) => dispatch({ type: ACTIONS.CHANGE_CATEGORY, payload: category}),
        keyword,
        category
    }
};
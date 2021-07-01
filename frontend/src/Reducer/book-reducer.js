import * as actions from '../Actions/book-action';
let initialState = {
    books: [
        {
            title:'',
            authors:'',
            isbn:'',
            price:'',
            discount:'',
            publishDate:'',
            category:'',
            price:'',
            available:''
        }
    ],
    totalbook: "",
    message:''
}

// Reducers in store to modify state -- don't directly manipulate state
const reducer = (state = initialState, action) => {
    console.log('Action recieved at reducer***  ', action);
    switch (action.type) {
        case actions.FETCH_BOOKS:
            return {
                ...state,
                message: action.payload.message,
                books: action.payload.data,
                totalbook: action.payload.total,
            }
        case actions.ERROR_BOOK:
            return {
               
                ...state,
                message: action.payload.message
            }
        case actions.ADD_BOOK:
            return {
                ...state,
                message: action.payload.message
            }
        case actions.UPDATE_BOOK: 
            return {
                ...state,
                books: action.payload.data,
                message: action.payload.message
            }
        case actions.FETCH_BOOKS_BY_TITLE:
            return {
                ...state,                   
                message: action.payload.message,
                books: action.payload.data,
                totalbook: action.payload.total,
                }
        case actions.FILTER_BOOK:
            return {
                ...state,
                books: action.payload.data,
                totalbook: action.payload.total
            }
        default: return state
    }

}

export default reducer;
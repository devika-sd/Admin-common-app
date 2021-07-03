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
            available:'',
            image:''
        }
    ],
    BookCountPie : [
        { horror: 0 },
        { comedy: 0 },
        { adventure: 0 },
        { fiction: 0 },
        { ancient: 0 },
        { sciencefiction: 0 },
        { thriller: 0 },
        { spritual: 0 },
        { classic: 0 }
    ],
    totalbook: "",
    message:'',
    BookCountchart:[
        {_id: "thriller", count: 0,color: "#3ebfea"},
        {_id: "spritual", count: 0,color: "#04a9f5"},
        {_id: "sciencefiction", count: 0,color: "#ff8a65"},
        {_id: "horror", count: 0,color: "#1de9b6"},
        {_id: "fiction", count: 0,color: "#4C5667"},
        {_id: "comedy", count: 0,color: "#69CEC6"},
        {_id: "classic", count: 0,color: "#a389d4"},
        {_id: "ancient", count: 0,color: "#FE8A7D"},
        {_id: "adeventure", count: 0,color: "#3ebfea"},
    ]
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
        case actions.FETCH_BOOK_COUNT:
            return {
                ...state,
                BookCountPie: action.payload,

            }
        case actions.FETCH_AVAILABLE_COUNT:
            return {
                ...state,
                BookCountchart: action.payload,

            }
        case actions.FILTER_BOOK:
            return {
                ...state,
                books: action.payload.data,
                totalbook: action.payload.total
            }
        case actions.RESET_MESSAGE:
            return {
                ...state,
                message:action.payload
            }
        default: return state
    }

}

export default reducer;
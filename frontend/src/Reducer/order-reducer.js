import * as actions from '../Actions/order-action';
let initialState = {
    orders: [
    ],
    orderStatusCount: [
        { New: 0 },
        { Packed: 0 },
        { Shipped: 0 },
        { Completed: 0 },
        { Cancelled: 0 },
        { Delayed: 0 }
    ],
    totalorders:"",
    message:''
}

const reducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload.data,
                totalorders:action.payload.total
            }
        case actions.UPDATE_ORDERS:
            return {
                ...state,
                message: action.payload.message
            }
        case actions.ERROR_ORDERS:
            return {
                // users: action.payload
                ...state,
                message: action.payload.message
            }
         case actions.FETCH_STATUS_COUNT:
            return {
                ...state,
                orderStatusCount: action.payload,

            }
        case actions.RESET_MESSAGE:
            return {
                ...state,
                message:action.payload
            }
        case actions.RESET_ORDERS: return initialState
        default : return state
    }
 
}

export default reducer;
import authHeader from '../services/auth-header'

export const ADD_BOOK = "ADD_BOOK"
export const ERROR_BOOK = "ERROR_BOOK"
export const FETCH_BOOKS = "FETCH_BOOKS"
export const UPDATE_BOOK = "UPDATE_BOOK"
export const FETCH_BOOKS_BY_TITLE = "FETCH_BOOKS_BY_TITLE"
export const FILTER_BOOK = "FILTER_BOOK"
export const FETCH_BOOK_COUNT = "FETCH_BOOK_COUNT"


const saveBook = (book) => {
    return {
        type: ADD_BOOK,
        payload: book
    }
}

export const addbook = (book) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(book)
        })
            .then(res => res.json())
            .then(book => {
                console.log(book)
                if(book.success)
                {
                  
                    dispatch(saveBook(book));
                }
                else
                {
                    dispatch({
                        type: ERROR_BOOK,
                        payload: book
                    });
                }
                
            })
    }
}

export const fetchbooks = (filter,message='') => {
    //add your code
    console.log("***************"+filter);
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book?sort=title&' + filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.total)
                var newdata = {...data,message}
                dispatch({ type: FETCH_BOOKS, payload: newdata });
            })
    }
}


export const fetchbooksbytitle = (title, filter) => {
    //add your code
    console.log("***************"+filter);
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/' + title , {
            method: 'GET',
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.total)
             //   var newdata = {...data,message}
                dispatch({ type: FETCH_BOOKS_BY_TITLE, payload: data });
            })
    }
}

export const deletebooks = (title, filter) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/' + title, {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' }
            headers: authHeader()
        
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                dispatch(fetchbooks(filter,data.message));
            });
    }
}

export const updatebooks = (titles,bookData) => {
    //add your code
  
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/'+titles,
            {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify(bookData)
            })
            .then(res=>res.json())
            .then(data => {
                console.log("*************"+data.success);
                if (data.success === true) {
                    // this.setState({ message: "Successfully inserted" })
                    dispatch({ type: UPDATE_BOOK, payload: data });
                }
                else{
                    console.log("*************"+data.success);
                    dispatch({
                        type: ERROR_BOOK,
                        payload: data
                    });
                }
            })
    }
}

export const filterbookbytitle = (title,page,limit) => {
    //add your code
    console.log("***************"+title,page,limit);
    var filter = 'title[regex]='+title+'&page='+page+'&limit='+limit;
    console.log("*************"+filter+"************")
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/?sort=title&'+filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ users: data.data })
                console.log(data)
                dispatch({ type: FILTER_BOOK, payload: data });
            })
    }
}

export const fetchBookCatogryCount = () => {

    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/chart/piechart', {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log("********FETCH_BOOK_COUNT******")
                console.log(data.data);

                dispatch({ type: FETCH_BOOK_COUNT, payload: data.data });
            })
    }
}
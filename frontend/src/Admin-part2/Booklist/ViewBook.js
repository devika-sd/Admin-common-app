import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { connect } from 'react-redux';
import { useHistory } from "react-router";


import * as bookactions from '../../Actions/book-action';


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '1000px',
        padding: theme.spacing(2, 4, 3)
    },
}));



function ViewBook(props) {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    var [modalStyle] = useState(getModalStyle);
    var [open, setOpen] = useState(true);
    const [bookid,setBookid] = useState('');
    const [title, setTitle] = useState('');
    const [titleTemp, setTitleTemp] = useState('');
    const [authors, setAuthors] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [publishDate1, setPublishDate1] = useState('');
    const [isbn, setIsbn] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [available, setAvailable] = useState('');
    const [status, setStatus] = useState("new");
    const [notify,setNotify] = useState(false);

    const [enable, setEnable] = useState(true)
    const [titleError, setTitleError] = useState(true)
    const [isbnError, setIsbnError] = useState(true)
    const [categoryError, setCategoryError] = useState(true)
    const [authorsError, setAuthorsError] = useState(true)
    const [priceError, setPriceError] = useState(true)
    const [discountError, setDiscountError] = useState(true)
    const [availableError, setAvailableError] = useState(true)
    const [publishDateError, setPublishdateError] = useState(true)
    const [titleErrorMsg, setTitleErrorMsg] = useState('')
    const [isbnErrorMsg, setIsbnErrorMsg] = useState('')
    const [categoryErrorMsg, setCategoryErrorMsg] = useState('')
    const [authorsErrorMsg, setAuthorsErrorMsg] = useState('')
    const [priceErrorMsg, setPriceErrorMsg] = useState('')
    const [discountErrorMsg, setDiscountErrorMsg] = useState('')
    const [availableErrorMsg, setAvailableErrorMsg] = useState('')
    const [publishDateErrorMsg, setPublishdateErrorMsg] = useState('')
    const categories= ["horror", "comedy", "adeventure", "fiction", "ancient", "sciencefiction", "thriller", "spritual", "classic" ]
   

    const handleopen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setNotify(false);
        history.push('/showbook');

    }

    const checkClose = () => {
        handleClose();
    }
   
    useEffect(() => {
        (async () => {
            await props.onGetBooks();
           
           // let date = new Date(props.books[0].publishDate);
//date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
         //   console.log("jjjj "+date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate())
            setBookid(props.books[id]._id)
            setTitle(props.books[id].title)
            setTitleTemp(props.books[id].title)
            setCategory(props.books[id].category)
            setIsbn(props.books[id].isbn)
            setPrice(props.books[id].price)
            setDiscount(props.books[id].discount)
            setAvailable(props.books[id].available)
           // var d = new Date(date.getFullYear(), (date.getMonth()+1), date.getDate());
            var publishedDate = new Date(props.books[id].publishDate)
            setPublishDate1(props.books[id].publishDate)
            setPublishDate(publishedDate.toLocaleDateString())
            setAuthors(props.books[id].authors)
            
        })();



       
    }, [id,id])
    var check = true;
    const update = async (event) => {
        setNotify(true);
   
        let bookData = { title, category, authors, isbn, price, discount, available, publishDate:publishDate1}
        if(titleTemp === null){
        props.onUpdate(bookid, bookData)
        } else{
            props.onUpdate(bookid, bookData)
        }
        setEnable(true)
    }

    const Edit = (event) => {
        console.log('Edit')
        setEnable(false)
    }
    const cancel = (event) =>{
        console.log('cancel')
        setEnable(true)
        handleClose();
    }

    const onChangeRadio = (e) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    }
    const onTitleChange = (event) => {
        var titleValue = (event.target.value)
        const expression = new RegExp('[a-zA-Z\s]{2,20}')
        
        if (!(expression.test(titleValue))) {
            setTitle(titleValue)
            setTitleError(false)
    
            setTitleErrorMsg('please enter a valid book title');
        }
        else {
            setTitle(titleValue)
            setTitleError(true)
            setTitleErrorMsg('');
            check = false;
        }
    }

    const onCategoryChange = (event) => {
        var value = (event.target.value)
         
        if (value==="") {
            setCategory(value)
            setCategoryError(false)
            setCategoryErrorMsg('please enter a valid category');
        }
        else {
            setCategory(value)
            setCategoryError(true)
            setCategoryErrorMsg('');
            check = false;
        }
    }

    const onAuthorsChange = (event) => {
        var authorsValue = (event.target.value)
        const expression = new RegExp('[a-zA-Z\s]{4,20}')
        
        if (!(expression.test(authorsValue))) {
            setAuthors(authorsValue)
            setAuthorsError(false)
            setAuthorsErrorMsg('please enter a valid author name')
        }
        else {
            setAuthors(authorsValue)
            setAuthorsError(true)
            check = false;
            setAuthorsErrorMsg('')
        }
    }

    const onIsbnChange = (event) => {
        var value = (event.target.value)
        
        if (value.length >13 || value.length<10) {
            setIsbn(value)
            setIsbnError(false)
            setIsbnErrorMsg('isbn number should be 10 to 13 digits long')
        }
        else {
            setIsbn(value)
            setIsbnError(true)
            setIsbnErrorMsg('')
            check = false;
        }
    }

    const onPriceChange = (event) => {
        var value = (event.target.value)
        
        if (value<=0) {
            setPrice(value)
            setPriceError(false)
            setPriceErrorMsg('Price should be greater than 0')
        }
        else {
            setPrice(value)
            setPriceError(true)
            setPriceErrorMsg('')
            check = false;
        }
    }

    
    const onAvailableChange = (event) => {
        var value = (event.target.value)
        
        if (value<0) {
            setAvailable(value)
            setAvailableError(false)
            setAvailableErrorMsg('Availability should be a positive number')
        }
        else {
            setAvailable(value)
            setAvailableError(true)
            setAvailableErrorMsg('')
            check = false;
        }
    }

    const onDiscountChange = (event) => {
        var value = (event.target.value)
        
        if (value<0 || value > 50) {
            setDiscount(value)
            setDiscountError(false)
            setDiscountErrorMsg('Discount should be less than 50')
        }
        else {
            setDiscount(value)
            setDiscountError(true)
            setDiscountErrorMsg('')
            check = false;
        }
    }
   
        
    return (
        <div>
            {/* {props.message.includes('updated')&&notify ? <Notification open={true} variant='success' msg={props.message}/> : null} */}
            
            {/* {props.message.includes('Book details not updated') ? <Notification open={true} variant='error' msg={props.message}/> : null}
                 {props.message.includes('Book details updated successfully') ? <Notification open={true} variant="success" msg={props.message}/> : null}
                 {props.message.includes('authors') ? <Notification open={true} variant="success" msg={"Author Name should be at least 4 Character Long"}/> : null}
              */}
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper+' ordermodel'}>
                    <Card className="border border-muted" style={{
                        padding: '10px 15px',
                        margin: '15px auto',
                        boxSizing: 'border-box',
                        border: 'none',
                        width: '90%',
                        fontFamily: 'monospace',
                        display: 'block'
                    }}>

                        <Card.Header>
                            <i className="fa fa-times" style={{ float: 'right', fontSize: '20px' }} onClick={checkClose}></i>
                            <Card.Title as="h5">
                                <h4>Book Details</h4>
                            </Card.Title>
                            {/* <hr></hr> */}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>

                                {/* Disabled */}
                                {enable &&
                                    <Row>
                                        <Col md={6}>
                                            <Form>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Title</Form.Label>
                                                    <Form.Control type="text" value={title} onChange={onTitleChange} placeholder="Enter Title" />
                                                    <p className="help-block text-danger">{titleErrorMsg}</p>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                
                                                    <Form.Control type="hidden" value={titleTemp} onChange={onTitleChange} placeholder="Enter Title" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>ISBN</Form.Label>
                                                    <Form.Control type="number" value={isbn} onChange={onIsbnChange} placeholder="Enter ISBN" />
                                                    <p className="help-block text-danger">{isbnErrorMsg}</p>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control type="number" value={price} onChange={onPriceChange} placeholder="Enter Price" />
                                                    <p className="help-block text-danger">{priceErrorMsg}</p>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Publish Date</Form.Label>
                                                    <Form.Control type="text" value={publishDate}  placeholder="Enter Publish Date" />
                                                    <p className="help-block text-danger">{publishDateErrorMsg}</p>
                                                </Form.Group>

                                            </Form>
                                        </Col>

                                        <Col md={6}>

                                        <Form>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Categoy</Form.Label>
                                                    <Form.Control onChange={onCategoryChange} value={category} as="select" placeholder="Select Category">
                                                    <option>Select Category</option>
                                                    {categories.map(data =>(
                                                        <option title={data}>{data}</option>
                                                    ))}
                                                </Form.Control>
                                                    <p className="help-block text-danger">{categoryErrorMsg}</p>
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Author Name</Form.Label>
                                                    <Form.Control type="text" value={authors} onChange={onAuthorsChange} placeholder="Enter Author Name" />
                                                    <p className="help-block text-danger">{authorsErrorMsg}</p>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Discount</Form.Label>
                                                    <Form.Control type="number" value={discount} onChange={onDiscountChange} placeholder="Enter Discount" />
                                                    <p className="help-block text-danger">{discountErrorMsg}</p>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Available Stock</Form.Label>
                                                    <Form.Control type="number" value={available} onChange={onAvailableChange} placeholder="Enter Available Stock" />
                                                    <p className="help-block text-danger">{availableErrorMsg}</p>
                                                </Form.Group>

                                            </Form>

                                        </Col>
                                        
                                        <Button  style={{ width: "fit-content", margin: 'auto' }} onClick={update} variant="primary">UPDATE</Button>
                                    </Row>
                                }

                               


                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        books: state.bookReducer.books,
        authenticated: state.authReducer.authenticated,
        currentuser:state.userReducer.currentUser,
        message:state.bookReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (title, bookData) => dispatch(bookactions.updatebooks(title, bookData)),
        onGetBooks: () => dispatch(bookactions.fetchbooks())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewBook);
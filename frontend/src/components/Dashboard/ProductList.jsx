import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Rating } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { clearErrors, getAllAdminProducts, createProduct, deleteProduct } from '../../redux/ProductRed/Action';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { NEW_PRODUCT_RESET, DELETE_PRODUCT_RESET } from '../../redux/ProductRed/Actiontypes';

const DashBoardStyles = styled.div`
    width: 80%;
    height: fit-content;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 1rem;
    background: #BEBEBE;
    border-radius: 15px;
    .dashboard-container{
        padding: 2rem;
        display: grid;
        height: 60vh;
        gap: 1rem;

        .head{
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2{
                font-size: 1.6rem;
                font-weight: 700;
            }
            button{
                width: 150px;
                height: 3rem;
                text-align: center;
                color: #FFF;
                background-color: #00C37A;
                font-size: 1.1rem;
                font-weight: 600;
            }
        }
        .product-list{
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            overflow: auto;

            &::-webkit-scrollbar{
                width: 5px;
            }

            .item{
                display: flex;
                flex-direction: column;
                height: fit-content;
                padding: 0.5rem;
                gap: 0.2rem;
                background-color: #FFF;
                border-radius: 10px;

                *{
                    font-family: 'Poppins',sans-serif;
                }
                & > p{
                    font-weight: 500;
                    font-size: 1rem;
                }
                & > div{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .show{
                        display: flex;
                        gap: 1rem;

                        img{
                            width: 3rem;
                            height: 3rem;
                            border-radius: 50%;
                        }
                        .info{
                            display: flex;
                            flex-direction: column;

                            p{
                                font-size: 0.9rem;
                            }

                        }
                    }
                    .pandq{
                        p{
                            font-size: 1rem;
                            font-weight: 500;
                        }
                    }
                    .actions{
                        display: flex;
                        gap: 1rem;

                        svg{
                            width: 2rem;
                            height: 2rem;
                            opacity: 0.8;
                            transition: 0.2s ease-in-out;

                            &:hover{
                                opacity: 1;
                            }
                        }

                    }
                }
            }
        }
        
    }
    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 90%;
        grid-template-columns: 0.02fr 1fr;
        
    }
    @media (min-width: 650px) and (max-width: 767px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        
    }
    @media (max-width: 649px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        .dashboard-container{
            padding: 1rem;

            .head{

                h2{
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                button{
                    width: 120px;
                    height: 2.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                }
            }
            .product-list{
                display: grid;
                grid-template-columns: 1fr;
                gap: 1rem;
                overflow: auto;

                &::-webkit-scrollbar{
                    width: 5px;
                }

                .item{
                    border-radius: 8px;

                    *{
                        font-family: 'Poppins',sans-serif;
                    }
                    & > p{
                        font-size: 0.9rem;
                    }
                    & > div{
                        display: grid;
                        grid-template-columns: repeat(2,1fr);
                        .show{
                            display: flex;
                            gap: 1rem;

                            img{
                                width: 2.8rem;
                                height: 2.8rem;
                                border-radius: 50%;
                            }
                            .info{
                                display: flex;
                                flex-direction: column;

                                p{
                                    font-size: 0.8rem;
                                }

                            }
                        }
                        .pandq{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            p{
                                font-size: 0.9rem;
                                font-weight: 500;
                            }
                        }
                        .actions{
                            display: flex;
                            gap: 1rem;
                            grid-column: span 2;
                            justify-content: space-evenly;
                            
                            svg{
                                width: 2rem;
                                height: 2rem;
                                opacity: 0.8;
                                transition: 0.2s ease-in-out;

                                &:hover{
                                    opacity: 1;
                                }
                            }

                        }
                    }
                }
            }
        }
    }

`

function AdminProductList({ user }) {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, products } = useSelector(state => state.products);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const InputStyles = {
        width: '85%',
        height: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        fontWeight: 'normal',
        fontFamily: 'Poppins,sans-serif',
        display: 'flex',
        padding: '0',

        '::fileSelectorButton': {
            cursor: 'pointer',
            width: '100%',
            height: '4vh',
            border: 'none',
            margin: '0%',
            font: '400 1rem Poppins,sans-serif',
            transition: 'all 0.5s',
            padding: '0 1rem',
            color: 'rgba(0, 0, 0, 0.623)',
            backgroundColor: 'rgb(255, 255, 255)',
        },
        'hover': {
            backgroundColor: "black",
        }
    }

    const ModelToggle = () => {
        setOpen(!open);
    }

    const { loading, error: newProducterror, success } = useSelector((state) => state.newProduct);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);
    const navigate = useNavigate();

    // Create Product States
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
        "Watches",
        "Electronic Appliances",
    ];

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };


    const CreateProductHandler = () => {
        const data = {
            name: name,
            price: price,
            description: description,
            category: category,
            stock: Stock,
            images: imagesPreview,
        }
        dispatch(createProduct(data));
    }

    const DeleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(`Error: ${error}`);
            dispatch(clearErrors());
        }

        if (newProducterror) {
            alert.error(`Product Error: ${newProducterror}`);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(`Delete Error: ${deleteError}`);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

        if (success) {
            alert.success("Product Created Successfully");
            setOpen(false);
            dispatch({ type: NEW_PRODUCT_RESET });
        }
        dispatch(getAllAdminProducts());
    }, [dispatch, alert, error, newProducterror, success, deleteError, isDeleted]);

    return (
        <>
            <DashBoardStyles>
                <SideBar user={user} />
                <div className="dashboard-container">
                    <div className='head'>
                        <h2>{`PRODUCTS LIST (${products?.length})`}</h2>
                        <Button onClick={ModelToggle}>ADD PRODUCT</Button>
                    </div>
                    <div className="product-list">
                        {products && products?.map((prod) => {
                            return <div className="item" >
                                <p style={{ cursor: "pointer" }} onClick={() => {
                                    navigate(`/product/${prod?._id}`);
                                }}>Product ID - {prod?._id}</p>
                                <div>
                                    <div className="show">
                                        <img src={prod?.images[0]?.url} alt="" />
                                        <div className="info">
                                            <p>{prod?.name}</p>
                                            <Rating value={prod?.ratings} precision={0.5} size={'small'} readOnly />
                                        </div>
                                    </div>
                                    <div className="pandq">
                                        <p>₹{prod?.price}</p>
                                        <p>{prod?.stock} InStock</p>
                                    </div>
                                    <div className="actions">
                                        <EditIcon onClick={() => {
                                            navigate(`/admin/product/update/${prod._id}`);
                                        }} />
                                        <DeleteIcon onClick={() => {
                                            DeleteProductHandler(prod?._id);
                                        }} />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </DashBoardStyles>
            <Dialog
                aria-labelledby='simple-dialog-title'
                open={open}
                style={{
                    padding: '1rem',
                }}
                onClose={ModelToggle}>
                <DialogTitle style={{
                    fontWeight: '600',
                }}>Add Product Details</DialogTitle>
                <DialogContent style={{
                    width: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '2rem',
                }}>

                    <div className="productform" style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '4rem',
                            border: '0.5px solid #BEBEBE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '0 auto',
                            padding: '0.5rem',
                        }}>
                            <SpellcheckIcon style={{
                                width: '2rem',
                                height: '2rem',
                            }} />
                            <input style={{
                                width: '85%',
                                height: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontWeight: 'normal',
                                fontFamily: 'Poppins,sans-serif',
                            }}
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            height: '4rem',
                            border: '0.5px solid #BEBEBE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '0 auto',
                            padding: '0.5rem',
                        }}>
                            <AttachMoneyIcon style={{
                                width: '2rem',
                                height: '2rem',
                            }} />
                            <input style={{
                                width: '85%',
                                height: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontWeight: 'normal',
                                fontFamily: 'Poppins,sans-serif',
                            }}
                                type="text"
                                placeholder="Product Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            height: 'fit-content',
                            border: '0.5px solid #BEBEBE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '0 auto',
                            padding: '0.5rem',
                        }}>
                            <DescriptionIcon style={{
                                width: '2rem',
                                height: '2rem',
                            }} />
                            <textarea style={{
                                width: '85%',
                                height: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontWeight: 'normal',
                                fontFamily: 'Poppins,sans-serif',
                            }}
                                type="text"
                                placeholder="Product Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="20"
                                rows="1"
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            height: '4rem',
                            border: '0.5px solid #BEBEBE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '0 auto',
                            padding: '0.5rem',
                        }}>
                            <AccountTreeIcon style={{
                                width: '2rem',
                                height: '2rem',
                            }} />
                            <select style={{
                                width: '85%',
                                height: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontWeight: 'normal',
                                fontFamily: 'Poppins,sans-serif',
                            }} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div style={{
                            width: '100%',
                            height: '4rem',
                            border: '0.5px solid #BEBEBE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '0 auto',
                            padding: '0.5rem',
                        }}>
                            <StorageIcon style={{
                                width: '2rem',
                                height: '2rem',
                            }} />
                            <input style={{
                                width: '85%',
                                height: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontWeight: 'normal',
                                fontFamily: 'Poppins,sans-serif',
                            }}
                                type="number"
                                placeholder="Stock"
                                required
                                value={Stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            height: '4rem',
                            border: '0.5px solid #BEBEBE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '0 auto',
                            padding: '0.5rem',
                        }}>
                            <input style={InputStyles}
                                type="file"
                                name="avatar"
                                accept='image/*'
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>
                        <div style={{
                            width: '100%',
                            overflow: 'auto',
                            margin: '0 auto',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3,1fr)',
                            gap: '0.5rem',
                        }}>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" style={{
                                    width: '4rem', height: '4rem', borderRadius: '5px', objectFit: 'cover', margin: '0 auto'
                                }} />
                            ))}
                        </div>

                        <Button
                            style={{
                                width: '150px',
                                height: '3rem',
                                backgroundColor: '#00C37A',
                                color: "#FFF",
                                fontSize: '1.1rem',
                                fontWeight: "bold",
                                fontFamily: 'Poppins,sans-serif',
                            }}
                            disabled={loading ? true : false}
                            onClick={CreateProductHandler}
                        >
                            Create
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        fontFamily: 'Poppins,sans-serif',
                        color: '#181818',
                        fontSize: '1rem',
                        fontWeight: 600,
                    }} onClick={ModelToggle} >Cancel</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default AdminProductList
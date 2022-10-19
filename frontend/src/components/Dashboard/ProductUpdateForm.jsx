import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, updateProduct, getProductDetails } from '../../redux/ProductRed/Action';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from '@material-ui/core';
import { UPDATE_PRODUCT_RESET } from '../../redux/ProductRed/Actiontypes';

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
        overflow: auto;
        &::-webkit-scrollbar{
            width: 5px;
        }
        
        .prodUpdateForm{
            width: 70%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            & > h2{
                text-align: center;
                font-size: 1.5rem;
                font-family: 'Poppins',sans-serif;
                font-weight: 500;
            }

            .productform{
                width: 90%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 0.6rem;

                & > div{
                    width: 70%;
                    height: 3rem;
                    border: 1px solid #FFF;
                    border-radius: 5px;
                    align-self: center;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #FFF;
                    padding: 0.5rem 1rem;

                    input,textarea,select{
                        width: 85%;
                        height: 100%;
                        font-size: 1rem;
                        font-family: 'Poppins',sans-serif;
                        color:#181818;
                        background-color: transparent;
                        border: none;
                        outline: none;
                    }
                    input::file-selector-button{
                        cursor: pointer;
                        width: 100%;
                        height: 100%;
                        border: none;
                        margin: 0%;
                        font: 400 1rem 'Poppins',sans-serif;
                        transition: all 0.5s;
                        padding: 0 1rem;
                        color: rgba(0, 0, 0, 0.623);
                        background-color: rgb(255, 255, 255);
                    }
                    svg{
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                }
                .imgdiv{
                    height: fit-content;
                    display: grid;
                    grid-template-columns: repeat(3,1fr);
                    gap: 0.5rem;

                    img{
                        width: 2.5rem;
                        height: 2.5rem;
                        object-fit: cover;
                        margin: 0 auto;
                        border-radius: 5px;
                    }
                }
                & > button{
                    width: 50%;
                    height: 3.5rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    font-family: 'Poppins',sans-serif;
                    background-color: #00C37A;
                    color: #FFF;
                    margin: 0 auto;
                    border-radius: 8px;
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
        .dashboard-container{
            .prodUpdateForm{
                width: 90%;

                .productform{
                    width: 100%;

                    & > div{
                        width: 90%;
                    }
                }
            }
        }
        
    }
    @media (min-width: 650px) and (max-width: 767px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        .dashboard-container{
            .prodUpdateForm{
                width: 90%;

                .productform{
                    width: 100%;

                    & > div{
                        width: 100%;
                    }
                }
            }
        }
        
    }
    @media (max-width: 649px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        .dashboard-container{
            padding: 1rem;
            .prodUpdateForm{
                width: 90%;

                .productform{
                    width: 100%;

                    & > div{
                        width: 100%;
                    }
                }
            }
        }
    }
`

function AdminProductUpdateForm({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, isUpdated } = useSelector((state) => state.product);
    const { error: prodDetailError, product } = useSelector(state => state.productDetails);

    // Create Product States
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [oldImages, setOldImages] = useState([]);
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
        setOldImages([]);

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


    const UpdateProductHandler = () => {

        const data = {
            name: name,
            price: price,
            description: description,
            category: category,
            stock: Stock,
            images: images,
        }
        dispatch(updateProduct(data, id));
    }

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setCategory(product.category);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setOldImages(product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (prodDetailError) {
            alert.error(prodDetailError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            navigate('/admin/products')
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, isUpdated, id, product, prodDetailError]);

    return (
        <>
            <DashBoardStyles>
                <SideBar user={user} />
                <div className="dashboard-container">
                    <div className="prodUpdateForm">
                        <h2>Update Product Details</h2>

                        <div className="productform">
                            <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <AttachMoneyIcon />
                                <input
                                    type="text"
                                    placeholder="Product Price"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div >
                                <DescriptionIcon />
                                <textarea
                                    type="text"
                                    placeholder="Product Description"
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="20"
                                    rows="1"
                                />
                            </div>
                            <div>
                                <AccountTreeIcon />
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div>
                                <StorageIcon />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    value={Stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept='image/*'
                                    onChange={createProductImagesChange}
                                    multiple
                                />
                            </div>
                            {oldImages?.length > 0 && <div className="imgdiv">
                                {oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Product Preview" />
                                ))}
                            </div>}
                            <div className="imgdiv">
                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>

                            <Button
                                onClick={UpdateProductHandler}
                                disabled={loading ? true : false}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </DashBoardStyles>
        </>
    )
}

export default AdminProductUpdateForm
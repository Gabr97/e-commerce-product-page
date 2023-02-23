import React from "react";
import { useEffect, useRef, useState } from "react"
import { cartRef } from "./TopNavbar";
import axios from 'axios'
import { currencyFormat } from "@/pages";

export let cartProducts: any = [];

let cartFinalValue: any;
export let totalRef: any

let template: any = ''

const handleFinalValue = async () => {

    let purchaseTotal: Number = 0;
    let data = await cartProducts
    data.map((cart: any) => {
        purchaseTotal += cart.attributes.total
    })
    cartFinalValue = purchaseTotal

    template = (total: any) => {
        return <small className='text-gray-400'>Total: {currencyFormat(total)}</small>
    }
}

export const cartUpdate = async () => {

    try {
        let response = await axios.get("http://127.0.0.1:1337/api/carts?populate=*")
        cartProducts = response.data.data
        cartRef.current.innerHTML = cartProducts.length

        if (response.status == 200) {
            handleFinalValue()
        }


    }
    catch (err) {
        console.log(err)
    }
    return cartProducts;
}

export let sideCart: any

export default function SideCart() {

    const [cartData, setCartData] = useState([])

    sideCart = useRef(null)
    totalRef = useRef(null)

    const closeCart = () => {
        sideCart.current.classList.add('hidden')
    }

    const loadCart = async () => {
        setCartData(await cartUpdate())
    }

    const handleCartOpenChange = async () => {
        setCartData(await cartUpdate())
        handleFinalValue()
    };

    const removeFromCart = async (id: any) => {
        try {
            let response = await axios.delete(`http://127.0.0.1:1337/api/carts/${id}`)
            if (response.status == 200) {
                loadCart()
            }

        } catch (error) {
            console.log(error)
        }
    }



    const handlePurchase = async () => {
        try {
            let data: any = [];
            let purchaseData: any = []
            cartData.map((cart: any) => {
                data.push({ 'product': cart.attributes.product, 'quantity': cart.attributes.quantity })
                console.log(purchaseData)
            })
            purchaseData = { purchase: data,  customer: {} }
            const response = await axios.post('http://127.0.0.1:1337/api/orders', { "data": purchaseData })
            console.log(response.status)

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        loadCart()

        cartRef.current ? cartRef.current.innerHTML = cartProducts.length : ''

        const observer = new MutationObserver(handleCartOpenChange);
        observer.observe(sideCart.current, { attributes: true, attributeFilter: ['cart-open'] });

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <>
            <div ref={sideCart} cart-open={"false"} className="transition-all duration-200 hidden side-cart-parent h-[100%]">
                <div className="side-cart fixed top-0 w-[80vw] md:w-[30vw] h-full shadow bg-slate-50 right-0  overflow-auto">
                    <div className="pl-5">
                        <div className="p-5">
                            <div className="flex items-center py-3 justify-between">
                                <div className="mb-3">
                                    <b>Cart</b>
                                </div>
                                <button onClick={() => closeCart()} className=" text-[15px] rounded-full text-gray-100 font-bold bg-slate-400 w-[40px] py-2 px-4">
                                    <span className="">
                                        x
                                    </span>
                                </button>
                            </div>
                            <hr />
                            {cartData.length ?
                                <div className="h-full">
                                    <h1 className="py-4">Product(s):</h1>
                                    <div className="h-full bg-slate-50 py-1 relative">
                                        <div className="h-full">
                                            {cartData.map((product: any) => {
                                                return (<div className='px-2 shadow my-3 rounded  bg-slate-100 ' key={product.id}>
                                                    <div className="flex flex-col rounded py-3 justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-[100px]">
                                                                <img src={`http://127.0.0.1:1337${product.attributes.product.product_thumb}`} className='border-2 border-solid border-slate-400 rounded-lg shadow-md object-contain' />
                                                            </div>
                                                            <div className="w-full pl-4 flex flex-col">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        <b className="pr-1">
                                                                            {product.attributes.product.product_name}
                                                                        </b>
                                                                        <div className="px-3 bg-slate-50 rounded-md">
                                                                            <small className="text-gray-400">
                                                                                x{product.attributes.quantity}
                                                                            </small>
                                                                        </div>
                                                                    </div>
                                                                    <button onClick={() => removeFromCart(product.id)} className="px-1">
                                                                        <img src="/icon-delete.svg" />
                                                                    </button>
                                                                </div>
                                                                <span className="text-gray-400">{currencyFormat(product.attributes.total)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)
                                            })}
                                            <div>
                                                <div className="py-2">
                                                    {template(cartFinalValue)}
                                                    {/* <small ref={totalRef} className='text-gray-400'></small> */}
                                                </div>
                                                <button onClick={() => handlePurchase()} className='text-zinc-50 bg-lime-500 w-full rounded p-2'>Purchase</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="flex items-center justify-center h-screen">
                                    <h2 className="text-2xl font-bold">{`No products yet :(`}</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
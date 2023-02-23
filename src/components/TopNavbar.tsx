import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { sideCart } from "./SideCart";

export let cartRef: any;
export let mobileMenu: any

export default function TopNavbar() {

    cartRef = useRef(null)
    mobileMenu = useRef(null)

    const openCart = () => {
        sideCart.current.classList.remove('hidden')
    }

    return (
        <>
            <nav className="py-10 px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="pr-20 flex items-center">
                                <div ref={mobileMenu} className="pr-5 hidden">
                                    <img src="./icon-menu.svg" />
                                </div>
                                <img src="/logo.svg" />
                            </div>
                            <ul className="hidden md:flex items-center text-gray-400">
                                <li className="px-5 relative">
                                    <Link className='' href={'/'}>Collections</Link>
                                </li>
                                <li className="px-5 relative">
                                    <Link href={'/'}>Men</Link>
                                </li>
                                <li className="px-5 relative">
                                    <Link href={'/'}>Women</Link>
                                </li>
                                <li className="px-5 relative">
                                    <Link href={'/'}>About</Link>
                                </li>
                                <li className="px-5 relative">
                                    <Link href={'/'}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex relative">
                            <button onClick={() => openCart()}>
                                <img src="/icon-cart.svg" />
                            </button>
                            <div className="relative">
                                <small ref={cartRef} className='text-rose-400 absolute bg-zinc-100 px-1 font-semibold lg:flex justify-center items-center rounded-full -top-[10px] '>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10">
                        <hr />
                    </div>
                </div>
            </nav>
        </>
    )
}
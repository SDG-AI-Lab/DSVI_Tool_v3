// This file actually DOES something. Deleteing will break the tool: tested: 01.08.22 by Martin Szigeti
// It loads and instructs the styles of the logos

import { useContext } from "react";
import Image from "next/image";
import { FilterContext } from '../context/FilterContext';
import circular_logo from '/public/images/SDG AI Lab black logo_transparent.png'
import undp_logo from '/public/images/UNDP_Logo.png'
import sdglogo from '/public/images/logo512.png'
import Navbar from '../components/Navbar';

const TopBar = () => {
    const { state } = useContext(FilterContext);
    const show_sidebar = state["show_sidebar"];
    return (
        <header className="bg-white text-gray-800 body-font">
            <nav>
                <ul className="h-36 flex justify-between px-3">
                    <li className="flex items-center">
                        <a className="flex items-center">
                            <Image
                                src={sdglogo}
                                alt="SDG LOGO"
                                width="100px"
                                height="100px"
                                layout="intrinsic"
                                className="rounded-full"
                            />
                        </a>
                        <a className="text-center flex pl-3 text-align: center">
                            <p className="text-2xl font-bold">
                                DSVI Tajikistan Tool
                            </p>
                        </a>
                    </li>
                    <li className="flex items-end">
                        <Navbar/>
                    </li>
                    <li className="flex items-center justify-end">
                        <a className="flex items-center">
                            <Image
                                src={circular_logo}
                                alt="circular"
                                width="120px"
                                height="120px"
                                layout="intrinsic"
                                
                            />
                        </a>
                        <a className="flex items-center pl-5">
                            <Image
                                src={undp_logo}
                                alt="undp logo"
                                width="80px"
                                height="120px"
                                layout="intrinsic"
                                
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default TopBar;
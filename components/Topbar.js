import { useContext } from "react";
import Image from "next/image";
import { FilterContext } from '../context/FilterContext';
import circular_logo from '/public/images/logo512.png'
import undp_logo from '/public/images/UNDP_Logo.png'
import sdglogo from '/public/images/sdglogodark.jpg'
import Navbar from '../components/Navbar';

const TopBar = () => {
    const { state } = useContext(FilterContext);
    const show_sidebar = state["show_sidebar"];
    return (
        <header className="bg-white text-gray-600 body-font ">
            <nav>
                <ul className="flex justify-between px-5">
                    <li className="flex items-center w-52">
                        <a className="flex items-center">
                            <Image
                                src={sdglogo}
                                alt="SDG LOGO"
                                width="70px"
                                height="70px"
                                layout="intrinsic"
                                className="rounded-full"
                            />
                        </a>
                        <a className="flex items-center pl-2">
                            <p className="text-sm w-28 text-blue-600">
                                DSVI Tajikistan Development Tool
                            </p>
                        </a>
                    </li>
                    <li className="flex items-end">
                        <Navbar/>
                    </li>
                    <li className="flex items-center w-52 justify-end">
                        <a className="flex items-center">
                            <Image
                                src={circular_logo}
                                alt="circular"
                                width="70px"
                                height="70px"
                                layout="intrinsic"
                                className="w-50 h-20"
                            />
                        </a>
                        <a className="flex items-center pl-5">
                            <Image
                                src={undp_logo}
                                alt="undp logo"
                                width="60px"
                                height="90px"
                                layout="intrinsic"
                                className="h-20"
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default TopBar;
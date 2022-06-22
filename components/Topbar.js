import { useContext } from "react";
import Image from "next/image";
import { FilterContext } from '../context/FilterContext';
import circular_logo from '/public/images/logo512.png'
import undp_logo from '/public/images/UNDP_Logo.png'
const TopBar = () => {
    const { state } = useContext(FilterContext);
    return (
        <header className="bg-white text-gray-600 body-font ">
            <div className="container ml-auto mx-auto flex flex-wrap px-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl">DSVI Tajikistan Development Tool</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image
                            src={circular_logo}
                            alt="circular"
                            width="70px"
                            height="70px"
                            layout="intrinsic"
                            className="w-50 h-20"
                        />
                    </a>
                </nav>
                <a className="inline-flex items-center  border-0 py-1 px-3   rounded text-base mt-4 md:mt-0">

                    <Image
                        src={undp_logo}
                        alt="undp logo"
                        width="60px"
                        height="90px"
                        layout="intrinsic"
                        className=" h-20"
                    />
                </a>
            </div>
        </header>
    )
}
export default TopBar;
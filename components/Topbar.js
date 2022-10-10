import Image from "next/image";
import circular_logo from '../public/images/logo-sdg-ai-lab-black-alpha.png'
import undp_logo from '../public/images/logo-undp-alpha.png'
import sdglogo from '../public/images/logo-sdg-alpha.png'
import Navbar from '../components/Navbar';

const TopBar = () => {
    return (<header className="bg-white text-gray-800 body-font">
            <nav>
                <ul className="h-35 flex justify-between px-3">
                    <li className="flex items-center">
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
                                width="100px"
                                height="100px"
                                layout="intrinsic"
                            />
                        </a>
                        <a className="flex items-center pl-5">
                            <Image
                                src={undp_logo}
                                alt="undp logo"
                                width="60px"
                                height="90px"
                                layout="intrinsic"
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>)
}

export default TopBar;

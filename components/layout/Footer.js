import Image from "next/image";

const Footer = () => {

    return (<>
            <footer className="bg-white text-gray-600 body-font">
                <ul className="flex items-center px-5">
                    <li key="1">
                        <a className="flex title-font font-medium items-center text-gray-900 w-44">
                            <Image
                                src="/images/whitesquare.png"
                                alt=""
                                width="40px"
                                height="40px"
                                layout="intrinsic"
                                className=""
                            />
                            <p className="text-[12px] w-13 text-blue-600 pl-2">
                                
                            </p>
                        </a>
                    </li>
                    <li className="text-sm text-gray-500 flex justify-self-center m-auto" key="2">
                        <a href="https://sdgailab.org/" className="text-gray-600 items-center m-auto"
                           rel="noopener noreferrer" target="_blank">© 2022 — @SDG AI LAB</a>
                        <a className="ml-3 text-gray-500" href="https://twitter.com/sdgailab">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                 className="w-5 h-5 drop-shadow-lg hover:drop-shadow-2xl hover:w-8 hover:h-8 hover:text-blue-400"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500" href="https://sdgailab.org/">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5"
                                 className="w-5 h-5 drop-shadow-lg hover:drop-shadow-2xl hover:w-8 hover:h-8 hover:text-purple-800"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M3.51211712,15 L8.17190229,15 C8.05949197,14.0523506 8,13.0444554 8,12 C8,10.9555446 8.05949197,9.94764942 8.17190229,9 L3.51211712,9 C3.18046266,9.93833678 3,10.9480937 3,12 C3,13.0519063 3.18046266,14.0616632 3.51211712,15 L3.51211712,15 Z M3.93551965,16 C5.12590433,18.3953444 7.35207678,20.1851177 10.0280093,20.783292 C9.24889451,19.7227751 8.65216136,18.0371362 8.31375067,16 L3.93551965,16 L3.93551965,16 Z M20.4878829,15 C20.8195373,14.0616632 21,13.0519063 21,12 C21,10.9480937 20.8195373,9.93833678 20.4878829,9 L15.8280977,9 C15.940508,9.94764942 16,10.9555446 16,12 C16,13.0444554 15.940508,14.0523506 15.8280977,15 L20.4878829,15 L20.4878829,15 Z M20.0644804,16 L15.6862493,16 C15.3478386,18.0371362 14.7511055,19.7227751 13.9719907,20.783292 C16.6479232,20.1851177 18.8740957,18.3953444 20.0644804,16 L20.0644804,16 Z M9.18440269,15 L14.8155973,15 C14.9340177,14.0623882 15,13.0528256 15,12 C15,10.9471744 14.9340177,9.93761183 14.8155973,9 L9.18440269,9 C9.06598229,9.93761183 9,10.9471744 9,12 C9,13.0528256 9.06598229,14.0623882 9.18440269,15 L9.18440269,15 Z M9.3349823,16 C9.85717082,18.9678295 10.9180729,21 12,21 C13.0819271,21 14.1428292,18.9678295 14.6650177,16 L9.3349823,16 L9.3349823,16 Z M3.93551965,8 L8.31375067,8 C8.65216136,5.96286383 9.24889451,4.27722486 10.0280093,3.21670804 C7.35207678,3.81488234 5.12590433,5.60465556 3.93551965,8 L3.93551965,8 Z M20.0644804,8 C18.8740957,5.60465556 16.6479232,3.81488234 13.9719907,3.21670804 C14.7511055,4.27722486 15.3478386,5.96286383 15.6862493,8 L20.0644804,8 L20.0644804,8 Z M9.3349823,8 L14.6650177,8 C14.1428292,5.03217048 13.0819271,3 12,3 C10.9180729,3 9.85717082,5.03217048 9.3349823,8 L9.3349823,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z"/>
                            </svg>
                        </a>
                    </li>
                    {/* <li key="3">
                        <a className="flex items-center w-44 justify-end">
                            <Image
                                src="/images/logo-undp-alpha.png"
                                alt="undp logo"
                                width="40px"
                                height="60px"
                                layout="intrinsic"
                                className=""
                            />
                        </a>
                    </li> */}
                </ul>
            </footer>
        </>);
}
export default Footer;

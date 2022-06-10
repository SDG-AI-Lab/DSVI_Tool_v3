import { useState } from "react";
import { Modal } from 'react-responsive-modal';
const SidebarExternalMenu = () => {
    const [menu, setMenu] = useState([
        {
            id: 1,
            "title": "filter",
            "description": "filter",
            "icon": "fas fa-filter"
        },
        {
            id: 2,
            "title": "information",
            "description": "information",
            "icon": "fas fa-info"
        },

    ]);

    const [selectedMenu, setSelectedMenu] = useState(1);

    const [Modal, setModal] = useState(false);

    const onOpenModal = () => setModal(true);
    const onCloseModal = () => setModal(false);

    return (
        <>
            {
                menu && menu.map((val, index) => {
                    return (
                        <div
                        key={index}
                            className={selectedMenu == val.id ? "h-10 w-10 bg-white  flex justify-center self-center items-center border-r-2 border-orange-500"
                                :
                                "h-10 w-10 bg-orange-500  flex justify-center self-center items-center hover:bg-orange-700 hover:border-r-2 hover:border-white"
                            }
                            onClick={() => {
                                setSelectedMenu(val.id)
                            }}
                        >
                            <i


                                className={selectedMenu == val.id ? `text-orange-500 ${val.icon}` : `text-white ${val.icon}`}></i>
                        </div>



                    )
                })
            }


          

        </>
    );



}
export default SidebarExternalMenu;
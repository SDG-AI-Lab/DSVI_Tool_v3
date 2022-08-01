import { useState } from "react";
import { Modal } from 'react-responsive-modal';
const SidebarModal = (props) => {

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

            <Modal open={dsvModal}
                onClose={
                    () => {
                        setSelectedDataColumn(0);
                        onCloseDsvModal()
                    }
                }

                center>
                <div></div>
                <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-2 overflow-y-auto">

                    <div>
                        <h2 className="text-gray-800 text-2xl font-semibold mb-3">Select Columns</h2>

                        <hr />

                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

                            onClick={() => {

                                onCloseDsvModal()

                            }}


                        >Apply</button>

                    </div>
                </div>
            </Modal>

        </>
    );

}
export default SidebarModal;
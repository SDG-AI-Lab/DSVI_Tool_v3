import react, {useContext, useEffect} from 'react'

const ToolBarButton = () => {

    return <>
        <div>
            <button></button>
        </div>
    </>
}

const MapToolbar = () => {

    // console.log("kkkk");

    return <>
        <div className="d-flex toolbar-container toolbar">
            <ToolBarButton />
        </div>
    </>
}

export default MapToolbar
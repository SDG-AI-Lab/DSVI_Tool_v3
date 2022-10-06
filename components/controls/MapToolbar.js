import react, {useContext, useEffect} from 'react'

const ToolBarButton = () => {

    return <>
        <div>
            <button></button>
        </div>
    </>
}

const MapToolbar = () => {

    return <>
        <div className="d-flex toolbar-container toolbar">
            <ToolBarButton />
        </div>
    </>
}

export default MapToolbar
import Modal from 'react-bootstrap/Modal';

export default function CancelModal(props) {
    // { console.log(props.cancelid) }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: '#5861AE', borderRadius: "0", height: "60px" }}>
                <h4 style={{ color: "white" }}>
                    Alert
                </h4>
            </Modal.Header>
            <Modal.Body style={{ borderRadius: "0", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", padding: "30px 50px" }}>
                    <div style={{ marginRight: "-50px" }}>
                        <img src={require("../Assets/alert.png")} alt="alert" style={{}} />
                    </div>
                    <div style={{ textAlign: "center", width: "250px", marginLeft: "50px" }}>
                        Are You Sure You Want To Cancel Order <span   style={{ color: '#5861AE', fontWeight: "bold" }}>No : ORID000{props.cancelid && props.cancelid[1]}</span>
                </div>
            </div>
            <button className='btn' onClick={() => {
                props.handleCancel(props.cancelid && props?.cancelid[0])
                props.setmodalShow(false)
            }} style={{
                margin: "0 auto",
                backgroundColor: '#5861AE', color: "white"
            }}>Cancel</button>
        </Modal.Body>
        </Modal >
    );
}


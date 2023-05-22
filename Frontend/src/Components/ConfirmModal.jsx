import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import "../Styles/Confirm.css"
export default function ConfirmModal(props) {
    const navigate = useNavigate()
    const handleClose = () => {
        navigate("/home")
    }
    return (
        <Modal
            size="md"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='confirm-modal'>
                    <div className='confirm-modal-body'>
                        <div style={{ borderRadius: "50%", backgroundColor: "#5861AE60", padding: "10px" }}>
                            <img src={require("../Assets/Tick.png")} alt="" />
                        </div>
                        <p>Your Order is Successful</p>
                        <small>You can track the delivery in the "Orders" section.</small>
                        <button style={{border:"0"}} onClick={() => { handleClose() }}>Go to Orders</button>
                    </div>
                </div>
            </Modal.Body>


        </Modal>
    );
}
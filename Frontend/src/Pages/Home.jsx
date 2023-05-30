import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidenav from '../Components/Sidenav'
import '../Styles/Home.css'
import ToastContext from "../Context/ToastContext";
import Tracking from '../Components/Tracking'
import CancelModal from '../Components/CancelModal'
import AuthContext from '../Context/AuthContext'
import search from "../Assets/search.png"
import view from "../Assets/view.png"
function Home() {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  const [modalShow, setmodalShow] = useState(false)

  const [filtered, setFiltered] = useState([])

  const [cancelid, setCancelid] = useState()


  const [orderDetails, setOrderDetails] = useState([])
  const [idx, setIdx] = useState()

  const handleSearch = (index) => {

    if (index === "") return setFiltered([])
    if (orders[index] === undefined) {
      setFiltered([])
      return toast.error(`No Orders With ORID000${index}`)
    }
    setIdx(index)
    setFiltered([orders[index]])
  }
  let Gtotal = 0
  let Total_items = 0

  const { toast } = useContext(ToastContext)

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true })
    }
    getOrders()
  }, [])


  const getOrders = async () => {
    try {
      const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
      const res = await axios.post("http://localhost:5000/orders/get-Orders", null, { headers })

      setOrders(res.data)
    } catch (error) {
      //console.log(error);
    }
  }


  const handleCancel = async (id) => {
    setCancelid([id, idx])
    if (orders[cancelid[1]].status === "Cancelled") {
      return toast.error(`ORDID000${cancelid[1]} is already cancelled`)
    }
    try {
      const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
      const res = await axios.put(`http://localhost:5000/orders/cancel/${id}`, null, { headers })
      getOrders()
      setCancelid()
      setFiltered([])
      toast.success(res.data)
    } catch (error) {
      //console.log(error);
    }
  }

  const handleModal = (index) => {
    //console.log(index);
    //console.log(orders[index]._id);
    setCancelid([orders[index]._id, index])
    setOrderDetails(orders[index].orderDetails)
    //console.log(orderDetails);
  }

  return (
    <>
      <div style={{ display: "flex", height: "100vh", justifyContent: "space-between", flexWrap: "wrap", position: "relative" }}>

        <Sidenav />

        <div id='header'>
          <div >
            Orders | {orders.length}
          </div>
          <div>
            <button id='button-create' onClick={() => { navigate("/createOrder") }}>Create</button>
          </div>
          <div>
            <img src={search} alt="search" />
            <input type="number" title="Enter the number after ORDID000"
             placeholder='ORDID000' onChange={(e) => { handleSearch(e.target.value) }} className='search' />
          </div>
        </div>

        {orders.length ?
          <div className='my-orders'>
            <div style={{ position: "sticky", top: 0, zIndex: "5" }}>
              <div className='order-headings' style={{ position: "relative" }}>
                <div>
                  Order id
                </div>
                <div style={{ left: "10.5vw" }}>
                  Order Date & Time
                </div>
                <div style={{ left: "24vw" }}>
                  Store Location
                </div>
                <div style={{ left: "36vw" }}>
                  City
                </div>
                <div style={{ left: "45vw" }}>
                  Store Phone
                </div>
                <div style={{ left: "54.5vw" }}>
                  Total Items
                </div>
                <div style={{ left: "62vw" }}>
                  Price
                </div>
                <div style={{ left: "70vw" }}>
                  Status
                </div>
                <div style={{ left: "88vw" }}>
                  View
                </div>
              </div>
            </div>



            {filtered.length ? filtered.map((order, key) => {
              return (
                <div className='order-info' key={key}>
                  <div style={{ fontWeight: "bold" }}>
                    ORID000{idx}
                  </div>
                  <div style={{ left: "10.5vw" }}>
                    {order.date_time}
                  </div>
                  <div style={{ left: "24vw", width: "100px", textAlign: "center" }} >
                    {order.store}
                  </div>
                  <div style={{ left: "34vw", width: "100px", textAlign: "center" }}>
                    {order.city}
                  </div>
                  <div style={{ left: "44.5vw" }}>
                    {order.phone}
                  </div>
                  <div style={{ left: "54.5vw", width: "50px", textAlign: "end" }}>
                    {order.total_items}
                  </div>
                  <div style={{ color: "#5861AE", fontWeight: "bold", left: "60vw", width: "100px", textAlign: "center" }}>
                    {order.price} Rs
                  </div>
                  <div style={order.status === "Cancelled" ? { color: "red", left: "69.5vw",fontWeight:"bold" } : { left: "69.5vw" }}>
                    {order.status}
                  </div>
                  {order.status === "Ready to Pickup" ? <div onClick={() => { handleCancel(order._id, key) }} style={{ cursor: "pointer", fontWeight: "bold", color: "red", left: "80vw" }} >
                    <button style={{ border: "0", color: "red", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => {
                      setmodalShow(true)
                      setCancelid([order._id, key])
                    }}>
                      Cancel Order
                    </button>
                  </div> : <></>}
                  <div style={{ left: "88.5vw" }}>
                    <img onClick={() => { handleModal(idx) }} style={{ width: "20px" }} src={view} alt="view" data-bs-toggle="modal" data-bs-target="#SummaryModal" />
                  </div>
                </div>
              )
            }) : orders.map((order, key) => {

              return (
                <div className='order-info' key={key}>
                  <div style={{ fontWeight: "bold" }}>
                    ORID000{key}
                  </div>
                  <div style={{ left: "10.5vw" }}>
                    {order.date_time}
                  </div>
                  <div style={{ left: "24vw", width: "100px", textAlign: "center" }} >
                    {order.store}
                  </div>
                  <div style={{ left: "34vw", width: "100px", textAlign: "center" }}>
                    {order.city}
                  </div>
                  <div style={{ left: "44.5vw" }}>
                    {order.phone}
                  </div>
                  <div style={{ left: "54.5vw", width: "50px", textAlign: "end" }}>
                    {order.total_items}
                  </div>
                  <div style={{ color: "#5861AE", fontWeight: "bold", left: "60vw", width: "100px", textAlign: "center" }}>
                    {order.price} Rs
                  </div>
                  <div style={order.status === "Cancelled" ? { color: "red", left: "69.5vw", fontWeight: "bold" } : { left: "69.5vw" }}>
                    {order.status}
                  </div>
                  {order.status === "Ready to Pickup" ? <div style={{ cursor: "pointer", color: "red", left: "80vw" }} >
                    <button style={{ border: "0", color: "red", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => {
                      setmodalShow(true)
                      setCancelid([order._id, key])
                    }}>
                      Cancel Order
                    </button>
                  </div> : <></>}
                  <div style={{ left: "88.5vw" }}>
                    <img onClick={() => { handleModal(key) }}
                      style={{ width: "20px" }} src={view}
                      alt="view" data-bs-toggle="modal" data-bs-target="#SummaryModal" />
                  </div>
                </div>
              )

            })}
          </div>


          : <div id='Main-Create'>
            <div className='Create-Btn'>
              <h6>No Orders Avaiable</h6>
              <Link to='/Createorder'>
                <button id='button'>Create</button>
              </Link>
            </div>
          </div>
        }

      </div >
      <div className='modal fade come-from-modal right modal-xl' id='SummaryModal' tabIndex={-1} role="dialog" aria-labelledby='Summary'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div style={{ backgroundColor: " #5861AE", color: "white" }} className="modal-header">
              <h4 className='modal-title' id='SummaryModal'>Summary</h4>
              <button style={{ border: "0", backgroundColor: "transparent", color: "white", fontSize: "30px" }} data-bs-toggle="modal"
                data-bs-target="#SummaryModal" className='close' data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">

              <div className='store-info'>

                <div>
                  <span
                    style={{ position: "relative", top: "10px", border: "none", borderBottom: "1px solid gray", marginRight: "50px", backgroundColor: "#E0E0E0" }} >
                    {orders[0]?.store}
                  </span>
                  <span style={{ marginRight: "50px" }}>Store Address:</span>
                  <span style={{ marginRight: "50px" }}>Phone:</span>
                </div>

                <div className='store-info2'>
                  <div style={{ position: "absolute", left: "130px" }}>Laundry,{orders[0]?.store}</div>
                  <div>0000000000</div>
                </div>

              </div>

              <Tracking />

              <div className='order-details'>
                <h4>
                  Order Details
                </h4>

                {orderDetails.length && orderDetails.map((order) => {
                  { Gtotal += order.total }
                  { Total_items += Number(order.quantity) }
                  // { //console.log(order); }
                  return (
                    <div>
                      {order.total > 0 &&
                        <div className='order'>

                          <div className='product'>
                            {order.ProductType}
                          </div>

                          <div className='services-selected'>
                            {order.wash ? <i>washing,</i> : ""}
                            {order.press ? <i>ironing,</i> : ""}
                            {order.fold ? <i>packing,</i> : ""}
                            {order.pack ? <i>chemical-wash</i> : ""}
                          </div>

                          <div className='total-breakdown'>
                            {order.quantity}
                            {" X "}
                            {order.wash ? <i>20+</i> : ""}
                            {order.press ? <i>15+</i> : ""}
                            {order.fold ? <i>10+</i> : ""}
                            {order.pack ? <i>25</i> : ""} =
                          </div>
                          <div style={{ fontSize: "20px", color: "#5861AE", fontWeight: "bold" }}>
                            {order.total}
                          </div>
                        </div>
                      }
                    </div>
                  )
                })}

                <div className='total-footer'>
                  <div className='sub-total' >
                    <span style={{ marginRight: "170px" }}>
                      Subtotal:
                    </span>
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      {Gtotal}
                    </span>
                  </div>
                  <div className='pickup-charge' style={{ borderTop: "1px solid black" }}>
                    <span style={{ marginRight: "150px" }}>
                      Pickup Charge:
                    </span>
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      100
                    </span>
                  </div>
                  <div className='G-total'>
                    <span style={{ marginRight: "170px" }}>
                      Total:
                    </span>
                    <span>
                      {Gtotal + 100}
                    </span>
                  </div>
                </div>

              </div>


              <div className='address'>
                <h4>Address</h4>
                <div className='tabs'>
                  <div>
                    Assam,India
                  </div>
                  <div>
                    Vegas,USA
                  </div>
                  <span style={{ fontWeight: "bold", color: "#5861AE" }}>
                    ADD NEW</span>
                </div>
              </div>


            </div>
            <div className="modal-footer">

              <button data-bs-toggle="modal"
                data-bs-target="#SummaryModal" onClick={() => {
                  setmodalShow(true)
                  // handleCancel(cancelid)
                }}
                className='close btn btn-danger' data-dismiss="modal">Cancel</button>

            </div>
          </div>
        </div>
      </div>
      <>

        <CancelModal
          show={modalShow}
          setmodalShow={setmodalShow}
          handleCancel={handleCancel}
          cancelid={cancelid}
          onHide={() => setmodalShow(false)}
        />
      </>
    </>


  )
}

export default Home;
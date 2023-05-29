import React, { useContext, useState, useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import '../Styles/CreateOrder.css'
import ToastContext from "../Context/ToastContext"
import AuthContext from "../Context/AuthContext"
import ConfirmModal from '../Components/ConfirmModal'
import axios from 'axios'
import Tracking from '../Components/Tracking'
import { useNavigate } from 'react-router-dom'

function CreateOrder() {

  const { toast } = useContext(ToastContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true })
    }
  }, [])

  const [newOrder, setNewOrder] = useState({
    store: user?.district,
    price: 0,
    date_time: "",
    total_items: 0,
    status: "Ready to Pickup",
    city: user?.district,
    phone: "+91 99 88 66 77 55"
  })

  const saveOrder = async (total, quantity) => {
    setModalShow(true)
    setNewOrder({ ...newOrder, price: total })
    setNewOrder({ ...newOrder, total_items: quantity })
    setNewOrder({ ...newOrder, date_time: new Date().toLocaleDateString })
    // setNewOrder({ ...newOrder, city: new })

    console.log(newOrder);
    try {
      const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
      const res = await axios.post("http://localhost:5000/orders/create", [newOrder, orderDetails], { headers })
      //console.log(res);
    } catch (error) {
      //console.log(error);
    }
  }

  const checkInput = () => {
    if (!newOrder.store) {
      return toast.error("Please Enter The Store Name")
    }
    if (!Gtotal) {
      return toast.error("Please Enter Quantity & Select Services To Continue")
    }
  }

  let Gtotal = 0
  let Total_items = 0

  const [modalShow, setModalShow] = useState(false);


  const [orderDetails, setOrderDetails] = useState([
    {
      ProductType: "Shirt",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    },
    {
      ProductType: "T-Shirts",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    },
    {
      ProductType: "Trousers",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    },
    {
      ProductType: "Jeans",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    },
    {
      ProductType: "Boxers",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    },
    {
      ProductType: "Joggers",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    },
    {
      ProductType: "Others",
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    }
  ])

  const handleCancelReset = () => {
    setOrderDetails([
      {
        ProductType: "Shirt",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      },
      {
        ProductType: "T-Shirts",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      },
      {
        ProductType: "Trousers",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      },
      {
        ProductType: "Jeans",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      },
      {
        ProductType: "Boxers",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      },
      {
        ProductType: "Joggers",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      },
      {
        ProductType: "Others",
        quantity: "",
        wash: false,
        press: false,
        fold: false,
        pack: false,
        total: 0
      }
    ])
    toast.success("Order Cancelled")

  }

  const handleInput = (e, index) => {
    const numberRegex = new RegExp(/^[0-9]*$/)
    if (!e.target.value.match(numberRegex)) {
      return toast.error("Only Numbers")
    }
    if (e.target.value < 0) {
      return toast.error("Negative Quantity Not Allowed")
    }
    const updatedOrders = [...orderDetails]
    updatedOrders[index].quantity = Number(e.target.value)
    //console.log(updatedOrders);
    updatedOrders[index].total = 0
    if (updatedOrders[index].wash) {
      //console.log("wash");
      updatedOrders[index].total += updatedOrders[index].quantity * 20
    }
    if (updatedOrders[index].press) {
      //console.log("press");
      updatedOrders[index].total += updatedOrders[index].quantity * 15
    }
    if (updatedOrders[index].fold) {
      //console.log("fold");
      updatedOrders[index].total += updatedOrders[index].quantity * 10
    }
    if (updatedOrders[index].pack) {
      //console.log("pack");
      updatedOrders[index].total += updatedOrders[index].quantity * 25
    }
    setOrderDetails(updatedOrders)
  }
  
  
  const quantityUpdated = ()=>{
    toast.success("quantity updated")
  }



  const toggleServices = (index, service) => {
    const updatedServices = [...orderDetails]
    let status;


    //console.log(index, service);

    if (service === 0) {
      status = updatedServices[index].wash
      updatedServices[index].wash = !status

      if (updatedServices[index].wash) {
        updatedServices[index].total += updatedServices[index].quantity * 20
      } else {
        updatedServices[index].total -= updatedServices[index].quantity * 20
      }

    }
    if (service === 1) {
      status = updatedServices[index].press
      updatedServices[index].press = !status

      if (updatedServices[index].press) {
        updatedServices[index].total += updatedServices[index].quantity * 15
      } else {
        updatedServices[index].total -= updatedServices[index].quantity * 15
      }
    }

    if (service === 2) {
      status = updatedServices[index].fold
      updatedServices[index].fold = !status

      if (updatedServices[index].fold) {
        updatedServices[index].total += updatedServices[index].quantity * 10
      } else {
        updatedServices[index].total -= updatedServices[index].quantity * 10
      }

    }
    if (service === 3) {
      status = updatedServices[index].pack
      updatedServices[index].pack = !status

      if (updatedServices[index].pack) {
        updatedServices[index].total += updatedServices[index].quantity * 25
      } else {
        updatedServices[index].total -= updatedServices[index].quantity * 25
      }
    }

    setOrderDetails(updatedServices)
    //console.log(orderDetails);

  }



  const handleReset = (index) => {
    const restOrders = [...orderDetails]
    const ProductType = restOrders[index].ProductType
    restOrders[index] = {
      ProductType: ProductType,
      quantity: "",
      wash: false,
      press: false,
      fold: false,
      pack: false,
      total: 0
    }
    setOrderDetails(restOrders)
    //console.log(orderDetails);

  }



  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>

      <Sidenav />

      <div className='Table-main' style={{ height: "80vh" }}>
        <header className='fs-5 d-flex justify-content-between'>
          <div>
            Create Order
          </div>
          <div>
            <img src={require("../Assets/search.png")} alt="search" />
            <input type="text" className='fs-5 search' />
          </div>
        </header>
        <table className='Table'>
          <thead className='thead'>
            <tr style={{ height: '50px' }}>
              <th>Product Types</th>
              <th>Quantity</th>
              <th>Wash Type</th>
              <th colSpan={2}>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/cloth.png")} alt="washing" />Shirts</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 0) }}
                value={orderDetails[0].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>

                <div onClick={() => { toggleServices(0, 0) }}><img src={orderDetails[0].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(0, 1) }}><img src={orderDetails[0].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(0, 2) }}><img src={orderDetails[0].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(0, 3) }}><img src={orderDetails[0].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>

              </td>
              <td>{orderDetails[0].total > 0 ? <>

                {`${orderDetails[0].quantity} X 
                (
                  ${orderDetails[0].wash ? "20" : ""}
                  ${orderDetails[0].press ? "15" : ""}
                  ${orderDetails[0].fold ? "10" : ""}
                  ${orderDetails[0].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[0].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(0) }}>Reset</button></div>
            </tr>


            <tr>
              <td><img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/tshirt.png")} alt="washing" />T Shirts</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 1) }} value={orderDetails[1].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>

                <div onClick={() => { toggleServices(1, 0) }}><img src={orderDetails[1].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(1, 1) }}><img src={orderDetails[1].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(1, 2) }}><img src={orderDetails[1].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(1, 3) }}><img src={orderDetails[1].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>

              </td>
              <td>{orderDetails[1].total > 0 ? <>

                {`${orderDetails[1].quantity} X 
                (
                  ${orderDetails[1].wash ? "20" : ""}
                  ${orderDetails[1].press ? "15" : ""}
                  ${orderDetails[1].fold ? "10" : ""}
                  ${orderDetails[1].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[1].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(1) }}>Reset</button></div>
            </tr>


            <tr>
              <td><img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/trousers.png")} alt="washing" />Trousers</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 2) }} value={orderDetails[2].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>

                <div onClick={() => { toggleServices(2, 0) }}><img src={orderDetails[2].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(2, 1) }}><img src={orderDetails[2].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(2, 2) }}><img src={orderDetails[2].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(2, 3) }}><img src={orderDetails[2].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>

              </td>
              <td>{orderDetails[2].total > 0 ? <>

                {`${orderDetails[2].quantity} X 
                (
                  ${orderDetails[2].wash ? "20" : ""}
                  ${orderDetails[2].press ? "15" : ""}
                  ${orderDetails[2].fold ? "10" : ""}
                  ${orderDetails[2].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[2].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(2) }}>Reset</button></div>
            </tr>


            <tr>
              <td><img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/jeans.png")} alt="washing" />Jeans</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 3) }} value={orderDetails[3].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>
                <div onClick={() => { toggleServices(3, 0) }}><img src={orderDetails[3].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(3, 1) }}><img src={orderDetails[3].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(3, 2) }}><img src={orderDetails[3].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(3, 3) }}><img src={orderDetails[3].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>
              </td>
              <td>{orderDetails[3].total > 0 ? <>

                {`${orderDetails[3].quantity} X 
                (
                  ${orderDetails[3].wash ? "20" : ""}
                  ${orderDetails[3].press ? "15" : ""}
                  ${orderDetails[3].fold ? "10" : ""}
                  ${orderDetails[3].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[3].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(3) }}>Reset</button></div>
            </tr>


            <tr>
              <td> <img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/boxers.png")} alt="washing" />Boxers</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 4) }} value={orderDetails[4].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>
                <div onClick={() => { toggleServices(4, 0) }}><img src={orderDetails[4].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(4, 1) }}><img src={orderDetails[4].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(4, 2) }}><img src={orderDetails[4].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(4, 3) }}><img src={orderDetails[4].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>
              </td>
              <td>{orderDetails[4].total > 0 ? <>

                {`${orderDetails[4].quantity} X 
                (
                  ${orderDetails[4].wash ? "20" : ""}
                  ${orderDetails[4].press ? "15" : ""}
                  ${orderDetails[4].fold ? "10" : ""}
                  ${orderDetails[4].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[4].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(4) }}>Reset</button></div>
            </tr>


            <tr>
              <td> <img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/pants.png")} alt="washing" />Joggers</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 5) }} value={orderDetails[5].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>
                <div onClick={() => { toggleServices(5, 0) }}><img src={orderDetails[5].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(5, 1) }}><img src={orderDetails[5].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(5, 2) }}><img src={orderDetails[5].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(5, 3) }}><img src={orderDetails[5].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>
              </td>
              <td>{orderDetails[5].total > 0 ? <>

                {`${orderDetails[5].quantity} X 
                (
                  ${orderDetails[5].wash ? "20" : ""}
                  ${orderDetails[5].press ? "15" : ""}
                  ${orderDetails[5].fold ? "10" : ""}
                  ${orderDetails[5].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[5].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(5) }}>Reset</button></div>
            </tr>
            <tr>
              <td><img style={{ height: '50px', marginRight: "15px" }} src={require("../Assets/others.png")} alt="washing" />Others</td>
              <td><input min={1} placeholder={0} onBlur={quantityUpdated} onChange={(e) => { handleInput(e, 6) }} value={orderDetails[6].quantity} type={"text"} style={{ width: '80px', textAlign: "center" }}></input></td>
              <td className='wash-type'>
                <div onClick={() => { toggleServices(6, 0) }}><img src={orderDetails[6].wash ?
                  require("../Assets/washing-machineSelected.png") :
                  require("../Assets/washing-machine.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(6, 1) }}><img src={orderDetails[6].press ?
                  require("../Assets/ironingSelected.png") :
                  require("../Assets/ironing.png")} alt="washing" /></div>

                <div onClick={() => { toggleServices(6, 2) }}><img src={orderDetails[6].fold ?
                  require("../Assets/foldSelected.png") : require("../Assets/fold.png")} alt="Towel" /></div>

                <div onClick={() => { toggleServices(6, 3) }}><img src={orderDetails[6].pack ?
                  require("../Assets/bleachSelected.png") : require("../Assets/bleach.png")} alt="Bleach" /></div>
              </td>
              <td>{orderDetails[6].total > 0 ? <>

                {`${orderDetails[6].quantity} X 
                (
                  ${orderDetails[6].wash ? "20" : ""}
                  ${orderDetails[6].press ? "15" : ""}
                  ${orderDetails[6].fold ? "10" : ""}
                  ${orderDetails[6].pack ? "25" : ""}
                ) 
                =`} <span style={{ fontSize: "25px", color: "#5861AE", fontWeight: "bold" }}>{orderDetails[6].total}</span>

              </>
                : <>
                  ___
                </>
              }</td>
              <div id='reset-btn'><button onClick={() => { handleReset(6) }}>Reset</button></div>
            </tr>
          </tbody>
        </table>
        <div id='bottom-btns'>
          <button id='cancel-btn' onClick={() => {
            handleCancelReset()
          }}>Cancel</button>

          <button onClick={() => {
            setNewOrder({
              ...newOrder, price: Gtotal,
              date_time: new Date().toLocaleString(),
              total_items: Total_items
            })
          }} type="button" id="proceed-btn" data-bs-toggle="modal" data-bs-target="#SummaryModal">
            Proceed
          </button>
        </div>

        <div className='modal fade come-from-modal right modal-xl' id='SummaryModal' tabIndex={-1} role="dialog" aria-labelledby='Summary'>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div style={{ backgroundColor: " #5861AE", color: "white" }} className="modal-header">
                <h4 className='modal-title' id='SummaryModal'>Summary</h4>
                <button style={{ border: "0", backgroundColor: "transparent", color: "white", fontSize: "30px" }} data-bs-toggle="modal"
                  data-bs-target="#SummaryModal" className='close' data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">

                <div className='store-info'>

                  <div>
                    <input type="text" value={newOrder.store}
                      onChange={(e) => { setNewOrder({ ...newOrder, store: e.target.value }) }}
                      placeholder='Store Location' style={{ position: "relative", top: "10px", border: "none", borderBottom: "1px solid gray", marginRight: "50px", backgroundColor: "#E0E0E0" }} />
                    <span style={{ marginRight: "50px" }}>Store Address:</span>
                    <span style={{ marginRight: "50px" }}>Phone:</span>
                  </div>

                  <div className='store-info2'>
                    <div>Laundry,{user?.district}</div>
                    <div>0000000000</div>
                  </div>

                </div>

                <Tracking />

                <div className='order-details'>
                  <h4>
                    Order Details
                  </h4>

                  {orderDetails.map((order) => {
                    { Gtotal += order.total }
                    { Total_items += Number(order.quantity) }
                    { }
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

                  {Gtotal > 0 && <div className='total-footer'>
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
                  </div>}

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
                {newOrder.store && Gtotal ? <>
                  <button data-bs-toggle="modal"
                    data-bs-target="#SummaryModal" onClick={() => saveOrder(Gtotal)}
                    className='close' id='proceed-btn' data-dismiss="modal">Confirm</button>
                </> :
                  <>
                    <button onClick={() => { checkInput() }}
                      id='disabled-btn'>Confirm</button>
                  </>}
              </div>
            </div>
          </div>
        </div>

        <ConfirmModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

      </div>
    </div >


  )
}

export default CreateOrder;

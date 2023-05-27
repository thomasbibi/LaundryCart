import React from 'react'
import '../Styles/Tracking.css'
export default function Tracking() {
  return (
    <div className='main-div-tracking'>
        <div className='tracking'></div><p className='para-div'>Picked up</p><hr className='underline-1' style={{width:'150px'}}/>
        <div className='tracking-div'></div><p className='para-div'>Washed</p><hr className='underline-1' style={{width:'150px'}}/>
        <div className='tracking-div'></div><p className='para-div'>Ironed</p><hr className='underline-1' style={{width:'150px'}}/>
        <div className='tracking-div'></div><p className='para-div'>Delivered</p>
    </div>
  )
}
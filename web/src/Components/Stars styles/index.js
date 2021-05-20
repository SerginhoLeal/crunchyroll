import React from 'react'

import './Styles.css'

import Jupiter from '../../img/jupiter.png'
// import Venus from '../../img/venus.png'

export default function _Stars(){
    return(
        <section className="wrapper">
            <div className="stars"/>
            <div className="stars2" />
            <div className="stars3" />

            <img src={Jupiter} className="jupiter" />
            {/* <img src={Venus} className="venus" /> */}
        </section>
    )
}
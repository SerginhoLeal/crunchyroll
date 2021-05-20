import React from 'react';
import { withRouter } from 'react-router-dom';

import {FaAngleDoubleLeft} from 'react-icons/fa'

import './GoBack.css'

const GoBack = ({setRota1}) => <FaAngleDoubleLeft onClick={()=>setRota1(null)} className="goBackStyles"/>

export default withRouter(GoBack);
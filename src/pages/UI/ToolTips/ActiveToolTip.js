import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const ActiveToolTip = (props) => {
   
    return (
      
        <>
       
            <Link to={props.to} onClick={props.onClick} className="text-dark"><i className="fa fa-check-square-o mr-2" id='Active' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="Active">
                {"Active"}
            </UncontrolledTooltip>
        </>
    )
}

export default ActiveToolTip;
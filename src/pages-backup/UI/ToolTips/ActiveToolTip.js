import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const ActiveToolTip = (props) => {
    return (
        <>
            <Link to="#" onClick={props.onClick} className="text-dark"><i class="fa fa-check-square-o" id='Active' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="Active">
                {"Active"}
            </UncontrolledTooltip>
        </>
    )
}

export default ActiveToolTip;
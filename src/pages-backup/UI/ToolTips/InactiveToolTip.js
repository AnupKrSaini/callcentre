import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const InactiveToolTip = (props) => {
    return (
        <>
            <Link to="#" onClick={props.onClick} className="text-dark"><i class="fa fa-window-close-o mr-2" id='Inactive' aria-hidden="true"></i></Link>
            <UncontrolledTooltip  placement={props.placement} target="Inactive">
                {props.title}
            </UncontrolledTooltip>
        </>
    )
}

export default InactiveToolTip;
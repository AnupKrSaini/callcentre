import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const ViewToolTip = (props) => {
    return (
        <>
            <Link to={props.to} onClick={props.onClick} className="text-dark"><i className="fa fa-search mr-2" id='View' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="View">
                {props.title}
            </UncontrolledTooltip>
        </>
    )
}

export default ViewToolTip;
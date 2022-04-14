
import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const CallToolTip = (props) => {
    return (
        <>
            <Link to={props.to} onClick={props.onClick} className="text-dark"><i className="fa fa-headphones mr-2" id={props.id} aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target={props.id}>
                {props.title}
            </UncontrolledTooltip>
        </>
    )
}

export default CallToolTip;
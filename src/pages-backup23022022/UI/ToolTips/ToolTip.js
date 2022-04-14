import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const ToolTip = (props) => {
    return (
        <>
            <Link to={props.to} onClick={props.onClick} className="text-dark"><i className="fa fa-pencil mr-2" id='ToolTipId' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="ToolTipId">
                {props.title}
            </UncontrolledTooltip>
        </>
    )
}

export default ToolTip;
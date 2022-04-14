import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const AddToolTip = (props) => {
    return (
        <>
            <Link to={props.to} onClick={props.onClick} className="text-dark"><i className="fa fa-plus-square mr-2" id='Add' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="Add">
                {props.title}
            </UncontrolledTooltip>
        </>
    )
}

export default AddToolTip;
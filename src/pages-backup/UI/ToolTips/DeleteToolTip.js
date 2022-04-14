import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const DeleteToolTip = (props) => {
    return (
        <>
            <Link to="#" onClick={props.onClick} className="text-dark"><i class="fa fa-trash mr-2" id='Delete' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="Delete">
                {"Delete"}
            </UncontrolledTooltip>
        </>
    )
}

export default DeleteToolTip;
import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from 'reactstrap';

const EditToolTip = (props) => {
    return (
        <>
            <Link to="#" onClick={props.onClick} className="text-dark"><i class="fa fa-pencil mr-2" id='Edit' aria-hidden="true"></i></Link>
            <UncontrolledTooltip placement={props.placement} target="Edit">
                {props.title}
            </UncontrolledTooltip>
        </>
    )
}

export default EditToolTip;
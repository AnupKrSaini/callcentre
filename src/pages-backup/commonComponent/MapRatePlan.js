import React from "react";
//import ModalConfirm from "./ModalConfirm";

const MapRatePlan = () => {


    return (
        <>
            <div className="row align-items-center justify-content-start">
                <div className='col-auto'>
                    <div className='icRight'>
                        <label className="d-block">
                            <input className="radio_animated" type="radio" name="rdo-ani" />
                        </label>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <div className="form-group">
                        <label className="col-form-label">Rate Plan Type</label>
                        <select className="form-control" >
                            <option value="1">General</option>
                            <option value="2">Corporate</option>
                            <option value="3">Government</option>
                            <option value="4">B2B</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <div className="form-group">
                        <label className="col-form-label">Rate Plan</label>
                        <select className="form-control">
                            <option value="0">---Select---</option>
                            <option value="1">Rate Plan 1</option>
                            <option value="2">Rate Plan 2</option>
                            <option value="3">Rate Plan 3</option>
                            <option value="4">Rate Plan 4</option>
                        </select>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="icRight">
                        <i className="fa fa-plus"></i> <i className="fa fa-minus"></i>
                    </div>
                </div>

            </div>

           

        </>
    )
}

export default MapRatePlan;
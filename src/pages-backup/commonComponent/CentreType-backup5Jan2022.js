import React from "react";

const DUMMY_DATA = [
    {
        id: 'ct1',
        title: 'Collection Centre',
    },
    {
        id: 'ct2',
        title: 'B2B',
    },
    {
        id: 'ct3',
        title: 'Franchise',
    },
    {
        id: 'ct4',
        title: 'Franchise Lab',
    },
    {
        id: 'ct5',
        title: 'Satellite Lab',
    },
];

const CentreType = (props) => {
    return (
        <>
            <div className="form-group">
                <label>Centre Type</label>
                <select className="form-control">
                    <option>---select---</option>
                    
                    {DUMMY_DATA.map((cType)=>{
                        return <option key={cType.id}>{cType.title}</option>
                    })}
                     
                    {/**
                    {[<option>Item1</option>, <option>Item2</option>,]}
                    */}
                    
                </select>
            </div>
        </>
    )
}

export default CentreType
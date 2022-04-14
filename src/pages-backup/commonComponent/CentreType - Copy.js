import React from "react";

const CentreTypeDummy = [
    {
        id: 'e1',
        title: 'Collection Centre',
    },
    {
        id: 'e2',
        title: 'B2B',
    },
    {
        id: 'e3',
        title: 'Franchise',
    },
    {
        id: 'e4',
        title: 'Franchise Lab',
    },
    {
        id: 'e5',
        title: 'Satellite Lab',
    },
];

const CentreType = (props) => {
    return (
        <>
            <div className="form-group">
                <label>Centre Type</label>
                <select className="form-control">
                    <option>All</option>
                    <option>Collection Centre</option>
                    <option>B2B</option>
                    <option>Franchise</option>
                    <option>Franchise Lab</option>
                    <option>Satellite Lab</option>
                </select>
            </div>
        </>
    )
}

export default CentreType
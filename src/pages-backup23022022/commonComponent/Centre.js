import React from "react";

const DUMMY_DATA = [
    {
        id: 'c1',
        title: 'Super Medical Hall',
    },
    {
        id: 'c2',
        title: 'Kumar & Company',
    },
    {
        id: 'c3',
        title: 'Baba Bilasgar Lab',
    },
    {
        id: 'c4',
        title: 'Sai Chemist',
    },
    {
        id: 'c5',
        title: 'Kandeel Complex',
    },
    {
        id: 'c6',
        title: 'Recharge Medical Hall',
    },
    {
        id: 'c7',
        title: 'Avinash Chemist',
    },
    {
        id: 'c8',
        title: 'Khanna Lab',
    },
    {
        id: 'c9',
        title: 'Kukreja Lab',
    },
    {
        id: 'c10',
        title: 'Sunil Chemist',
    },
];

const Centre = () => {
    return (
        <>
            <div className="form-group">
                <label >Centre</label>
                <select className="form-control p-0">
                    <option>---select---</option>
                    {DUMMY_DATA.map( (cntr) =>{
                        return <option key={cntr.id}>{cntr.title}</option>
                    })}
                    {/** 
                    {[<option>item 1</option>, <option>item2</option>]}
                    */}
                </select>
            </div>
        </>
    )
}

export default Centre
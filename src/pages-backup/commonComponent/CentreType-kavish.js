import React, { useState } from "react";


const CentreType = (props) => {

    const [centerType, setcenterType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // async function fetchCenterType(){
    const fetchCenterType = async () => {
        debugger;
        // const DisplayFor = 0;
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        //   };
        // setIsLoading(true);
        // const response = await fetch('http://localhost:9476/api/USer/CenterTypeList/' + DisplayFor , requestOptions)
        // const data = await response.json();
        // console.log(data);
        //     const transformedCenterType = data.results.map(centerTypeData =>{
        //         return {
        //             id: centerTypeData.agcenterSno,
        //             title: centerTypeData.agcenterName,
        //         }
        //     });
        //     setcenterType(transformedCenterType);

        //     setIsLoading(false);
        const DisplayFor = 0;
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let url = 'http://localhost:9476/api/USer/CenterTypeList/' + DisplayFor
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            if (data.Success) {
                // setCenterType(data.Data.map((d) => (<option key={d.agcentertypeSno} value={d.agcentertypeSno}>{d.agcentertypeName}</option>)));
            }
            else {
                // toast.warning(data.ErrorList, { autoClose: 1500 });
            }
        }
        catch (error) {
            console.log(error);
            // toast.error(<strong>Server Error! Unable to connect to a server.</strong>, { autoClose: 1500 });
        }
    }


    return (
        <>
            <div className="form-group">
                <button onClick={fetchCenterType}>Fetch CenterType</button>
                <label>Centre Type</label>
                <select className="form-control">
                    <option value="0">---select---</option>
                    {centerType}
                    {/* {!isLoading && centerType.length > 0 && centerType}
                    {!isLoading && centerType.length === 0 && <span>found no center Type</span>}
                    {isLoading && <span>Loading...</span>} */}
                </select>
            </div>
        </>
    )
}

export default CentreType
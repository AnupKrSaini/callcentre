import React, { useState, useEffect, useCallback } from "react";


const CentreType = () => {

    const [centerType, setcenterType] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const fetchCenterType = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const DisplayFor = 0;
            const response = await fetch('http://localhost:9476/api/USer/CenterTypeList/' + DisplayFor, {
               method: 'GET',
               headers: { 'Content-Type': 'application/json'}
            });
            
            if(!response.ok){
                throw new Error ('something went wrong');
            }
            
            const data = await response.json();

            const transformedCenterType = data.results.map(centerTypeData => {
                return {
                    id: centerTypeData.agcenterSno,
                    title: centerTypeData.agcenterName,
                }
            });
            
            setcenterType(transformedCenterType);
 
        }
        catch(error){
            setError(error.message);
        }
        
        setIsLoading(false);
    }, []);


    useEffect(() =>{
        fetchCenterType();
    }, [fetchCenterType]);
    

    let content = <option>found no data</option>

    if (centerType.length > 0) {
        content = <option>{centerType}</option>
    }

    if (error) {
        content = <option>{error}</option>
    }

    if (isLoading) {
        content = <option>Loading...</option>
    }

    return (
        <>
            <div className="form-group">
                {/*<button onClick={fetchCenterType}>Fetch CenterType</button>*/}
                <label>Centre Type</label>
                <select className="form-control">
                    <option>---select---</option>
                    {content}
                </select>
            </div>
        </>
    )
}

export default CentreType;
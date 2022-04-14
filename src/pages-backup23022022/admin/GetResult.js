import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import Loading from '../commonComponent/Loading';

import axios from 'axios';



const GetResult = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(function (result) {
                // handle success
                //console.table(result.data);
                setTodos(result.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);


    // const onDelete = (id) => {
    //     //alert('delete');
    //     axios.delete('https://jsonplaceholder.typicode.com/users${id}')
    //         .then(function (result) {
    //             // handle success
    //             if(result.status !== 200){
    //                 return
    //             }
    //             else{
    //                 setTodos(todos.filter((tb) => {
    //                     return tb.id !== id;
    //                 }))
    //             }
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         });
    // }

    const postDelete = (id) => {
       //alert('delete');
       //e.preventDefault();
       axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
       .then(function (result) {
           // handle success
           console.log('Deleted', result);
       })
       .catch(function (error) {
           // handle error
           console.log(error);
       });
    }

    return (
        <>
            <Breadcrumb title="Get Result" parent="Master" />
            <div className='container-fluid'>

                {todos ?
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Website</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todos.map((tb) => {
                                            return (
                                                <>
                                                    <tr key={tb.id}>
                                                        <th>{tb.id}</th>
                                                        <td>{tb.name}</td>
                                                        <td>{tb.username}</td>
                                                        <td>{tb.email}</td>
                                                        <td>{tb.phone}</td>
                                                        <td>{tb.website}</td>
                                                        <td>{tb.address.street}</td>
                                                        <th scope="col">
                                                            <button className='btn btn-primary btn-sm' onClick={postDelete(tb.id)}>Delete</button>
                                                        </th>
                                                        {/* <td>
                                                            <input className="form-check-input" type="checkbox" checked="tb.completed" />
                                                        </td> */}
                                                        {/* <td>{tb.completed}</td> */}
                                                    </tr>
                                                </>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    : <Loading />}


            </div>
        </>
    )
}

export default GetResult;
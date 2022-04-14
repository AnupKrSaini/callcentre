import React from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import SweetAlert from 'sweetalert2';
import DeleteToolTip from '../UI/ToolTips/DeleteToolTip';
import ReactHTMLTableToExcel from "react-html-table-to-excel";



const VerifyManualSheets = ({dataoutCalling}) => {

const   ReactBtnExcel=<React.Fragment><i className='fa fa-file-excel-o'></i> Download Excel</React.Fragment>;


    const successAlert = () => {
        SweetAlert.fire({ title: "Success", text: "Data has been uploaded successfully!", icon: "success" });
    }
    const Displayalert = () => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        })
            .then((result) => {
                if (result.value) {
                    SweetAlert.fire(
                        'Deleted!',
                        'Data has been deleted.',
                        'success'
                    )
                }
                else {
                    SweetAlert.fire(
                        'Your data is safe!'
                    )
                }
            })
    }

const downloadExecelcalls=()=>
{
     if(dataoutCalling.tblOutboundList.length>0)
     {

     }


}

    return ( 
       
        <>
         {dataoutCalling===null ||dataoutCalling.OutPut===null?null:<Container fluid>

<Row>
    <Col md={12}>
        <Card>
            {/* <Card.Header className='pb-0'>
                <Card.Title>Verified Data</Card.Title>
            </Card.Header> */}
            <Card.Body>
                <h4 className='text-success text-center' style={{marginTop:'30px'}}><b>{dataoutCalling.InsertRow ==0? '0 Records uploaded':'Records have been uploaded successfully'} </b></h4>
               
            </Card.Body>
        </Card>
    </Col>
</Row>


<Row className='mt15'>
    <Col md={12}>
        <Card>
            <Card.Header className='pb-0'>
                <Card.Title>Issue with Verified Data</Card.Title>
            </Card.Header>
            <Card.Body style={{ paddingTop: '0px' }}>
                <div className="table-responsive mt15">
                    <Table  id='issueTbl'>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Customer Mobile</th>
                                <th scope="col">Source Type</th>
                                <th scope="col">Source Name</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Status</th>
                                {/* <th scope="col" className='text-center'>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {dataoutCalling.tblOutboundList.map((tb,index) => {
                                return (
                                    <>
                                        <tr key={parseInt(index+1)}>
                                            <th>{parseInt(index+1)}</th>
                                            <td>{tb.CustomerName}</td>
                                            <td>{tb.CustomerMobile}</td>
                                            <td>{tb.SourceCategory} </td>
                                            <td>{tb.SourceName} </td>
                                            <td>{tb.PurPoseName} </td>
                                            <td>{tb.ErrorDesc} </td>
                                            {/* <th scope="col" className='text-center'>
                                                <DeleteToolTip Title="Delete" />
                                            </th> */}
                                        </tr>
                                    </>
                                )
                            })}

                        </tbody>
                    </Table>
                </div>
                <div className='mt25 text-center'>
                <ReactHTMLTableToExcel
        id="excelbtnexport"
        className="btn btn-primary"
        table="issueTbl"
        filename="IssueDataSheet"
        sheet="tablexls"
        buttonText={ ReactBtnExcel }> </ReactHTMLTableToExcel>
                    {/* <Button variant='primary' ><i className='fa fa-file-excel-o'></i> Download Excel </Button> */}
                </div>
               
            </Card.Body>
        </Card>
    </Col>
</Row>


</Container>}
            
        </>
    )
}

export default VerifyManualSheets;
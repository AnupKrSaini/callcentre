import React from "react";
import {Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Previous,Next } from "../../../constant";

const Paging = () => {
    return(
        <>
            <div className='row'  style={{marginTop:'50px'}}>
                    <div className='col-md-12'>
                    <nav aria-label="Page navigation example">
                        <Pagination aria-label="Page navigation" className="pagination justify-content-center pagination-primary">
                            <PaginationItem disabled>
                                <PaginationLink href="#javascript">
                                    {Previous}
                            </PaginationLink>
                            </PaginationItem>

                            <PaginationItem active>
                                <PaginationLink href="#">
                                    {"1"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    {"2"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    {"3"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    {"4"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    {"5"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" >
                                    {Next}
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </nav>
                    </div>
                </div>
        </>
    )
}

export default Paging
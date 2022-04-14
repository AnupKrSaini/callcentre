import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap'

const LoadingButton = ({variantName, cssName, btntext}) => {
  return (
    <>
      <Button variant={variantName} type='submit' className={cssName} disabled={true}>
        <Spinner animation="border" size='sm' />
        {btntext}
      </Button>
    </>
  );
}

export default LoadingButton;
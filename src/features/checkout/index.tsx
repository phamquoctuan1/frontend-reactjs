import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { selectCheckoutInfo } from './checkoutSlice';
import AddressForm from './components/AddressForm';
import PaymentForm from './components/PaymentForm';

const steps = ['Địa chỉ giao hàng', 'Phương thức thanh toán'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CheckoutPage() {
  const checkoutInfo = useAppSelector(selectCheckoutInfo);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (checkoutInfo.name !== undefined) setActiveStep(activeStep + 1);
    else alert('Vui lòng điền đầy đủ thông tin và lưu thông tin');
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container maxWidth='sm'>
      <Link to='/cart'>
        <Button variant='contained' color='primary'>
          Quay lại
        </Button>
      </Link>
      <Container component='main' maxWidth='sm'>
        <Typography component='h1' variant='h4' align='center'>
          Thanh toán
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep === steps.length - 1 ? null : (
              <Button variant='outlined' onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Container>
    </Container>
  );
}

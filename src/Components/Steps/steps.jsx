import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddMerchantBankAccountStep from './BankStep';
import AddBusinesStep from './BusinessStep';
import { ColorlibConnector, ColorlibStepIcon } from './stepStyles';
import animationData from '../Animations/SuccessTick.json';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';




const steps = [
    {
        label: 'Add Bank Account',
        component: (props)=> <AddMerchantBankAccountStep  {...props}/>
    },
    {
        label: 'Add Business details',
        component: (props) => <AddBusinesStep {...props} />
    }
  ];



export default function SandBoxProcessStepper() {
  let businessStep = localStorage.getItem('i_sb_bs_c')  // Business step completion from Local storage
  let bankStep     = localStorage.getItem('i_sb_bks_c') // Bank step completion from Local storage
  
  const [activeStep, setActiveStep] = useState(0);   // Steper steps state
  const [skipped, setSkipped] = useState(new Set());


  // Check to how many steps completed by the mechant
  useEffect(() => {
    if (bankStep === 'false') {
        setActiveStep(0)
    }

    if (businessStep === 'false') {
      setActiveStep(1)
    }

  }, [bankStep, businessStep])


  const isStepOptional = (step) => {
    return step === 1;
  };


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const commonProps = {
    // Add any props and pass to the components here
    someProp: 'someValue',
    anotherProp: 'anotherValue',
    activeStep: activeStep,
    handleNext: handleNext,
    stepsLengh: steps.length
  };


  return (
    <Box sx={{ width: '100%' }}>

      <Stepper 
           activeStep={activeStep} 
           style={{width:'60%', marginLeft: '20%', marginTop:'1%'}}
           connector={<ColorlibConnector />}
           >
            {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepOptional(index)) {
                labelProps.optional = (
                <Typography variant="caption">Business details</Typography>
                );
            }

            if (isStepSkipped(index)) {
                stepProps.completed = false;
            }

            return (
                <Step key={step.label} {...stepProps}>
                    <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
                </Step>
            );
            })}
      </Stepper>

      {activeStep === steps.length  ? (
        // If all steps completed
        <React.Fragment>

          <div style={{ marginTop: '30px',color:'green', display:'flex', justifyContent: 'center' }}>
              <p>Thanks, your Information has been submitted successfully,</p> <br />
          </div>

          <div style={{ marginBottom: '5px', color:'green', display:'flex', justifyContent: 'center' }}>
              <p>Now you can use your keys for live payments</p>
          </div>

          <div style={{ mt: 2, mb: 1, color:'green', display:'flex', justifyContent: 'center' }}>
          <Lottie 
              animationData={animationData} 
              loop={false} 
              style={{width:'200px', height: '200px'}} 
              /> 
          </div>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>

      ) : (

        <React.Fragment>
            <Box>
                {steps[activeStep].component(commonProps)}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                Back
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                </Button>
                )}
                <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>

        </React.Fragment>
      )}
    </Box>
  );
};



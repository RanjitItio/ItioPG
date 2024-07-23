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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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

      {activeStep === steps.length ? (
        // If all steps completed
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color:'green', display:'flex', justifyContent: 'center' }}>
              Thanks for the details, Our Team will contact you soon.
          </Typography>
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



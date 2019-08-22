import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import {STEPS, FAILED_STEPS} from "../../constants/Steps";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing,
    },
    instructions: {
        marginTop: theme.spacing,
        marginBottom: theme.spacing,
    },
});

// currentStep : Object || null
// steps : Array of Objects(key: label, value: buttons)

const ButtonBlock = ({activeStep, handleComplete, disabled}) => {
    const values = Object.values(activeStep)[0];
    if(values.length === 2) {
        return (
            <React.Fragment>
                <Button disabled={disabled} variant="contained" color="secondary" onClick={() => handleComplete(values[0])}>
                    {values[0]}
                </Button>{' '}
                <Button disabled={disabled} variant="contained" color="primary" onClick={() => handleComplete(values[1])}>
                    {values[1]}
                </Button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Button disabled={disabled} variant="contained" color="primary" onClick={() => handleComplete(Object.keys(activeStep)[0])}>
                    {values[0]}
                </Button>
            </React.Fragment>
        )
    }
};



const LeadStepper = ({classes, handleComplete, completedStepIndex, completedStepDesc, partnerId}) => {
    let activeStep;
    let disabled;
    if(completedStepIndex === undefined) {
        disabled = !partnerId ? true : false
        activeStep = 0;

    } else {
        if (FAILED_STEPS.includes(completedStepDesc)) {
            activeStep =  completedStepIndex;
            disabled = true;
        } else {
            activeStep =  completedStepIndex+1;
            disabled = false;
        }
    }
    const totalSteps = STEPS.length;

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {STEPS.map((stepObject, index) => {
                    const labelProps = {};
                    const stepProps = {};
                    const label = Object.keys(stepObject)[0];
                    if(index == completedStepIndex && FAILED_STEPS.includes(completedStepDesc)) {
                        labelProps.error = true;
                        stepProps.completed = false;
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                 Failed
                             </Typography>
                        );
                    }
                    return (
                        <Step key={label} {...labelProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            { (totalSteps !== activeStep) &&
                <ButtonBlock activeStep={STEPS[activeStep]} handleComplete={handleComplete} disabled={disabled}/>
            }
        </div>
    )
};

const LeadStepperWrapper = withStyles(styles)(LeadStepper)

export default LeadStepperWrapper;
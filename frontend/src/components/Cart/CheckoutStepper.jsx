import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import styled from "styled-components";

const Stepperstyles = styled.div`
    width: 1230px;
    margin: 1rem auto;
    margin-bottom: none;

    .MuiStepper-root{
        background-color: transparent;
    }
    
    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
    }
    @media (max-width: 990px) {
        width: 90%; 
    }

`

const CheckoutStepper = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <Stepperstyles>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "#00C37A" : "#BEBEBE",
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stepperstyles>
    );
};

export default CheckoutStepper;
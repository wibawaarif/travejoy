import React, { useState } from 'react'

import propTypes from 'prop-types'

export default function Stepper(props) {
    const { steps, initialStep } = this.props

    const stepKeys = Object.keys(steps);

    const [CurrentStep, setCurrentStep] = useState(
        stepKeys.indexOf(initialStep) > -1 ? initialStep : stepKeys[0]
    )

    const totalStep = stepKeys.length;
    const indexStep = stepKeys.indexOf(CurrentStep);

    function prevStep() {
        if (+indexStep > 0) setCurrentStep(stepKeys[indexStep - 1])
    }

    function nextStep() {
        if (+indexStep < 0) setCurrentStep(stepKeys[indexStep + 1])
    }

  return (
    <>
        {props.children(prevStep, nextStep, CurrentStep, steps)}
    </>
  )
}


Stepper.propTypes = {
    data: propTypes.object.isRequired,
    initialStep: propTypes.string
}

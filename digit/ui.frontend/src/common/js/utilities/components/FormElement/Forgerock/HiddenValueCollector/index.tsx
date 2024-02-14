import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';

import CallbackComponents from '@/utility/components/FormElement/Forgerock/CallbackComponents';

import { HiddenCollectorProps } from './definitions';

const HiddenValueCollector: React.FC<HiddenCollectorProps> = ({ errorMap, handleFormSubmit, nextStep, site, step }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef?.current) {
      setTimeout(handleFormSubmit, 50);
    }
  }, [formRef]);
  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={handleFormSubmit}
        validateOnBlur={true}
        validateOnChange={false}
        validateOnMount={false}
        validationSchema={{}}
      >
        {({ handleChange, setFieldValue, values }) => {
          return (
            <>
              <Form ref={formRef}>
                <CallbackComponents
                  brand={site}
                  errorMap={errorMap}
                  handleChange={handleChange}
                  nextStep={nextStep}
                  setFieldValue={setFieldValue}
                  step={step}
                  values={values}
                />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default HiddenValueCollector;

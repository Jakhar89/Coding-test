import { Form, Formik } from 'formik';
import React from 'react';

import { THEMES } from '@/storybook/preview';
import Base from '@/utility/components/ComponentBase/Base';
import FormDatePicker from '@/utility/components/FormElement/DatePicker';
import FormLabel from '@/utility/components/FormElement/Label';
import SearchField from '@/utility/components/FormElement/SearchField';
import Select from '@/utility/components/FormElement/Select';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import Grid from '@/utility/components/Grid2';
import { ComponentMeta } from '@storybook/react';

import AccordionXS from './index';
import { GridItem } from './StyledAccordionXS';

export default {
  title: 'Foundations/Form Elements',
  component: AccordionXS,
  argTypes: {},
} as ComponentMeta<any>;

const gridConfig = {
  filter: { gutters: { xs: '0', md: 30, lg: 30 }, spaces: { mx: { xs: '0', md: '15px' } } },
};

export const AccordionItem = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    <Theme>
      <AccordionXS title={'Search & filters'}>
        <Formik
          initialValues={{
            dateTo: new Date(),
            dateFrom: new Date(),
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Base>
                  <GridItem
                    className="GridItem"
                    config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 0, lg: 1 } }}
                  >
                    <Field>
                      <FormLabel
                        className="hideXS"
                        htmlFor="searchField"
                      >
                        Search
                      </FormLabel>
                      <SearchField
                        name="searchField"
                        value={values?.['searchField']}
                        setFieldValue={setFieldValue}
                        placeholder={'Search by description'}
                      />
                    </Field>
                  </GridItem>
                  <GridItem
                    className="GridItem"
                    config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 2, lg: 2 } }}
                  >
                    <Field>
                      <FormLabel
                        htmlFor={'dateFrom'}
                        optional={false}
                      >
                        Date from
                      </FormLabel>
                      <FormDatePicker
                        handleDateChange={() => {}}
                        name={'dateFrom'}
                      />
                    </Field>
                  </GridItem>
                  <GridItem
                    className="GridItem"
                    config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 3, lg: 3 } }}
                  >
                    <Field>
                      <FormLabel
                        htmlFor={'dateTo'}
                        optional={false}
                      >
                        Date to
                      </FormLabel>
                      <FormDatePicker
                        handleDateChange={() => {}}
                        name={'dateTo'}
                      />
                    </Field>
                  </GridItem>
                  <GridItem
                    className="GridItem"
                    config={{ col: { xs: 12, md: 6, lg: 3 }, ...gridConfig.filter, order: { md: 1, lg: 4 } }}
                  >
                    <Field>
                      <FormLabel htmlFor={'select'}>Transaction type</FormLabel>
                      <Select
                        setFieldValue={setFieldValue}
                        value={'All transactions'}
                        name={'select'}
                        placeholder={'Select a option'}
                        options={[
                          {
                            value: 'All transactions',
                            label: 'All transactions',
                          },
                          {
                            value: 'Direct Debit',
                            label: 'Direct Debit',
                          },
                        ]}
                      ></Select>
                    </Field>
                  </GridItem>
                </Base>
              </Form>
            );
          }}
        </Formik>
      </AccordionXS>
    </Theme>
  );
};

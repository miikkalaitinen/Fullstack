import { Grid, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import {
  TypeOption,
  SelectTypeField,
  DiagnosisSelection,
  TextField,
  HealthOption,
  SelectHealthField,
} from './TypeFormField';
import { useStateValue } from '../state';
import { NewEntry } from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { type: 'Hospital' },
  { type: 'HealthCheck' },
  { type: 'OccupationalHealthcare' },
];

const HealthOptions: HealthOption[] = [
  { healthCheckRating: 0 },
  { healthCheckRating: 1 },
  { healthCheckRating: 2 },
  { healthCheckRating: 3 },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: '',
        diagnosisCodes: [],
        disdate: '',
        discriteria: '',
        healthCheckRating: 0,
        employerName: '',
        sickstartDate: '',
        sickendDate: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        console.log(errors);
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!values.disdate) {
            errors.disdate = requiredError;
          }
          if (!values.discriteria) {
            errors.discriteria = requiredError;
          }
        }

        if (values.type === 'HealthCheck') {
          if (
            values.healthCheckRating !== 0 &&
            values.healthCheckRating !== 1 &&
            values.healthCheckRating !== 2 &&
            values.healthCheckRating !== 3
          ) {
            errors.healthCheckRating = requiredError;
          }
        }

        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectTypeField
              label="Entry Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === 'Hospital' ? (
              <>
                <h3>Discharge</h3>
                <Field
                  label="Discharge Date"
                  placeholder="Date"
                  name="disdate"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discriteria"
                  component={TextField}
                />
              </>
            ) : null}
            {values.type === 'HealthCheck' ? (
              <>
                <SelectHealthField
                  label="Entry Type"
                  name="healthCheckRating"
                  options={HealthOptions}
                />
              </>
            ) : null}
            {values.type === 'OccupationalHealthcare' ? (
              <>
                <Field
                  label="Employer"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
                <h3>Sick Leave</h3>
                <Field
                  label="End (date)"
                  placeholder="End (date)"
                  name="sickstart"
                  component={TextField}
                />
                <Field
                  label="End (date)"
                  placeholder="End (date)"
                  name="sickend"
                  component={TextField}
                />
              </>
            ) : null}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

import { Formik, Form, Field } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalEntryValues } from "../types";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";

interface Props {
    onSubmit: (values: OccupationalEntryValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                employerName: "",
                sickLeaveStart: "",
                sickLeaveEnd: "",
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                if (!values.sickLeaveStart) {
                    errors.sickLeaveStart = requiredError;
                }
                if (!values.sickLeaveEnd) {
                    errors.sickLeaveEnd = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Employer"
                            placeholder="employer"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave start"
                            placeholder="Sick leave start date"
                            name="sickLeaveStart"
                            component={TextField}
                        />
                        <Field
                            label="Sick leave end"
                            placeholder="Sick leave end date"
                            name="sickLeaveEnd"
                            component={TextField}
                        />

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
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

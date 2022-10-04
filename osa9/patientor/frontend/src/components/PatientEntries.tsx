import { DiagnoseState, Entry } from "../types";
import HealthCareEntry from "./HealthCareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";

export const findDiagnose = (
    code: string,
    diagnoses: DiagnoseState
): string | undefined => {
    return Object.values(diagnoses).find((diagnose) => diagnose.code === code)
        ?.name;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const PatientEntries = ({
    entry,
    diagnoses,
}: {
    entry: Entry;
    diagnoses: DiagnoseState;
}) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <HealthCareEntry entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

export default PatientEntries;

import patientEntries from "../../data/patientsData";
import { NewPatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitiveEntries = (): Omit<PatientEntry, "ssn">[] => {
    return patientEntries.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        id: uuid(),
        ...entry,
    };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getNonSensitiveEntries,
    addPatient,
};

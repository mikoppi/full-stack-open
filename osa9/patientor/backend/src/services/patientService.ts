import patientEntries from "../../data/patientsData";
import { NewPatientEntry, PatientEntry, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitiveEntries = (): Omit<PublicPatient, "ssn">[] => {
    return patientEntries.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries,
        })
    );
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const entries: string[] = [];
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        id: uuid(),
        ...entry,
        entries,
    };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getNonSensitiveEntries,
    addPatient,
};

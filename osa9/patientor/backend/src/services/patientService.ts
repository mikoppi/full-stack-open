import patientEntries from "../../data/patientsData";
import { Entry, NewPatientEntry, PatientEntry, PublicPatient } from "../types";
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
    const entries: Entry[] = [];
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        id: uuid(),
        ...entry,
        entries,
    };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (entry: Entry, id: string): Entry => {
    const patient: PatientEntry = patientEntries.find(
        (patient) => patient.id === id
    ) as PatientEntry;
    const { entries } = patient;
    const newEntry = {
        ...entry,
        id: uuid(),
    };
    entries.push(newEntry);
    return newEntry;
};

export default {
    getNonSensitiveEntries,
    addPatient,
    addEntry,
};

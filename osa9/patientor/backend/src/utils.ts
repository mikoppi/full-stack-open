import {
    Discharge,
    Entry,
    Gender,
    HealthCheckEntry,
    HealthCheckRating,
    HospitalEntry,
    NewPatientEntry,
    OccupationalHealthcareEntry,
    SickLeave,
} from "./types";
import { v1 as uuid } from "uuid";

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
    entries: Entry[];
};

const toNewPatientEntry = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
}: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: entries,
    };

    return newEntry;
};

export const toNewEntry = (object: {
    type: unknown;
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes: unknown;
    discharge?: unknown;
    employerName?: unknown;
    sickLeave?: unknown;
    healthCheckRating: unknown;
}): Entry => {
    const baseProperties = {
        type: parseType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        id: uuid(),
    };

    switch (baseProperties.type) {
        case "Hospital": {
            const hospitalTypeProperties: HospitalEntry = {
                ...baseProperties,
                type: "Hospital",
                discharge: parseDischarge(object.discharge),
            };
            return hospitalTypeProperties;
        }
        case "OccupationalHealthcare": {
            const healthCareProperties: OccupationalHealthcareEntry = {
                ...baseProperties,
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave),
            };
            return healthCareProperties;
        }
        case "HealthCheck": {
            const checkProperties: HealthCheckEntry = {
                ...baseProperties,
                type: "HealthCheck",
                healthCheckRating: parseRating(object.healthCheckRating),
            };
            return checkProperties;
        }
    }
};

const parseType = (type: unknown) => {
    if (type === "OccupationalHealthcare") {
        return "OccupationalHealthcare" as const;
    } else if (type === "Hospital") {
        return "Hospital" as const;
    } else if (type === "HealthCheck") {
        return "HealthCheck" as const;
    } else {
        throw "No valid entry type found";
    }
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }

    return specialist;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
    if (codes === undefined) return [] as string[];
    if (Array.isArray(codes) === false)
        throw new Error("Type should be undefined or array");
    if ((codes as string[]).some((code) => !isString(code)))
        throw new Error("All codes must be of string type");

    return codes as string[];
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (typeof discharge !== "object" || !discharge)
        throw new Error("Incorrect or missing discharge");
    if ("date" in discharge && "criteria" in discharge) {
        const dischargeObject = discharge as Discharge;
        return dischargeObject;
    } else {
        throw new Error("missing date and criteria");
    }
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (typeof sickLeave !== "object" || !sickLeave)
        throw new Error("Incorrect or missing sickleave");
    if ("startDate" in sickLeave && "endDate" in sickLeave) {
        const dischargeObject = sickLeave as SickLeave;
        return dischargeObject;
    } else {
        throw new Error("missing dates");
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseRating = (rating: any): HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (![0, 1, 2, 3].includes(rating)) {
        throw new Error("Incorrect or missing rating: " + rating);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rating;
};

// const parseId = (id: unknown): string => {
//     if (!id || !isString(id)) {
//         throw new Error("Incorrect or missing id");
//     }

//     return id;
// };

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employer name");
    }

    return employerName;
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }

    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};

export default toNewPatientEntry;

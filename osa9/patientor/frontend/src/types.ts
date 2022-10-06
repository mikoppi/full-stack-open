export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type DiagnoseState = { [code: string]: Diagnosis };

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}
export interface Discharge {
    date: string;
    criteria: string;
}

export type OccupationalEntryValues = Omit<
    BaseEntry,
    "id" | "diagnosisCodes"
> & {
    sickLeaveStart: string;
    sickLeaveEnd: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}

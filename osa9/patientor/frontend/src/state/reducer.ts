import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "SET_DIAGNOSES_LIST";
          payload: Diagnosis[];
      }
    | {
          type: "UPDATE_ENTRY";
          payload: { entry: Entry; id: string };
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "SET_DIAGNOSES_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnose) => ({
                            ...memo,
                            [diagnose.code]: diagnose,
                        }),
                        {}
                    ),
                    ...state.diagnoses,
                },
            };
        case "UPDATE_ENTRY":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: {
                        ...state.patients[action.payload.id],
                        entries: [
                            ...(state.patients[action.payload.id].entries ||
                                []),
                            action.payload.entry,
                        ],
                    },
                },
            };

        default:
            return state;
    }
};

export const setPatientList = (patientListFromApi: Patient[]) => ({
    type: "SET_PATIENT_LIST" as const,
    payload: patientListFromApi,
});

export const addPatient = (patient: Patient) => ({
    type: "ADD_PATIENT" as const,
    payload: patient,
});

export const setDiagnoseList = (diagnoses: Diagnosis[]) => ({
    type: "SET_DIAGNOSES_LIST" as const,
    payload: diagnoses,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEntry = (id: string, entry: any) => ({
    type: "UPDATE_ENTRY" as const,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    payload: { entry, id },
});

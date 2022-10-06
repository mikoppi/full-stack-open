/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { addPatient } from "../state/reducer";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import PatientEntries from "./PatientEntries";
import AddEntryForm from "./AddEntryForm";
import { updateEntry } from "../state/reducer";

const PatientInfo = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string | undefined }>();

    React.useEffect(() => {
        if (id !== undefined) {
            const fetchPatient = async () => {
                try {
                    const { data: newPatient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    void dispatch(addPatient(newPatient));
                } catch (e) {
                    console.error(e);
                }
            };
            void fetchPatient();
        }
    }, [dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const submitEntry = async (values: any) => {
        const form = {
            type: "OccupationalHealthcare",
            date: values.date,
            description: values.description,
            specialist: values.specialist,
            employerName: values.employerName,
            sickLeave: {
                startDate: values.sickLeaveStart,
                endDate: values.sickLeaveEnd,
            },
        };
        const data = await axios.post<Entry>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}/entries`,
            form
        );
        console.log(data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        id ? void dispatch(updateEntry(id, data.data)) : null;
    };

    const cancelForm = (): void => {
        console.log("canceled");
    };

    return (
        <>
            {id !== undefined ? (
                <div>
                    <h2>
                        {patients[id].name} ({patients[id].gender})
                    </h2>
                    <p>ssn: {patients[id].ssn}</p>
                    <p>occupation: {patients[id].occupation}</p>
                    <h2>entries</h2>
                    <div>
                        {patients[id].entries.map((entry) => (
                            <PatientEntries
                                key={entry.id}
                                entry={entry}
                                diagnoses={diagnoses}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
            <AddEntryForm onSubmit={submitEntry} onCancel={cancelForm} />
        </>
    );
};

export default PatientInfo;

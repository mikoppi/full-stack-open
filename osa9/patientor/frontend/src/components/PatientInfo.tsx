import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { addPatient } from "../state/reducer";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import PatientEntries from "./PatientEntries";

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
        </>
    );
};

export default PatientInfo;

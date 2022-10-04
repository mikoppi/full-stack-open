import { DiagnoseState, Entry } from "../types";
import { findDiagnose } from "./PatientEntries";
import { LocalHospital } from "@material-ui/icons";

const HospitalEntry = ({
    entry,
    diagnoses,
}: {
    entry: Entry;
    diagnoses: DiagnoseState;
}) => {
    return (
        <div style={{ border: "1px solid black", marginTop: "10px" }}>
            <p>
                <span>
                    {entry.date} <LocalHospital />
                </span>
            </p>
            <i>{entry.description}</i>

            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code} {findDiagnose(code, diagnoses)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HospitalEntry;

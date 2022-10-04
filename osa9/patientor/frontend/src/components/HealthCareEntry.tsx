import { DiagnoseState, Entry } from "../types";
import { findDiagnose } from "./PatientEntries";
import { Work } from "@material-ui/icons";

const HealthCareEntry = ({
    entry,
    diagnoses,
}: {
    entry: Entry;
    diagnoses: DiagnoseState;
}) => {
    return (
        <div style={{ border: "1px solid black", marginTop: "10px" }}>
            <div>
                {entry.date}
                <Work />
                <div>
                    <i>{entry.description}</i>
                </div>
            </div>
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

export default HealthCareEntry;

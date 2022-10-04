import { DiagnoseState, Entry } from "../types";
import { findDiagnose } from "./PatientEntries";
import { Favorite } from "@material-ui/icons";

const HealthCheckEntry = ({
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
                <Favorite />
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

export default HealthCheckEntry;

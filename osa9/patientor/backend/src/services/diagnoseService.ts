import diagnoseData from "../../data/diagnosesData";
import { diagnoseEntry } from "../types";

const diagnoses: Array<diagnoseEntry> = diagnoseData as Array<diagnoseEntry>;

const getDiagnoses = () => {
    return diagnoses;
};

export default {
    getDiagnoses,
};

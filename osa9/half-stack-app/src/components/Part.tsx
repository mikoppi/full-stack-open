import React from "react";
import { CoursePart } from "../App";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
        case "normal":
            return (
                <div>
                    <h2>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h2>
                    <p>{coursePart.description}</p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <h2>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h2>
                    <p>project exercises {coursePart.groupProjectCount}</p>
                </div>
            );
        case "submission":
            return (
                <div>
                    <h2>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h2>
                    <p>{coursePart.description}</p>
                    <p>submit to {coursePart.exerciseSubmissionLink}</p>
                </div>
            );

        case "special":
            return (
                <div>
                    <h2>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h2>
                    <p>{coursePart.description}</p>
                    <p>
                        required skills:
                        {coursePart.requirements.map((req) => (
                            <span key={req}> {req} </span>
                        ))}
                    </p>
                </div>
            );
        default:
            return assertNever(coursePart);
    }
};

export default Part;

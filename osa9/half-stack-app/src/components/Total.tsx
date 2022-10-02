/* eslint-disable @typescript-eslint/no-explicit-any */

import { CoursePart } from "../App";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {courseParts.reduce(
                    (carry: any, part: { exerciseCount: any }) =>
                        carry + part.exerciseCount,
                    0
                )}
            </p>
        </div>
    );
};

export default Total;

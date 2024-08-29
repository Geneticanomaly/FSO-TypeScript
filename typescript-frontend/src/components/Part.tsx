import { CoursePart } from '../App';
import { assertNever } from '../helper';

type PartProps = {
    part: CoursePart;
};

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case 'basic':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p style={{ marginTop: 0 }}>{part.description}</p>
                </div>
            );

        case 'group':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p style={{ marginTop: 0 }}>project exercises {part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p style={{ margin: 0 }}>{part.description}</p>
                    <p style={{ marginTop: 0 }}>{part.backgroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p style={{ margin: 0 }}>{part.description}</p>
                    <p style={{ marginTop: 0 }}>required skills: {part.requirements.join(', ')}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;

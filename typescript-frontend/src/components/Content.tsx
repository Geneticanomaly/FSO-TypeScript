import Part from './Part';
import { CoursePart } from '../App';

type ContentProps = {
    courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map((part, i) => (
                <Part key={i} part={part} />
            ))}
        </div>
    );
};

export default Content;

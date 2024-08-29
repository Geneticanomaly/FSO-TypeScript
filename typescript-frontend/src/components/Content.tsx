type CoursePart = {
    name: string;
    exerciseCount: number;
};

type ContentProps = {
    courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map((content, i) => (
                <p key={i}>
                    {content.name} {content.exerciseCount}
                </p>
            ))}
        </div>
    );
};

export default Content;

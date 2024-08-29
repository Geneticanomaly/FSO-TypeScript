type NotifyProps = {
    message: string;
};

const Notify = ({ message }: NotifyProps) => {
    return (
        <div style={{ color: 'red' }}>
            <p>{message}</p> <br />
        </div>
    );
};

export default Notify;

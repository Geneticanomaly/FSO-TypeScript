import ErrorIcon from '@mui/icons-material/Error';

type NotificationProps = {
    message: string;
};

const Notification = ({ message }: NotificationProps) => {
    return (
        <div
            style={{
                padding: 10,
                backgroundColor: '#FFD6D7',
                marginBottom: 20,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <ErrorIcon sx={{ color: 'red' }} /> <p style={{ marginLeft: 10, fontSize: 16 }}>{message}</p>
        </div>
    );
};

export default Notification;

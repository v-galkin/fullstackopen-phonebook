const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const { message, type } = notification;

  return (
    <div
      className={type === 'error' ? 'notificationError' : 'notificationSuccess'}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;

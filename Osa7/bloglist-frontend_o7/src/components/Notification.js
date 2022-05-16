import "./notification.css";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === null)
    return <p className={"notif hidden"}>hidden</p>;

  return (
    <p className={`notif ${notification.type ? "confirm" : "error"}`}>
      {notification.message}
    </p>
  );
};

export default Notification;

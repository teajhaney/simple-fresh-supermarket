import { useStateContext } from "../contexts/useStateContext";
const Notification = () => {
  const { notification } = useStateContext();

  return (
    <div
      className={`fixed -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-md shadow-md transition-transform duration-500 ${
        notification ? "translate-y-10" : "-translate-y-10"
      }`}
      style={{ zIndex: 1000, marginTop: "10px" }}>
      {notification}
    </div>
  );
};

export default Notification;

import not_found_img from "../../assets/not_found.png";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 126px)",
      }}
    >
      <img
        src={not_found_img}
        alt="/"
        style={{
          width: "90vw",
          maxWidth: "500px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default NotFound;

import { Bars } from "react-loader-spinner";

export function LoadingSpinner() {
  return (
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      wrapperClass=""
      visible={true}
    />
  );
}

import { Bars } from "react-loader-spinner";

export function LoadingSpinner({
  inline = false,
}: {
  inline?: boolean;
} = {}) {
  return (
    <Bars
      height={inline ? 48 : 80}
      width={inline ? 48 : 80}
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={
        inline
          ? {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
      }
      wrapperClass=""
      visible={true}
    />
  );
}

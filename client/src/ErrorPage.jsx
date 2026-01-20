import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div>Page not found! Click <Link to="/">here</Link> to go back home</div>
    </>
  );
};

export default ErrorPage;

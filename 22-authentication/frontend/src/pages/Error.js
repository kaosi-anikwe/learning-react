import { Link, useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </PageContent>
    </>
  );
}

export default ErrorPage;

import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();

  const { data, state } = fetcher;

  const isSubmitting = state === "submitting";

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert("Sign up successful!");
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign up"}
      </button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;

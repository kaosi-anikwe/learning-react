import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import Modal from "../UI/Modal.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: event,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  const {
    mutate,
    isPending: deleteIsPending,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    if (window.confirm("Are you sure?")) {
      mutate({ id: params.id });
    }
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to load event details."}
        />
      </div>
    );
  }

  if (event) {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    content = (
      <>
        {isDeleting && (
          <Modal onClose={handleStopDelete}>
            <h2>Are you sure?</h2>
            <p>
              Do you really want to delete this event? This cannot be undone.
            </p>
            <div className="form-actions">
              {deleteIsPending && <p>Deleting, please wait...</p>}
              {!deleteIsPending && (
                <>
                  <button className="button-text" onClick={handleStopDelete}>
                    Cancel
                  </button>
                  <button className="button" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
            </div>
            {deleteIsError && (
              <ErrorBlock
                title="Failed to delete event."
                message={
                  deleteError.info?.messasge ||
                  "Failed to delete event, please try again later."
                }
              />
            )}
          </Modal>
        )}
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {event.time}
              </time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}

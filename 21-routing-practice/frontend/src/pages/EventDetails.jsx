import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

export default function EventDetailsPage() {
  const { event, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected event.",
      }),
      { status: 500 }
    );
  }
  const resData = await response.json();
  return resData.event;
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to load events" }), {
      status: 500,
    });
  }
  const resData = await response.json();
  return resData.events;
}

export async function loader({ params }) {
  const eventId = params.eventId;

  return {
    event: await loadEvent(eventId),
    events: loadEvents(),
  };
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not delete event.",
      }),
      { status: 500 }
    );
  }
  return redirect("/events");
}

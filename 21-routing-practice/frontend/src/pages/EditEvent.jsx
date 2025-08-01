import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage() {
  const data = useRouteLoaderData("event-details");

  return <EventForm method="patch" event={data.event} />;
}

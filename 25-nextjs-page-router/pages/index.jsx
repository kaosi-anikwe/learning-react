import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://img.peerspace.com/image/upload/ar_1.5,c_fill,g_auto,f_auto,q_auto,dpr_auto,w_3840/vgjeil9zoflvx2ec0ugu",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://img.peerspace.com/image/upload/ar_1.5,c_fill,g_auto,f_auto,q_auto,dpr_auto,w_3840/vgjeil9zoflvx2ec0ugu",
    address: "Some address 15, 12345 Some City",
    description: "This is a second meetup!",
  },
];

export default function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

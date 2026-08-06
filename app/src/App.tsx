function App() {
  const ENTRIES = [
    {
      id: 1,
      media_id: 1,
      source: "",
      title: "Baby Driver",
      release_date: new Date("March 11 2017"),
      start_date: new Date("July 7 2026"),
      finish_date: new Date("July 7 2026"),
      last_edited_date: new Date("August 8 2026"),
      status: "completed",
      progress: 115,
      total_length: 115,
      progress_type: "minutes",
      user_rating: 10,
      review: "",
      liked: true,
    },
    {
      id: 2,
      media_id: 2,
      source: "",
      title: "Neuromancer",
      release_date: new Date("March 11 2017"),
      start_date: new Date("July 7 2026"),
      last_edited_date: new Date("August 8 2026"),
      status: "in-progress",
      progress: 5,
      total_length: 24,
      progress_type: "chapters",
      liked: false,
    },
    {
      id: 3,
      media_id: 23,
      source: "",
      title: "Minecraft",
      release_date: new Date("March 11 2017"),
      start_date: new Date("July 7 2016"),
      finish_date: new Date("February 6 2026"),
      last_edited_date: new Date("July 10 2026"),
      status: "completed",
      progress: 100,
      total_length: 100,
      progress_type: "percent",
      user_rating: 9,
      review: "I Love Minecraft",
      liked: true,
    },
    {
      id: 4,
      media_id: 14,
      source: "",
      title: "Squid Game S1",
      release_date: new Date("September 12 2011"),
      start_date: new Date("July 7 2026"),
      finish_date: new Date("August 25 2026"),
      last_edited_date: new Date("June 31 2026"),
      status: "dropped",
      progress: 2,
      total_length: 9,
      progress_type: "episodes",
      user_rating: 1,
      review: "",
      liked: true,
    },
  ];

  return (
    <>
      <main>
        <section id="diary">
          {/* Eventually we'll need to add the thumb URL. Once we connect the API. Make sure to change finish date to last edited date */}
          <ul id="entries">
            <li className="entry">
              <p>{ENTRIES[0].last_edited_date.toDateString()}</p>
              <p>{ENTRIES[0].title}</p>
              <p>{ENTRIES[0].status}</p>
              <p>{ENTRIES[0].progress}</p>
              <p>{ENTRIES[0].user_rating}</p>
              <p>{ENTRIES[0].liked}</p>
            </li>
            <li className="entry">
              <p>{ENTRIES[1].last_edited_date.toDateString()}</p>
              <p>{ENTRIES[1].title}</p>
              <p>{ENTRIES[1].status}</p>
              <p>{ENTRIES[1].progress}</p>
              <p>{ENTRIES[1].user_rating}</p>
              <p>{ENTRIES[1].liked}</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;

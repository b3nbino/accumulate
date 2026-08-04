function App() {
  const ENTRIES = [
    {
      id: 1,
      db_id: 1,
      title: "Baby Driver",
      release_date: "March 11th, 2017",
      start_date: "July 7th, 2026",
      finish_date: "July 7th, 2026",
      status: "completed",
      progress: "100%",
      user_rating: 10,
      review: "",
      liked: true,
      tags: ["soundtrack", "driving"],
    },
    {
      id: 2,
      db_id: 2,
      title: "Neuromancer",
      release_date: "March 11th, 2017",
      start_date: "July 7th, 2026",
      status: "completed",
      progress: "5%",
      liked: false,
      tags: ["cyberpunk", "gritty"],
    },
    {
      id: 3,
      db_id: 23,
      title: "Minecraft",
      release_date: "March 11th, 2017",
      start_date: "July 7th, 2016",
      finish_date: "February 6th, 2026",
      status: "completed",
      progress: "100%",
      user_rating: 10,
      review: "I Love Minecraft",
      liked: true,
      tags: ["soundtrack", "sandbox", "nostalgic"],
    },
    {
      id: 4,
      db_id: 14,
      title: "Squid Game",
      release_date: "September 12th, 2011",
      start_date: "July 7th, 2026",
      finish_date: "August 25th, 2026",
      status: "completed",
      progress: "100%",
      user_rating: 9,
      review: "",
      liked: true,
      tags: ["korean", "death games"],
    },
  ];

  return (
    <>
      <main>
        <section id="diary">
          {/* Eventually we'll need to add the thumb URL. Once we connect the API. Make sure to change finish date to last edited date */}
          <ul id="entries">
            <li className="entry">
              <p>{ENTRIES[0].finish_date}</p>
              <p>{ENTRIES[0].title}</p>
              <p>{ENTRIES[0].status}</p>
              <p>{ENTRIES[0].progress}</p>
              <p>{ENTRIES[0].user_rating}</p>
              <p>{ENTRIES[0].liked}</p>
            </li>
            <li className="entry">
              <p>{ENTRIES[1].finish_date}</p>
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

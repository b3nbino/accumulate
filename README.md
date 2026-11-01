# :seedling: Accumulate

## :scroll: Preface

This is a project that I'm creating to help **sharpen** and **showcase** my abilities writing code and developing web apps **WITHOUT AI**. If you're looking for a project of mine that did involve some AI assisted development, checkout [Chunkwise](https://github.com/Chunkwise/chunkwise).

## :ledger: Introduction

Accumulate is a media tracker for logging games, TV shows, movies, and books. My end goal is to have a one stop shop for all kinds of media, possibly even including things like Comics/Manga, Podcasts,

## :hammer: Tools/Technologies

I'll do my best to keep an up to date list of the technologies that I use, the project instructions, and any other relevant information. Since I'm just starting here's a list of things that I plan to use:

**:open_file_folder: Backend**:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/14/index.html)

**:open_file_folder: Frontend**:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
  - [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/)

**:cloud: Cloud**: TBD

**:alien: Other**:

- [Git](https://git-scm.com/)/[GitHub](https://github.com/) (of course)
- [Linux](https://www.linux.org/)
- [Node Package Manager (NPM)](https://www.npmjs.com/)
- [VS Code](https://code.visualstudio.com/)

## :clipboard: Planned Features

- [x] RESTful API
- [ ] Responsive frontend
- [ ] Relational database storage
  - [ ] [Current ERD](https://excalidraw.com/#json=C__3hdQRyS6CVFnNQ-vh-,U1u-CudI9DGr4sFwLEucBg)
- [ ] Third party API integration
  - [ ] [The Movie Database](https://developer.themoviedb.org/reference/collection-details)
- [ ] User accounts/sessions
  - [ ] JWT Tokens?
- [ ] Polished styling
- [ ] Automated testing
  - [ ] Unit
  - [ ] Integration
  - [ ] End-to-end

## :question: Possible Features

- [ ] Publicly accessible cloud hosted website
- [ ] Shareable lists
- [ ] Infrastructure as Code files, CLI, EXE, or app (some kind of easy setup)
- [ ] AI Chatbot

## :page_with_curl: Instructions

To check out the current progress for yourself (assuming you have Node & NPM, and PSQL installed):

1.  Clone the repo.
2.  Install packages for the app and server directories (they are separate).
3.  Create the database:
    a. Use `createdb accumulate`
    b. From the root directory run `psql accumulate < ./server/database/entries_table.sql`
    c. From the root directory run `psql accumulate < ./server/database/entries_example_data.sql`
    d. If you have custom psql credentials, you may need to update the username and password in `/server/src/utils/pgQuery.js`, otherwise the app won't be able to connect to the database.
4.  Navigate to the app and server directories and run "npm run dev" or alternatively "npm run build" then "npm start".
    a. The frontend (app) needs the backend (server) to be live for it render anything.

## Next Steps

- Clean-up my Diary and CreateEntryModal code!!!
  - Add comments
  - Review typing
  - Use const more
  - More granular React components
- More functions
  - Extract new entry data transformation into a function on server
  - Could make function to extract newEntry properties for createEntry or use dynamic creation like with updateEntry (Should be safe enough when using Zod)
  - Add returning statement to patch endpoint queries, instead of making an extra call (see createEntry)
- Add creation and deletion through app
  - Add button at the bottom of the page
    - Modal popup form for creation
    - Submission function
    - Reset function for when closing modal
  - Details modal for existing entries
    - Let's users update in detail
      - Changing the name/progress/progress type/start/finish/status/length
      - Rating and reviewing
    - Entry deletion
- Add frontend validation
- Consider reworking entry type property names
  - Also, use more general terms. Not everything is watching
  - De-capitalize media types
- Handle zero entries case on frontend
- Handle many entries case
  - Pagination?
  - Infinite scroll?
  - Is it needed?
- Update frontend to use either API response or new fetches, rather than updating directly.
- Think about adding status to entries visually
- Fix catch blocks to improve error handling
  - Maybe improve the global error handler and use it to send error responses based on Error Types
- Improve runtime validation using Zod
- Use dotenv for app config
- Create tests for unit, end-to-end, and maybe integration
- Connect third party API with movies, probably TMDB
- Improve app styling
- Custom types should be able to include a custom color choice

## Other Tools/References

- [Markdown editor](https://stackedit.io/app#)
- [Font Awesome](https://fontawesome.com/)

## Current Frontend

![Diary view](https://lh3.googleusercontent.com/pw/AP1GczNgUS2aXh1a6TJoZ0xEWMRKfMljlMwcPX55FgKiRUPrA9cLvX7hjJyBOhpeMQfpWq_kEfUq4XFB14h7EpAS99BuVSvnbS0d_tpZLhDxTjp5jT_yB2Og_Cvqpr8dK6Egbr1cdjfTSG3-jZSE2KtYBlk=w1016-h732-s-no-gm?authuser=0)

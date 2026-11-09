# AGENTS.md

## Project description

KATI is a web app that keeps track the list of user list of lectures! All lectures are displayed in an infinite list (each list's element is a book that has a title, its author and a read status).

User can run searches both by user or author, change book's read status, delete a book when it selects a book; in order to add a new title it has to open the "add menu" and provide both title and author.

KATI allows the user to share the book list between devices thanks to Google Drive, when a users login for the first time, KATI creates an application inside the user's Google Drive account, since that moment the user can have the list synchronized between all the devices he wants.

KATI is made with React and JS and small pieces of Elm (a language that I'm learning and starting to add) and styles are done on plain CSS, it relays on Vite both for running and testing and Eslint for linting the code.

## Critical Rules

- **Never auto-commit** — always wait for explicit user instruction
- **Never run or build the project** - always wait user to start or build the project
- **Do not remove files without confirmation** - always await for user confirmation
- **Do not install dependencies without user's approval** - always ask before adding new dependencies
- **Do not make irreversible actions** - always ask before making this kind of actions
- **Do not add code on languages different from JS or ElM** - I do not want to work with TypeScript or any other front-end language
- **Do not add any framework or front-end library besides Reaact** - React is the only front-end library
- **Do not add any CSS framework or tool** - always use vanilla CSS
# Berlin guide client

## Summary
Berlin Guide is a full-stack web application that helps people explore activities in Berlin and log what they did during their visit.  

The purpose of building this project was to practice and deepen knowledge in:
1. **TypeScript** – for type-safety and maintainability  
2. **Postgres / Prisma** – for relational data modeling and querying  
3. **Material UI** – exploring a wide range of UI components  

👉 **Live App:** [https://berlinguide.netlify.app](https://berlinguide.netlify.app)  
👉 **Server Repository:** [berlin-guide-server](https://github.com/dillanDataNerd/berlin-guide-server)  

---

## Technologies and Libraries Used
- **React (with Vite + TypeScript)** – frontend framework and tooling  
- **Material UI (MUI)** – UI library and components  
- **Axios** – HTTP client for API calls  
- **React Router** – routing and navigation  
- **UUID** – unique identifiers on the client side  
- **ESLint / Prettier** – linting and formatting  

---

## User Stories
- As a visitor, I want to **see a list of trips** so I can recall or plan my experiences.  
- As a visitor, I want to **create a trip** with details (guests, start date, highlights, photo) so I can log my Berlin visit.  
- As a visitor, I want to **browse activities** so I can find things to do.  
- As a visitor, I want to **filter activities** by tags or favorites so I can quickly find relevant options.  
- As a visitor, I want to **add activities to my trip** so I can plan my itinerary.  
- As a visitor, I want to **view trip details** in a drawer or detail page.  
- As a visitor, I want to **delete or edit trips** if plans change.  

---

## Client Routes
Defined in `src/pages` and using **React Router**:  

- `/` – Home page / landing  
- `/trips` – List of all trips  
- `/trips/:id` – Trip detail page (activities, info, guests)  
- `/activities` – List of all activities  
- `/activities/:id` – Activity detail page  
- `/new-trip` – Create a new trip form  
- `/new-activity` – Create a new activity form  

---

## Components
Key components inside `src/components`:  

- **HeaderBar** – top navigation bar  
- **TripCard** – displays trip summary (image, title, date)  
- **ActivityCard** – displays activity summary (photo, title, description, tags)  
- **TripForm** – form for creating/editing trips  
- **ActivityForm** – form for creating/editing activities  
- **SearchBar** – filters activities by title, tags, and favorites  
- **Drawer** – trip details displayed in a side drawer  
- **NewElementCard** – card that links to add a new trip or activity  

---

## Client Feature Backlog
- Add authentication and user login  
- Enable image upload instead of placeholder images  
- Advanced map view of activities (using latitude/longitude)  
- Rating and review system for activities  
- Ability to share trips with friends via unique links  

---


Images I used/
<a href="https://www.flaticon.com/free-icons/berlin-wall" title="berlin wall icons">Berlin wall icons created by Freepik - Flaticon</a>
Photo by <a href="https://unsplash.com/@florianwehde?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Florian Wehde</a> on <a href="https://unsplash.com/photos/city-buildings-near-body-of-water-during-daytime-1uWanmgkd5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

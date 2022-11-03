import './App.css';
import {EventsPage} from './pages/eventPage';
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Events</h1>
          <Link to="events">Add events</Link>
        </div>
      ),
    },
    {
      path: "events",
      element: <EventsPage/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;

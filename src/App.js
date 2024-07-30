import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Error from "./ui/Error";
const Segment = lazy(() => import("./features/segment/Segment"));

// import Segment from "./features/segment/Segment";

function App() {
  const router = createBrowserRouter([
    {
      element: <Segment />,
      errorElement: <Error />,
      children: [{ path: "/", element: <Segment /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

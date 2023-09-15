import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/Home";
import Something from "./pages/MovieDetail";
import Search, {loader as searchLoader} from "./pages/Search";
import MovieDetail, {loader as movieDetailLoader} from "./pages/MovieDetail";
import Layout, { loader as layoutLoader } from "./pages/Layout";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} loader={layoutLoader} errorElement={<Error />}>
        <Route index element={<Home />} loader={homeLoader} />
        <Route path="search/:movie" element={<Search />} loader={searchLoader}/>
      </Route>
      <Route path="/movies/:id" element={<MovieDetail  />} loader={movieDetailLoader} errorElement={<Error />} />
      <Route path="/favorites" element={<Favorites />} errorElement={<Error />} />
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

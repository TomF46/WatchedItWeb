import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import AdminRoute from "./adminRoute";
import AuthenticatedRoute from "./authenticatedRoute";
import Header from "./components/Header/Header";
import List from "./pages/lists/List";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddCreditForFilm from "./pages/films/credits/AddCreditForFilm";
import FilmCredits from "./pages/films/credits/FilmCredits";
import Film from "./pages/films/Film";
import Films from "./pages/films/Films";
import ManageFilm from "./pages/films/manage/ManageFilm";
import Home from "./pages/Home";
import Lists from "./pages/lists/Lists";
import ManageList from "./pages/lists/manage/ManageList";
import AddCreditForPerson from "./pages/people/credits/AddCreditForPerson";
import PersonCredits from "./pages/people/credits/PersonCredits";
import ManagePerson from "./pages/people/manage/ManagePerson";
import People from "./pages/people/People";
import Person from "./pages/people/Person";
import Profile from "./pages/profile/Profile";
import WatchedList from "./pages/profile/WatchedList";
import NotFound from "./pages/status/NotFound";
import AddFilmToList from "./pages/lists/manage/AddFilmToList";
import EditCredit from "./pages/credits/manage/EditCredit";
import Reviews from "./pages/films/reviews/reviews";
import ManageReview from "./pages/films/reviews/ManageReview";
import Review from "./pages/films/reviews/Review";
import Categories from "./pages/categories/Categories";
import Category from "./pages/categories/Category";
import ManageCategory from "./pages/categories/manage/ManageCategory";
import ManageProfile from "./pages/profile/manage/ManageProfile";
import UsersReviews from "./pages/profile/reviews/usersReviews";
import UserLikes from "./pages/profile/UserLikes";
import Notifications from "./pages/notifications/Notifications";
import FilmTrivia from "./pages/films/trivia/FilmTrivia";
import ManageFilmTrivia from "./pages/films/trivia/ManageFilmTrivia";
  
  const App = () => {
    return (
      <>
      <div className="bg-background">
        <Header />
        <div className="app-container container mx-auto px-4 lg:px-0 mb-4">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/films/:id/reviews/:reviewId/edit" element={<AuthenticatedRoute><ManageReview /></AuthenticatedRoute>}/>
            <Route path="/films/:id/reviews/add" element={<AuthenticatedRoute><ManageReview /></AuthenticatedRoute>}/>
            <Route path="/films/:id/reviews/:reviewId" element={<Review />}/>
            <Route path="/films/:id/reviews" element={<Reviews />}/>
            <Route path="/films/:id/trivia/:triviaId/edit" element={<AuthenticatedRoute><ManageFilmTrivia /></AuthenticatedRoute>}/>
            <Route path="/films/:id/trivia/add" element={<AuthenticatedRoute><ManageFilmTrivia /></AuthenticatedRoute>}/>
            <Route path="/films/:id/trivia" element={<FilmTrivia />}/>
            <Route path="/films/:id/credits/add" element={<AdminRoute><AddCreditForFilm /></AdminRoute>}/>
            <Route path="/films/:id/credits/:creditId/edit" element={<AdminRoute><EditCredit /></AdminRoute>}/>
            <Route path="/films/:id/credits" element={<FilmCredits />}/>
            <Route path="/films/:id/edit" element={<AdminRoute><ManageFilm /></AdminRoute>}/>
            <Route path="/films/add" element={<AdminRoute><ManageFilm /></AdminRoute>}/>
            <Route path="/films/:id" element={<Film />}/>
            <Route path="/films" element={<Films />}/>
            <Route path="/people/:id/credits/add" element={<AdminRoute><AddCreditForPerson /></AdminRoute>}/>
            <Route path="/people/:id/credits/:creditId/edit" element={<AdminRoute><EditCredit /></AdminRoute>}/>
            <Route path="/people/:id/credits" element={<PersonCredits />}/>
            <Route path="/people/:id/edit" element={<AdminRoute><ManagePerson /></AdminRoute>}/>
            <Route path="/people/add" element={<AdminRoute><ManagePerson /></AdminRoute>}/>
            <Route path="/people/:id" element={<Person />}/>
            <Route path="/people" element={<People />}/>
            <Route path="/lists/:id/add" element={<AuthenticatedRoute><AddFilmToList /></AuthenticatedRoute>}/>
            <Route path="/lists/:id/edit" element={<AuthenticatedRoute><ManageList /></AuthenticatedRoute>}/>
            <Route path="/lists/add" element={<AuthenticatedRoute><ManageList /></AuthenticatedRoute>}/>
            <Route path="/lists/:id" element={<List />}/>
            <Route path="/lists" element={<Lists />}/>
            <Route path="/profile/:id/likes" element={<UserLikes />}/>
            <Route path="/profile/likes/" element={<AuthenticatedRoute><UserLikes /></AuthenticatedRoute>}/>
            <Route path="/profile/:id/watched" element={<WatchedList />}/>
            <Route path="/profile/watched" element={<AuthenticatedRoute><WatchedList /></AuthenticatedRoute>}/>
            <Route path="/profile/:id/reviews" element={<UsersReviews />}/>
            <Route path="/profile/reviews" element={<AuthenticatedRoute><UsersReviews /></AuthenticatedRoute>}/>
            <Route path="/profile/edit" element={<AuthenticatedRoute><ManageProfile /></AuthenticatedRoute>}/>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>}/>
            <Route path="/notifications" element={<AuthenticatedRoute><Notifications /></AuthenticatedRoute>}/>
            <Route path="/categories/add" element={<AdminRoute><ManageCategory /></AdminRoute>}/>
            <Route path="/categories/:id/edit" element={<AdminRoute><ManageCategory /></AdminRoute>}/>
            <Route path="/categories/:id" element={<Category />}/>
            <Route path="/categories" element={<Categories />}/>
            <Route path="/404" element={<NotFound />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
      </>
    )
  };
  
  export default App;

import "./App.scss";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BlankPage from "./pages/BlankPage";
import RegisterPage from "./pages/authPage/RegisterPage";
import LogInPage from "./pages/authPage/LogInPage";
import SingleWordBaseLayout from "./layouts/singleWordBaseLayout/SingleWordBaseLayout";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import MainPage from "./pages/mainPage/MainPage";
import WordbasesLayout from "./layouts/wordbasesLayout/WordbasesLayout";
import {
  choiceLoader,
  confirmLoader,
  connectLoader,
  exampleConnectLoader,
  exampleFlashcardsLoader,
  exampleInsertLoader,
  exampleMultipleChoiceLoader,
  flashcardsLoader,
  homeLoader,
  insertLoader,
  practiceLoader,
  randomLoader,
  sidebarLoader,
  singleWordBaseLoader,
  wordbasesLoader,
} from "./utils/loaders/loaders";
import PracticeLayout from "./layouts/practiceLayout/PracticeLayout";
import FlashcardsLayout from "./layouts/practice/flashcards/FlashcardsLayout";
import MultipleChoiceLayout from "./layouts/practice/choice/MultipleChoiceLayout";
import InsertLayout from "./layouts/practice/insert/InsertLayout";
import ConnectLayout from "./layouts/practice/connect/ConnectLayout";
import FinishedLayout from "./layouts/practice/finshed/FinishedLayout";
import ChoicePractice from "./layouts/practice/choice/ChoicePractice";
import ConnectPractice from "./layouts/practice/connect/ConnectPractice";
import InsertPractice from "./layouts/practice/insert/InsertPractice";
import RandomPractice from "./layouts/practice/random/RandomPractice";
import ConfirmPage from "./pages/confirm/ConfirmPage";
import EmailSentPage from "./pages/confirm/EmailSentPage";
import AboutUsLayout from "./layouts/about/AboutUsLayout";
import ExamplePracticeLayout from "./layouts/examplePractice/ExamplePracticeLayout";
import ExampleMultipleChoice from "./layouts/examplePractice/ExampleMultipleChoice";
import ProfileLayout from "./layouts/profile/ProfileLayout";
import ErrorPage from "./pages/mainPage/ErrorPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BlankPage />} errorElement={<ErrorPage />}>
        <Route path="login" element={<LogInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} loader={sidebarLoader}>
          <Route path="/" element={<HomeLayout />} loader={homeLoader} />
          <Route path="profile" element={<ProfileLayout />} />
          <Route
            path="wordbases"
            element={<WordbasesLayout />}
            loader={wordbasesLoader}
          />
          <Route
            path="wordbase/:name"
            element={<SingleWordBaseLayout />}
            loader={singleWordBaseLoader}
          />
          <Route path="example" element={<ExamplePracticeLayout />}>
            <Route
              path="flashcards"
              element={<FlashcardsLayout />}
              loader={exampleFlashcardsLoader}
            />
            <Route
              path="choice"
              element={<ExampleMultipleChoice />}
              loader={exampleMultipleChoiceLoader}
            />
            <Route
              path="insert"
              element={<InsertPractice />}
              loader={exampleInsertLoader}
            />
            <Route
              path="connect"
              element={<ConnectPractice />}
              loader={exampleConnectLoader}
            />
          </Route>
          <Route path="about" element={<AboutUsLayout />} />
          <Route path="practice">
            <Route
              path=""
              element={<PracticeLayout />}
              loader={practiceLoader}
            />
            <Route
              path="flashcards"
              element={<FlashcardsLayout />}
              loader={flashcardsLoader}
            />
            <Route
              path="choice"
              element={<ChoicePractice />}
              loader={choiceLoader}
            />
            <Route
              path="insert"
              element={<InsertPractice />}
              loader={insertLoader}
            />
            <Route
              path="connect"
              element={<ConnectPractice />}
              loader={connectLoader}
            />
            <Route
              path="random"
              element={<RandomPractice />}
              loader={randomLoader}
            />
            {/* <Route
              path="test"
              element={
                <FinishedLayout
                  results={{
                    wordbases: [
                      {
                        name: "animals",
                        maxScore: 20,
                        score: 15,
                      },
                      {
                        name: "colors",
                        maxScore: 10,
                        score: 10,
                      },
                    ],
                    time: 68,
                    type: "choice",
                  }}
                />
              }
            /> */}
          </Route>
          <Route path="/settings" element={<div>Settings</div>} />
        </Route>
        <Route
          path="/confirm/:token"
          element={<ConfirmPage />}
          loader={confirmLoader}
        />
        <Route path="/emailSent" element={<EmailSentPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

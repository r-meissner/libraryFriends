import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-4">
        Oops! We looked everywhere but couldn’t find it.
      </p>
      <p className="text-lg text-gray-600 mb-8">
        Maybe it’s hiding... or maybe it never existed. Either way, don’t panic!
      </p>
      <div className="mb-8">
        <img
          src="https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif"
          alt="Funny error"
          className="w-80 rounded-lg shadow-lg"
        />
      </div>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Let’s go home before things get awkward.
      </Link>
    </div>
  );
};

export default ErrorPage;

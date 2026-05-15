import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700">
          Telemedicine System
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Online Healthcare &
          Consultation Platform
        </p>

        <Link to="/login">
          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition">
            Login
          </button>
          <Link to="/register">
  <button className="bg-white text-blue-700 border border-blue-700 px-8 py-3 rounded-xl">
    Register
  </button>
</Link>
        </Link>
      </div>
    </div>
  );
};

export default Home;
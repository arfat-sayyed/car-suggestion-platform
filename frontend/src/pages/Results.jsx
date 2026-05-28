import { useLocation, Navigate, useNavigate } from 'react-router-dom';

import RecommendationCard from '../components/RecommendationCard';

function Results() {
  const location = useLocation();

  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const cars = location.state?.cars;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-slate-900">
            Your Perfect Cars 🚗
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            We found the best cars based on your lifestyle and priorities.
          </p>
        </div>

        {!cars?.length ? (
          <div className="rounded-4xl bg-white p-12 text-center shadow-md">
            <h2 className="text-2xl font-bold">No Cars Found</h2>

            <p className="mt-3 text-slate-500">
              Try increasing budget or changing preferences.
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02]"
            >
              ← Back to Preferences
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {cars.map((car) => (
              <RecommendationCard key={car.id} car={car} />
            ))}
            <div>
              <button
                onClick={() => navigate('/')}
                className="mt-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02]"
              >
                ← Back to Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Results;

import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import RecommendationCard from '../components/RecommendationCard';

function Results() {
  const location = useLocation();

  const cars = location.state?.cars || [];

  if (!cars.length) {
    return <Navigate to="/" />;
  }

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

        {!cars.length ? (
          <div className="rounded-4xl bg-white p-12 text-center shadow-md">
            <h2 className="text-2xl font-bold">No Cars Found</h2>

            <p className="mt-3 text-slate-500">
              Try changing your preferences.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {cars.map((car) => (
              <RecommendationCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Results;

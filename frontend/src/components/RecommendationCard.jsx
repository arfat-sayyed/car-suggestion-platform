import carImages from '../utils/carImages';

function RecommendationCard({ car }) {
  const image =
    carImages[car.model] ||
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="overflow-hidden rounded-4xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="h-100 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={car.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{car.name}</h2>

            <p className="mt-1 text-slate-500">
              {car.fuelType} • {car.transmission}
            </p>
          </div>

          <div className="rounded-2xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            {car.score}% Match
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-700">
          <span>💰 ₹{(car.price)}L</span>

          <span>⛽ {car.mileage}</span>

          <span>🛡️ {car.safetyRating}/5</span>

          <span>👨‍👩‍👧 {car.seatingCapacity} Seater</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {car.features?.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
            >
              {feature
                .replaceAll('_', ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          {car.matchReason?.map((reason) => (
            <div
              key={reason}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <span>✅</span>

              {reason}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;

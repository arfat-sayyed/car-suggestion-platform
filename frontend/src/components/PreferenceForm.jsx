import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRecommendations } from '../services/recommendation.service';
import { getPreferencesMeta } from '../services/meta.service';

function PreferenceForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [meta, setMeta] = useState({
    fuelTypes: [],
    transmissions: [],
    bodyTypes: [],
    usageTypes: [],
    priorities: [],
  });

  const [formData, setFormData] = useState({
    budget: '',
    fuelType: '',
    transmission: '',
    familySize: '',
    bodyType: '',
    usage: '',
    priorities: [],
  });

  useEffect(() => {
    getPreferencesMeta()
      .then((response) => {
        setMeta(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriorityClick = (priority) => {
    const exists = formData.priorities.includes(priority);

    setFormData({
      ...formData,
      priorities: exists
        ? formData.priorities.filter((item) => item !== priority)
        : [...formData.priorities, priority],
    });
  };

  const handleUsageClick = (usage) => {
    setFormData({
      ...formData,
      usage,
    });
  };

  const handleSubmit = () => {
    if (loading) {
      return;
    }
    if (!formData.budget) {
      alert('Please enter budget');
      return;
    }

    if (!formData.usage) {
      alert('Please select primary usage');
      return;
    }

    if (!formData.familySize) {
      alert('Please enter family size');
      return;
    }
    setLoading(true);

    const payload = {
      ...formData,
      budget: Number(formData.budget),
      familySize: formData.familySize ? Number(formData.familySize) : null,
    };

    return getRecommendations(payload)
      .then((response) => {
        navigate('/results', {
          state: {
            cars: response.data.data,
          },
        });
      })
      .catch((error) => {
        console.error(error);

        alert('Something went wrong. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="relative">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-white/30 bg-white/75 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/80 px-5 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            🚗 Smart Car Recommendation Platform
          </div>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
            Find Your
            <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
              {' '}
              Perfect Car
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Tell us your budget, lifestyle, and preferences — we’ll instantly
            shortlist the best cars for you.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Budget (Lakhs)
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Eg. 15"
              className="h-14 w-full rounded-3xl border border-slate-200 bg-white/80 px-5 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Fuel Type
            </label>

            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="h-14 w-full rounded-3xl border border-slate-200 bg-white/80 px-5 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select Fuel Type</option>

              {meta.fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Body Type
            </label>

            <select
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              className="h-14 w-full rounded-3xl border border-slate-200 bg-white/80 px-5 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select Body Type</option>

              {meta.bodyTypes?.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                  {bodyType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Transmission
            </label>

            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="h-14 w-full rounded-3xl border border-slate-200 bg-white/80 px-5 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select Transmission</option>

              {meta.transmissions.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Family Size
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              name="familySize"
              type="number"
              value={formData.familySize}
              onChange={handleChange}
              placeholder="Eg. 5"
              className="h-14 w-full rounded-3xl border border-slate-200 bg-white/80 px-5 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-10">
          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Primary Usage
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-3">
            {meta.usageTypes?.map((usage) => (
              <button
                key={usage}
                type="button"
                onClick={() => handleUsageClick(usage)}
                className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${
                  formData.usage === usage
                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
              >
                {usage}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Priorities
          </label>

          <div className="flex flex-wrap gap-3">
            {meta.priorities.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => handlePriorityClick(priority)}
                className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${
                  formData.priorities.includes(priority)
                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-12 w-full rounded-[28px] bg-linear-to-r from-blue-600 to-cyan-500 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl disabled:opacity-60"
        >
          {loading ? 'Finding Your Perfect Car...' : 'Find My Perfect Car →'}
        </button>
      </div>
    </section>
  );
}

export default PreferenceForm;

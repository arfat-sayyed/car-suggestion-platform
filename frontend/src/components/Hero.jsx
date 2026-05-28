function Hero() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Smart Car Buying Assistant 🚗
        </span>

        <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
          Find Your Perfect Car
          <span className="text-blue-600">
            {' '}
            in Minutes
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Stop feeling confused by too many
          options. Tell us your needs and get
          a personalized shortlist of cars that
          truly fit your lifestyle.
        </p>
      </div>
    </section>
  );
}

export default Hero;
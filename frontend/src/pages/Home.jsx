import Hero from '../components/Hero';
import PreferenceForm from '../components/PreferenceForm';

function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <PreferenceForm />
      </section>
    </main>
  );
}

export default Home;
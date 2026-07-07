import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <section className="bg-blue-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Learn Skills. Build Your Career.
          </h1>

          <p className="text-xl mb-8">
            India's Modern Learning Platform for Students & Professionals.
          </p>

          <div className="flex justify-center gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p>Courses</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p>Students</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">50+</h2>
              <p>Instructors</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
              Explore Courses
            </button>

            <button className="border border-white px-6 py-3 rounded-lg font-semibold">
              Become Instructor
            </button>
          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
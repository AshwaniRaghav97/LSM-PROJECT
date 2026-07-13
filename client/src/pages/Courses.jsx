import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetchCourses();
  }, [search, category, sort,maxPrice]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses({
        search,
        category,
        sort,
        maxPrice,
      });

      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-5">

        <h1 className="text-4xl font-bold mb-8">
          All Courses
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option value="">
              All Categories
            </option>

            <option value="Web Development">
              Web Development
            </option>

            <option value="Java">
              Java
            </option>

            <option value="Python">
              Python
            </option>

            <option value="DSA">
              DSA
            </option>

            <option value="Full Stack Development">
              Full Stack Development
            </option>

          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="priceLow">
              Price Low → High
            </option>

            <option value="priceHigh">
              Price High → Low
            </option>

          </select>

          <div className="mb-6">
  <label className="block font-semibold mb-2">
    Maximum Price: ₹{maxPrice}
  </label>

  <input
    type="range"
    min="0"
    max="100000"
    step="500"
    value={maxPrice}
    onChange={(e) =>
      setMaxPrice(Number(e.target.value))
    }
    className="w-full"
  />
</div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-2xl text-gray-500 py-20">
              No Courses Found
            </div>
          )}

        </div>

        

      </div>
    </MainLayout>
  );
};

export default Courses;
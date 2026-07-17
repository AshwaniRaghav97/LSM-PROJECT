import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { verifyCertificate } from "../services/certificateService";
import toast from "react-hot-toast";

const VerifyCertificate = () => {

  const { certificateId } = useParams();

  const [loading, setLoading] = useState(true);

  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {

      const response = await verifyCertificate(
        certificateId
      );

      setCertificate(response.certificate);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Certificate Not Found"
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <MainLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <h1 className="text-3xl font-bold">
            Verifying Certificate...
          </h1>

        </div>

      </MainLayout>
    );
  }

  if (!certificate) {
    return (
      <MainLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <div className="bg-white shadow-xl rounded-xl p-10 text-center">

            <h1 className="text-4xl font-bold text-red-600">
              ❌ Invalid Certificate
            </h1>

            <p className="mt-5 text-gray-600">
              This certificate does not exist.
            </p>

          </div>

        </div>

      </MainLayout>
    );
  }
    return (
    <MainLayout>

      <div className="max-w-3xl mx-auto py-16 px-5">

        <div className="bg-white shadow-2xl rounded-2xl p-10 border">

          <div className="text-center">

            <div className="text-6xl mb-5">
              ✅
            </div>

            <h1 className="text-4xl font-bold text-green-600">
              Certificate Verified
            </h1>

            <p className="text-gray-600 mt-3">
              This certificate is valid and has been issued by CodeLearn LMS.
            </p>

          </div>

          <div className="mt-10 space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Student Name
              </span>

              <span>
                {certificate.user?.name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Student Email
              </span>

              <span>
                {certificate.user?.email}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Course
              </span>

              <span>
                {certificate.course?.title}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Instructor
              </span>

              <span>
                {certificate.course?.instructor?.name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Certificate ID
              </span>

              <span className="font-mono">
                {certificate.certificateId}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Issue Date
              </span>

              <span>
                {new Date(
                  certificate.issuedAt
                ).toLocaleDateString()}
              </span>
            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default VerifyCertificate;
"use client";
import React, { Suspense } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

interface SignUpFormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

// VALIDATION SCHEMA FORMIK
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string().required("Mobile Number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

const initialValues: SignUpFormValues = {
  name: "",
  email: "",
  mobile: "",
  password: "",
};

export default function Page() {
  const navigate = useRouter();
  const { showToast } = useToast();

  // HANDLE SUBMIT
  const handleSubmit = async (
    values: SignUpFormValues,
    { setSubmitting, resetForm }: FormikHelpers<SignUpFormValues>
  ): Promise<void> => {
    setSubmitting(true);
    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log("Form values:", values);
      // On submit
      axiosInstance
        .post("/register", values)
        .then((data) => {
          console.log(data);
          // Redirect to login page
          if (data?.status) {
            showToast({
              type: "success",
              message: "Registration successful! Redirecting to Sign In.",
            });
            navigate.push("/signin");
          }
        })
        .catch((err) => {
          showToast({
            type: "error",
            message: err.response?.data?.msg || "Registration failed.",
          });
          console.log(err.response.data);
        });
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-4xl w-full flex rounded-xl shadow-lg overflow-hidden bg-white">
          {/* Image Section */}
          <div className="w-1/2 hidden md:block relative">
            {/* <img
            src="/api/placeholder/800/1000"
            alt="Three people in stylish outfits walking"
            className="w-full h-full object-cover"
          /> */}
            <Image
              src={"/auth.jpg"}
              alt="signup"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-primary mb-8">Sign Up</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-6">
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        touched.name && errors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                    ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* NUMBER */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="tel" // Change type to 'tel' for mobile number
                      id="mobile"
                      name="mobile" // Change name to 'mobile'
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        touched.mobile && errors.mobile
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="mobile" // Change name to 'mobile'
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                      ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-light 
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                 disabled:bg-red-300 disabled:cursor-not-allowed
                transition-colors duration-200"
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href={"/signin"}
                      className="text-primary hover:underline"
                    >
                      Sign In
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

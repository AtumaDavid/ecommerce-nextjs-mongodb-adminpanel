"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Cookies from "js-cookie";

// Loading Component
const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-primary border-r-transparent rounded-full"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function Page() {
  const navigate = useRouter();
  const { showToast } = useToast();
  const [usePhone, setUsePhone] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (
  //   values: LoginFormValues,
  //   { setSubmitting }: FormikHelpers<LoginFormValues>
  // ): Promise<void> => {
  //   setLoading(true); // Start loading
  //   try {
  //     const response = await axiosInstance.post("/login", values);

  //     if (response?.data?.status) {
  //       showToast({
  //         type: "success",
  //         message: "Login successful!",
  //       });

  //       Cookies.set("token", response.data.token, { expires: 1 });
  //       Cookies.set("role", response.data.role, { expires: 1 });

  //       // Navigate based on the role
  //       if (response.data.role === "customer") {
  //         navigate.push("/");
  //       } else {
  //         navigate.push("/dashboard");
  //       }
  //     }
  //   } catch (error: any) {
  //     // Show error message
  //     showToast({
  //       type: "error",
  //       message: error.response?.data?.msg || "Error with login",
  //     });
  //     console.error("Login error:", error);
  //   } finally {
  //     setSubmitting(false); // Mark form as not submitting
  //     setLoading(false); // Stop loading
  //   }
  // };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log("Form values:", values);
      axiosInstance
        .post("/login", values)
        .then((data) => {
          // console.log(data);
          if (data?.status) {
            showToast({
              type: "success",
              message: "Login successful!.",
            });
            Cookies.set("token", data?.data?.token, { expires: 1 });
            Cookies.set("role", data?.data?.role, { expires: 1 });
            if (data?.data?.role === "customer") {
              navigate.push("/");
            } else {
              navigate.push("/dashboard");
            }
          }
        })
        .catch((err) => {
          showToast({
            type: "error",
            message: err.response?.data?.msg || "Error with login",
          });
          // console.log(err.response.data);
        });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: string) => {
    // console.log(`Quick login as ${role}`);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-4xl w-full flex rounded-xl shadow-lg overflow-hidden bg-white">
          {/* Image Section */}
          <div className="w-1/2 hidden md:block relative">
            <Image
              src={"/auth.jpg"}
              alt="login"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Sign In</h1>
            <p className="text-gray-600 mb-8">Sign in to continue shopping</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {usePhone ? "Phone" : "Email"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setUsePhone(!usePhone)}
                        className="text-sm text-primary hover:underline"
                      >
                        Use {usePhone ? "Email" : "Phone"} Instead
                      </button>
                    </div>
                    <Field
                      type={usePhone ? "tel" : "email"}
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

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                    </div>
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

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember Me
                      </label>
                    </div>

                    <Link
                      href="#"
                      className="text-primary text-sm hover:underline"
                    >
                      Forgot Password
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-light 
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  disabled:bg-opacity-70 disabled:cursor-not-allowed
                  transition-colors duration-200"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>

                  <div className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={"/registration"}
                      className="text-primary hover:underline"
                    >
                      Sign Up
                    </Link>
                  </div>

                  <div className="mt-8">
                    <p className="text-center text-sm text-gray-600 mb-4">
                      For quick demo login click below
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleQuickLogin("admin")}
                        className="w-full py-2 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
                      >
                        Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickLogin("customer")}
                        className="w-full py-2 px-4 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200"
                      >
                        Customer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickLogin("manager")}
                        className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                      >
                        Manager
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickLogin("pos")}
                        className="w-full py-2 px-4 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
                      >
                        POS Operator
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

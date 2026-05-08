import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://newsnest-backend.onrender.com/api/v1/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-black text-white p-4 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center border-r-2 border-[#00FF88] p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#00FF88]/10 transition-colors group-hover:bg-[#00FF88]/20">
                <MessageSquare className="size-6 text-[#00FF88]" />
              </div>
              <h1 className="mt-2 text-2xl font-bold text-[#00FF88]">
                Create Account
              </h1>
              <p className="text-[#00FF88]">Let the awesomeness begin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-[#00FF88]"
              >
                Full Name
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="size-5 text-[#00FF88]" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-slate-700 bg-gray-900 pl-10 text-sm outline-none focus:border-[#00FF88]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#00FF88]"
              >
                Email
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="size-5 text-[#00FF88]" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-slate-700 bg-gray-900 pl-10 text-sm outline-none focus:border-[#00FF88]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#00FF88]"
              >
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="size-5 text-[#00FF88]" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-slate-700 bg-gray-900 pl-10 text-sm outline-none focus:border-[#00FF88]"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex w-full justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#00FF88] font-bold text-black transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#00ff62]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-[#00FF88]">Already have an account?</p>
            <Link to="/login" className="hover:text-[#00FF88]">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
};

export default RegisterPage;

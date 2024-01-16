"use client";
import { login } from "@components/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      console.log("data", data);
      router.push("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="py-60">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome To Users
          </h2>
          <p className="text-xl text-gray-600 text-center">Login to Continue!</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link href="/signup"> Sign Up </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

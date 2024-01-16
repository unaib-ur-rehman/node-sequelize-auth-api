"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const logout = async () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <h1 className=" text-4xl font-bold text-center">Welcome</h1>
      <Player
      className="my-6"
        autoplay
        loop
        src="/Hi.json"
        style={{ height: "400px", width: "400px" }}
      >
      </Player>
      <h4 className="text-4xl font-bold text-center my-6">The Data will be loaded Soon</h4>
      <button
        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}

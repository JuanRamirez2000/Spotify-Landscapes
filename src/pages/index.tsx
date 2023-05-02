import { type NextPage } from "next";
import Link from "next/link";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <section className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className=" bg-gradient-to-r from-secondary-focus to-primary-focus bg-clip-text text-4xl font-extrabold uppercase text-transparent md:text-7xl">
              Spotify Landscapes
            </h1>
            <p className="py-8 text-xl md:text-3xl">
              An app to see your Spotify data in the form of a beautiful
              landscape!
            </p>
          </div>
        </div>
        <ArrowDownCircleIcon className="absolute bottom-0 m-6 h-10 w-10 animate-bounce text-secondary-focus md:h-16 md:w-16" />
      </section>
      <section className="min-h-screen">
        <h2 className="text-4xl font-bold md:text-6xl"> How it Works</h2>
        <p className="">You log in to spotify</p>
        <p className="">We gather data from spotify</p>
        <p className="">And display your landscape!</p>
        {
          <Link className="btn-primary btn" href={`/result`}>
            Get Started
          </Link>
        }
      </section>
    </>
  );
};

export default Home;

import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Leckerli_One } from "next/font/google";
const leckerli = Leckerli_One({ weight: "400", subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <>
      <section className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1
              className={`${leckerli.className} bg-gradient-to-r from-secondary-focus to-primary-focus bg-clip-text text-4xl font-extrabold uppercase text-transparent md:text-7xl`}
            >
              Spotify Landscapes
            </h1>
            <p className="py-8 text-xl md:text-3xl">
              An app to visualize Spotify song data in the form of a beautiful
              landscape!
            </p>
          </div>
        </div>
        <ArrowDownCircleIcon className="absolute bottom-0 m-6 h-10 w-10 animate-bounce text-secondary-focus md:h-16 md:w-16" />
      </section>
      <section>
        <h2 className="mb-10 text-center text-4xl font-bold md:text-6xl">
          Heres how it works!
        </h2>
        <div className="flex min-h-screen flex-col justify-evenly gap-32">
          <div className="flex flex-col-reverse items-center md:inline-grid md:grid-cols-2 md:justify-items-center">
            <Image
              src="/images/Spotify_Logo.png"
              height={400}
              width={400}
              alt="Spotify Logo"
            />
            <div>
              <p className="text-3xl font-semibold">You log in to Spotify</p>
              <p> Dont worry! We never store any data</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8 bg-secondary py-32 md:inline-grid md:grid-cols-2 md:justify-items-center">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-semibold">
                We analyze some song data
              </p>
              <p>With these features!</p>
              <ul className="list-inside list-disc">
                <li>Mood - For mountain colors</li>
                <li>Mode - To change between day/night</li>
                <li>Energy - For mountaintop heights</li>
                <li>Danceability - To add more clouds/stars</li>
              </ul>
            </div>
            <div className="mockup-code w-80 bg-info text-primary-content">
              <pre data-prefix="$">
                <code>search --Song $song_name</code>
              </pre>
              <pre data-prefix=">">
                <code className="text-warning">downloading...</code>
              </pre>
              <pre data-prefix=">">
                <code className="text-error">analyzing...</code>
              </pre>
              <pre data-prefix=">">
                <code className="text-success-content">Done!</code>
              </pre>
            </div>
          </div>
          <div className="flex flex-col-reverse items-center gap-8 md:inline-grid md:grid-cols-2 md:justify-items-center">
            <div className="mask mask-hexagon-2">
              <Image
                src="/images/Desktop_Example.png"
                height={600}
                width={600}
                alt="Example Landscape"
              />
            </div>
            <p className="text-3xl font-semibold">
              Once thats done, we display your landscape!
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center pb-28 pt-20 ">
          <Link className="btn-primary btn text-xl" href={`/result`}>
            Lets Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;

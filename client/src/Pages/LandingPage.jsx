import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <div
          className="relative block group -z-10"
          style={{
            backgroundImage: "url('../src/assets/banner.jpg')",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="absolute font-serif top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/3 text-white lg:text-6xl font-extrabold sm:text-3xl md:text-4xl">
            The dating app<br></br> designed to be deleted
          </div>
        </div>
      </div>

      {/* <div className="">
        <a
          className="relative block group -z-10 "
          style={{ backgroundAttachment: "fixed" }}
        >
          <img
            src="../src/assets/banner.jpg"
            alt="banner"
            className="object-cover h-screen w-screen"
            // style={{ backgroundAttachment: "fixed" }}
          />
        </a>
        <div className="absolute font-serif top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/3 text-white lg:text-6xl font-extrabold sm:text-3xl md:text-4xl">
          The dating app<br></br> designed to be deleted
        </div>
      </div> */}
      <div>
        <div className="my-10">
          <figure className="max-w-screen-md mx-auto text-center">
            <svg
              className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
                "Hnoss is a unique blend of social media and dating, offering
                users a platform to connect, share experiences, and potentially
                find romantic connections in a dynamic and interactive
                environment."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
              <img
                className="w-6 h-6 rounded-full"
                src="https://firebasestorage.googleapis.com/v0/b/blogapp-40c8b.appspot.com/o/1712489211770yash.png?alt=media&token=235aa759-05d5-4784-a181-509b9ed880df"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 ">
                <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                  Yash Agrawal
                </cite>
                <cite className="ps-3 text-sm text-gray-500">CEO at HNOSS</cite>
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="mx-auto w-full  bg-gray-100">
          <div className="grid grid-cols-4 gap-8 ml-10  px-10 py-6 lg:py-8 md:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Company
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className=" hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Brand Center
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Help center
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Discord Server
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Licensing
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Download
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    iOS
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Android
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Windows
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    MacOS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

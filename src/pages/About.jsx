

function About() {
  return (
    <div className="p-4 max-w-3xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded shadow dark:shadow-lg group-hover:shadow-lg dark:group-hover:shadow-xl transition-shadow">
      <h1 className="text-3xl font-bold mb-4">About NewsLens</h1>
      <p className="text-lg mb-2">
        NewsLens is a simple news application that provides the latest headlines from around the world.
      </p>
      <div className="contact mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded shadow dark:shadow-md group-hover:shadow-md dark:group-hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-2">
          Have questions or feedback? Reach out to us at thevikascodes@gmail.com
        </p>
        <div className="online-handles">
          <a href="https://x.com/VikasKu34860310" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">
            <div className="icon twitter"></div>Twitter
          </a>
          <a href="https://www.linkedin.com/in/vikas-kumar-592944294/" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">
            <div className="icon"></div>Linkedin
          </a>
          <div className="form">
            <form>
              <input type="email" placeholder="Your Email" className="border border-gray-300 dark:border-gray-600 rounded py-2 px-4 bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About
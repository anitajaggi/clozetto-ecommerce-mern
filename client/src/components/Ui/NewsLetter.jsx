export const NewsLetter = () => {
  return (
    <div className="newsletter-area">
      <div className="container m-auto text-center">
        <h2 className="heading text-6xl mb-4">
          Wanna Latest Update, <br /> Subscribe Our NewsLetter
        </h2>
        <form>
          <input
            type="email"
            className="border-2 border-white w-100 p-2 rounded-xl outline-none bg-black text-white"
            placeholder="jhondoe@example.com"
          />
          <button className="btn-primary border rounded-xl mx-2 border-white">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

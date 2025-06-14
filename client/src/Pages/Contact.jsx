export const Contact = () => {
  return (
    <div className="container pt-15 m-auto">
      <div className="py-5 mt-5">
        <h1 className="heading text-5xl">Connect with Clozetto</h1>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          <div>
            <form className="shadow-xl rounded p-4">
              <div className="mb-2">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="border border-gray-400 w-full p-2 rounded"
                  placeholder="Jhon doe"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="name">Email</label>
                <br />
                <input
                  type="text"
                  className="border border-gray-400 w-full p-2 rounded"
                  placeholder="jhon@example.com"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="name">Contact Number</label>
                <br />
                <input
                  type="text"
                  className="border border-gray-400 w-full p-2 rounded"
                  placeholder="+91 000 000 0000"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="message">Message</label>
                <br />
                <textarea
                  name="message"
                  id="message"
                  className="border border-gray-400 w-full p-2 rounded"
                  placeholder="Message here..."
                ></textarea>
              </div>
              <div>
                <button className="btn-primary">Send Message</button>
              </div>
            </form>
          </div>
          <div className="pb-3">
            <h1 className="heading text-3xl">We’re Here to Help!</h1>
            <p>
              Got a question? Need styling advice? Want to track your order? No
              worries—our team at Clozetto is always ready to assist you!
              Whether it’s a fashion query or a customer service concern, we’d
              love to hear from you.
            </p>
            <div className="mt-3">
              <b>Customer Support:</b>
              <p>📧 Email: support@clozetto.com</p>
              <p>📞 Phone: +91 000 000 0000</p>
              <p>📍 Address: 123 Fashion Street, Trend City, NY 10001</p>
            </div>
            <div className="mt-3">
              <b>Business Hours:</b>
              <p>🕒 Monday – Friday: 9 AM – 6 PM (EST)</p>
              <p>
                🚀 Weekend Orders? No problem! Our support team will get back to
                you ASAP on the next business day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

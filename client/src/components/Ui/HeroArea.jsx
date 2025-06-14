import { NavLink } from "react-router-dom";

export const HeroArea = () => {
  return (
    <main className="hero-main">
      <div className="container m-auto w-full h-full flex items-center justify-center">
        <div className="hero-content">
          <h1 className="text-8xl font-bold">
            Discover Your <br /> Style, Redefined.
          </h1>
          <p className="colored-text font-bold">
            Exclusive Fashion, Just a Click Away.
          </p>
          <p>
            Step into a world of premium fashion where elegance meets comfort.
            From trendy streetwear to sophisticated classics, find the perfect
            fit for every occasion. Shop the latest collections and elevate your
            style game now!
          </p>
          <NavLink to={"/products"}>
            <button className="btn-primary">Explore Store</button>
          </NavLink>
        </div>
      </div>
    </main>
  );
};

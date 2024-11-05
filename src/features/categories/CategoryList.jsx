import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryList = ({ categories }) => {
  // Destructuring categories slice from global state
  const { status, error } = useSelector((state) => state.categories);

  return (
    <div>
      <section>
        <div className="container py-5">
          <h4
            className="display-4 text-center py-2"
            style={{ fontFamily: "Noto Serif" }}
          >
            <em>Categories</em>
          </h4>
          {status === "loading" && (
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {error && <p className="fs-4 fw-normal">{error}</p>}
          {categories.length > 0 && (
            <div className="d-flex justify-content-center gap-2 flex-wrap pt-2 pb-4">
              {categories.map((category) => {
                return (
                  <div
                    className="mt-4"
                    key={category._id}
                    style={{ width: "250px", height: "150px" }}
                  >
                    <Link to={`/books/${category.category}`}>
                      <div>
                        <img
                          className="card-img img-fluid"
                          src={category.coverImage}
                          alt={`${category.category} Books`}
                          style={{ height: "150px", borderRadius: "5px" }}
                        />
                      </div>
                    </Link>
                    <p className="text-center text-dark fw-semibold fs-5">
                      {category.category}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryList;

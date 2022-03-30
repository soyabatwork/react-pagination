import "./App.css";
import ReactPaginate from "react-paginate";
import React from "react";

function App() {
  const [items, setItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3004/comments?_page=${currentPage}&_limit=12`
    );
    const data = await res.json();
    return data;
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "http://localhost:3004/comments?_page=1&_limit=12"
      );
      const total = res.headers.get("x-total-count");
      setPageCount(total / 12);
      const data = await res.json();
      setItems(data);
    };
    getData();
  }, []);

  const handlePageClick = async (data) => {
    const fetchCommentsFromServer = await fetchComments(data.selected + 1);
    setItems(fetchCommentsFromServer);
  };

  return (
    <div>
      {items &&
        items.map((item) => {
          return (
            <div className="row m-2">
              <div className="col-sm-6 col-md-4 v my-2">
                <div className="card shadow-sm w-100">
                  <div className="card-body">
                    <h5 className="card-title text-center h2">id:{item.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {item.email}
                    </h6>
                    <p className="card-text">{item.body}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breaklabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        pageClassName={"page-item"}
        containerClassName={"pagination justify-content-center"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;

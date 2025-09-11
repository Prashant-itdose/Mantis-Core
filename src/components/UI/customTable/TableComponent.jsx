import Table from "react-bootstrap/Table";

function TableComponent({ thead, tbody, fs }) {
  console.log(thead, tbody);
  return (
    <>
      <div className="row m-2">
        <div
          className="col-12  table-responsive "
          // id="no-more-table"
        >

          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          {false && <table
            className="table table-bordered table-hover table-striped tbRecord"
            cellPadding="{0}"
            cellSpacing="{0}"
          >
            <thead className="cf">
              <tr className="table-theme-bg">
                {thead?.map((headData, index) => (
                  <th key={index} style={{ fontSize: fs && "12px" }}>
                    {headData} &nbsp;
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbody}
              {/* {tbody?.map((ele, index) => {
                const keys = Object.keys(ele);
                return (
                  <tr key={index}>
                    {keys.map((bodyData, inx) => (
                      <td key={inx} data-title={thead[inx]}>
                        {ele[bodyData]} &nbsp;
                      </td>
                    ))}
                  </tr>
                );
              })} */}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
}

export default TableComponent;

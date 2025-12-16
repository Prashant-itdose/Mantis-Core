import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useWindowSize } from "@app/utils/hooks/useWindowSize";
import { calculateWindowSize } from "@app/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setWindowSize } from "@app/store/reducers/ui";
import ReactGA from "react-ga4";
import RenderRoute from "@app/routes/RenderRoute";
import Loading from "@app/components/loader/Loading";

const { VITE_NODE_ENV } = import.meta.env;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state) => state.ui.screenSize);
  const loading = useSelector((state) => state.loadingSlice.loading);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  // console.log(screenSize)

  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === "production") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
      });
    }
  }, [location]);

  return (
    <>
      {loading && <Loading />}
      <RenderRoute />
      <ToastContainer
        autoClose={1000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;

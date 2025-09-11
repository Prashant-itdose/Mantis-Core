import.meta.env = {"VITE_APP_REACT_APP_BASE_URL": "https://mantis.ondgni.com", "VITE_APP_VERSION": "HOSPEDIA V11", "VITE_DATE_FORMAT": "DD/MM/YYYY", "BASE_URL": "/", "MODE": "development", "DEV": true, "PROD": false, "SSR": false};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b7241b6b"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=b7241b6b"; const createRoot = __vite__cjsImport1_reactDom_client["createRoot"];
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=b7241b6b";
import App from "/src/App.jsx?t=1745561871664";
import store from "/src/store/store.js";
import "/src/utils/i18n.js";
import "/src/index.css";
import "/src/assets/css/theme.css";
import * as serviceWorker from "/src/serviceWorker.js";
import { BrowserRouter } from "/node_modules/.vite/deps/react-router-dom.js?v=b7241b6b";
import __vite__cjsImport10_reactGa4 from "/node_modules/.vite/deps/react-ga4.js?v=b7241b6b"; const ReactGA = __vite__cjsImport10_reactGa4.__esModule ? __vite__cjsImport10_reactGa4.default : __vite__cjsImport10_reactGa4;
import { PrimeReactProvider } from "/node_modules/.vite/deps/primereact_api.js?v=b7241b6b";
import "/node_modules/primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from "/node_modules/.vite/deps/react-toastify.js?v=b7241b6b";
import __vite__cjsImport14_react from "/node_modules/.vite/deps/react.js?v=b7241b6b"; const React = __vite__cjsImport14_react.__esModule ? __vite__cjsImport14_react.default : __vite__cjsImport14_react;
import "/src/axiosInterceptor.js";
import "/node_modules/primeicons/primeicons.css";
import "/node_modules/rc-easyui/dist/themes/default/easyui.css";
import "/node_modules/rc-easyui/dist/themes/icon.css";
import "/node_modules/rc-easyui/dist/themes/react.css";
import { DndProvider } from "/node_modules/.vite/deps/react-dnd.js?v=b7241b6b";
import { HTML5Backend } from "/node_modules/.vite/deps/react-dnd-html5-backend.js?v=b7241b6b";
const { VITE_NODE_ENV, VITE_GA_ID } = import.meta.env;
if (VITE_NODE_ENV === "production" && VITE_GA_ID) {
  ReactGA.initialize(VITE_GA_ID);
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  /* @__PURE__ */ jsxDEV(PrimeReactProvider, { children: /* @__PURE__ */ jsxDEV(Provider, { store, children: /* @__PURE__ */ jsxDEV(BrowserRouter, { children: [
    /* @__PURE__ */ jsxDEV(
      ToastContainer,
      {
        autoClose: 3e3,
        draggable: false,
        position: "top-right",
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true
      },
      void 0,
      false,
      {
        fileName: "D:/mnts/src/index.jsx",
        lineNumber: 34,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(DndProvider, { backend: HTML5Backend, children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
      fileName: "D:/mnts/src/index.jsx",
      lineNumber: 45,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "D:/mnts/src/index.jsx",
      lineNumber: 44,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "D:/mnts/src/index.jsx",
    lineNumber: 33,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "D:/mnts/src/index.jsx",
    lineNumber: 32,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "D:/mnts/src/index.jsx",
    lineNumber: 31,
    columnNumber: 3
  }, this)
);
serviceWorker.unregister();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBaUNRO0FBakNSLFNBQVNBLGtCQUFrQjtBQUMzQixTQUFTQyxnQkFBZ0I7QUFDekIsT0FBT0MsU0FBUztBQUNoQixPQUFPQyxXQUFXO0FBQ2xCLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLFlBQVlDLG1CQUFtQjtBQUMvQixTQUFTQyxxQkFBcUI7QUFDOUIsT0FBT0MsYUFBYTtBQUNwQixTQUFTQywwQkFBMEI7QUFDbkMsT0FBTztBQUNQLFNBQVNDLHNCQUFzQjtBQUMvQixPQUFPQyxXQUFXO0FBQ2xCLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsU0FBU0MsbUJBQW1CO0FBQzVCLFNBQVNDLG9CQUFvQjtBQUM3QixNQUFNLEVBQUVDLGVBQWVDLFdBQVcsSUFBSUMsWUFBWUM7QUFFbEQsSUFBSUgsa0JBQWtCLGdCQUFnQkMsWUFBWTtBQUNoRFAsVUFBUVUsV0FBV0gsVUFBVTtBQUMvQjtBQUVBLE1BQU1JLFlBQVlDLFNBQVNDLGVBQWUsTUFBTTtBQUNoRCxNQUFNQyxPQUFPcEIsV0FBV2lCLFNBQVM7QUFDakNHLEtBQUtDO0FBQUFBLEVBQ0gsdUJBQUMsc0JBQ0MsaUNBQUMsWUFBUyxPQUNSLGlDQUFDLGlCQUNDO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYLFVBQVM7QUFBQSxRQUNULGlCQUFpQjtBQUFBLFFBQ2pCO0FBQUEsUUFDQTtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0wsY0FBWTtBQUFBO0FBQUEsTUFSZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRYztBQUFBLElBRWQsdUJBQUMsZUFBWSxTQUFTVixjQUNwQixpQ0FBQyxTQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBSSxLQUROO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FFQTtBQUFBLE9BYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWNBLEtBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWdCQSxLQWpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBa0JBO0FBQ0Y7QUFLQVAsY0FBY2tCLFdBQVciLCJuYW1lcyI6WyJjcmVhdGVSb290IiwiUHJvdmlkZXIiLCJBcHAiLCJzdG9yZSIsInNlcnZpY2VXb3JrZXIiLCJCcm93c2VyUm91dGVyIiwiUmVhY3RHQSIsIlByaW1lUmVhY3RQcm92aWRlciIsIlRvYXN0Q29udGFpbmVyIiwiUmVhY3QiLCJEbmRQcm92aWRlciIsIkhUTUw1QmFja2VuZCIsIlZJVEVfTk9ERV9FTlYiLCJWSVRFX0dBX0lEIiwiaW1wb3J0IiwiZW52IiwiaW5pdGlhbGl6ZSIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyb290IiwicmVuZGVyIiwidW5yZWdpc3RlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJpbmRleC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIkBhcHAvQXBwXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiQHN0b3JlL3N0b3JlXCI7XHJcbmltcG9ydCBcIi4vdXRpbHMvaTE4blwiO1xyXG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xyXG5pbXBvcnQgXCJAYXBwL2Fzc2V0cy9jc3MvdGhlbWUuY3NzXCI7XHJcbmltcG9ydCAqIGFzIHNlcnZpY2VXb3JrZXIgZnJvbSBcIi4vc2VydmljZVdvcmtlclwiO1xyXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IFJlYWN0R0EgZnJvbSBcInJlYWN0LWdhNFwiO1xyXG5pbXBvcnQgeyBQcmltZVJlYWN0UHJvdmlkZXIgfSBmcm9tIFwicHJpbWVyZWFjdC9hcGlcIjtcclxuaW1wb3J0IFwicHJpbWVyZWFjdC9yZXNvdXJjZXMvdGhlbWVzL2xhcmEtbGlnaHQtY3lhbi90aGVtZS5jc3NcIjtcclxuaW1wb3J0IHsgVG9hc3RDb250YWluZXIgfSBmcm9tIFwicmVhY3QtdG9hc3RpZnlcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgXCIuL2F4aW9zSW50ZXJjZXB0b3JcIjsgLy8gSW1wb3J0IHRoZSBpbnRlcmNlcHRvciBvbmNlXHJcbmltcG9ydCBcInByaW1laWNvbnMvcHJpbWVpY29ucy5jc3NcIjtcclxuaW1wb3J0IFwicmMtZWFzeXVpL2Rpc3QvdGhlbWVzL2RlZmF1bHQvZWFzeXVpLmNzc1wiO1xyXG5pbXBvcnQgXCJyYy1lYXN5dWkvZGlzdC90aGVtZXMvaWNvbi5jc3NcIjtcclxuaW1wb3J0IFwicmMtZWFzeXVpL2Rpc3QvdGhlbWVzL3JlYWN0LmNzc1wiO1xyXG5pbXBvcnQgeyBEbmRQcm92aWRlciB9IGZyb20gXCJyZWFjdC1kbmRcIjtcclxuaW1wb3J0IHsgSFRNTDVCYWNrZW5kIH0gZnJvbSBcInJlYWN0LWRuZC1odG1sNS1iYWNrZW5kXCI7XHJcbmNvbnN0IHsgVklURV9OT0RFX0VOViwgVklURV9HQV9JRCB9ID0gaW1wb3J0Lm1ldGEuZW52O1xyXG5cclxuaWYgKFZJVEVfTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiICYmIFZJVEVfR0FfSUQpIHtcclxuICBSZWFjdEdBLmluaXRpYWxpemUoVklURV9HQV9JRCk7XHJcbn1cclxuXHJcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3QoY29udGFpbmVyKTtcclxucm9vdC5yZW5kZXIoXHJcbiAgPFByaW1lUmVhY3RQcm92aWRlcj5cclxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICA8QnJvd3NlclJvdXRlcj5cclxuICAgICAgICA8VG9hc3RDb250YWluZXJcclxuICAgICAgICAgIGF1dG9DbG9zZT17MzAwMH1cclxuICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICBwb3NpdGlvbj1cInRvcC1yaWdodFwiXHJcbiAgICAgICAgICBoaWRlUHJvZ3Jlc3NCYXI9e2ZhbHNlfVxyXG4gICAgICAgICAgbmV3ZXN0T25Ub3BcclxuICAgICAgICAgIGNsb3NlT25DbGlja1xyXG4gICAgICAgICAgcnRsPXtmYWxzZX1cclxuICAgICAgICAgIHBhdXNlT25Ib3ZlclxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPERuZFByb3ZpZGVyIGJhY2tlbmQ9e0hUTUw1QmFja2VuZH0+XHJcbiAgICAgICAgICA8QXBwIC8+XHJcbiAgICAgICAgPC9EbmRQcm92aWRlcj5cclxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxyXG4gICAgPC9Qcm92aWRlcj5cclxuICA8L1ByaW1lUmVhY3RQcm92aWRlcj5cclxuKTtcclxuXHJcbi8vIElmIHlvdSB3YW50IHlvdXIgYXBwIHRvIHdvcmsgb2ZmbGluZSBhbmQgbG9hZCBmYXN0ZXIsIHlvdSBjYW4gY2hhbmdlXHJcbi8vIHVucmVnaXN0ZXIoKSB0byByZWdpc3RlcigpIGJlbG93LiBOb3RlIHRoaXMgY29tZXMgd2l0aCBzb21lIHBpdGZhbGxzLlxyXG4vLyBMZWFybiBtb3JlIGFib3V0IHNlcnZpY2Ugd29ya2VyczogaHR0cHM6Ly9iaXQubHkvQ1JBLVBXQVxyXG5zZXJ2aWNlV29ya2VyLnVucmVnaXN0ZXIoKTtcclxuIl0sImZpbGUiOiJEOi9tbnRzL3NyYy9pbmRleC5qc3gifQ==
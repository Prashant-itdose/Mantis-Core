// import React from "react";
// import { CKEditor } from "ckeditor4-react";

// const CommonCKEditor = ({
//   value = "",
//   onChange,
//   height = 180,
//   readOnly = false,
//   placeholder = "Start typing...",
//   toolbar = "standard",
//   editorUrl = "https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js",
// }) => {
//   return (
//     <CKEditor
//       initData={value}
//       editorUrl={editorUrl}
//       readOnly={readOnly}
//       config={{
//         versionCheck: false,
//         height,
//         toolbar,
//         placeholder,
//       }}
//       onChange={(evt) => {
//         const data = evt.editor.getData();
//         onChange && onChange(data);
//       }}
//     />
//   );
// };

// export default CommonCKEditor;

import React from "react";
import { CKEditor } from "ckeditor4-react";

const CommonCKEditor = ({
  value = "",
  onChange,
  height = 180,
  readOnly = false,
  placeholder = "Start typing...",
  toolbar = "standard",
  editorUrl = "https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js",
}) => {
  return (
    <CKEditor
      key={value} // ⭐ IMPORTANT: force re-render when value changes
      initData={value}
      editorUrl={editorUrl}
      readOnly={readOnly}
      config={{
        versionCheck: false,
        height,
        toolbar,
        placeholder,
      }}
      onChange={(evt) => {
        const data = evt.editor.getData();
        onChange && onChange(data);
      }}
    />
  );
};

export default CommonCKEditor;

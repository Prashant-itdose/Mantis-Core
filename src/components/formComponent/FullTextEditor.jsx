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
  toolbar = "full",
  editorUrl = "https://cdn.ckeditor.com/4.22.1/full/ckeditor.js",
  stripFontStyles = false, // New prop to control stripping font styles
}) => {
  const handleChange = (evt) => {
    let data = evt.editor.getData();

    if (stripFontStyles) {
      // Remove font-size inline styles
      data = data.replace(/style="[^"]*font-size:[^;"]*(;|")/g, (match) => {
        return match.replace(/font-size:[^;"]*(;|")/g, "");
      });

      // Remove empty style attributes
      data = data.replace(/style=""/g, "");
      data = data.replace(/style=";"/g, "");
    }

    onChange && onChange(data);
  };

  return (
    <CKEditor
      key={value}
      initData={value}
      editorUrl={editorUrl}
      readOnly={readOnly}
      config={{
        versionCheck: false,
        height,
        toolbar,
        placeholder,
        fontSize_defaultLabel: "14px",
        fontSize_sizes:
          "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", // Custom font sizes
        extraPlugins: "font,colorbutton",
        allowedContent: stripFontStyles
          ? {
              $1: {
                elements: CKEDITOR.dtd,
                attributes: true,
                styles: false, // Disable styles if stripFontStyles is true
                classes: false,
              },
            }
          : true, // Allow all content by default
      }}
      onChange={handleChange}
    />
  );
};

export default CommonCKEditor;

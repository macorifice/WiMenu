import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFPreview = (props) => {
  const [state, setState] = useState({
    numPages: null,
    pageNumber: 1,
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setState({ numPages });
  };

  const { pageNumber, numPages } = state;

  return (
    <div>
      <Document file={{ url: props.file }} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PDFPreview
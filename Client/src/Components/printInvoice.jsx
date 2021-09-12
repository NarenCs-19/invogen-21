import React, { useRef } from 'react';
import {Button} from 'react-bootstrap';
import { useLocation } from 'react-router';
import {useReactToPrint} from 'react-to-print';
import InvoicePreview from './invoicePreview';

const PrintInvoice = (props) => {
  const location = useLocation();
  const items = location.state;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content:()=>componentRef.current
  });

  return (
    <div className="text-center">
      <InvoicePreview items={items} ref={componentRef} />
      <Button onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default PrintInvoice;
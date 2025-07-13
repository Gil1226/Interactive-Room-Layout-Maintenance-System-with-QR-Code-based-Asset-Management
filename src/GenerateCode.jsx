import './GenerateCode.css';
import LeftPanel from "./LeftPanel";
import QRCode from "react-qr-code";
import React, { useState, useRef} from "react";
import { useReactToPrint } from "react-to-print"

function GenerateCodePage() {

  const [qrValue, setQrValue] = useState({prop:"",
                                          asset:"",
                                          room:"",
                                          accountable:"",
                                          lifeSpan:"",
                                          dateAcquired:""
  });
  
  const refPrint = useRef();
  const handleToPrint = useReactToPrint({
    documentTitle: 'QR Code',
    contentRef: refPrint, 
  });

  const propNum = (event) =>{
    const value = event.target.value;
    setQrValue(val => ({
      ...val, prop: value
    }));
  }
  const asset = (event) =>{
    const value = event.target.value;
    setQrValue(val => ({
      ...val, asset: value
    }));
  }
  const room = (event) =>{
    const value = event.target.value;
    setQrValue(val => ({
      ...val, room: value
    }));
  }
  const accountable = (event) =>{
    const value = event.target.value;
    setQrValue(val => ({
      ...val, accountable: value
    }));
  }
  const lifeSpan = (event) =>{
    const value = event.target.value;
    setQrValue(val => ({
      ...val, lifeSpan: value
    }));
  }
  const dateAcquired = (event) =>{
    const value = event.target.value;
    setQrValue(val => ({
      ...val, dateAcquired: value
    }));
  }

  const showQrCode = () =>{
    const qrCode = document.querySelector('.qrCode');
    qrCode.style.display = 'flex';
  }
  const hideQr = () =>{
    const qrCode = document.querySelector('.qrCode');
    qrCode.style.display = 'none';
  }
  return (
    <div className="container">
      <LeftPanel />
      <div className='generateQr-panel-container'>
        <div className='input-info-container'>

          <div className='input-group'>
            <input type="text" onChange={propNum} required />
            <label className='placeholder'>Prop#</label>
          </div>

          <div className='input-group'>
            <input type="text" onChange={asset} required />
            <label className='placeholder'>Asset</label>
          </div>

          <div className='input-group'>
            <input type="text" onChange={room} required />
            <label className='placeholder'>Room#</label>
          </div>

          <div className='input-group'>
            <input type="text" onChange={accountable} required />
            <label className='placeholder'>Accountable</label>
          </div>

          <div className='input-group'>
            <input type="text" onChange={lifeSpan} required />
            <label className='placeholder'>Life Span</label>
          </div>

          <div className='input-group'>
            <input type="text" onChange={dateAcquired} required />
            <label className='placeholder'>Date Acquired</label>
          </div>
          <button onClick={showQrCode} className='btn'>Show QR Code</button>
        </div>

        <div className='qrCode'>
          <p onClick={hideQr}>Hide</p>
          <div ref={refPrint}>
            <QRCode size={200} value={JSON.stringify(qrValue)}/>
          </div>
          <button onClick={handleToPrint} className='btn'>Print</button>
        </div>
      </div>
    </div>
  );
}

export default GenerateCodePage;
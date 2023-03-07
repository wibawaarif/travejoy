import React from 'react'

import Fade from 'react-reveal/Fade'

import InputText from 'elements/Form/InputText'
import InputFile from 'elements/Form/InputFile'

import logoBca from 'assets/images/logo-bca.png'
import logoMandiri from 'assets/images/logo-mandiri.png';


export default function Payment(props) {
    const { data, ItemDetails, checkout } = props;


    const tax = 10;
    const subTotal = ItemDetails.price * checkout.duration;
    const grandTotal = (subTotal * tax) / 100 + subTotal;


  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-5 py-5" style={{ paddingRight: 80, borderRight: '1px solid #BCC3D1', borderRadius: 1 }}>
            <Fade delay={300}>
              <p style={{fontSize: 22}} className="mb-4">Transfer Pembayaran:</p>
              <p style={{fontSize: 22}}>Tax: <span style={{fontSize: 22, fontWeight: 500}}>{tax}%</span></p>
              <p style={{fontSize: 22}}>Sub total: <span style={{fontSize: 22, fontWeight: 500}}>${subTotal} USD</span></p>
              <p style={{fontSize: 22}}>Total: <span style={{fontSize: 22, fontWeight: 500}}>${grandTotal} USD</span></p>
              <div className="row mt-4">
                <div className="col-3 text-right">
                  <img src={logoBca} alt="bank central asia" width="60" />
                </div>
                <div className="col">
                  <dl style={{fontSize: 22}}>
                    <dd>Bank Central Asia</dd>
                    <dd>2208 1999</dd>
                    <dd>Arif Wibawa</dd>
                  </dl>
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-right">
                  <img src={logoMandiri} alt="mandiri" width="60" />
                </div>
                <div className="col">
                  <dl style={{fontSize: 22}}>
                    <dd>Bank Mandiri</dd>
                    <dd>1999 20692 9340</dd>
                    <dd>Arif Wibawa</dd>
                  </dl>
                </div>
              </div>
            </Fade>
          </div>
          <div className="col-5 py-5" style={{ paddingLeft: 80 }}>
            <Fade delay={600}>
              <label style={{fontSize: 22}} htmlFor="proofPayment">Upload Bukti Transfer</label>
              <InputFile
                accept="image/*"
                id="proofPayment"
                name="proofPayment"
                value={data.proofPayment}
                onChange={props.onChange}
                placeholder="Browse a file..."
              />

              <label style={{fontSize: 22}} htmlFor="bankName">Asal Bank</label>
              <InputText
                id="bankName"
                name="bankName"
                type="text"
                value={data.bankName}
                onChange={props.onChange}
                placeholder="Please type here..."
              />

              <label style={{fontSize: 22}} htmlFor="bankHolder">Nama Pengirim</label>
              <InputText
                id="bankHolder"
                name="bankHolder"
                type="text"
                value={data.bankHolder}
                onChange={props.onChange}
                placeholder="Please type here..."
              />
            </Fade>
          </div>
        </div>
      </div>
    </Fade>
  )
}

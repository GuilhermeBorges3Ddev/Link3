"use client";

import hash from "object-hash";
import { useState } from "react";
import { addLink } from "../services/web3.service.js";

export default function Home() {
  const [url, setUrl] = useState("");
  const [fee, setFee] = useState("0");
  const [message, setMessage] = useState("");

  function onUrlChange(event) {
    setUrl(event.target.value);
  }

  function onFeeChange(event) {
    setFee(event.target.value);
  }

  function btnCreateClick() {
    const LINK_ID = hash(url).slice(0, 5);
    setMessage("Sending your link to blockchain, wait...");
    addLink({ url: url, linkId: LINK_ID, feeInWei: fee })
      .then(() => {
        setUrl("");
        setFee("0");
        setMessage(
          `Your link was created with success: http://localhost:3000/${LINK_ID}`
        );
      })
      .catch((err) => setMessage(err.message));
  }

  return (
    <>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img
              width={700}
              height={500}
              alt="Dealer-Link3"
              className="d-block mx-lg-auto img-fluid"
              src="https://img.freepik.com/fotos-gratis/retrato-de-um-homem-jogando-poquer-em-um-cassino_23-2151831289.jpg"
            />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Link3
            </h1>
            <p className="lead">Protect your links with us</p>
            <hr />
            <p>
              Paste your URL above, choose the feee and connect your main wallet
              to protect your link with BNB technology.
            </p>
            <div className="form-floating mb-3">
              <input
                id="url"
                type="text"
                value={url || ""}
                onChange={onUrlChange}
                className="form-control"
              />
              <label htmlFor="url">Link: </label>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    id="fee"
                    type="number"
                    value={fee || "0"}
                    onChange={onFeeChange}
                    className="form-control"
                  />
                  <label htmlFor="fee">Fee per click(wei):</label>
                </div>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={btnCreateClick}
                  className="btn btn-primary w-100 h-100"
                >
                  <img
                    width={32}
                    alt="meta-logo"
                    className="me-2"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-metamask-2728406-2261817.png?f=webp"
                  />
                  <span className="ml-2">Connect and create a link</span>
                </button>
              </div>
            </div>
            {message ? (
              <div className="alert alert-success p-3 col-12 mt-3" role="alert">
                {message}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

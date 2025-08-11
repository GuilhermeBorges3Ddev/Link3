"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getLink, payLink } from "@/services/web3.service";

export default function Payment() {
  const params = useParams();

  const [link, setLink] = useState("");
  const [message, setMessage] = useState({ fee: "0" });

  function btnAccessClick() {
    setMessage("Paying the wei tax to access, wait...");
    payLink(params.linkId, link.fee)
      .then(() => {
        setMessage("Payment done, redirecting...");
        return getLink(params.linkId);
      })
      .then((link) => {
        window.location.href = link.url;
      })
      .catch((err) => setMessage(err.message));
  }

  useEffect(() => {
    setMessage("Searching link data, wait a second...");
    getLink(params.linkId)
      .then((link) => {
        setMessage("");
        if (link.url) window.location.href = link.url;
        else setLink(link);
      })
      .catch((err) => setMessage(err.message));
  }, []);

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
              Link3 - Protected Link Area
            </h1>
            <p className="lead">These link was protect by Link3.</p>
            <hr />
            <p>
              To access the original URL content, please, connect your wallet
              and confirm the payment of <strong>{link.fee} wei</strong>.
            </p>
            <div className="row mb-3">
              <div className="col-6">
                <button
                  type="button"
                  onClick={btnAccessClick}
                  className="btn btn-primary w-100 h-100"
                >
                  <img
                    width={32}
                    alt="meta-logo"
                    className="me-2"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-metamask-2728406-2261817.png?f=webp"
                  />
                  <span className="ml-2">Pay and access the shorten link</span>
                </button>
              </div>
            </div>
            <div className="alert alert-success p-3 col-12 mt-3" role="alert">
              Test message
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

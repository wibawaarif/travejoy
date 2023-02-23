import React from "react";

import ImageHero from "assets/images/img-hero.png";
import ImageFrameHero from "assets/images/img-hero-frame.png";
import IconCities from "assets/images/icons/Icon_Cities.svg";
import IconTravelers from "assets/images/icons/Icon_Traveler.svg";
import IconTreasures from "assets/images/icons/Icon_Treasures.svg";

import Button from "elements/Button/index";

import formatNumber from 'utils/formatNumber'

export default function Hero(props) {
  function showMostPicked() {
    window.scrollTo({
      top: props.refMostPicked.current.offsetTop - 30,
      behavior: "smooth",
    });
  }


  return (
    <section className="container pt-4">
      <div className="row m-0 align-items-center">
        <div className="col-auto pr-5" style={{ width: 590 }}>
          <h1 className="fs-2 mt-4 fw-bold line-height-1 mb-3">
            Forget Busy Work, <br />
            Find Your Best{" "}
            <span className="text-pink font-weight-700">Vacation</span>
          </h1>
          <p className="mb-4 fs-4 fw-normal text-dark lh-base">
            When was the last time you traveled? If you don’t remember, maybe
            you need to{" "}
            <span className="text-secondary fw-medium">take a break</span> and
            start your holiday. It’s time to make memorable moments with your
            loved ones.{" "}
            <span className="text-secondary fw-medium">Travel and enjoy</span>.
          </p>
          <Button
            className="btn-pr px-5"
            hasShadow
            isPrimary
            onClick={showMostPicked}
          >
            <span className="fs-5 fw-medium text-light">Explore More</span>
          </Button>

          <div className="row" style={{marginTop: 80}}>
            <div className="col-auto" style={{ marginRight: 60 }}>
              <img
                width="38"
                height="38"
                src={IconTravelers}
                alt={`${props.data.travelers} Travelers`}
              />
              <h6 className="mt-3" style={{fontSize: 20}}>
                {formatNumber(props.data.travelers)}{" "}
                <span className="text-dark font-weight-400">Travelers</span>
              </h6>
            </div>
            <div className="col-auto" style={{ marginRight: 60 }}>
              <img
                width="38"
                height="38"
                src={IconTreasures}
                alt={`${props.data.treasures} Treasures`}
              />
              <h6 className="mt-3" style={{fontSize: 20}}>
                {formatNumber(props.data.treasures)}{" "}
                <span className="text-dark font-weight-400">Treasures</span>
              </h6>
            </div>
            <div className="col-auto">
              <img
                width="38"
                height="38"
                src={IconCities}
                alt={`${props.data.cities} Cities`}
              />
              <h6 className="mt-3" style={{fontSize: 20}}>
                {formatNumber(props.data.cities)}{" "}
                <span className="text-dark font-weight-400">Cities</span>
              </h6>
            </div>
          </div>
        </div>

        <div className="col-auto ps-5">
          <div className="d-flex justify-content-end align-items-center" style={{width: 600, height: 600 }}>
            <img
              src={ImageHero}
              alt="Room with couches"
              className="img-fluid position-absolute"
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '58%', margin: "-30px 0 0 -30px", zIndex: 1 }}
            />
            <img
              src={ImageFrameHero}
              alt="Room with couches frame"
              className="img-fluid position-absolute"
              style={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '58%', margin: "0 -45px -45px 0"}}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

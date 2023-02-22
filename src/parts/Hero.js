import React from "react";

import ImageHero from "assets/images/img-hero.jpg";
import ImageFrameHero from "assets/images/img-hero-frame.jpg";
import IconCities from "assets/images/icons/Icon_Cities.svg";
import IconTravelers from "assets/images/icons/Icon_Traveler.svg";
import IconTreasures from "assets/images/icons/Icon_Treasures.svg";

import Button from "elements/Button/index";

export default function Hero(props) {
  function showMostPicked() {
    window.scrollTo({
      top: props.refMostPicked.current.offsetTop - 30,
      behavior: "smooth",
    });
  }

  return (
    <section className="container pt-4">
      <div className="row align-items-center">
        <div className="col-auto pr-5" style={{ width: 700 }}>
          <h1 className="fs-2 fw-bold line-height-1 mb-3">
            Forget Busy Work, <br />
            Find Your Best{" "}
            <span className="text-pink font-weight-700">Vacation</span>
          </h1>
          <p className="mb-5 fs-5 fw-normal text-dark lh-base w-75">
            When was the last time you traveled? If you don’t remember, maybe
            you need to <span className="text-secondary fw-medium">take a break</span> and start your holiday. It’s time to make
            memorable moments with your loved ones. <span className="text-secondary fw-medium">Travel and enjoy</span>.
          </p>
          <Button
            className="btn px-5"
            hasShadow
            isPrimary
            onClick={showMostPicked}
          >
            Explore More
          </Button>

          <div className="row mt-5">
            <div className="col-auto" style={{ marginRight: 50}}>
              <img
                width="38"
                height="38"
                src={IconTravelers}
                alt={`${props.data.travelers} Travelers`}
              />
              <h6 className="mt-3">
                {props.data.travelers}{" "}
                <span className="text-dark font-weight-400">Travelers</span>
              </h6>
            </div>
            <div className="col-auto" style={{ marginRight: 50}}>
              <img
                width="38"
                height="38"
                src={IconTreasures}
                alt={`${props.data.treasures} Treasures`}
              />
              <h6 className="mt-3">
                {props.data.treasures}{" "}
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
              <h6 className="mt-3">
                {props.data.cities}{" "}
                <span className="text-dark font-weight-400">Cities</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "./Ads.css";
import callAPI from ".../../API/callAPI";
import ImageDefault from "../../Constants/images";
var adsInfor = {
  datetime: "2021-05-09T20:17",
  image: ImageDefault.sldZero,
  textStandstill: "Hiện tại chưa có khuyến mãi!",
  status: false,
};
callAPI("ads", "GET", null).then((res) => {
  if (res.data.status === true) {
    adsInfor = res.data;
  } else {
    adsInfor = {
      datetime: "2021-05-09T20:17",
      image: ImageDefault.sldZero,
      textStandstill: "Hiện tại chưa có khuyến mãi",
      status: false,
    };
  }
});

const Ads = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(adsInfor.datetime).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  // interval = setInterval(() => {
  //   callAPI("ads", "GET", null).then((res) => {
  //     adsInfor = res.data;
  //   });
  // }, 60000);
  return (
    <div>
      {adsInfor.status === true ? (
        <div>
          {" "}
          <div className="container text-run">
            <marquee behavior="scroll" scrollamount="12">
              <h3>
                <span className="text-jump">Khuyến mãi rộn ràng!&nbsp;</span>
                {adsInfor.textRun}
              </h3>
            </marquee>
          </div>
          <div className="container ads">
            <img src={adsInfor.image} className="img-ads" alt="Anh quang cao" />
            <section>
              <div className="text-center">
                <p>{adsInfor.textStandstill}</p>
                <p>Khuyến mãi còn: </p>
              </div>
              <div className="text-center">
                <span>{timerDays}</span>ngày&nbsp;:&nbsp;
                <span>{timerHours}</span>H&nbsp;:&nbsp;
                <span>{timerMinutes}</span>M&nbsp;:&nbsp;
                <span>{timerSeconds}</span>S
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="container ads">
          <img src={adsInfor.image} className="img-ads" alt="Anh quang cao" />
            <h2 style={{display:'flex', justifySelf:'center',alignSelf:'center'}}>
              {adsInfor.textStandstill}
            </h2>
        </div>
      )}
    </div>
  );
};

export default Ads;

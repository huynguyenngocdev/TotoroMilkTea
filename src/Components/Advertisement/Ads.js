import React, { useEffect, useRef, useState } from "react";
import Images from 'Constants/images'
import './Ads.css'
const Ads = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("May 1 2021 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
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

  return (
    <div className="container ads">
        <img src={Images.adsImage} className="img-ads" />
        <section>
          <div className="text-center">
            <p>Khuyến mãi cực sốc</p>
            <p>Tặng cốc Totoro cho 5 khách hàng có tổng chi tiêu cao nhất</p>
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
  );
};

export default Ads;
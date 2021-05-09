import React, { useEffect, useRef, useState } from "react";
import adsImage from "../../assets/images/advertisement/cup.jpg";
import "./Ads.css";

const Ads = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("May 14 2021 00:00").getTime();

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
    <div>
      <div className="container ads">
        <img src={adsImage} className="img-ads" />
        <section>
          <div className="text-center">
            <p>
              Khuyến mãi cực sốc
              <br /> Tặng cốc Totoro cho 5 khách hàng có hóa đơn cao nhất
            </p>
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
      <div className="container text-run">
        <marquee behavior="scroll" scrollamount="12">
          <h3>
            <span className='text-jump'>Khuyến mãi rộn ràng!</span> Khuyến mãi tưng bừng nhân dịp 30/4 và 1/5! Giảm giá cực sốc! Giảm
            tới 40% cho mỗi cốc trà sữa thơm ngon!
          </h3>
        </marquee>
      </div>
    </div>
  );
};

export default Ads;

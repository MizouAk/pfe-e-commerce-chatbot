
// Features.jsx
import "./Features.css";

import shipping from "../Img/free_shipping.png";
import order from "../Img/shipping.png";
import money from "../Img/save_maney.png";
import promo from "../Img/promotion.png";
import happy from "../Img/HappySell.png";
import support from "../Img/24_7Support.png";

function Features() {
  const items = [
    { title: "Free Shipping", img: shipping, color: "#ffe4e6" },
    { title: "Online Order", img: order, color: "#dcfce7" },
    { title: "Save Money", img: money, color: "#e0f2fe" },
    { title: "Promotions", img: promo, color: "#e0e7ff" },
    { title: "Happy Sell", img: happy, color: "#fce7f3" },
    { title: "24/7 Support", img: support, color: "#fff7ed" },
  ];

  return (
    <section className="features">
      {items.map((item, index) => (
        <div className="feature-card" key={index}>
          <img src={item.img} alt={item.title} className="feature-img" />
          <span style={{ background: item.color }}>{item.title}</span>
        </div>
      ))}
    </section>
  );
}

export default Features;

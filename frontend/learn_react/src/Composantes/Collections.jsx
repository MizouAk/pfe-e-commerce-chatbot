// Collections.jsx
import './Collections.css';
import PcGamer from "../Img/pc_budget_rx6600.jpg";
import Carte_Graphique from "../Img/rtx4070.jpg";
import Processeur from "../Img/i712700f.jpg";
import Ram from "../Img/ram16_ddr5_5200.jpg";
import Ssd from "../Img/ssd_sata_1tb.jpg";
import Hdd from "../Img/hdd_1tb.jpg";
import Carte_Mère from "../Img/mb_b760.jpg";
import Alimentation from "../Img/psu_750w_gold.jpg";
import Boîtier from "../Img/case_atx_airflow.jpg";
import Refroidissement from "../Img/aio_240.jpg";
import Ecran from "../Img/monitor_24_144.jpg";
import { Link } from "react-router-dom";
const collections = [
  { id: 1, name: "PC Gamer", img: PcGamer },
  { id: 2, name: "Carte Graphique", img: Carte_Graphique },
  { id: 3, name: "Processeur", img: Processeur },
  { id: 4, name: "RAM", img: Ram },
  { id: 5, name: "SSD", img: Ssd },
  { id: 6, name: "HDD", img: Hdd },
  { id: 7, name: "Carte Mère", img: Carte_Mère },
  { id: 8, name: "Alimentation", img: Alimentation },
  { id: 9, name: "Boîtier", img: Boîtier },
  { id: 10, name: "Refroidissement", img: Refroidissement },
  { id: 11, name: "Écran", img: Ecran },
];
function Collections() {
  return (
    <section className="collections">
      <h2 className="collections-title">Collections Populaires</h2>
      <div className="collections-grid">
        {collections.map((item) => (
          <Link
            key={item.id}
            to={`/shop?category_id=${item.id}`}
            className="collection-card"
          >
            <div className="collection-img-wrapper">
              <img src={item.img} alt={item.name} />
            </div>
            <p className="collection-name">{item.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default Collections;

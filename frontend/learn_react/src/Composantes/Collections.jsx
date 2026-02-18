

import './Collections.css'
import PcGamer from "../Img/pc_gamer.webp";
import Ecran from "../Img/ecrans.png";
import Clavier_souris from "../Img/clavier_souris.webp";
import Laptop from "../Img/laptop.png";
const collections = [
  { id:1, name: "PC Gamer", img: PcGamer },
  { id:2, name: "Carte Graphique", img: Ecran },
  { id:3, name: "Processeur", img: Clavier_souris },
  { id:4, name: "RAM", img: Laptop },
  { id:5, name: "SSD", img: Laptop },
  { id:6, name: "HDD", img: Laptop },
  { id:7, name: "Carte Mère", img: Laptop },
  { id:8, name: "Alimentation", img: Laptop },
  { id:9, name: "Boîtier", img: Laptop },
  { id:10, name: "Refroidissement", img: Laptop },
  { id:11, name: "Écran", img: Laptop },
];

function Collections() {
  return (
    <section className="collections">
      <h2 className="collections-title">Collections Populaires</h2>
      <div className="collections-grid">
        {collections.map((item) => (
          <div key={item.id} className="collection-card">
            <div className="collection-img-wrapper">
              <img src={item.img} alt={item.name} />
            </div>
            <p className="collection-name">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collections;

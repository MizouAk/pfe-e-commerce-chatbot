import Button from '../Component/Buttons';
 // المكون ديالك اللي درتي من قبل
import './CategoriesButtons.css'
function CategoriesButtons() {
  return (
    <div className="categories-buttons">
      <Button name="Tous" onClick={() => console.log("Tous")} />
      <Button name="PC Gamer" onClick={() => console.log("PC Gamer")} />
      <Button name="Carte Graphique" onClick={() => console.log("Carte Graphique")} />
      <Button name="Processeur" onClick={() => console.log("Processeur")} />
      <Button name="RAM" onClick={() => console.log("RAM")} />
      <Button name="SSD" onClick={() => console.log("SSD")} />
      <Button name="HDD" onClick={() => console.log("SSD")} />
      <Button name="Carte Mere" onClick={() => console.log("SSD")} />
      <Button name="Alimentation" onClick={() => console.log("SSD")} />
      <Button name="Boitier" onClick={() => console.log("SSD")} />
      <Button name="Refroidissement" onClick={() => console.log("SSD")} />
      <Button name="Ecran" onClick={() => console.log("SSD")} />
    </div>
  );
}

export default CategoriesButtons;

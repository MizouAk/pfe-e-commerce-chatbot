import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";
import HeroShop from "../Composantes/HeroShop";
import ProductsList from "../Composantes/ProductsList";
import CategoriesButtons from "../Composantes/CategoriesButtons";
import Notch from "../Composantes/Notch";

function Shop() {
    return (
        <>
            <Navbar />
            <HeroShop />
            <CategoriesButtons />
            <ProductsList />
            <Notch />

            <Footer />
        </>
    );
}
export default Shop;

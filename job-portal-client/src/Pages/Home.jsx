import Banner from "../Components/Banner";
import TabContainers from "../Components/TabContainers";
import About from "../Components/about/About";
import FAQ from "../Components/FAQ";
import Hero from "../Components/hero/Hero";


const Home = () => {
    
    
    return (
        <div className="w-11/12 mx-auto">
         <Banner></Banner>
         <Hero></Hero>
         <TabContainers></TabContainers>
         <About></About>
         <FAQ></FAQ>
        </div>
    );
};

export default Home;
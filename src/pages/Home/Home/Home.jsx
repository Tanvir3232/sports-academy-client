
import { Helmet } from "react-helmet";
import Slider from "../Slider/Slider";
import Testimonials from "../Testimonials/Testimonials";
import TopClasses from "../TopClasses/TopClasses";
import TopInstructors from "../TopInstructors/TopInstructors";

const Home = () => {
  
    return (
        <div >
            <Helmet>
                <title>SportsElevate | Home</title>
            </Helmet>
            <Slider></Slider>
            <TopClasses></TopClasses>
            <TopInstructors></TopInstructors>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;


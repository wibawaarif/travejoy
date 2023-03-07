import React, { Component } from "react";

import Header from "parts/Header"
import Hero from 'parts/Hero'
import MostPicked from 'parts/MostPicked'
import Categories from 'parts/Categories'
import Testimonials from "parts/Testimonials";
import Footer from "parts/Footer";

import landingPage from 'json/landingPage.json'

export default class LandingPage extends Component {
    constructor(props){
        super(props);
        this.refMostPicked = React.createRef();
    }

    componentDidMount() {
        window.title = "Travejoy | Home";
        window.scrollTo(0, 0);
    }


    render() {
        return <>
            <Header {...this.props}></Header>
            <Hero refMostPicked={this.refMostPicked} data={landingPage.hero} />
            <MostPicked refMostPicked={this.refMostPicked} data={landingPage.mostPicked}/>
            <Categories data={landingPage.categories} />
            <Testimonials data={landingPage.testimonial} />
            <Footer />
        </>
    }
}
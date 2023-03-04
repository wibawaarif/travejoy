import React, { Component } from 'react'

import Fade from "react-reveal/Fade";
import Header from "parts/Header"
import PageDetailTitle from 'parts/PageDetailTitle'
import FeaturedImage from 'parts/FeaturedImage'
import PageDetailDescription from 'parts/PageDetailDescription'
import BookingForm from 'parts/BookingForm'
import Categories from 'parts/Categories'
import Testimonials from 'parts/Testimonials'
import Footer from 'parts/Footer'

import itemDetails from 'json/itemDetails.json'

export default class DetailsPage extends Component {

    componentDidMount() {
        window.title = "Details Page";
        window.scrollTo(0, 0);
    }

  render() {
    const breadcrumb = [{
        pageTitle: "Home", pageHref: "" ,
      }, {
        pageTitle: "House Details", pageHref: "" 
      }]

    return (
      <>
      <Header {...this.props} />
      <PageDetailTitle breadcrumb={breadcrumb} data={itemDetails} />
      <FeaturedImage data={itemDetails.imageUrls} />
      <section className='container'>
        <div className='row'>
          <div className='col-7 pe-5'>
            <Fade bottom>
            <PageDetailDescription data={itemDetails} />
            </Fade>
          </div>
          <div className='col-5'>
          <Fade bottom>
            <BookingForm itemDetails={itemDetails} />
            </Fade>
          </div>
        </div>
      </section>

      <Categories data={itemDetails.categories} />
      <Testimonials data={itemDetails.testimonial} />
      <Footer />
      </>
    )
  }
}

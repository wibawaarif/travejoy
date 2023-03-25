import React, { Component } from 'react'

import Fade from "react-reveal/Fade";
import { connect } from 'react-redux';
import Header from "parts/Header"
import PageDetailTitle from 'parts/PageDetailTitle'
import FeaturedImage from 'parts/FeaturedImage'
import PageDetailDescription from 'parts/PageDetailDescription'
import BookingForm from 'parts/BookingForm'
import Testimonials from 'parts/Testimonials'
import Footer from 'parts/Footer'


import { checkoutBooking } from 'store/actions/checkout';

import { fetchPage } from 'store/actions/page';
import Activities from 'parts/Activities';

class DetailsPage extends Component {

    componentDidMount() {
        document.title = 'Detail | Travejoy'
        window.scrollTo(0, 0);

        if(!this.props.page[this.props.match.params.id]) {
          this.props.fetchPage(`/detail-page/${this.props.match.params.id}`, this.props.match.params.id)
      }   
    }
  render() {
    const { page, match } = this.props
    if(!page[match.params.id]) return null;

    const breadcrumb = [{
        pageTitle: "Home", pageHref: "" ,
      }, {
        pageTitle: "House Details", pageHref: "" 
      }]

    return (
      <>
      <Header {...this.props} />
      <PageDetailTitle breadcrumb={breadcrumb} data={page[match.params.id]} />
      <FeaturedImage data={page[match.params.id].imageId} />
      <section className='container'>
        <div className='row'>
          <div className='col-12 col-lg-7 pe-5'>
            <Fade bottom>
            <PageDetailDescription data={page[match.params.id]} />
            </Fade>
          </div>
          <div className='col-12 col-lg-5'>
          <Fade bottom>
            <BookingForm startBooking={this.props.checkoutBooking} itemDetails={page[match.params.id]} />
            </Fade>
          </div>
        </div>
      </section>

      <Activities data={page[match.params.id].activityId} />
      <Testimonials data={page[match.params.id].testimonial} />
      <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  page: state.page
})

export default connect(mapStateToProps, { checkoutBooking, fetchPage })(DetailsPage);

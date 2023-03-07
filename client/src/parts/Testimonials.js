import React from 'react'
import Star from 'elements/Star'
import Button from 'elements/Button'
import Fade from 'react-reveal/Fade'

import TestimonyAccent from 'assets/images/testimonial-landingpage-frame.png'

export default function Testimonials({data}) {
  return (
    <Fade bottom delay={300}>
    <section className='container ps-4 pe-4'>
        <div className="row align-items-center">
            <div className="col-auto" style={{marginRight: 70}}>
                <div className="testimonial-hero" style={{margin: `30px 0 0 30px`}}>
                    <img src={data.imageUrl} alt="Testimonial" className="position-absolute" style={{zIndex: 2}}/>
                    <img src={TestimonyAccent} alt="Testimonial frame" className="position-absolute"  style={{zIndex: 1, margin: `-30px 0 0 -30px`}}/>
                </div>
            </div>
            <div className="col-6">
                <h3 className='fw-medium' style={{marginBottom: 40}}>
                    {data.name}
                </h3>
                <Star value={data.rate} width={35} height={35} spacing={4} />
                <h2 className="line-height-2 my-3" style={{fontSize: 32, fontWeight: 400}}>
                    "{data.content}"
                </h2>
                <span className="text-dark fs-5 fw-light">
                    {data.familyName}, {data.familyOccupation}
                </span>
                <div style={{marginTop: 40}}>
                    <Button className="btn py-4 px-5" hasShadow isPrimary type='link' href={`/testimonial/${data._id}`}>
                    <span className="fs-5 fw-medium text-light">Read Their Story</span>
                    </Button>
                </div>
            </div>
        </div>
    </section>
    </Fade>
  )
}

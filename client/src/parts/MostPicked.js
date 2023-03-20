import Button from 'elements/Button'
import React from 'react'
import Fade from 'react-reveal/Fade'

export default function MostPicked(props) {
  return (
    <section className='container pe-4 ps-4' ref={props.refMostPicked}>
            <Fade bottom>
        <h3 className='mb-3'>Most Picked</h3>
        <div className='container-grid mb-0' style={{height: 500}}>
            {
                props.data.map( (item, index) => {
                    return (
                    <div key={`mostpicked-${index}`} className={`item column-4${index === 0 ? " row-2" : " row-1"}`}>
                        <Fade bottom delay={300 * index}>
                        <div className='card card-featured'>
                            <div className='tag'>
                                ${item.price}
                                <span className='fw-light'> per {item.unit}</span>
                            </div>
                            <figure className='img-wrapper'>
                                <img src={item.imageId[0] ? `${process.env.REACT_APP_HOST}/${item.imageId[0].imageUrl}` : ""} alt={item.name} className='img-cover' />
                            </figure>
                            <div className='meta-wrapper'>
                                <Button href={`/properties/${item._id}`} type='link' className='stretched-link d-block text-white text-decoration-none'>
                                    <h5 className='fw-medium'>{item.title}</h5>
                                </Button>
                                <span className='fw-light fs-5'>
                                    {item.city}, {item.country}
                                </span>
                            </div>
                        </div>
                        </Fade>
                    </div>
                    )
                } )
            }

        </div>
        </Fade>
    </section>
  )
}

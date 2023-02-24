import Button from 'elements/Button'
import React from 'react'

export default function MostPicked(props) {
  return (
    <section className='container p-4' ref={props.refMostPicked} style={{height: 2000}}>
        <h3 className='mb-3'>Most Picked</h3>
        <div className='container-grid mb-0'>
            {
                props.data.map( (item, index) => {
                    return (
                    <div key={`mostpicked-${index}`} className={`item column-4${index === 0 ? " row-2" : " row-1"}`}>
                        <div className='card card-featured'>
                            <div className='tag'>
                                ${item.price}
                                <span className='fw-light'> per {item.unit}</span>
                            </div>
                            <figure className='img-wrapper'>
                                <img src={item.imageUrl} alt={item.name} className='img-cover' />
                            </figure>
                            <div className='meta-wrapper'>
                                <Button href={`/properties/${item._id}`} type='link' className='streched-link d-block text-white'>
                                    <h5 className='fw-medium'>{item.name}</h5>
                                </Button>
                                <span className='fw-light fs-5'>
                                    {item.city}, {item.country}
                                </span>
                            </div>
                        </div>
                    </div>
                    )
                } )
            }

        </div>

    </section>
  )
}

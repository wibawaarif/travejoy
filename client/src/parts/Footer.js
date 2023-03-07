import React from 'react'

import Button from 'elements/Button'
import IconText from './IconText'

export default function Footer() {
  return (
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-auto" style={{width: 300}}>
                    <IconText />
                    <p className="brand-tagline" style={{paddingLeft: 12}}>
                    We kaboom your beauty holiday instantly and memorable
                    </p>
                </div>
                <div className="col-2" style={{marginLeft: 100, marginRight: 80}}>
                    <h6 className="mt-2">
                        For Beginners
                    </h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <Button className='text-decoration-none' type='link' href='/register'><span>New Account</span></Button>
                        </li>
                        <li className="list-group-item">
                            <Button className='text-decoration-none' type='link' href='/properties'><span>Start booking a Room</span></Button>
                        </li>
                        <li className="list-group-item">
                            <Button className='text-decoration-none' type='link' href='/use-payments'><span>Use Payments</span></Button>
                        </li>
                    </ul>
                </div>
                <div className="col-2" style={{marginRight: 70}}>
                    <h6 className="mt-2">
                        Explore Us
                    </h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <Button className='text-decoration-none' type='link' href='/careers'><span>Our Careers</span></Button>
                        </li>
                        <li className="list-group-item">
                            <Button className='text-decoration-none' type='link' href='/privacy'><span>Privacy</span></Button>
                        </li>
                        <li className="list-group-item">
                            <Button className='text-decoration-none' type='link' href='/terms'><span>Terms & Conditions</span></Button>
                        </li>
                    </ul>
                </div>
                <div className="col-2">
                    <h6 className="mt-2">
                        Connect Us
                    </h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <Button className='text-decoration-none' isExternal type='link' href='mailto:support@travejoy.id'><span>support@travejoy.id</span></Button>
                        </li>
                        <li className="list-group-item">
                            <Button className='text-decoration-none' isExternal type='link' href='tel:+622100201999'><span>021 - 0020 - 1999</span></Button>
                        </li>
                        <li className="list-group-item">
                            <p className='text-dark' style={{fontWeight: 300}}>Travejoy, Batam, Indonesia</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <div className="col text-center copyrights">
                    Copyright 2023 • All Rights Reserved • Travejoy 
                </div>
            </div>


        </div>
    </footer>
  )
}

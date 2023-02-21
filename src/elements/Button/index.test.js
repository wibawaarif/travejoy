import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Button from './index'

test("Should not clicked if isDisabled is exist", () => {
    const { container } = render(<Button isDisabled></Button>)
    screen.debug()
    expect(container.querySelector('span.disabled')).toBeInTheDocument()
})

test("Should render loading/spinner", () => {
    const { container, getByText } = render(<Button isLoading></Button>)

    expect(getByText(/loading/i)).toBeInTheDocument()
    expect(container.querySelector('span')).toBeInTheDocument()
})

test("Should render <a> tag if external link", () => {
    const { container } = render(<Button type='link' isExternal></Button>)

    expect(container.querySelector('a')).toBeInTheDocument()
})

test("Should render <Link> tag if type link but for internal routing", () => {
    const { container } = render(<Router><Button type='link'></Button></Router>)
    screen.debug()
    expect(container.querySelector('a')).toBeInTheDocument()
})
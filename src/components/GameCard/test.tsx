import { screen, fireEvent } from '@testing-library/react'
import { renderWithTHeTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstart Games',
  img: 'http://source.unsplash.com/user/willianjusten/300x140',
  price: 'R$ 200,00'
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    renderWithTHeTheme(<GameCard {...props} />)

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderWithTHeTheme(<GameCard {...props} />)

    const price = screen.getByText('R$ 200,00')

    expect(price).not.toHaveStyle({
      textDecoration: 'line-through'
    })

    expect(price).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render price in label', () => {
    renderWithTHeTheme(<GameCard {...props} promotionalPrice="R$ 100,00" />)

    expect(screen.getByText('R$ 200,00')).toHaveStyle({
      textDecoration: 'line-through'
    })

    expect(screen.getByText('R$ 100,00')).not.toHaveStyle({
      textDecoration: 'line-through'
    })
  })

  it('should render Favorite Icon when Favorite is true', () => {
    renderWithTHeTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', () => {
    const onFav = jest.fn()

    renderWithTHeTheme(<GameCard {...props} favorite onFav={onFav} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
  })

  it('should render Ribbon', () => {
    renderWithTHeTheme(
      <GameCard
        {...props}
        ribbon="My ribbon"
        ribbonColor="secondary"
        ribbonSize="small"
      />
    )

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
    expect(ribbon).toBeInTheDocument()
  })
})

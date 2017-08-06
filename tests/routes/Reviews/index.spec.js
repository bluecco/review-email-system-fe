import ReviewsRoute from 'routes/Reviews'

describe('(Route) Reviews', () => {
  it('returns a route configuration object', () => {
    expect(typeof ReviewsRoute({})).to.equal('object')
  })

  it('has a path \'reviews\'', () => {
    expect(ReviewsRoute({}).path).to.equal('reviews')
  })
})

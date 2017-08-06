import AdminRoute from 'routes/Admin'

describe('(Route) Admin', () => {
  it('returns a route configuration object', () => {
    expect(typeof AdminRoute({})).to.equal('object')
  })

  it('has a path \'admin\'', () => {
    expect(AdminRoute({}).path).to.equal('admin')
  })
})

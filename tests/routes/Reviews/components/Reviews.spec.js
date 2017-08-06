import React from 'react'
import { bindActionCreators } from 'redux'
import { Reviews, ReviewRow } from 'routes/Reviews/components'
import { shallow, mount } from 'enzyme'

describe('(Component) Reviews', () => {
  let _props, _spies, _wrapper
  beforeEach(() => {
    _spies = {}
    _props = {
      reviews : [
        { arrivalDate: 1, subject: 'subject', 'body': 'body', emailFrom: 'email', score: 10, published: true },
        { arrivalDate: 2, subject: 'subject', 'body': 'body', emailFrom: 'email', score: 20, published: true },
        { arrivalDate: 3, subject: 'subject', 'body': 'body', emailFrom: 'email', score: 30, published: true }
      ],
      pageable: {
        number : 1,
        totalElements: 1,
        totalPages: 1,
        size: 1,
        numberOfElements: 1,
        first: 1,
        last: 1
      },
      ...bindActionCreators(
        {
          fetchReviews : (_spies.fetchReviews = sinon.spy())
        },
        _spies.dispatch = sinon.spy()
      )
    }
  })
  describe('- Shallow -', () => {
    beforeEach(() => {
      _wrapper = shallow(<Reviews {..._props} />)
    })

    it('renders with an <ReviewRow>', () => {
      expect(_wrapper.find(ReviewRow)).to.have.length(3)
    })

    it('should call fetchReviews', () => {
      _spies.fetchReviews.should.have.been.called()
    })
  })
})

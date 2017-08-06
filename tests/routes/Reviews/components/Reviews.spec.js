import React from 'react'
import { bindActionCreators } from 'redux'
import { Reviews } from 'routes/Reviews/components/Reviews'
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
      ...bindActionCreators(
        {
          fetchEmails : (_spies.fetchEmails = sinon.spy())
        },
        _spies.dispatch = sinon.spy()
      )
    }
  })
  describe('- Shallow -', () => {
    beforeEach(() => {
      _wrapper = shallow(<Counter {..._props} />)
    })

    it('renders with an <ReviewsRow>', () => {
      expect(_wrapper.find(ReviewsRow)).to.have.length(1)
    })

    it('should call fetchReviews', () => {
      _spies.fetchReviews.should.have.been.called()
    })
  })
})

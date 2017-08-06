import React from 'react'
import { bindActionCreators } from 'redux'
import { Header, EmailRow, Admin } from 'routes/Admin/components'
import { shallow, mount } from 'enzyme'

describe('(Component) Admin', () => {
  let _props, _spies, _wrapper
  beforeEach(() => {
    _spies = {}
    _props = {
      emails : [
        { messageId: 1, arrivalDate: 1, email: 'email', score: 'score', published: 1 },
        { messageId: 2, arrivalDate: 2, email: 'email', score: 'score', published: 2 },
        { messageId: 3, arrivalDate: 3, email: 'email', score: 'score', published: 3 }
      ],
      publishing : [1,2,3],
      analyzing  : [1,2,3],
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
          fetchEmails : (_spies.fetchEmails = sinon.spy())
        },
        _spies.dispatch = sinon.spy()
      )
    }
  })
  describe('- Shallow -', () => {
    beforeEach(() => {
      _wrapper = shallow(<Admin {..._props} />)
    })

    it('renders with an <Header>', () => {
      expect(_wrapper.find(Header)).to.have.length(1)
    })

    it('renders with <EmailRow>', () => {
      expect(_wrapper.find(EmailRow)).to.have.length(3)
    })
    it('should call fetchEmails', () => {
      _spies.fetchEmails.should.have.been.called()
    })
  })
})

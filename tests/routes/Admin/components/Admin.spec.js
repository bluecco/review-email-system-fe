import React from 'react'
import { bindActionCreators } from 'redux'
import { Counter, Header, EmailRow } from 'routes/Admin/components'
import { shallow, mount } from 'enzyme'

describe('(Component) Admin', () => {
  let _props, _spies, _wrapper
  beforeEach(() => {
    _spies = {}
    _props = {
      emails : [
        { arrivalDate: 1, email: 'email', score: 'score', published: 1 },
        { arrivalDate: 2, email: 'email', score: 'score', published: 2 },
        { arrivalDate: 3, email: 'email', score: 'score', published: 3 }
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

    it('renders as a <div>.', () => {
      expect(_wrapper.is('div')).to.equal(true)
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

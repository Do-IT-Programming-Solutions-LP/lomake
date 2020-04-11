/* eslint-disable no-undef */
/// <reference types="cypress" />

import * as _ from "lodash"

function makeid(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

describe('Core tests', function () {
  this.beforeEach(function () {
    cy.visit('http://localhost:8000')
  })

  it('Frontpage loads', function () {
    cy.contains("Bachelor's Programme for Teachers of Mathematics, Physics and Chemistry")
  })

  it('Filter works and form can be opened', function () {
    cy.get('[data-cy=overviewpage-filter]').type("bachelor's programme in computer science")
    cy.get('[data-cy=smileytable-link-to-form]').should('have.length', 1).click()
    cy.get('[data-cy=formview-title]')
  })
})

describe('Form tests', function () {
  this.beforeEach(function () {
    cy.visit("http://localhost:8000/form/Bachelor's%20Programme%20in%20Computer%20Science")
  })

  // This function just clears the forms' input fields
  this.beforeAll(function () {
    cy.get("[data-cy^=form-section").click({ multiple: true })
    cy.get(".editor-class").each(function (el, index, list) {
      cy.get(el).click()
      cy.focused().clear()
    })
  })

  it('Can open a question, click on smily face, and the result it saved.', () => {
    cy.get('[data-cy=form-section-I]').click()
    cy.get('[data-cy=street-light-neutral-review_of_last_years_situation_report]').click()
    cy.get('[data-cy=form-section-III]').click()
    cy.get('[data-cy=street-light-positive-community_wellbeing]').click()

    // Check that the changes have been saved:
    cy.visit('http://localhost:8000')
    cy.get('[data-cy="5-0"]').should('have.css', 'background-color').and('eq', 'rgb(255, 255, 177)')
    cy.get('[data-cy="5-9"]').should('have.css', 'background-color').and('eq', 'rgb(157, 255, 157)')
  })

  it('Can write to a textfield and the answer is saved.', function () {
    const testString1 = makeid(10)
    const testString2 = makeid(10)

    cy.get('[data-cy=form-section-I]').click()
    cy.get('[data-cy=textarea-review_of_last_years_situation_report]')
      .find('.editor-class')
      .type(testString1)

    cy.get('[data-cy=form-section-III]').click()
    cy.get('[data-cy=textarea-wellbeing_information_used]').find('.editor-class').type(testString2)

    cy.reload(true)

    // Then check that answers have been changed:
    cy.get('[data-cy=form-section-I]').click()
    cy.get('[data-cy=textarea-review_of_last_years_situation_report]')
      .find('.editor-class')
      .should('contain.text', testString1)

    cy.get('[data-cy=form-section-III]').click()
    cy.get('[data-cy=textarea-wellbeing_information_used]')
      .find('.editor-class')
      .should('contain.text', testString2)
  })

  it("Can click next and see a checkmark if answer is valid", function () {
    cy.get('[data-cy=form-section-I]').click()
    cy.get('[data-cy=textarea-review_of_last_years_situation_report]').find(".editor-class").click()
    cy.focused().clear()
    cy.focused().type("This text is long enough, but not too long. Therefore I want a green checkmark.")
    cy.get('[data-cy=form-section-I-nextbutton]').click()

    cy.get('[data-cy=form-section-I]').find(".check")
  })

  it("Can click next and see an error mark if required answers are missing", function () {
    cy.get('[data-cy=form-section-II]').click()
    cy.get('[data-cy=form-section-II-nextbutton]').click()
    cy.get('[data-cy=form-section-II]').find(".close")
  })


  it("Cant click next and error is shown if text is too long", function () {
    cy.get('[data-cy=form-section-II]').click()
    cy.get('[data-cy=textarea-overall_status_information_used]').find(".editor-class").click()
    cy.focused().clear()
    cy.focused().type("aaaaaaaaaa".repeat(101), { delay: 0 })

    cy.get('[data-cy=form-section-II-nextbutton]').should("be.disabled")
    cy.contains("One or more answers that are too long")

  })

})
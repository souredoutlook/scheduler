describe("appointments", ()=>{
  beforeEach(()=>{
    cy.request('GET', '/api/debug/reset')

    // Visits the root of our web server
    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday"); //default assertion confirms that Monday is in the document
  })
  it("should book an interview", ()=>{
    

    // Clicks on the "Add" button in the second appointment
    cy.get('[alt=Add]').first().click();
    // Enters their name
    cy.get('[data-testid=student-name-input]').type("Nicholas Meisenheimer");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains('Save').click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Nicholas Meisenheimer");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })
  it("should edit an interview", ()=>{
    // Clicks the edit button for the existing appointment
    cy.get('[alt=Edit]').first().click({force: true});
    //Changes the name
    cy.get('[data-testid=student-name-input]').clear().type("Nicholas Meisenheimer");
    // Chooses an interviewer
    cy.get("[alt='Tori Malcolm']").click();
    // Clicks the save button
    cy.contains('Save').click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Nicholas Meisenheimer");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  })

  it.only("should cancel an interview", ()=>{

    // Clicks the delete button for the existing appointment
    cy.get('[alt=Delete]').first().click({force: true});
    // Clicks the confirm button
    cy.contains('Confirm').click();
    cy.contains('Deleting').should('exist')
    // Sees that the appointment slot is empty
    cy.contains('Deleting').should('not.exist')
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');

  })
})
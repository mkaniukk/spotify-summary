describe('Open page spec', () => {
  it('Opens Spotify Summary', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Find Home button', () => {
  it('Finds Home button', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Logged in as')
  })
})

describe('Find Artists button', () => {
  it('Finds Artists button', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Logged in as')
  })
})

describe('Find Tracks button', () => {
  it('Finds Tracks button', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Logged in as')
  })
})

describe('Find Settings button', () => {
  it('Finds Settings button', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Logged in as')
  })
})

describe('Find Log in button', () => {
  it('Finds Log in button', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Logged in as')
  })
})

describe('User profile picture', () => {
  it('Finds user profile picture', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Logged in as')
  })
})

describe('Redirect to Artists', () => {
  it('Redirects to Artists', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Artists').click()
    cy.location('pathname').should('eq', '/artists');
  })
})

describe('Redirect to Tracks', () => {
  it('Redirects to Tracks', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Tracks').click()
    cy.location('pathname').should('eq', '/tracks');
  })
})

describe('Redirect to Home', () => {
  it('Redirects to Home', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Home').click()
    cy.location('pathname').should('eq', '/');
  })
})

describe('Redirect to Settings', () => {
  it('Redirects to Settings', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Settings').click()
    cy.location('pathname').should('eq', '/settings');
  })
})


/* eslint-disable */

describe('Blog app', () => {
    beforeEach(() => {

        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Jarkko Testaaja',
            username: 'testimies',
            password: 'salainen'
            }

        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.visit('http://localhost:3000')
        /*
        cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testimies', password: 'salainen'
        }).then(response => {
        localStorage.setItem('bloguser', JSON.stringify(response.body))

        cy.visit('http://localhost:3000')
    })*/
    })
  
    it('Login form is shown', () => {
        cy.contains("Login to view blogs:")
        cy.contains("username")
        cy.contains("password")
        cy.contains("login")
    })


    describe('Login',() => {
        it('succeeds with correct credentials', () => {
            cy.get('#usernameinput').type('testimies')
            cy.get('#passwordinput').type('salainen')
            cy.get('#loginbutton').click()

            cy.contains('Logged in as testimies')
        })
    
        it('fails with wrong credentials', () => {
            cy.get('#usernameinput').type('wrong')
            cy.get('#passwordinput').type('julkinen')
            cy.get('#loginbutton').click()
  
            cy.contains('Failed to log in')
        })
    })

    describe('When logged in', () => {

        beforeEach(() => {
            cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'testimies', password: 'salainen'
            }).then(response => {
            localStorage.setItem('bloguser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
            })
        })
    
        it('A blog can be created', () => {
          cy.contains('New note').click()
          cy.get('#titleinput').type('New Blog Title')
          cy.get('#authorinput').type('New Author')
          cy.get('#urlinput').type('book.url.org')
          cy.contains('save').click()

          cy.contains('New Blog Title by New Author')
        })

        it('created blog can be liked', () => {
            cy.contains('New note').click()
            cy.get('#titleinput').type('New Blog Title')
            cy.get('#authorinput').type('New Author')
            cy.get('#urlinput').type('book.url.org')
            cy.contains('save').click()

            cy.wait(5000)

            cy.contains('New Blog Title by New Author').contains('View').click()
            cy.contains('likes: 0')
            cy.contains('Like').click()
            cy.contains('likes: 1')
          })

        it('created blog can be removed', () => {
        cy.contains('New note').click()
        cy.get('#titleinput').type('New Blog Title')
        cy.get('#authorinput').type('New Author')
        cy.get('#urlinput').type('book.url.org')
        cy.contains('save').click()

        cy.wait(5000)

        cy.contains('New Blog Title by New Author').contains('View').click()
        cy.contains('Remove').click()
        cy.contains('New Blog Title by New Author').should('not.exist')
        })

        it('blogs in right order', () => {
            cy.contains('New note').click()
            cy.get('#titleinput').type('New Blog Title')
            cy.get('#authorinput').type('New Author')
            cy.get('#urlinput').type('book.url.org')
            cy.contains('save').click()
    
            cy.wait(5000)

            cy.contains('New Blog Title by New Author').contains('View').click()
            cy.contains('Like').click()

            cy.contains('New note').click()
            cy.get('#titleinput').type('Second Blog Title')
            cy.get('#authorinput').type('New Author')
            cy.get('#urlinput').type('book.url.org')
            cy.contains('save').click()

            cy.wait(5000)

            cy.get('.blog').eq(0).should('contain', 'New Blog Title')
            cy.get('.blog').eq(1).should('contain', 'Second Blog Title')
            })
      })
      
})
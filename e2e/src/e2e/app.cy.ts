/* eslint-disable cypress/no-unnecessary-waiting */
describe('e2e', () => {
  beforeEach(() => cy.visit('/').wait(2000));

  xdescribe('Navigate to Home, search a valid Pokémon and see it details', () => {
    it('Start navigation at Home', () => {
      cy.location('pathname').should('eq', '/');
    });

    it('Find Pokémon', () => {
      cy.get('[data-cy="bulbasaur"]')
        .find('img')
        .should('have.attr', 'src')
        .should(
          'equal',
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        );
    });

    it('Navigate to Pokémon details', () => {
      cy.get('[data-cy="bulbasaur"]').click();

      cy.location('pathname').should('contain', '/pokemon/bulbasaur');
    });

    it('Validate the information is there', () => {
      cy.visit('/pokemon/bulbasaur').wait(2000);

      cy.get('h1').should('contain.text', 'BULBASAUR');
      cy.get('span').should('contain.text', '#1');

      cy.get('.type-pill').should('have.length', 2);
    });
  });

  describe('Navigate to Home, search an invalid Pokémon and dont see it details', () => {
    it('Start navigation at Home', () => {
      cy.location('pathname').should('eq', '/');
    });

    it('Find Pokémon', () => {
      cy.get('[data-cy="search"]').type('cramorant');

      cy.wait(500);

      cy.get('.card').should('have.length', 3);

      cy.get('[data-cy="cramorant-gulping"]')
        .find('img')
        .should('have.attr', 'src')
        .should(
          'not.equal',
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10182.png'
        )
        .should('contain', 'assets/pokeball.png');
    });

    it('Navigate to Pokémon details', () => {
      cy.get('[data-cy="cramorant-gulping"]').click();

      cy.location('pathname').should('contain', '/pokemon/cramorant-gulping');
    });

    it('Validate the information is there', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.visit('/pokemon/cramorant-gulping').wait(2000);

      cy.get('span').should(
        'contain.text',
        'This Pokémon escaped! Better luck next time!'
      );
    });
  });
});

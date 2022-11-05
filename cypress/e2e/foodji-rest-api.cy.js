describe('foodji - REST API E2E tests', () => {
  it('1. should return the valid JSON response for /machines/list endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/machines/list',
      headers: {
        'content-type': 'application/json',
      },
    }).then((reqRes) => {
      const { body } = reqRes;

      expect(body.status).to.be.eq('success');
      expect(body).to.have.property('apiVersion').and.be.eq('1.0');
      expect(body).to.have.property('limit').and.be.eq(0);
      expect(body).to.have.property('offset').and.be.eq(0);
      expect(body).to.have.property('total').and.be.eq(3);
      expect(body).to.have.property('data').and.to.have.length(3);

      body.data.forEach((item) => {
        expect(item).to.have.property('id');
      });
    });
  });

  it('2. should return the valid JSON response for /machines/list/{id} endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/machines/list',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((reqRes) => {
        const {
          body: { data },
        } = reqRes;

        cy.wrap(data[0].id);
      })
      .then((machineId) => {
        cy.request({
          method: 'GET',
          url: `/machines/${machineId}`,
          headers: {
            'content-type': 'application/json',
          },
        }).then((reqRes) => {
          const {
            body: { data },
          } = reqRes;

          expect(reqRes.status).to.be.eq(200);
          expect(reqRes.statusText).to.be.eq('OK');

          expect(data).to.have.property('id');
          expect(data).to.have.property('address');
          expect(data).to.have.property('isOnline');
          expect(data).to.have.property('location');
          expect(data).to.have.property('distance');
          expect(data).to.have.property('group');
          expect(data).to.have.property('machineProducts');
          expect(data).to.have.property('qrCode');
          expect(data).to.have.property('locale');
          expect(data).to.have.property('name');
          expect(data).to.have.property('status');
          expect(data).to.have.property('userGroups');
          expect(data).to.have.property('packages');
        });
      });
  });

  it('3. should return at least one product for every machine in /machines/list/{id} endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/machines/list',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((reqRes) => {
        const {
          body: { data },
        } = reqRes;

        const machineIds = data.map((machine) => machine.id);

        cy.wrap(machineIds);
      })
      .each((machineId) => {
        cy.request({
          method: 'GET',
          url: `/machines/${machineId}`,
          headers: {
            'content-type': 'application/json',
          },
        }).then((reqRes) => {
          const {
            body: { data },
          } = reqRes;

          expect(data.machineProducts.length).to.be.gt(0);
        });
      });
  });

  it('4. should return valid JSON for /categories endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/categories',
      headers: {
        'content-type': 'application/json',
      },
    }).then((reqRes) => {
      const { body } = reqRes;

      console.log(reqRes);

      expect(reqRes.status).to.be.eq(200);
      expect(reqRes.statusText).to.be.eq('OK');

      expect(body.status).to.be.eq('success');
      expect(body).to.have.property('apiVersion').and.be.eq('1.0');
      expect(body).to.have.property('limit').and.be.eq(0);
      expect(body).to.have.property('offset').and.be.eq(0);
      expect(body).to.have.property('total').and.be.eq(29);
      expect(body).to.have.property('data').and.to.have.length(29);

      body.data.forEach((item) => {
        expect(item).to.have.property('id');
      });
    });
  });

  it('5. should return the list of categories with unique ids on /categories endpoint', () => {
    cy.request({
      method: 'GET',
      url: '/categories',
      headers: {
        'content-type': 'application/json',
      },
    }).then((reqRes) => {
      const {
        body: { data },
      } = reqRes;

      const categoryIds = data.map((categery) => categery.id);
      const categoryIdsSet = new Set(categoryIds);

      expect(categoryIds.length).to.be.eq(categoryIdsSet.size);
    });
  });
});

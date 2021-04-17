const { writeFileSync } = require('fs');
const faker = require('faker');

const data = Array.from({ length: 100 })
  .map(() => {
    return {
      time: faker.datatype.datetime(),
      workType: Math.round(Math.random() * 2) > 1 ? "Full Time" : "Mid Time",
      title: faker.name.jobTitle(),
      company: faker.company.companyName(),
      locations: Array.from({length: Math.round(Math.random() * 4) + 1})
        .map(() => faker.address.city())
    }
  })


writeFileSync('./db.json', JSON.stringify(data, null, 2));
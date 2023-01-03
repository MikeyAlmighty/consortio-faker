import { faker } from '@faker-js/faker';

const MODEL = process.argv[2]
const PORT_ARG = process.argv[3]

const fireRequest = (generated, service) => {
  const PORT = !PORT_ARG ? 8000 : PORT_ARG
  console.log(service === 'brands')
  const route = service === 'brands' ? `http://localhost:${PORT}` : `http://localhost:${PORT}/${service}`
     fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(generated)
    })
      .then(() => {
        console.info('Added!')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
}

const generateInfluencer = () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  const generated = {
    firstName,
    lastName,
    posts: faker.random.numeric(),
    clicks: faker.random.numeric(),
    socialDetails: {
      handle: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      instagram: faker.internet.url(),
    }
  }

  fireRequest(generated, 'influencers')
}

const generateBrand = () => {
   const generated = {
     name: faker.company.name(),
     origin: faker.address.country(),
     active: faker.datatype.boolean(),
     incorporationDate: faker.datatype.datetime(),
     IPR: 'PATENT'
   }

  fireRequest(generated, 'brands')
}

const generateProduct = () => {
  const generated = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  }

  fireRequest(generated, 'products')
}

switch (MODEL) {
  case 'influencer':  {
    generateInfluencer()
    break
  }
  case 'brand':  {
    generateBrand()
    break
  }
  case 'product':  {
    generateProduct()
    break
  }
  default:
    console.log('Please supply an appropriate model as an arg: influencer | brand | product')
}

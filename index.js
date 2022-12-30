import { faker } from '@faker-js/faker';

const model = process.argv[2]

const generateInfluencer = () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  const generated = {
    firstName,
    lastName,
    handle: faker.internet.userName(firstName, lastName),
    posts: faker.random.numeric(),
    clicks: faker.random.numeric(),
    socialDetails: {
      email: faker.internet.email(firstName, lastName),
      instagram: faker.internet.url(),
    }
  }

  console.log(generated)
}

const generateBrand = () => {
   const generated = {
     name: faker.company.name(),
     origin: faker.address.country(),
     active: faker.datatype.boolean(),
     inceptionDate: faker.datatype.datetime(),
     IPR: 'Trademark'
   }

  console.log(generated)
}

const generateProduct = () => {
  const generated = {
    name: faker.commerce.productName()
  }

  console.log(generated)
}

switch (model) {
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

import { CustomerLegalPerson, CustomerPhysicalPerson } from './customer';

const createCustomerPhysicalPerson = (
  firstName: string,
  lastName: string,
  cpf: string,
): CustomerPhysicalPerson => {
  return new CustomerPhysicalPerson(firstName, lastName, cpf);
};

const createCustomerLegalPerson = (
  firstName: string,
  lastName: string,
  cnpj: string,
): CustomerLegalPerson => {
  return new CustomerLegalPerson(firstName, lastName, cnpj);
};

describe('CustomerPhysicalPerson', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have firstName, lastName and cpf', () => {
    const sut = createCustomerPhysicalPerson(
      'Carla',
      'Silva',
      '333.333.333-33',
    );
    expect(sut).toHaveProperty('firstName', 'Carla');
    expect(sut).toHaveProperty('lastName', 'Silva');
    expect(sut).toHaveProperty('cpf', '333.333.333-33');
  });

  it('should have methods to name and identifier customer Physical Person', () => {
    const sut = createCustomerPhysicalPerson(
      'Carla',
      'Silva',
      '333.333.333-33',
    );
    expect(sut.getName()).toBe('Carla Silva');
    expect(sut.getIdentifier()).toBe('CPF: 333.333.333-33');
  });
});

describe('CustomerLegalPerson', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have firstName, lastName and cpnj', () => {
    const sut = createCustomerLegalPerson(
      'Paulo',
      'Silva',
      '33.333.333/0001-33',
    );
    expect(sut).toHaveProperty('firstName', 'Paulo');
    expect(sut).toHaveProperty('lastName', 'Silva');
    expect(sut).toHaveProperty('cnpj', '33.333.333/0001-33');
  });

  it('should have methods to get name and identifier customer Physical Person', () => {
    const sut = createCustomerLegalPerson(
      'Paulo',
      'Silva',
      '33.333.333/0001-33',
    );
    expect(sut.getName()).toBe('Paulo Silva');
    expect(sut.getIdentifier()).toBe('CNPJ: 33.333.333/0001-33');
  });
});

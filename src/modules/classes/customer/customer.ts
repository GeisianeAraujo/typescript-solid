import {
  CustomerName,
  ILegalPerson,
  IPhysicalPerson,
} from '../../interfaces/user.interface';

export class CustomerPhysicalPerson implements IPhysicalPerson, CustomerName {
  firstName: string;
  lastName: string;
  cpf: string;

  constructor(firstName: string, lastName: string, cpf: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cpf = cpf;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getIdentifier(): string {
    return `CPF: ${this.cpf}`;
  }
}

export class CustomerLegalPerson implements ILegalPerson, CustomerName {
  firstName: string;
  lastName: string;
  cnpj: string;

  constructor(firstName: string, lastName: string, cnpj: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cnpj = cnpj;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getIdentifier(): string {
    return `CNPJ: ${this.cnpj}`;
  }
}

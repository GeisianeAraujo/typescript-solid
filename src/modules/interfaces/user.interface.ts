export interface CustomerName {
  getName(): string;
  getIdentifier(): string;
}

export interface IPhysicalPerson {
  firstName: string;
  lastName: string;
  cpf: string;
}

export interface ILegalPerson {
  firstName: string;
  lastName: string;
  cnpj: string;
}

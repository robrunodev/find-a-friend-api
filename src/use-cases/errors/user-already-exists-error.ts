export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail Already Exists') // Chama o método constructor da classe Error estendida aqui
  }
}

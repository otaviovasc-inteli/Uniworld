// **10)** Imagine que você está criando um programa em JavaScript para uma escola. Neste programa, existem diferentes tipos de funcionários, cada um com suas próprias características. Considere as seguintes classes:

// Funcionário:
// - atributo: Nome
// - atributo: Idade
// - atributo: Salário base
// - método: calcularSalario() - Este método calcula o salário total do funcionário. Para cada tipo de funcionário, o cálculo será diferente.

// Professor (herança de Funcionário):
// - atributo: Disciplina
// - atributo: Horas de aula por semana
// - método: calcularSalario() - Para calcular o salário do professor, multiplicamos suas horas de aula pelo valor da hora/aula.

// Agora, sua tarefa é escrever um código em JavaScript que crie as classes Funcionário e Professor, com suas características e métodos descritos acima. Depois de criar as classes, crie:
// - Dois objetos do tipo Professor com informações fictícias.
// - Para cada objeto, chame o método calcularSalario() e mostre o salário calculado no console.

// Certifique-se de explicar cada parte do código utilizando comentários, explicando para que serve cada atributo e método, bem como a lógica por trás do cálculo de salário para o tipo de funcionário Professor.
class Funcionario {
  constructor(nome, idade, salarioBase){
    this.nome = nome
    this.idade = idade
    this.salarioBase = salarioBase
  }

  calcularSalario(){
    return this.salarioBase
  }
}

class Professor extends Funcionario {
  constructor(nome, idade, salarioBase, disciplina, hpSemana, valorHora){
    super(nome, idade, salarioBase)
    this.disciplina = disciplina
    this.hpSemana = hpSemana
    this.valorHora = valorHora
  }
  calcularSalario() {
    return this.salarioBase + (this.hpSemana * this.valorHora)
  }
}

const funcionario1 = new Funcionario('gilberto', 32, 2800)
const professor1 = new Professor('monica', 41, 4500, 'Biologia', 16, 100)

console.log('Funcionario ' + funcionario1.calcularSalario());
console.log('Professor ' + professor1.calcularSalario());

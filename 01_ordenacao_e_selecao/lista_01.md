# Lista 01 - Ordenação e Seleção

## Exercício 1: Análise de Algoritmos de Seleção Simples

Quando os registros estão posicionados de acordo com a ordem pela qual foram in-
cluídos, ou seja, são adicionados no final do arquivo, os registros estão desor-
denados e para **localizar registros**, o otimizador escolheria o método S1

Por outro lado, se a tabela possui índice primário, então a condição de seleção
envolve uma comparação de igualdade e, assim, o índice pode ser utilizado para
recuperar múltiplos registros. Neste cenário, o método S3a é o mais eficiente.

Por fim, se o arquivo não possui índices, assimo como no método S1, mas os regis
-tros de CPF estão ordenados, então o método S2 é mais satisfatório, pois a cada
busca metade dos registros serão descartados.

## Exercício 2: Seleção Conjuntiva e Seletividade

A **seletividade de uma condição(sl)** é definida como a razão entre o número de  
registros, ou tuplas, que satisfazem a condição, e o número total de registros
no arquivo, ou relação.
Quanto menor a estimativa da seletividade da condição, mais desejável é que essa
condição seja a primeira a ser utilizada.
Neste exemplo, a ordem de seleção poderia ser `Salario > 30.000`, `sDnr = 5`,
`Sexo = 'F'`, do mais restritivo ao menos restritivo.

No método **S7 (Seleção conjuntiva usando um índice individual)**, utiliza-se o 
índice (eg. `Dnr = 5`). Apenas os blocos específicos vão para a memória RAM e en
-tão, a CPU remove os registros que não obedecem `Salario > 30.000` e por fim os  
registros que não são do tipo `Sexo = 'F'`.

## Exercício 3: Algoritmos para Ordenação Externa

No **sort-merge**, durante a fase de ordenação, os buffers disponíveis são pre-
enchidos com blocos do disco, a memória RAM faz a ordenação deles via quicksort
e, em seguida, faz uma gravação temporária no disco com os pedaços ordenados.
Durante a fase de intercalação, os pedaços individuais são mesclados de etapa em
etapa até que o arquivo final esteja pronto e ordenado.

Quanto maior o espaço do buffer, mais rápido será o quicksort, pois mais blocos
poderão ser enviados de uma vez. Além disso, o buffer serve para diminuir o nú-
mero de acessos à memória secundária.

## Exercício 4: Otimização Heurística em Árvores de Consulta

A operação de junção é a mais custosa que as operações de seleção e projeção.
É mais fácil juntar duas tabelas depois que elas foram selecionadas e projetas(
as tabelas serão menores), do que juntar as tabelas sem fazer as outras opera-
ções(o custo é alto, pois as tabelas são grandes).

As operações de seleção permitem o uso de índices para acesso às tuplas, filtran
-do as tuplas incompatíveis e elas reduzem significativamente os tamanhos das 
relações.

## Exercício 5: Funções de Custo para Seleção

Principais componentes:
    * custo de acesso ao armazenamento secundário;
    * custo de armazenamento de arquivos temporários no disco;
    * custo de CPU;
    * custo do uso de memória, relacionado ao número de buffers;
    * custo de comunicação

O acesso à memória secundária é lento e custoso, especialmente discos mecânicos
como o HDD, por isso deve-se reduzir o número de acesso a este armazenamento.

O método S4 utiliza uma árvore B+, que mantém ponteiros físicos para os dados re
-ais. Navega pela estrutura de índices onde `sDnumero > 5`, e então percorre
os próximos índices crescentemente. Por fim, os ponteiros, que apontam para os
registros, recuperam os dados.

# Respostas da lista 04 sobre concorrência, bloqueios e transações

## Etapa 1. Criar o banco de teste

1. Manter os dados iniciais conhecidos significa manter a consistência do banco
de dados, uma vez que a tabela fosse desconhecida, seria mais difícil prever o
comportamento dela.

2. Queremos que a tabela seja consistente, pois assim conseguimos aplicar as
nossas regras na tabela.

## Etapa 2. Testar bloqueio com `FOR UPDATE`

3. A operação na Sessão 2 ficou 'rodando' sem parar, até o `COMMIT` da sessão 1. 

4. Devido ao comando `FOR UPDATE`, a linha 1 ficou isolada, ou seja, não pode 
ser modificada enquando a sessão 1 fosse terminada.

5. O papel do comando `FOR UPDATE` é de cumprir a terceira propriedade: Isolaci-
onamento.

## Etapa 3. Testar acesso concorrente a registros diferentes

6. Neste caso não há conflitos entre as transações, por isso o acesso é ŕapido.

7. Isso mostra que o bloqueio em nível de linha isola a linha, mas não impede
a modficação de outras linhas do banco de dados.

## Etapa 4. Testar leitura durante transição não finalizada

8. O objetivo da consulta era verificar se o crédio realizado na conta 2 fosse
efetivado. No meu banco, o valor foi creditado.

9. Segundo o conceito de isolamento, as transações em andamento não expõem dados
parciais a operações concorrentes. (o que não aconteceu neste caso).

## Etapa 5. Testar repetição de leitura

10. No primeiro comando não houve leitura na aba lateral, porém após verificar
em *Show Table Records* o valor permaneceu inalterado. No segundo `SELECT`, o  
valor permaneceu o mesmo (300.00).

11. Esse teste procura identificar a propriedade de isolacionamento.

## Etapa 6. Simular atualização concorrente sobre o mesmo dado

12. Operações concorrentes sobre o mesmo registro exigem um cuidado maior, pois
uma atualização pode ser perdida durante a execução da operação.

13. Neste caso, o saldo poderia ser creditado em valor de 100 ou em valor de 200

## Etapa 7. Testar espera por lock

14. O comando `FOR UPDATE` impede que o registro 2 seja modificado.

15. O bloqueio permanece ativo enquanto o `COMMIT` ou `ROLLBACK` não é executado
. Só assim, a segunda sessão pode manipular o valor da linha 2.

## Etapa 8. Testar bloqueio com duas leituras de atualização

16. Porque ela depende da finalização da sessão anterior.

17. Diferentemente de um `SELECT` comum, esta consulta depende de uma operação 
anterior para que ela possa fazer o display dos dados, como aconteceu neste e-
xemplo.

## Etapa 9. Simular risco de atualização perdida

18. O saldo correto ao final seria 700.

19. Porque o saldo da primeira transação foi sobrescrita pelo saldo da segunda
transação, ou seja, 100 deixou de ser subtraído no saldo total.

## Etapa 10. Testar inserções concorrentes em outra tabela

20. Porque inserções em linhas diferentes acessam registros diferentes.

21. Este experimento mostra que a modificação em uma tabela, não tem atraso mes-
mo com concorrência, caso as linhas modificadas sejam diferentes.

## Etapa 11. Simular bloqueio prolongado

22. Um bloqueio prolongado pode causar impedir que um sistema de forma regular.
Caso um usuário tente acessar a linha que está bloqueada, nenhuma operação que e
-xija alteração irá ocorrer.

23. Em ambientes concorrentes, dados entram e saem regularmente, por isso almeja
-se um sistema contínuo e consistente e assim transações longas são evitadas.
Quanto mais tempo, o bloqueio perdura, maior é o risco de novos conflitos.

## Etapa 12. Consultar o estado final

24. Para verificar a consistência de um banco de dados, basta observar a sua ta-
bela e o sua tabela de histórico de mudanças.

25. A análise final dos dados é relevante, pois ela certifica que todas as ope-
rações realizadas geraram resultados dentro do esperado.

## Atividade dissertativa

26. É a execução simultânea de operações em um banco de dados, onde múltiplos u-
suários acessam ou alteram os mesmos dados.

27. A principal função dos bloqueios é de evitar o caos na concorrência, fazendo
que o banco continua consistente.

28. Quando transações diferentes encontram o mesmo registro, geralmente existe
uma fila prioritária, ou seja, o primeiro que acessar pode modificar e o próximo
deve esperar. Comandos como `FOR UPDATE` cumprem a função do *lock*.
Por outro lado, quando os registros são diferentes, as transações não sofrem um
atraso.

29. O comando `FOR UPDATE` permite que uma linha seja isolada do resto do siste-
ma, assim enquanto a transação não for finalizada, a linha não pode ser modifi-
cada.

30. Se uma transação ficou esperando outra liberar um recurso, isso significa
que ambas estão operando na mesma linha do banco de dados e, assim, uma transa-
ção deve esperar a outra para modificar o recurso.

31. Em uma atualização perdida, duas transações estão em concorrência e atuam no
mesmo registro. A primeira transação atualiza o valor e, em seguida, a segunda
transação atualiza e sobrescreve o valor da primeira.

32. Em um sistema de isolamento, os dados temporários não são compartilhados en-
tre os usuários, cada operação concorrente opera de modo independente e com um
*delay* caso necessário. 

33. Uma leitura pode ser afetada por uma transação em andamento que, posterior-
mente, teve um `ROLLBACK`, neste caso a leitura é considerada suja.

34. Se uma transação for demasiadamente longa, a chance de colisões aumenta,
pois mais operações de outras transações vão ficar na lista espera e isso pode
sobrecarregar o banco de dados.

35. A concorrência melhora o desempenho do sistema ao permitir o acesso e modi-
ficação do banco simultâneo por vários usuários. Mas ela precisa seguir regras
bem definidas para impedir os problemas que surgem com ela, como o mecanismo de
bloqueio, isolamento.

36. 
```sql
START TRANSACTION;

SELECT * FROM contas WHERE id = 4;

UPDATE contas
SET saldo = saldo - 100
WHERE id = 4;

START TRANSACTION;

SELECT * FROM contas WHERE id = 4;

UPDATE contas
SET saldo = saldo - 200
WHERE id = 4;
```
Neste exemplo, duas trasnsações disputam pelo mesmo dado da linha 4. Se não hou-
ver um bom controle de concorrência, uma das deduções podem ser perdidas após o
`COMMIT`.

37. Algumas operações atuam no mesmo banco de dados porém em lugares diferentes,
assim não há conflito entre eles.

38. Para impedir que alterações simultâneas corrompam os dados, o banco de dados
tem mecanismos de isolamento, impedindo o acesso a uma determinada linha momen-
taneamete ou então isolando as transações.

39. Um sistema bancário sem mecanismos de *lock* poderia receber saldos negati-
vos, um pagamento poderia não ser atualizado, o recebimento de uma mensalidade
poderia ocorrer mais de uma vez...

40. A ordem de execução é importante, por exemplo, uma transação pode incluir
operações de divisão e subtração, que possuem valores diferentes dependendo da
ordem dos operadores.

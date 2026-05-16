# Respostas da lista 03 sobre conceitos de transações em bancos de dados

## Etapa 1. Criar o banco de teste

1. Armazenar o saldo de cada titular.

2.
| titular   | saldo    |
|--------------- | --------------- |
| Ana   | 1000.00   |
| Bruno   | 500.00 |
| Carlos   | 300.00   |
| Daniela   | 800.00   |

## Etapa 2. Testar COMMIT

3. O saldo de Ana caiu para 900.00 e o saldo de Bruno aumentou para 600.00, en-
quanto os saldos de Carlos e Daniela permaneceram estáveis.

4. Porque as instruções correspondem a uma transferência da conta de Ana para
Bruno, se as instruções não ocorrem ao mesmo tempo, os dados podem ficar errados

## Etapa 3. Testar ROLLBACK

5. Os dados permanecem inalterados pois a instrução executada não foi `COMMIT`.

6. Se alguma instrução `UPDATE` teve uma falha, então o `ROLLBACK` volta ao pon-
to antes de `START TRANSACTION`.

## Etapa 4. Testar erro lógico antes da confirmação

7. A transação foi desfeita pois a conta 3 do Carlos teve saldo -1700.00, o que
é inválido, por isso teve `ROLLBACK`.

8. O primeiro erro seria a conta com saldo negativo e o outro erro seria a falta
da transferência do saldo para outra conta.

## Etapa 5. Testar múltiplas operações na mesma transação

9. A conta de Daniela foi debitada e as contas de Ana e Bruno foram creditadas.
| titular   | saldo    |
|--------------- | --------------- |
| Ana   | 960.00   |
| Bruno   | 640.00 |
| Carlos   | 300.00   |
| Daniela   | 700.00   |

10. Porque as operações ocorrem entre `START TRANSACTION` e `COMMIT`.

## Etapa 6. Testar leitura durante transação

11. O objetivo de observar o valor da conta é para a realização de um teste.

12. O conceito de **isolamento** diz que as transações em andamento são isoladas
e não expõem os dados parciais a outras operações concorrentes.

## Etapa 7. Testar lock com duas sessões

13. A segunda sessão pode ficar bloqueada esperando o encerramento da primeira.
No meu banco, os valores foram atualizados normalmente.

14. Devido a propriedade do **isolamento**, a segunda transação está separada da
primeira transação por isso deve esperar.

15. `FOR UPDATE` tem a função de isolar a linha `WHERE id = 1`, enquanto sua   
transação está sendo executada. Nesse caso, a sessão 2 deve esperar a conclusão
da sessão 1.

## Etapa 8. Testar concorrencia em registros diferentes

16. As transações acessam diferentes linhas de saldo (1 e 4).

17. Neste teste, a concorrência ocorre sem conflito.

## Etapa 9. Criar tabela de movimentações

18. A tabela de movimentações tem o papel de armazenar o histórico dos débitos 
e créditos. Assim, é mais fácil retornar ao estado anterior consultando as movi-
mentações anteriores.

## Etapa 10. Transferência com registro em histórico

19. Pode ocorrer de realizar um depósito sem o registro da movimentação ou en-
tão um registro de movimentação sem o depósito nas contas.

20. Se o histórico fosse gravado, mas os saldos não fossem atualizados, os dados
estariam corrompidos.

## Etapa 11. Simular falha antes do registro da movimentação

21. `ROLLBACK` preveniu que as transferências fossem formalizadas sem o registro
delas na tabela de movimentações.

22. A propriedade **atomicidade**, conhecida como tudo ou nada, é demonstrada no
teste com a característica de interromper a sessão quando a falha é encontrada.

## Etapa 12. Consultar estado final

23. Para verificar se o banco permaneceu consistente basta verificar as tabelas
*contas* e *movimentações*.

24. Neste contexto, para manter a consistência deste banco de dados é necessário
seguir regras matemáticas, por exemplo, cada transação bancária deve ser regis-
trada no banco *movimentações*, além disso, a diferença entre os débitos e os 
créditos deve ser nula.

## Atividade dissertativa

25. É uma unidade lógica de processamento de banco de dados.

26. O `COMMIT` efetiva uma transação, já o `ROLLBACK` volta ao estado imediata-
mente anterior ao início da `TRANSACTION`.

27. Uma transferência bancária exige regras bem definidas, como ocorre na tran-
sação. Por exemplo, uma conta de uma loja pode receber vários pagamentos ao mes-
mo tempo, e se o saldo não é atualizado após cada depósito, alguns podem valores
podem ficar perdidos.

28. Há três situações distintas:
    * A atualização de uma transação anterior é sobrescrita por outra;
    * Uma transação modifica um valor e depois desfaz a ação, outra transação lê
    o valor incorreto (não desfeito);
    * Leitura de dados temporários antes e depois de uma transação.

29. As transações seguem as propriedade ACID, ou seja, as propriedades definem
como as transações devem ser realizadas.

30. No contexto de uma operação bancária, se houver algum erro durante uma movi-
mentação bancária, a operação é cancelada, assim não há débito nem crédito de va
-lores. Se não houver erro, a operação é feita por completo.

31. Uma transação preserva a consistência dos dados através de relações matemá-
ticas. Cada operação deve obedecer uma lógica.

32. Imagine uma loja de conveniência que vende marmitas. A medida que os clien-
tes compram as marmitas, o número total de marmitas é reduzido. Quando as marmi-
tas acabam, a loja fecha novos pedidos de marmitas.
Se fosse em um ambiente online, múltiplos usuários estariam acessando o mesmo
banco de dados. Neste caso, cada transação(pedido) é isolado, e o número total
de marmitas é atualizado sempre que um pedido for efetivado. Além disso, nenhum
cliente tem acesso aos dados de outro cliente, e se o número total chegar a 0,
todos os pedidos pendentes serão cancelados, com reembolso.

33. É importante que os dados sejam salvos em um dispositivo físico, sempre que
houver um `COMMIT`, pois o sistema que sustenta o banco de dados pode cair, ou 
então há uma queda de conexão ou energia. Isso garante que as operações finali-
zadas até o momento não sejam desfeitas.

34. O controle de concorrência é o conjunto de mecanismos usados pelo banco de
dados para gerenciar transações realizadas simultaneamente e ele é justamente ne
-cessário para evitar conflitos e inconsistência de dados.

35. A função do *lock* é impedir que outra transação modifique os dados que es-
tão sendo utilizados por outra transação enquanto essa está sendo executada.

36. 
```sql
START TRANSACTION;

SELECT * FROM contas WHERE id = 1 FOR UPDATE;

UPDATE contas
SET saldo = saldo - 200
WHERE id = 1;

START TRANSACTION;

UPDATE contas
SET saldo = saldo + 300
WHERE id = 1;
```
Neste exemplo, `FOR UPDATE` tem o papel de isolar a linha com `id = 1` de outras
transações, ou seja, a segunda transação só pode alterar o valor do saldo da li-
nha 1 quando a primeira transação for cumprida.

37. A atualização perdida ocorre quando duas ou mais transações acessam o mesmo
dado e atualizam-o, gerando um *lost update*, uma ou mais atualizações foram per 
-didas.

38. Leituras concorrentes podem acessar o mesmo banco de dados em diferentes re-
gistros sem que haja conflito de dados. Porém se o acesso ocorrer na mesma linha
deve haver algum mecanismo para impedir falhas no banco de dados.

39. Uma tabela de histórico registra todas as operações realizadas em um banco
de dados e, por isso, ela é importante para verificar a autenticidade dos dados
atuais, bem como recuperação lógica de informações.

40. Em um sistema acadêmico, o registro de faltas de um aluno devem ser tratada
como uma transação. Isso permite que as faltas lançadas no sistema possam ser re
-vertidas.

41. Em um sistema de estoque, a quantidade de determinado produto pode ter fica-
do negativo após uma operação. Nesse caso, o `ROLLBACK` cancela a operação.

42. A confiabilidade de sistemas de informação se deve as quatro propriedades:
atomicidade, consistência, isolamento e durabilidade.

43. A atomicidade impede a existência de *meia-operações*, ou ela é executada ou 
ela não é executada. Caso seja executada, o `COMMIT` garante a durabilidade dos
dados em um dispositivo de armazenamento físico. Além disso, cada transação ocor
-re de maneira isolada e segue um conjunto de regras preestabelecido.

Пояснения к проекту. 
Поскольку у данного API урезанный функционал, то авторизация имитируется.
Данные хранятся просто в константе. При работе с реальным API  должен бы быть запрос.

Авторизация:

login: admin
password: admin

Данный API не предоставляет возможности для пагинации путем обращения к странице, поэтому реализованный механизм пагинации не обеспечивает получения следующей страницы.
Однако его работу можно посмотреть на вкладке network

Есть два альтернативных варианта обхреализации пагинации.
1 - получение элементов по ID (1-10, 11-20, 20-21...) Но в реальных проектах такое не очень хорошо, так как вместо одного запроса будет 10, завернутых в promiseAll
Но главное, что этот API  не работает с запросом по ID (об этом далее)
2 - использование параметра quality данного API. И запрос 10 позиций на 1й странице, 20 позиций на второй, и вывод только 10 последних, 30 позиций на третьей, и так далее. Что тоже далеко от оптимального.

В проекте оставлен рабочий вариант с запросом 10, 20, 30 итд позиций. Но это не оптимально в плане производительности.
Поэтому в проекте есть модуль для работы с API, позволяющим осуществлять пагинацию. Для этого надо только в HomePage.tsx раскомментировать импорт и использование хука. И, соответственно, закомментировать использование текущего.

Как выше сказано, API не выдает продукты по ID
вот ответ на запрос ID 6:
john@Nokia3310:~$ curl https://fakerapi.it/api/v2/products?_quantity=1&_id=6
[1] 9817
john@Nokia3310:~$ {"status":"OK","code":200,"locale":"en_US","seed":null,"total":1,"data":[{"id":1,"name":"Quod non facere id quaerat.","description":"Exercitationem odit consectetur distinctio sit. Consectetur quibusdam molestias voluptates voluptatem veritatis minima. Nam illum autem excepturi ab autem. Fugit minus neque veritatis facilis.","ean":"2758316529217","upc":"146374781067","image":"http:\/\/placeimg.com\/640\/480\/tech","images":[{"title":"Aliquam quis unde quo quia.","description":"Quisquam facilis non sit exercitationem alias est. Et quidem qui ad praesentium veritatis assumenda similique repellat. Optio fuga possimus saepe tenetur et sed. Fugit doloremque qui aliquam.","url":"https:\/\/picsum.photos\/640\/480"},{"title":"Enim beatae voluptas modi.","description":"Voluptatem ratione dicta ea minus deleniti itaque. Voluptatum animi iusto sint est consequatur libero. Ad dolorem saepe sit voluptatem minima et. Voluptatem laborum sit libero optio.","url":"https:\/\/picsum.photos\/640\/480"},{"title":"Et eos quis est aut.","description":"Aut quo dignissimos id facere sit ipsum sit. Laborum quo voluptatibus odio sint rerum incidunt. Assumenda quia sed quia quia ipsa consequatur a.","url":"https:\/\/picsum.photos\/640\/480"}],"net_price":1810.34,"taxes":22,"price":2208.61,"categories":[50,51,52,53,54,55,56,57],"tags":["sit","fuga","amet"]}]}^C
[1]+  Завершён        curl https://fakerapi.it/api/v2/products?_quantity=1
Как видим, ответ id 1
 Поле id игнорируется.

поэтому для получения продукта при запросе списка получаются все карточки целиком, из массива которых и берется карточка с нужным ID

Для примера написан компонент (ProductDetailPageClassic.tsx), который будет работать с API  выдающим информацию по ID

Выход из аккаунта реализован более красивым и удобным на мой взгляд способом, позволяющим выйти с любой страницы. Но реализован и способ, указанный в ТЗ (только со страницы личного аккаунта)



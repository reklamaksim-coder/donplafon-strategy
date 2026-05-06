// Справочник стратегии — 13 разделов в блочном формате
// Каждый раздел: id, num, title, goal, blocks[], sources[]
// Блок: { title, color (info/success/warn/danger), full?, content (HTML) }

window.REFERENCE = [

{
  id: 's1',
  num: 1,
  title: 'As-Is',
  fullTitle: 'Исходная позиция',
  goal: 'Зафиксировать отправную точку — где мы сейчас, чтобы точно измерять прогресс.',
  blocks: [
    {
      title: 'Текущие метрики',
      color: 'info',
      content: `<table class="data-table">
        <tr><th>Метрика</th><th>Значение</th><th>Статус</th></tr>
        <tr><td>Активные партнёры</td><td><b>1 000</b></td><td><span class="pill pill-info">база</span></td></tr>
        <tr><td>HoReCa-партнёры</td><td><b>1 500</b></td><td><span class="pill pill-success">PMF</span></td></tr>
        <tr><td>Спящая база</td><td><b>5 000</b></td><td><span class="pill pill-warn">реактивация</span></td></tr>
        <tr><td>Выручка/мес</td><td><b>20М ₽</b></td><td><span class="pill pill-success">стабильно</span></td></tr>
        <tr><td>Средний CAC</td><td>18 500 ₽</td><td><span class="pill pill-info">норма</span></td></tr>
        <tr><td>LTV / LTV/CAC</td><td>150к / <b>8.1x</b></td><td><span class="pill pill-success">здорово</span></td></tr>
        <tr><td>ARPPU за заказ</td><td>100 000 ₽</td><td>—</td></tr>
        <tr><td>Маржа на заказ</td><td>30 000 ₽ (30%)</td><td><span class="pill pill-info">норма</span></td></tr>
        <tr><td>Lifetime партнёра</td><td>5 лет</td><td><span class="pill pill-success">долго</span></td></tr>
        <tr><td>Payback CAC</td><td>1 месяц</td><td><span class="pill pill-success">быстро</span></td></tr>
      </table>`
    },
    {
      title: 'Продукт: что есть и чего нет',
      color: 'warn',
      content: `<table class="data-table">
        <tr><th>Компонент</th><th>Статус</th></tr>
        <tr><td>Свет (основной ассортимент)</td><td><span class="pill pill-success">работает</span></td></tr>
        <tr><td>Электрокарнизы</td><td><span class="pill pill-success">в ассортименте</span></td></tr>
        <tr><td>Умный дом</td><td><span class="pill pill-success">в ассортименте</span></td></tr>
        <tr><td>Комплектация под проект</td><td><span class="pill pill-success">работает</span></td></tr>
        <tr><td>Рекламация за 24 ч</td><td><span class="pill pill-success">работает</span></td></tr>
        <tr><td>Личный кабинет</td><td><span class="pill pill-danger">нет</span></td></tr>
        <tr><td>Лендинг с калькулятором</td><td><span class="pill pill-danger">нет</span></td></tr>
        <tr><td>Реферальная система L2</td><td><span class="pill pill-danger">нет</span></td></tr>
        <tr><td>Мгновенные выплаты</td><td><span class="pill pill-danger">нет</span></td></tr>
        <tr><td>Smart-импорт смет (OCR)</td><td><span class="pill pill-danger">нет</span></td></tr>
        <tr><td>Светорасчёт (Dialux)</td><td><span class="pill pill-danger">нет</span></td></tr>
      </table>`
    },
    {
      title: 'Размер рынка',
      color: 'info',
      content: `<table class="data-table">
        <tr><td>TAM (весь ремонт РФ)</td><td><b>2.75 трлн ₽</b></td></tr>
        <tr><td>SAM (свет в ремонте)</td><td><b>165 млрд ₽</b></td></tr>
        <tr><td>SOM (целевой партнёрский)</td><td><b>1.2 млрд ₽+</b></td></tr>
        <tr><td>Рост рынка</td><td>8-12% CAGR</td></tr>
      </table>
      <div class="callout callout-info">
        <div class="callout-label">При 5 000 партнёров</div>
        <div class="callout-text">GMV 4.775 млрд ₽/год · валовая маржа 2.626 млрд (55%) · EBITDA 334 млн (19%)</div>
      </div>`
    },
    {
      title: 'Что уже работает',
      color: 'success',
      content: `<ul class="check-list">
        <li>1 000 активных партнёров (заказы за 4 мес)</li>
        <li>1 500 партнёров в HoReCa-сегменте</li>
        <li>Здоровая юнит-экономика во всех A-сегментах</li>
        <li>5 из 8 сегментов имеют LTV/CAC ≥ 6x</li>
        <li>Бизнес-модель валидирована: комиссия 20-40% работает</li>
      </ul>
      <div class="callout callout-success">
        <div class="callout-label">Потенциал кросс-сейла</div>
        <div class="callout-text">+33% к среднему чеку через допродажу карнизов и умного дома 1 000 партнёрам — продавать можно сегодня</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/01_Продукт/', 'КОНТЕКСТ/02_Сегменты/', 'КОНТЕКСТ/07_Юнит_экономика/']
},

{
  id: 's2',
  num: 2,
  title: 'To-Be',
  fullTitle: 'Целевая позиция',
  goal: 'Декабрь 2026: 40М ₽/мес. Конкретные цифры и раскладка.',
  blocks: [
    {
      title: 'Раскладка цели 40М/мес',
      color: 'success',
      full: true,
      content: `<div class="formula-box">
        <div class="formula-line"><span class="num">~1 500</span><span class="op">×</span><span class="num">~26 700 ₽</span><span class="op">=</span><span class="res">40 000 000 ₽/мес</span></div>
      </div>
      <div class="formula-caption">партнёров × средняя выручка с партнёра/мес</div>`
    },
    {
      title: 'Целевые показатели',
      color: 'info',
      content: `<table class="data-table">
        <tr><th>Показатель</th><th>Сейчас</th><th>Цель</th></tr>
        <tr><td>Активные партнёры</td><td>1 000</td><td><b>1 500</b></td></tr>
        <tr><td>Выручка/партнёр/мес</td><td>20 000 ₽</td><td><b>26 700 ₽</b> <span class="pill pill-success">+33%</span></td></tr>
        <tr><td>Выручка/мес</td><td>20М ₽</td><td><b>40М ₽</b></td></tr>
        <tr><td>Доля кросс-сейла</td><td>низкая</td><td><b>25-30%</b></td></tr>
        <tr><td>NPS</td><td>—</td><td><b>≥ 50</b></td></tr>
        <tr><td>Retention</td><td>85%</td><td><b>≥ 80%</b></td></tr>
      </table>`
    },
    {
      title: 'Целевая структура базы (+500)',
      color: 'info',
      content: `<table class="data-table">
        <tr><th>Сегмент</th><th>Партнёров</th><th>Доля</th></tr>
        <tr><td>Premium-студии</td><td>170</td><td>34%</td></tr>
        <tr><td>Комплектаторы</td><td>120</td><td>24%</td></tr>
        <tr><td>Дизайнеры-блогеры</td><td>90</td><td>18%</td></tr>
        <tr><td>HoReCa/коворкинги</td><td>60</td><td>12%</td></tr>
        <tr><td>Фрилансеры</td><td>30</td><td>6%</td></tr>
        <tr><td>Home Staging</td><td>20</td><td>4%</td></tr>
        <tr><td>Студенты</td><td>10</td><td>2%</td></tr>
      </table>`
    },
    {
      title: 'Структура целевого месяца',
      color: 'success',
      full: true,
      content: `<div class="metric-grid">
        <div class="metric-card"><div class="m-label">Заказов/мес</div><div class="m-value">~400</div></div>
        <div class="metric-card"><div class="m-label">Средний чек</div><div class="m-value">100 000 ₽</div></div>
        <div class="metric-card"><div class="m-label">Валовая маржа</div><div class="m-value m-success">~12М ₽</div></div>
        <div class="metric-card"><div class="m-label">Выплаты партнёрам</div><div class="m-value m-warn">~8М ₽</div></div>
        <div class="metric-card"><div class="m-label">OPEX</div><div class="m-value">~2М ₽</div></div>
        <div class="metric-card"><div class="m-label">EBITDA</div><div class="m-value m-success">~2М ₽</div></div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/07_Юнит_экономика/', 'КОНТЕКСТ/05_Стратегия/']
},

{
  id: 's3',
  num: 3,
  title: 'Рычаги',
  fullTitle: 'Стратегические рычаги',
  goal: 'Два рычага одновременно. Каждый даёт ~50% от удвоения.',
  blocks: [
    {
      title: 'Рычаг A — рост базы +500',
      color: 'info',
      content: `<p class="lead">От 1 000 до ~1 500 активных. Источники прироста:</p>
      <ul class="bullet-list">
        <li><b>Реактивация спящих</b> (база 5 000) → 180-220</li>
        <li><b>Реферальная сеть L2</b> → 100-130</li>
        <li><b>Прямые продажи</b> Premium/HoReCa → 80-110</li>
        <li><b>Лендинг + контент</b> → 50-70</li>
        <li><b>Школы/ивенты</b> → 30-50</li>
      </ul>
      <div class="callout callout-warn">
        <div class="callout-label">Зависимость от продукта</div>
        <div class="callout-text">Высокая — без ЛК и L2 каналы не работают</div>
      </div>`
    },
    {
      title: 'Рычаг B — рост чека +33%',
      color: 'success',
      content: `<p class="lead">Средний чек 20к → 26.7к ₽/партнёр/мес. Источники:</p>
      <ul class="bullet-list">
        <li><b>Электрокарнизы</b> +1 800 ₽ к ARPPU</li>
        <li><b>Умный дом</b> +2 500 ₽</li>
        <li><b>Акцентное освещение</b> +700 ₽</li>
        <li><b>Сервисный пакет</b> +500 ₽</li>
        <li><b>Доп. позиции</b> в существующих заказах +1 200 ₽</li>
      </ul>
      <div class="callout callout-success">
        <div class="callout-label">Преимущество</div>
        <div class="callout-text">Категории уже в ассортименте — стартуем сегодня</div>
      </div>`
    },
    {
      title: 'Соотношение рычагов',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Рычаг</th><th>Вклад в рост</th><th>Скорость</th><th>Зависимость от продукта</th></tr>
        <tr><td>Рост базы (+500)</td><td>~50%</td><td>Медленнее (8 мес)</td><td><span class="pill pill-danger">Высокая</span></td></tr>
        <tr><td>Рост чека (+33%)</td><td>~50%</td><td>Быстрее (можно сразу)</td><td><span class="pill pill-success">Низкая</span></td></tr>
      </table>
      <div class="callout callout-warn">
        <div class="callout-label">Стратегическая логика</div>
        <div class="callout-text">Кросс-сейл стартует немедленно — самый быстрый путь к деньгам. Рост базы блокирован продуктом — параллельно строим инфраструктуру.</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/05_Стратегия/', 'КОНТЕКСТ/07_Юнит_экономика/']
},

{
  id: 's4',
  num: 4,
  title: 'Продукт',
  badge: 'blocker',
  fullTitle: 'Продуктовая стратегия',
  goal: 'Без продукта рычаг A не работает. Кабинет, лендинг, L2 — главный приоритет.',
  blocks: [
    {
      title: 'Что нужно построить',
      color: 'warn',
      full: true,
      content: `<table class="data-table">
        <tr><th>Компонент</th><th>Что внутри</th><th>Приоритет</th></tr>
        <tr><td><b>MVP кабинета</b></td><td>Финансовый модуль (баланс, выплаты, история) + реферальный дашборд (L2-сеть, воронка)</td><td><span class="pill pill-danger">P0</span></td></tr>
        <tr><td><b>Лендинг с калькулятором</b></td><td>«Сколько заработаешь» калькулятор, конверсионная воронка, лид-магнит</td><td><span class="pill pill-danger">P0</span></td></tr>
        <tr><td><b>L2 реферальная система</b></td><td>5%, антифрод DaDa API, мгновенные выплаты, защита от спама</td><td><span class="pill pill-danger">P0</span></td></tr>
        <tr><td>Smart-импорт смет</td><td>OCR парсинг XLSX/PDF/JPG → автогенерация спеки</td><td><span class="pill pill-warn">P1</span></td></tr>
        <tr><td>Геймификация</td><td>Base 20% → Pro 30% → Expert 40%, статус-бейджи</td><td><span class="pill pill-warn">P1</span></td></tr>
        <tr><td>Светорасчёт</td><td>Dialux интеграция, IES-файлы</td><td><span class="pill pill-warn">P1</span></td></tr>
        <tr><td>Мгновенные выплаты</td><td>В день оплаты счёта клиентом, API самозанятых</td><td><span class="pill pill-warn">P1</span></td></tr>
        <tr><td>Интеграции</td><td>1С/ERP реал-тайм, ФНС API</td><td><span class="pill pill-info">P2</span></td></tr>
      </table>`
    },
    {
      title: 'MVP кабинета — что в первой версии',
      color: 'info',
      content: `<h4 class="block-h4">Финансовый модуль</h4>
      <ul class="bullet-list">
        <li>Pending balance и Available balance</li>
        <li>История транзакций по заказам</li>
        <li>Юр. документы на скачивание</li>
        <li>Интеграция с API самозанятых</li>
      </ul>
      <h4 class="block-h4">Реферальный дашборд</h4>
      <ul class="bullet-list">
        <li>L2-сеть: кого пригласил, кто активен</li>
        <li>Воронка приглашённых со статусами</li>
        <li>Lifetime-счётчик дивидендов</li>
        <li>Реферальная ссылка с трекингом</li>
      </ul>`
    },
    {
      title: 'Геймификация уровней',
      color: 'info',
      content: `<table class="data-table">
        <tr><th>Уровень</th><th>Доля</th><th>Комиссия</th><th>SLA</th></tr>
        <tr><td>Base</td><td>60%</td><td>20%</td><td>8 ч</td></tr>
        <tr><td>Pro</td><td>35%</td><td>30%</td><td>4 ч</td></tr>
        <tr><td>Expert</td><td>5%</td><td>40%</td><td>2 ч</td></tr>
      </table>
      <div class="callout callout-warn">
        <div class="callout-label">Стресс-тест Expert на 500к ₽</div>
        <div class="callout-text">Маржа 55% (275к) − выплата 40% (200к) − L2 5% (25к) − налоги (22.5к) − OPEX (27.5к) = <b>0 ₽</b>. Работает в ноль, маржа из Base/Pro.</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/06_Документы/', 'КОНТЕКСТ/05_Стратегия/']
},

{
  id: 's5',
  num: 5,
  title: 'Сегменты',
  fullTitle: 'Сегментная стратегия',
  goal: '15 сегментов. 5 фокусных, 3 параллельных, остальные — наблюдение.',
  blocks: [
    {
      title: '8 основных сегментов',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Сегмент</th><th>Скоринг</th><th>LTV/CAC</th><th>ARPPU</th><th>Категория</th></tr>
        <tr><td><b>Premium-студия</b></td><td>83</td><td><span class="pill pill-info">6.3x</span></td><td>500к</td><td><span class="pill pill-success">A — фокус</span></td></tr>
        <tr><td><b>Дизайнер-блогер</b></td><td>81</td><td><span class="pill pill-success">200x</span></td><td>45к</td><td><span class="pill pill-success">A — фокус</span></td></tr>
        <tr><td><b>Дизайнер-декоратор</b></td><td>80</td><td><span class="pill pill-success">58x</span></td><td>15к</td><td><span class="pill pill-success">A — фокус</span></td></tr>
        <tr><td><b>Архитектор HoReCa</b></td><td>79</td><td><span class="pill pill-info">7.5x</span></td><td>750к</td><td><span class="pill pill-success">A — фокус</span></td></tr>
        <tr><td><b>Комплектатор</b></td><td>78</td><td><span class="pill pill-success">53x</span></td><td>850к</td><td><span class="pill pill-success">A — фокус</span></td></tr>
        <tr><td>Студент</td><td>74</td><td><span class="pill pill-info">5.7x</span></td><td>45к</td><td><span class="pill pill-info">B</span></td></tr>
        <tr><td>Региональный</td><td>72</td><td><span class="pill pill-warn">3.15x</span></td><td>350к</td><td><span class="pill pill-info">B</span></td></tr>
        <tr><td>Фрилансер</td><td>66</td><td><span class="pill pill-warn">4.0x</span></td><td>100к</td><td><span class="pill pill-info">B</span></td></tr>
      </table>`
    },
    {
      title: '7 смежных сегментов',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Сегмент</th><th>Switch</th><th>LTV/CAC</th><th>Статус</th></tr>
        <tr><td><b>Ландшафтный дизайнер</b></td><td>55</td><td><span class="pill pill-success">6.4x</span></td><td>Высокий потенциал, сезонность</td></tr>
        <tr><td>Прораб жилых</td><td>51</td><td><span class="pill pill-warn">1.8 → 3.0x</span></td><td>Зависит от апсейла</td></tr>
        <tr><td>Ланд. архитектор</td><td>44</td><td><span class="pill pill-info">4.0x</span></td><td>44-ФЗ блокирует</td></tr>
        <tr><td>Прораб коммерч.</td><td>37</td><td><span class="pill pill-danger">1.4x</span></td><td>Слабая экономика</td></tr>
        <tr><td><b>Потолочник</b></td><td>35</td><td><span class="pill pill-warn">3.2x</span></td><td>Уже работает</td></tr>
        <tr><td>Мастер-универсал</td><td>25</td><td><span class="pill pill-warn">1.7-8.5x</span></td><td>Привычка Леруа</td></tr>
        <tr><td>Электрик</td><td>5</td><td><span class="pill pill-danger">1.1x</span></td><td>На грани</td></tr>
      </table>`
    },
    {
      title: 'Фокус-сегменты',
      color: 'success',
      content: `<ul class="check-list">
        <li>Комплектатор — стабильный поток, высокий LTV</li>
        <li>Дизайнер-блогер — виральный масштаб</li>
        <li>Premium-студия — крупный чек, кросс-сейл</li>
        <li>Дизайнер-декоратор — частотность 3/мес</li>
        <li>Потолочник + Ландшафтный — смежные</li>
      </ul>`
    },
    {
      title: 'Дисциплина приоритетов',
      color: 'warn',
      content: `<ul class="bullet-list">
        <li><b>5 фокус-сегментов = 80%</b> ресурсов команды и бюджета</li>
        <li><b>3 параллельных сегмента = 15%</b> усилий — поток объёма</li>
        <li><b>4 сегмента C = 5%</b> — наблюдение</li>
        <li><b>3 сегмента не приоритет</b> — возвращаемся в 2027+</li>
      </ul>
      <div class="callout callout-warn">
        <div class="callout-label">Главная ошибка</div>
        <div class="callout-text">«Размазанная» работа по 15 сегментам. Сила в фокусе.</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/02_Сегменты/', 'КОНТЕКСТ СМЕЖНЫЕ/']
},

{
  id: 's6',
  num: 6,
  title: 'Каналы',
  fullTitle: 'Каналы привлечения',
  goal: 'Целевой микс +500 партнёров. Тир 1 быстрый, тир 2 системный.',
  blocks: [
    {
      title: 'Тир 1 — быстрые (первые 30 дней)',
      color: 'success',
      full: true,
      content: `<table class="data-table">
        <tr><th>Канал</th><th>Прогноз</th><th>CAC</th><th>Цикл</th></tr>
        <tr><td><b>Реактивация спящей базы 5 000</b></td><td>180-220</td><td><span class="pill pill-success">~0 ₽</span></td><td>Неделя 1-2</td></tr>
        <tr><td><b>Реферальная сеть L2</b></td><td>100-130</td><td><span class="pill pill-info">через 5%</span></td><td>Месяц 1-2</td></tr>
        <tr><td><b>Прямые продажи (PDF/встречи)</b></td><td>80-110</td><td>~50 000 ₽</td><td>Месяц 1-3</td></tr>
      </table>`
    },
    {
      title: 'Тир 2 — системные',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Канал</th><th>Прогноз</th><th>CAC</th><th>Когда запускать</th></tr>
        <tr><td>Лендинг + контент + лид-магнит</td><td>50-70</td><td>~8 000 ₽</td><td>После лендинга</td></tr>
        <tr><td>Школы (Skillbox, Contented, Details)</td><td>20-30</td><td>~9 000 ₽</td><td>Месяц 2-3</td></tr>
        <tr><td>Ивенты (MosBuild, ArchDaily)</td><td>10-20</td><td>~40 000 ₽</td><td>Параллельно</td></tr>
      </table>`
    },
    {
      title: 'Бюджетные сценарии',
      color: 'info',
      content: `<h4 class="block-h4">Base — 1.0М ₽/мес</h4>
      <ul class="bullet-list">
        <li>Трафик: 300к ₽</li>
        <li>Падел/Контент: 700к ₽</li>
        <li>Прирост: 100-150 партнёров/мес</li>
      </ul>
      <h4 class="block-h4">Aggressive — 1.5М ₽/мес</h4>
      <ul class="bullet-list">
        <li>Трафик: 800к ₽</li>
        <li>Падел/Контент: 700к ₽</li>
        <li>Прирост: 350-500 партнёров/мес</li>
      </ul>`
    },
    {
      title: 'Принципы запуска',
      color: 'warn',
      content: `<ul class="check-list">
        <li>Сначала тир 1 — быстрая обратная связь</li>
        <li>Платный трафик — после первых 100 рефералов</li>
        <li>Школы — длинный цикл, параллельно</li>
        <li>Каждый канал = отдельный CAC и метрики</li>
        <li>Cohort-тест L2 на 100-150 до масштабирования</li>
      </ul>
      <div class="callout callout-info">
        <div class="callout-label">Цель GTM-месяца</div>
        <div class="callout-text">500 активных реферальных ссылок к концу 30 дней</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/05_Стратегия/', 'КОНТЕКСТ/06_Документы/']
},

{
  id: 's7',
  num: 7,
  title: 'Кросс-сейл',
  fullTitle: 'Стратегия кросс-сейла',
  goal: '+33% к чеку = +6 700 ₽ на партнёра/мес. Электрокарнизы и умный дом готовы.',
  blocks: [
    {
      title: 'Раскладка прироста ARPPU',
      color: 'success',
      full: true,
      content: `<table class="data-table">
        <tr><th>Категория</th><th>Прирост</th><th>Лучшие сегменты</th><th>Готовность</th></tr>
        <tr><td><b>Умный дом / автоматизация</b></td><td>+2 500 ₽</td><td>Premium, HoReCa</td><td><span class="pill pill-success">в ассортименте</span></td></tr>
        <tr><td><b>Электрокарнизы</b></td><td>+1 800 ₽</td><td>Premium, full-cycle</td><td><span class="pill pill-success">в ассортименте</span></td></tr>
        <tr><td>Доп. зоны освещения</td><td>+700 ₽</td><td>Premium, full-cycle</td><td><span class="pill pill-success">работает</span></td></tr>
        <tr><td>Сервис (монтаж, настройка)</td><td>+500 ₽</td><td>Все B2B</td><td><span class="pill pill-warn">требует процесса</span></td></tr>
        <tr><td>Доп. позиции в свете</td><td>+1 200 ₽</td><td>Все</td><td><span class="pill pill-success">работает</span></td></tr>
        <tr><td><b>Итого</b></td><td><b>+6 700 ₽</b></td><td>—</td><td>—</td></tr>
      </table>`
    },
    {
      title: 'Восприимчивость сегментов',
      color: 'info',
      content: `<table class="data-table">
        <tr><th>Сегмент</th><th>Smart home</th><th>Карнизы</th></tr>
        <tr><td>Premium</td><td><span class="pill pill-success">высокая</span></td><td><span class="pill pill-success">высокая</span></td></tr>
        <tr><td>HoReCa</td><td><span class="pill pill-success">высокая</span></td><td><span class="pill pill-warn">средняя</span></td></tr>
        <tr><td>Комплектатор</td><td><span class="pill pill-info">средняя</span></td><td><span class="pill pill-info">средняя</span></td></tr>
        <tr><td>Блогер</td><td><span class="pill pill-info">средняя</span></td><td><span class="pill pill-warn">низкая</span></td></tr>
        <tr><td>Декоратор</td><td><span class="pill pill-danger">низкая</span></td><td><span class="pill pill-danger">низкая</span></td></tr>
      </table>`
    },
    {
      title: 'Риск кросс-сейла (score 20)',
      color: 'danger',
      content: `<p><b>Premium-студии могут не купить smart home.</b> Допрос на +20-30% к бюджету проекта.</p>
      <ul class="bullet-list">
        <li>12 интервью с Premium-студиями</li>
        <li>3-5 интервью с конечными клиентами</li>
        <li>5 пилотных смет с включением smart home</li>
        <li>Threshold: attach rate &lt; 20% — пересмотр</li>
      </ul>`
    },
    {
      title: 'Метрики кросс-сейла',
      color: 'info',
      content: `<ul class="check-list">
        <li>Attach rate — доля заказов с кросс-сейлом</li>
        <li>Средний чек с/без кросс-сейла</li>
        <li>Конверсия из света в карнизы/умный дом</li>
        <li>Маржа по категориям</li>
        <li>Возвраты по новым категориям</li>
      </ul>
      <div class="callout callout-success">
        <div class="callout-label">Ключевой инсайт</div>
        <div class="callout-text">Не «болт-он» к свету, а часть проекта. Premium покупает когда вписано в концепцию.</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/05_Стратегия/', 'КОНТЕКСТ/02_Сегменты/']
},

{
  id: 's8',
  num: 8,
  title: 'Операции',
  fullTitle: 'Операционная модель',
  goal: 'Не сломаться при x2. SLA, верификация, найм.',
  blocks: [
    {
      title: 'SLA по уровням',
      color: 'info',
      content: `<table class="data-table">
        <tr><th>Уровень</th><th>Ответ</th><th>Заказы</th></tr>
        <tr><td><b>Expert</b> (40%)</td><td>2 ч</td><td>250</td></tr>
        <tr><td><b>Pro</b> (30%)</td><td>4 ч</td><td>1 750</td></tr>
        <tr><td><b>Base</b> (20%)</td><td>8 ч</td><td>3 000</td></tr>
      </table>
      <div class="callout callout-warn">
        <div class="callout-label">Риск коллапса SLA (score 20)</div>
        <div class="callout-text">При x2 росте операционная команда не выдерживает потока Premium и комплектаторов</div>
      </div>`
    },
    {
      title: 'Верификация спецификаций',
      color: 'danger',
      content: `<ul class="check-list">
        <li>Двухэтапная проверка ТЗ менеджером + техконтролёром</li>
        <li>Экспертный аудит первых 50 заказов нового партнёра</li>
        <li>Чек-лист (мощность, цоколь, цвет, габариты)</li>
        <li>Слепое тестирование менеджеров</li>
      </ul>
      <div class="callout callout-danger">
        <div class="callout-label">Риск ошибок ТЗ (score 20)</div>
        <div class="callout-text">«Один раз подставленный дизайнер больше не вернётся». Premium с оборотом миллионы — потеряна навсегда.</div>
      </div>`
    },
    {
      title: 'Выплаты — конкурентное преимущество',
      color: 'success',
      content: `<ul class="bullet-list">
        <li><b>Мгновенные выплаты</b> в день оплаты счёта клиентом</li>
        <li><b>Прозрачность:</b> отдельный pending и available balance</li>
        <li><b>Юр. чистота:</b> API самозанятых, договоры онлайн</li>
        <li><b>Антифрод:</b> DaDa API против дублей и спама</li>
      </ul>
      <blockquote class="quote">«Деньги вчера» — оффер позиционирования платформы</blockquote>`
    },
    {
      title: 'Найм при росте',
      color: 'info',
      content: `<ul class="check-list">
        <li>Триггеры найма по объёму запросов</li>
        <li>Менеджеры по сегментам: Premium-VIP отдельно</li>
        <li>Техконтролёр на первые 50 заказов нового партнёра</li>
        <li>Юрист по налоговой схеме L2</li>
        <li>Автоматизация: рутина проверок, рассылки, статусы</li>
      </ul>`
    }
  ],
  sources: ['КОНТЕКСТ/03_Риски/', 'КОНТЕКСТ/06_Документы/']
},

{
  id: 's9',
  num: 9,
  title: 'Конкуренты',
  fullTitle: 'Конкурентное позиционирование',
  goal: 'VamSvet, BasicDecor, Lu.ru — ритейл. Маркетплейсы — угроза. Мы — экосистема.',
  blocks: [
    {
      title: 'Прямые конкуренты',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Конкурент</th><th>Сильные стороны</th><th>Слабости (наша возможность)</th></tr>
        <tr><td><b>VamSvet.ru</b><br><span class="muted">4.8/5, 490 отзывов</span></td><td>120+ брендов, калькулятор мощности, подбор по фото, 3D-модели</td><td>Срывы доставки, ошибки комплектации, медленные возвраты</td></tr>
        <tr><td><b>Lu.ru</b><br><span class="muted">5.0/5, 1296 отзывов</span></td><td>Масштаб, доставка 3+ дня, price-match, рассрочка</td><td>Нет партнёрской программы, нет прозрачного дохода для дизайнера</td></tr>
        <tr><td><b>BasicDecor</b><br><span class="muted">4.7/5, 201 отзыв</span></td><td>Свет + мебель + декор, IES, ArchiCAD</td><td>Цены выше, текучка менеджеров, слабая рекламация</td></tr>
      </table>`
    },
    {
      title: 'Угроза маркетплейсов',
      color: 'danger',
      content: `<p><b>Ozon/WB/Я.Маркет.</b> На 10-30% дешевле, доставка 3 дня, поиск по фото.</p>
      <ul class="bullet-list">
        <li><b>Showrooming:</b> клиент копирует артикулы и заказывает сам</li>
        <li><b>Loss of trust:</b> систематическое недоверие клиента к наценке</li>
        <li><b>Потеря дизайнера:</b> -10-20% комиссии на заказе</li>
      </ul>
      <h4 class="block-h4">Наша защита</h4>
      <ul class="check-list">
        <li>Эксклюзивные SKU — нет в маркетплейсе</li>
        <li>Проектная защита — клиент зарегистрирован за дизайнером</li>
        <li>Техаудит спецификации</li>
        <li>Anti-breakage delivery</li>
      </ul>`
    },
    {
      title: 'Наша отстройка — 4 рычага',
      color: 'success',
      content: `<ul class="check-list">
        <li><b>Один контрагент.</b> Замена Excel + WhatsApp + 10 поставщиков</li>
        <li><b>Проектный сервис.</b> Инженерный аудит, рекламация 24ч</li>
        <li><b>Партнёрский доход.</b> L1 20-40% + L2 5%</li>
        <li><b>Прозрачность через ЛК.</b> Трекинг каждого клика, мгновенные выплаты</li>
      </ul>
      <div class="callout callout-success">
        <div class="callout-label">Стратегический инсайт</div>
        <div class="callout-text">Конкуренты — retail-платформы с каталогом. ДонПлафон — партнёрская экосистема.</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/04_Конкуренты/', 'КОНТЕКСТ/03_Риски/']
},

{
  id: 's10',
  num: 10,
  title: 'Риски',
  fullTitle: 'Управление рисками',
  goal: '37 рисков. 9 требуют действий до запуска.',
  blocks: [
    {
      title: 'КРИТИЧЕСКИЕ риски (score 25) — блокируют запуск',
      color: 'danger',
      full: true,
      content: `<table class="data-table">
        <tr><th>Риск</th><th>Триггер</th><th>Митигация</th></tr>
        <tr><td><b>1. Недоверие к выплатам</b></td><td>Отсутствие доказательства надёжности</td><td>Тестовая выплата за 24ч, юр. аудит, интервью с 10 партнёрами</td></tr>
        <tr><td><b>2. Налоговая нагрузка ФЛ/СЗ</b></td><td>Выплаты физлицам без СЗ (13% + 30%)</td><td>Налоговый юрист, пилот выплат 5-10 СЗ</td></tr>
      </table>`
    },
    {
      title: 'ВЫСОКИЕ риски (score 20)',
      color: 'warn',
      full: true,
      content: `<table class="data-table">
        <tr><th>#</th><th>Риск</th><th>Митигация</th></tr>
        <tr><td>3</td><td>Ошибки в ТЗ</td><td>Двойной контроль, проверка 10% смет</td></tr>
        <tr><td>4</td><td>Технические ошибки менеджеров</td><td>Чек-лист, слепое тестирование</td></tr>
        <tr><td>5</td><td>Переквалификация L2 как трудовые</td><td>Юр. аудит, мониторинг ФНС</td></tr>
        <tr><td>6</td><td>Отрицательный ROI в low-budget</td><td>CAC по каналам, когортный анализ</td></tr>
        <tr><td>7</td><td>L1+L2 ломают экономику</td><td>3 сценария, стресс-тест</td></tr>
        <tr><td>8</td><td>Сервис не выдержит Premium</td><td>Нагрузочный тест, пилот 10-15</td></tr>
        <tr><td>9</td><td>Premium не купят smart home</td><td>12 интервью, 5 пилотных смет</td></tr>
      </table>`
    },
    {
      title: 'Средние риски (16-19)',
      color: 'info',
      content: `<ul class="bullet-list compact">
        <li>L2 не даст потока — спам/фрод (16)</li>
        <li>CAC премиум-каналов выше допустимого (16)</li>
        <li>Низкий SLA при масштабе (16)</li>
        <li>Lock-in эффект текущих поставщиков (16)</li>
        <li>Привычка Excel/WhatsApp сильнее ЛК (16)</li>
        <li>Ценовая война с монобрендами (16)</li>
        <li>Уход к Centrsvet/Arlight (16)</li>
        <li>Дефицит складских остатков (15)</li>
        <li>Крах SLA комплектации (15)</li>
        <li>Маркетплейсы отжимают Premium (15)</li>
        <li>Узкий рынок smart home (15)</li>
        <li>Нет сертификации для HoReCa (15)</li>
      </ul>`
    },
    {
      title: 'Подход к управлению',
      color: 'warn',
      content: `<ul class="check-list">
        <li>Критические (25) — решать первыми, до запуска</li>
        <li>Высокие (20) — параллельно с запуском</li>
        <li>Средние — мониторинг + пилоты</li>
        <li>Ежеквартальный пересмотр карты рисков</li>
        <li>Журнал инцидентов</li>
      </ul>
      <div class="callout callout-warn">
        <div class="callout-label">Концентрация рисков</div>
        <div class="callout-text">Юнит-экономика — 8 · Доставка ценности — 7 · Операции — 6 · Конкуренция — 4</div>
      </div>`
    }
  ],
  sources: ['КОНТЕКСТ/03_Риски/ — 37 файлов']
},

{
  id: 's11',
  num: 11,
  title: 'Финмодель',
  fullTitle: 'Финансовая модель',
  goal: 'Базовая юнит-экономика здорова. 3 сценария на декабрь 2026.',
  blocks: [
    {
      title: 'Базовая формула',
      color: 'info',
      full: true,
      content: `<div class="formula-box">
        <div class="formula-line"><span class="num">Партнёры</span><span class="op">×</span><span class="num">ARPPU</span><span class="op">×</span><span class="num">Частота</span><span class="op">=</span><span class="res">Выручка</span></div>
      </div>`
    },
    {
      title: 'Три сценария на декабрь 2026',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Сценарий</th><th>Выручка/мес</th><th>Партнёров</th><th>Условия</th></tr>
        <tr><td><span class="pill pill-success">Оптимистичный</span></td><td><b>40М+ ₽</b></td><td>1 500+</td><td>Оба рычага полностью + кросс-сейл +33%</td></tr>
        <tr><td><span class="pill pill-info">Базовый</span></td><td><b>35М ₽</b></td><td>1 300</td><td>Один рычаг сработал на 70-80%</td></tr>
        <tr><td><span class="pill pill-warn">Пессимистичный</span></td><td><b>28-30М ₽</b></td><td>1 100</td><td>Только кросс-сейл, продукт задержался</td></tr>
      </table>`
    },
    {
      title: 'Юнит-экономика (текущая)',
      color: 'info',
      content: `<table class="data-table">
        <tr><td>Средний CAC</td><td><b>18 500 ₽</b></td></tr>
        <tr><td>LTV</td><td><b>150 000 ₽</b></td></tr>
        <tr><td>LTV/CAC</td><td><b>8.1x</b> <span class="pill pill-success">healthy</span></td></tr>
        <tr><td>ARPPU за заказ</td><td><b>100 000 ₽</b></td></tr>
        <tr><td>Маржа на заказ</td><td><b>30 000 ₽ (30%)</b></td></tr>
        <tr><td>Lifetime партнёра</td><td><b>5 лет</b></td></tr>
        <tr><td>Payback CAC</td><td><b>1 месяц</b></td></tr>
      </table>`
    },
    {
      title: 'Целевая модель на 5 000 партнёров',
      color: 'success',
      content: `<table class="data-table">
        <tr><td>GMV</td><td><b>4.775 млрд ₽/год</b></td></tr>
        <tr><td>Валовая маржа (55%)</td><td><b>2.626 млрд ₽</b></td></tr>
        <tr><td>Выплаты партнёрам (36%)</td><td><b>1.719 млрд ₽</b></td></tr>
        <tr><td>OPEX (12%)</td><td><b>573 млн ₽</b></td></tr>
        <tr><td><b>EBITDA</b></td><td><b>334 млн ₽ (19%)</b></td></tr>
        <tr><td>Бюджет комьюнити</td><td>40 млн ₽</td></tr>
      </table>`
    },
    {
      title: 'Стресс-тест Expert на чек 500к ₽',
      color: 'warn',
      full: true,
      content: `<table class="data-table">
        <tr><td>Сумма заказа</td><td><b>500 000 ₽</b></td></tr>
        <tr><td>Валовая маржа (55%)</td><td>+275 000 ₽</td></tr>
        <tr><td>Выплата дизайнеру L1 (40%)</td><td>−200 000 ₽</td></tr>
        <tr><td>Реферальный бонус L2 (5%)</td><td>−25 000 ₽</td></tr>
        <tr><td>Налоги</td><td>−22 500 ₽</td></tr>
        <tr><td>OPEX</td><td>−27 500 ₽</td></tr>
        <tr><td><b>Остаток</b></td><td><b>0 ₽</b></td></tr>
      </table>
      <div class="callout callout-warn">
        <div class="callout-label">Вывод</div>
        <div class="callout-text">Expert работает в ноль на отдельной сделке — инвестиция в LTV. Маржа платформы из Base/Pro (15-25%).</div>
      </div>`
    },
    {
      title: 'Go/No-Go вердикт',
      color: 'success',
      full: true,
      content: `<p><b>GO (Scale).</b> Продукт подтвердил ценность. Потенциал 3.3x достижим.</p>
      <ul class="check-list">
        <li>1 500 партнёров уже валидируют PMF</li>
        <li>3.3x рост до 5 000 партнёров достижим</li>
        <li>Здоровые юнит-экономики во всех A-сегментах</li>
        <li>Условия: автоматизация Base + VIP-сервис для Expert</li>
        <li>Blue Ocean: масс-маркет субсидирует работу с лидерами</li>
      </ul>`
    }
  ],
  sources: ['КОНТЕКСТ/07_Юнит_экономика/', 'КОНТЕКСТ/08_Анализ/']
},

{
  id: 's12',
  num: 12,
  title: 'Роадмап',
  fullTitle: 'Роадмап по кварталам',
  goal: 'Команда 4-8 человек. 8 месяцев. Q2 — фундамент, Q3 — масштаб, Q4 — цель 40М.',
  blocks: [
    {
      title: 'Q2 2026 (апр–июн) — Фундамент',
      color: 'info',
      content: `<ul class="checkbox-list">
        <li>MVP кабинета (финансы + L2-дашборд)</li>
        <li>Лендинг с калькулятором дохода</li>
        <li>Реактивация спящей базы (5 000 → 180-220)</li>
        <li>Старт кросс-сейла электрокарнизов 1 000 партнёрам</li>
        <li>Прямые продажи Premium/HoReCa</li>
        <li>Юр. экспертиза налоговой схемы и L2</li>
        <li>Двухэтапная верификация ТЗ</li>
      </ul>`
    },
    {
      title: 'Q3 2026 (июл–сен) — Масштабирование',
      color: 'warn',
      content: `<ul class="checkbox-list">
        <li>Полный кабинет (smart-импорт, геймификация)</li>
        <li>Запуск L2 реферальной программы</li>
        <li>Платный трафик после 100 рефералов</li>
        <li>Партнёрство со школами</li>
        <li>Масштабирование смежных: потолочники, ландшафт</li>
        <li>Кросс-сейл умного дома для Premium</li>
        <li>Cohort-тест L2 100-150 участников</li>
      </ul>`
    },
    {
      title: 'Q4 2026 (окт–дек) — Цель 40М',
      color: 'success',
      content: `<ul class="checkbox-list">
        <li>Региональная экспансия (ЕКБ, Казань, Новосибирск)</li>
        <li>Ивенты и комьюнити (Padel, MosBuild)</li>
        <li>Оптимизация конверсии воронки</li>
        <li>Умный дом для всех сегментов</li>
        <li>Светорасчёт (Dialux) для HoReCa</li>
        <li>Ревью стратегии: план-факт</li>
      </ul>`
    },
    {
      title: 'GTM детализация — первый месяц',
      color: 'info',
      full: true,
      content: `<table class="data-table">
        <tr><th>Неделя</th><th>Действия</th><th>Цель</th></tr>
        <tr><td>1</td><td>Тизер топ-100 партнёрам в WhatsApp, лендинг в работе</td><td>Создать ожидание</td></tr>
        <tr><td>2</td><td>Старт по 1 500 партнёрам, оффер «Деньги вчера» + «Тех. аудит»</td><td>Активация базы</td></tr>
        <tr><td>3</td><td>Закрытый Padel-турнир, Stories-сериал, напоминание</td><td>Сообщество + охват</td></tr>
        <tr><td>4</td><td>Платный трафик, блогер-посевы, итоговый вебинар</td><td>500 активных реф-ссылок</td></tr>
      </table>`
    }
  ],
  sources: ['КОНТЕКСТ/05_Стратегия/', 'КОНТЕКСТ/06_Документы/']
},

{
  id: 's13',
  num: 13,
  title: 'KPI',
  fullTitle: 'KPI и система контроля',
  goal: 'Измерять прогресс и вовремя корректировать курс.',
  blocks: [
    {
      title: 'Еженедельные метрики',
      color: 'info',
      content: `<ul class="bullet-list">
        <li>Новые партнёры (регистрации + активации)</li>
        <li>GMV за неделю</li>
        <li>Количество заказов</li>
        <li>Средний чек</li>
        <li>Time-to-Respond по сегментам</li>
        <li>Доля заказов с кросс-сейлом</li>
        <li>Out-of-stock топ-100 SKU</li>
      </ul>`
    },
    {
      title: 'Ежемесячные метрики',
      color: 'info',
      content: `<ul class="bullet-list">
        <li>ARPPU по сегментам</li>
        <li>Retention (% с повторным заказом)</li>
        <li>Доля кросс-сейла в выручке</li>
        <li>CAC по каналам</li>
        <li>NPS партнёров</li>
        <li>Распределение Base/Pro/Expert</li>
        <li>% ошибок в ТЗ</li>
      </ul>`
    },
    {
      title: 'Квартальные ревью',
      color: 'info',
      content: `<ul class="bullet-list">
        <li>План-факт по 7 инициативам</li>
        <li>Рычаг A vs Рычаг B: вклад каждого</li>
        <li>ROI по каналам</li>
        <li>Сегментная структура</li>
        <li>Ревью карты рисков</li>
        <li>Финмодель: пересчёт сценариев</li>
      </ul>`
    },
    {
      title: 'Алерты',
      color: 'danger',
      content: `<p>При каких значениях бить тревогу:</p>
      <ul class="bullet-list">
        <li><b>SLA Expert &gt; 2ч</b> — расширение Premium-отдела</li>
        <li><b>Retention &lt; 80%</b> — анализ оттока</li>
        <li><b>CAC +50%</b> — канал перегревается, пауза</li>
        <li><b>Доля кросс-сейла &lt; 20%</b> — переобучение</li>
        <li><b>Attach rate smart home &lt; 25-30%</b> — гипотеза под сомнением</li>
        <li><b>Маржа &lt; безопасной</b> — лимит выплат</li>
        <li><b>Payback &gt; 3 мес</b> — стоп масштабирования</li>
      </ul>`
    }
  ],
  sources: ['КОНТЕКСТ/05_Стратегия/', 'КОНТЕКСТ/06_Документы/']
}

];

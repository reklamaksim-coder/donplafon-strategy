// Маппинг ключевых терминов на конкретные файлы архива
// Используется для inline deep-links из справочника и стратегии в архив
window.LINK_TARGETS = {
  // ========== СЕГМЕНТЫ — ОСНОВНЫЕ (8) ==========
  'seg_premium': { file: 'f31', title: 'Студия интерьера полного цикла (Premium)' },
  'seg_premium_score': { file: 'f29', title: 'Скоринг Premium-студии' },
  'seg_premium_econ': { file: 'f30', title: 'Стресс-тест экономики Premium 500к' },
  'seg_premium_jobs': { file: 'f32', title: 'Job Graph Premium-студии' },

  'seg_blogger': { file: 'f8', title: 'Дизайнер-блогер-инфлюенсер' },
  'seg_blogger_score': { file: 'f9', title: 'Скоринг блогера' },
  'seg_blogger_econ': { file: 'f10', title: 'Экономика инфлюенсеров' },

  'seg_decorator': { file: 'f13', title: 'Дизайнер-декоратор (Home Staging)' },
  'seg_decorator_score': { file: 'f14', title: 'Скоринг декоратора' },
  'seg_decorator_econ': { file: 'f16', title: 'Экономика Home Staging' },

  'seg_horeca': { file: 'f4', title: 'Архитектор HoReCa и коворкингов' },
  'seg_horeca_score': { file: 'f5', title: 'Скоринг HoReCa' },
  'seg_horeca_econ': { file: 'f6', title: 'Экономика HoReCa (база 1500)' },

  'seg_complektator': { file: 'f17', title: 'Комплектатор-аутсорсер' },
  'seg_complektator_score': { file: 'f18', title: 'Скоринг комплектатора' },
  'seg_complektator_econ': { file: 'f20', title: 'Экономика комплектатора' },

  'seg_student': { file: 'f21', title: 'Начинающий дизайнер (студент)' },
  'seg_student_score': { file: 'f22', title: 'Скоринг студента' },
  'seg_student_econ': { file: 'f24', title: 'Экономика студента' },

  'seg_regional': { file: 'f26', title: 'Региональный партнёр' },
  'seg_regional_score': { file: 'f25', title: 'Скоринг регионального партнёра' },
  'seg_regional_econ': { file: 'f28', title: 'Экономика регионального' },

  'seg_freelancer': { file: 'f34', title: 'Частный фрилансер (Low-budget)' },
  'seg_freelancer_score': { file: 'f33', title: 'Скоринг фрилансера' },
  'seg_freelancer_econ': { file: 'f36', title: 'Экономика фрилансера' },

  // ========== СМЕЖНЫЕ СЕГМЕНТЫ (7) ==========
  'adj_landscape': { file: 'f134', title: 'Ландшафтный дизайнер (уличный свет)' },
  'adj_landscape_arch': { file: 'f133', title: 'Ландшафтный архитектор (коммерческие)' },
  'adj_master': { file: 'f135', title: 'Мастер-универсал (ремонт под ключ)' },
  'adj_potolok': { file: 'f136', title: 'Потолочник-монтажник' },
  'adj_prorab_comm': { file: 'f137', title: 'Прораб коммерческих объектов' },
  'adj_prorab_zhil': { file: 'f138', title: 'Прораб жилых объектов' },
  'adj_electric': { file: 'f139', title: 'Электрик-монтажник' },

  // ========== РИСКИ ==========
  'risk_categorization': { file: 'f37', title: 'Категоризация рисков (сводная)' },
  'risk_trust': { file: 'f55', title: 'Недоверие к выплатам (score 25)' },
  'risk_tax': { file: 'f43', title: 'Налоговая нагрузка ФЛ/СЗ (score 25)' },
  'risk_spec_errors': { file: 'f66', title: 'Ошибки в техспецификациях (score 20)' },
  'risk_manager_errors': { file: 'f62', title: 'Технические ошибки менеджеров (score 20)' },
  'risk_l2_reclass': { file: 'f51', title: 'Переквалификация L2 как трудовые (score 20)' },
  'risk_low_roi': { file: 'f48', title: 'Отрицательный ROI low-budget (score 20)' },
  'risk_l1_l2_econ': { file: 'f38', title: 'L1+L2 ломают юнит-экономику (score 20)' },
  'risk_premium_service': { file: 'f63', title: 'Сервис не выдержит Premium (score 20)' },
  'risk_premium_smart': { file: 'f73', title: 'Premium не купят smart home (score 20)' },
  'risk_l2_no_flow': { file: 'f54', title: 'Рефералка L2 не даст потока (score 16)' },
  'risk_cac_premium': { file: 'f71', title: 'CAC премиум-каналов выше допустимого (score 16)' },
  'risk_sla_low': { file: 'f45', title: 'Низкий SLA при масштабировании (score 16)' },
  'risk_lock_in': { file: 'f53', title: 'Привычка к текущим поставщикам (score 16)' },
  'risk_friction': { file: 'f60', title: 'Сопротивление переходу с Excel (score 16)' },
  'risk_price_war': { file: 'f70', title: 'Ценовая война с монобрендами (score 16)' },
  'risk_competitor_drift': { file: 'f69', title: 'Уход в монобренды (score 16)' },
  'risk_stock_out': { file: 'f39', title: 'Дефицит складских остатков' },
  'risk_sla_collapse': { file: 'f41', title: 'Крах SLA отдела комплектации' },
  'risk_marketplaces': { file: 'f42', title: 'Маркетплейсы отжимают Premium' },
  'risk_horeca_44fz': { file: 'f44', title: 'HoReCa и 44-ФЗ' },
  'risk_retention': { file: 'f57', title: 'Низкая частота повторных заказов' },
  'risk_brand_toxic': { file: 'f68', title: 'Токсичность бренда от L2-спама' },
  'risk_3d_models': { file: 'f67', title: 'Плохие 3D-модели' },
  'risk_regional_local': { file: 'f65', title: 'Сильные локальные дилеры в регионах' },
  'risk_premium_custom': { file: 'f56', title: 'Кастомизация для Premium' },
  'risk_certification': { file: 'f59', title: 'Сертификация для HoReCa' },

  // ========== КОНКУРЕНТЫ ==========
  'comp_vamsvet': { file: 'f75', title: 'ВамСвет — конкурент' },
  'comp_lu': { file: 'f76', title: 'Lu.ru — конкурент' },
  'comp_basicdecor': { file: 'f74', title: 'BasicDecor — конкурент' },
  'comp_centrsvet': { file: 'f78', title: 'Центрсвет — конкурент премиум' },
  'comp_donolux': { file: 'f79', title: 'Donolux — конкурент' },
  'comp_marketplaces': { file: 'f77', title: 'Маркетплейсы (Ozon/WB/Я.Маркет)' },

  // ========== КАНАЛЫ ==========
  'ch_action_plan': { file: 'f81', title: 'Action Plan: рост до 5000 партнёров' },
  'ch_500_plan': { file: 'f88', title: 'Каналы привлечения +500 партнёров' },
  'ch_landing': { file: 'f82', title: 'Лендинг + лид-магнит + контент' },
  'ch_30days': { file: 'f83', title: 'План запуска каналов на первые 30 дней' },
  'ch_direct_sales': { file: 'f84', title: 'Прямые продажи через PDF и встречи' },
  'ch_reactivation': { file: 'f85', title: 'Реактивация спящей базы' },
  'ch_l2_referral': { file: 'f86', title: 'Реферальная сеть L2' },
  'ch_schools': { file: 'f87', title: 'Школы, события и комьюнити' },
  'ch_segments_priority': { file: 'f89', title: 'Приоритет сегментов роста' },
  'ch_budget_scenarios': { file: 'f80', title: 'Два сценария бюджета: Base vs Aggressive' },

  // ========== ПРОДУКТ И ДОКУМЕНТЫ ==========
  'doc_lk': { file: 'f123', title: 'ТЗ Личный Кабинет партнёра' },
  'doc_lk_promo': { file: 'f103', title: 'ЛК для промокодов и начислений' },
  'doc_lighting_calc': { file: 'f104', title: 'Светорасчёт' },
  'doc_landing_tz': { file: 'f122', title: 'ТЗ Лендинг и Презентация' },
  'doc_landing_struct': { file: 'f120', title: 'Структура AJTBD-лендинга' },
  'doc_landing_copy': { file: 'f105', title: 'Копирайтинг лендинга 2.0' },
  'doc_loyalty': { file: 'f124', title: 'Шкала лояльности 20-40%' },
  'doc_gtm_l2': { file: 'f109', title: 'GTM план: запуск L2 5%' },
  'doc_gtm_launch': { file: 'f126', title: 'GTM Launch Month' },
  'doc_prd': { file: 'f127', title: 'PRD Партнёрская программа' },
  'doc_prd_mvp2': { file: 'f128', title: 'PRD MVP 2.0 Экосистема' },
  'doc_blue_ocean': { file: 'f115', title: 'Стратегическая карта Голубой Океан' },
  'doc_blue_ocean_es': { file: 'f125', title: 'Executive Summary Голубого Океана' },
  'doc_full_report': { file: 'f111', title: 'Полный итоговый отчёт' },
  'doc_summary_es': { file: 'f112', title: 'Полный Executive Summary' },
  'doc_handbook': { file: 'f114', title: 'Справочник Партнёрской программы' },
  'doc_reactivation_scripts': { file: 'f113', title: 'Скрипты реактивации базы' },
  'doc_positioning': { file: 'f119', title: 'Стратегия позиционирования' },
  'doc_word_of_mouth': { file: 'f116', title: 'Дизайнерское сарафанное радио' },
  'doc_incubator': { file: 'f117', title: 'Стратегия канала Инкубатор школ' },
  'doc_inbound': { file: 'f118', title: 'Стратегия канала Inbound' },

  // ========== ЮНИТ-ЭКОНОМИКА ==========
  'econ_scenarios_40m': { file: 'f129', title: 'Сценарии роста до 40М/мес' },
  'econ_benchmarks': { file: 'f130', title: 'Unit Economics Benchmarks Светотехника' },
  'econ_5000_partners': { file: 'f26', title: 'Средневзвешенная прибыль на 5000 партнёров' },

  // ========== АНАЛИЗ ==========
  'analysis_segments': { file: 'f131', title: 'Оцифровка сегментов' },
  'analysis_go_pivot': { file: 'f132', title: 'GO/PIVOT Вердикт' },

  // ========== РЫНОК ==========
  'market_size': { file: 'f1', title: 'Объём рынка комплектации светом РФ' },
  'market_partner_program': { file: 'f2', title: 'Партнёрская программа ДонПлафон' },
  'market_overview': { file: 'f3', title: 'Рынок комплектации интерьеров (свет)' },

  // ========== СТРАТЕГИЧЕСКИЕ ИДЕИ ==========
  'idea_b2b_platform': { file: 'f90', title: 'Платформа для B2B комплектации' },
  'idea_personal_brand': { file: 'f91', title: 'Свет как личный бренд (Collab)' },
  'idea_bim_lockin': { file: 'f92', title: 'Lock-in через BIM + AI' },
  'idea_bim_integration': { file: 'f93', title: 'Deep Integration BIM-библиотеки' },
  'idea_rental': { file: 'f94', title: 'Свет как инвестиция (арендное жильё)' },
  'idea_staging_kits': { file: 'f95', title: 'Световые сеты для Home Staging' },
  'idea_marketplace': { file: 'f96', title: 'Marketplace для профи-света B2B2C' },
  'idea_ai_killer': { file: 'f97', title: 'AI-Killer: автоподбор аналогов' },
  'idea_ai_scout': { file: 'f98', title: 'AI-Scouter: подбор по визуалу' },
  'idea_instant_money': { file: 'f99', title: 'Быстрые деньги (Instant Rewards)' },
  'idea_fintech': { file: 'f100', title: 'Fintech-сервис для комплектаторов' },
  'idea_white_label': { file: 'f101', title: 'White Label Collab' },
  'idea_tech_outsource': { file: 'f102', title: 'Технический департамент на аутсорсе' }
};

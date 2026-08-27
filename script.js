document.addEventListener('DOMContentLoaded', () => {
  const SUPABASE_URL = 'https://ejnafjoxcihjnbirckph.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_oFGT8creC1-om81zg9pEUw_9jcNFtUc';
  const MEDIA_BUCKET = 'kgroup-media';
  const ADMIN_PASSWORD = '2010';
  const WHATSAPP_NUMBER = '201022977499';

  const STORAGE_KEYS = {
    language: 'kgroup_language',
    adminAuth: 'kgroup_admin_auth',
    customerSession: 'kgroup_customer_session'
  };

  const DEFAULT_PRINTING_METHODS = [
    { id: 'uv', nameAr: 'طباعة UV', nameEn: 'UV Printing' },
    { id: 'screen', nameAr: 'سيلك سكرين', nameEn: 'Screen Printing' },
    { id: 'dtf', nameAr: 'DTF', nameEn: 'DTF' },
    { id: 'dtg', nameAr: 'DTG', nameEn: 'DTG' },
    { id: 'laser', nameAr: 'ليزر', nameEn: 'Laser' },
    { id: 'embroidery', nameAr: 'تطريز', nameEn: 'Embroidery' },
    { id: 'heat-transfer', nameAr: 'هوت ترانسفير', nameEn: 'Heat Transfer' },
    { id: 'vinyl', nameAr: 'فينيل', nameEn: 'Vinyl' }
  ];

  const DEFAULT_CATEGORIES = [
    { id: 'notebooks', nameAr: 'دفاتر', nameEn: 'Notebooks' },
    { id: 'mugs', nameAr: 'أكواب', nameEn: 'Mugs' },
    { id: 'business-cards', nameAr: 'كروت شخصية', nameEn: 'Business Cards' },
    { id: 'tshirts', nameAr: 'تيشيرتات', nameEn: 'T-Shirts' },
    { id: 'bags', nameAr: 'شنط', nameEn: 'Bags' },
    { id: 'pens', nameAr: 'أقلام', nameEn: 'Pens' },
    { id: 'stickers', nameAr: 'ستيكرات', nameEn: 'Stickers' },
    { id: 'other', nameAr: 'أخرى', nameEn: 'Other' }
  ];

  const PORTFOLIO_CATEGORIES = [
    { id: 'gifts', nameAr: 'هدايا', nameEn: 'Giveaway' },
    { id: 'prints', nameAr: 'مطبوعات', nameEn: 'Prints' },
    { id: 'exhibition', nameAr: 'ستاندات المعارض', nameEn: 'Exhibition stands' }
  ];

  const PORTFOLIO_CATEGORY_ALIASES = {
    gifts: ['هدايا', 'الهدايا', 'Gifts', 'Giveaway'],
    prints: ['مطبوعات', 'المطبوعات', 'Prints'],
    exhibition: ['معرض', 'ستندات', 'الستندات', 'ستاندات المعارض', 'Stands', 'Exhibition', 'Exhibition stands']
  };

  const DEFAULT_PRODUCTS = [
    {
      id: 'prod-1',
      categoryId: 'notebooks',
      nameAr: 'دفاتر فاخرة بغطاء كتاني',
      nameEn: 'Premium Linen Notebooks',
      shortDescAr: 'دفاتر أنيقة مناسبة للهدايا المؤسسية والعلامات التجارية الراقية.',
      shortDescEn: 'Elegant notebooks ideal for corporate gifts and refined brand identities.',
      fullDescAr: 'دفاتر بغطاء فاخر وخامة داخلية مريحة للكتابة، مناسبة لطباعة الشعار أو الهوية البصرية للشركات، مع إمكانيات تشطيب متعددة مثل UV والليزر والضغط الحراري.',
      fullDescEn: 'Luxury notebooks with a refined cover finish and smooth inner paper, perfect for logos, visual identities, and premium gifting.',
      image: 'https://images.pexels.com/photos/6786610/pexels-photo-6786610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['uv', 'laser', 'heat-transfer'],
      projectImage: 'https://images.pexels.com/photos/360009/pexels-photo-360009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'تنفيذ دفاتر بلون فحمي مع لمسة ذهبية لعميل مؤسسي ضمن مؤتمر سنوي.',
      projectDescEn: 'Charcoal notebooks with a subtle gold touch produced for a corporate annual event.'
    },
    {
      id: 'prod-2',
      categoryId: 'mugs',
      nameAr: 'أكواب سيراميك مطفية',
      nameEn: 'Matte Ceramic Mugs',
      shortDescAr: 'أكواب بطبعة مخصصة مناسبة للعلامات التجارية والمقاهي والهدايا.',
      shortDescEn: 'Custom printed mugs for brands, cafés, and stylish promotional gifting.',
      fullDescAr: 'أكواب سيراميك مطفية بتصميم عصري وتشطيب ناعم، قابلة للطباعة بعدة تقنيات حسب الخامة واللون المطلوب.',
      fullDescEn: 'Contemporary matte ceramic mugs with a soft finish, suitable for multiple print techniques depending on color and material needs.',
      image: 'https://images.pexels.com/photos/6312175/pexels-photo-6312175.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['screen', 'uv', 'laser'],
      projectImage: 'https://images.pexels.com/photos/6312235/pexels-photo-6312235.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'طباعة شعار لمقهى محلي على أكواب فاتحة بطابع بسيط وراقي.',
      projectDescEn: 'Minimal café logo printing on light-toned mugs with a clean premium finish.'
    },
    {
      id: 'prod-3',
      categoryId: 'business-cards',
      nameAr: 'كروت شخصية سميكة فاخرة',
      nameEn: 'Premium Thick Business Cards',
      shortDescAr: 'كروت شخصية بخامة قوية وتشطيب أنيق يترك انطباعًا احترافيًا.',
      shortDescEn: 'Strong tactile business cards with a premium finish and polished first impression.',
      fullDescAr: 'كروت شخصية مناسبة للمكاتب والشركات والوكالات، مع خيارات تشطيب متعددة وتأثير بصري أنيق.',
      fullDescEn: 'Business cards tailored for offices, agencies, and modern companies with premium tactile finishes and visual effects.',
      image: 'https://images.pexels.com/photos/5706020/pexels-photo-5706020.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['uv', 'laser', 'vinyl'],
      projectImage: 'https://images.pexels.com/photos/9878733/pexels-photo-9878733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'تصميم كروت سميكة لهوية معمارية بلمسات ذهبية وحدود دقيقة.',
      projectDescEn: 'Heavy card stock produced for an architectural brand with gold accents and crisp edges.'
    },
    {
      id: 'prod-4',
      categoryId: 'tshirts',
      nameAr: 'تيشيرتات قطنية للطباعة',
      nameEn: 'Printed Cotton T-Shirts',
      shortDescAr: 'تيشيرتات مناسبة للبراندات والفعاليات والفرق بطرق طباعة متعددة.',
      shortDescEn: 'Cotton t-shirts for brands, events, and teams with multiple print options.',
      fullDescAr: 'تيشيرتات قطنية بخامة جيدة وقصّات مناسبة للبراندات التجارية أو الفعاليات أو الموظفين.',
      fullDescEn: 'Quality cotton t-shirts suited for commercial labels, event uniforms, or team apparel.',
      image: 'https://images.pexels.com/photos/8532611/pexels-photo-8532611.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['screen', 'dtf', 'dtg', 'embroidery', 'heat-transfer'],
      projectImage: 'https://images.pexels.com/photos/9558716/pexels-photo-9558716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'تنفيذ تيشيرتات لفريق إبداعي بطباعة صدرية واضحة ولمسة تطريز بسيطة.',
      projectDescEn: 'Team apparel produced with a clean chest print and subtle embroidery detail.'
    }
  ];

  const DEFAULT_PORTFOLIO = [
    {
      id: 'port-1',
      titleAr: 'دفاتر مؤتمر تنفيذي',
      titleEn: 'Executive Conference Notebooks',
      methodAr: 'طباعة UV و لمسة ذهبية',
      methodEn: 'UV Printing & Gold Accent',
      image: 'https://images.pexels.com/photos/360009/pexels-photo-360009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      descriptionAr: 'دفاتر بتشطيب فاخر تم تنفيذها لجهة مؤسسية ضمن فعالية رسمية.',
      descriptionEn: 'Premium notebooks executed for a formal corporate event with a refined finish.'
    },
    {
      id: 'port-2',
      titleAr: 'أكواب لمقهى محلي',
      titleEn: 'Custom Mugs for a Local Café',
      methodAr: 'ليزر / سيلك سكرين',
      methodEn: 'Laser / Screen Printing',
      image: 'https://images.pexels.com/photos/3439481/pexels-photo-3439481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      descriptionAr: 'أكواب مخصصة لبراند قهوة بطابع بصري بسيط ومريح.',
      descriptionEn: 'Branded mugs designed for a coffee brand with a clean and elegant style.'
    }
  ];

  const translations = {
    ar: {
      title: 'Kaizen Adv. Agency | متجر الطباعة الاحترافي',
      description: 'Kaizen Adv. Agency لحلول الطباعة المخصصة والمنتجات الدعائية.',
      'nav.home': 'الرئيسية',
      'nav.services': 'خدماتنا',
      'nav.products': 'المنتجات',
      'nav.portfolio': 'أعمالنا',
      'nav.clients': 'العملاء السابقون',
      'services.title': 'خدماتنا المتميزة',
      'services.subtitle': 'تصفح خدماتنا المميزة المصنفة لتلبي جميع احتياجاتك.',
      'services.signature': 'Signature collections',
      'services.signatureText': 'اختار القسم وشوف التفاصيل والصور في تجربة واحدة سلسة',
      'services.emptyTitle': 'لا توجد خدمات مضافة حاليًا.',
      'services.emptyText': 'يمكنك إضافة خدمات جديدة من لوحة الإدارة.',
      'admin.servicesTab': 'إدارة الخدمات',
      'admin.servicesTitle': 'إدارة الخدمات',
      'admin.servicesSubtitle': 'أضف صور الخدمات وحدد القسم المرتبط بها (Giveaway، مطبوعات، Exhibition stands).',
      'admin.addService': 'إضافة خدمة',
      'admin.emptyServicesTitle': 'لا توجد خدمات.',
      'admin.emptyServicesText': 'ابدأ بإضافة أول خدمة لتظهر مباشرة في المتجر.',
      'forms.serviceName': 'اسم الخدمة',
      'forms.serviceImage': 'صورة الخدمة',
      'admin.serviceFormSubtitle': 'أضف خدمة جديدة وحدد القسم والاسم.',
      'admin.serviceCoversTitle': 'أغلفة الأقسام',
      'admin.serviceCoversSubtitle': 'هذه هي الصورة الرئيسية التي تظهر للزائر لكل قسم من الأقسام الثلاثة.',
      'admin.serviceItemsTitle': 'عناصر الأقسام',
      'admin.serviceItemsSubtitle': 'أضف صورة واسم لكل عنصر داخل القسم، وستظهر عند فتح القسم.',
      'admin.changeCover': 'تغيير الغلاف',
      'services.gallerySubtitle': 'تصفح كل الأعمال المصنفة تحت هذا القسم.',
      'auth.signup': 'إنشاء حساب',
      'auth.login': 'تسجيل الدخول',
      'auth.logout': 'تسجيل الخروج',
      'hero.badge': 'هوية مطبوعة بشكل فاخر',
      'hero.ctaPrimary': 'تصفح المنتجات',
      'hero.ctaSecondary': 'شاهد أعمالنا',
      'hero.point1': 'تحديثات فورية لكل المستخدمين',
      'hero.point2': 'طلبات مباشرة عبر واتساب',
      'hero.point3': 'حسابات مستخدمين وطلبات محفوظة',
      'hero.previewTitle': 'واجهة راقية لمنتجات الطباعة',
      'hero.previewText': 'منتجات دعائية وتجارية بجودة تليق بعلامتك التجارية.',
      'hero.previewTitleSmall': 'تجربة ثنائية اللغة',
      'hero.previewPhone': 'مزامنة فورية عبر Supabase',
      'feature.oneTitle': 'تحديث لحظي',
      'feature.oneText': 'أي تعديل على المنتجات أو الحذف أو الإضافة يظهر فورًا لباقي المستخدمين.',
      'feature.twoTitle': 'حسابات مستخدمين',
      'feature.twoText': 'كل عميل يمكنه إنشاء حسابه وتسجيل الدخول من أي جهاز.',
      'feature.threeTitle': 'طلبات محفوظة',
      'feature.threeText': 'طلبات الشراء المسجلة تظهر للأدمن داخل لوحة الإدارة.',
      'products.eyebrow': 'المنتجات',
      'products.title': 'منتجات قابلة للطباعة',
      'products.subtitle': 'جميع المنتجات هنا تُدار من قاعدة البيانات وتظهر تحديثاتها مباشرة لكل الزوار.',
      'products.searchPlaceholder': 'ابحث باسم المنتج...',
      'products.resetFilters': 'إعادة ضبط الفلاتر',
      'portfolio.eyebrow': 'أعمالنا السابقة',
      'portfolio.title': 'نماذج من تنفيذنا',
      'portfolio.subtitle': 'صور من أعمالنا السابقة مصنفة حسب نوع المنتج.',
      'footer.about': 'حلول طباعة وهوية بصرية مخصصة بلمسة عصرية، مناسبة للشركات والمتاجر والفعاليات.',
      'footer.quickLinks': 'روابط سريعة',
      'footer.contact': 'تواصل معنا',
      'footer.owner': 'الإدارة',
      'footer.adminEntry': 'دخول لوحة الإدارة',
      'footer.location': 'القاهرة، مصر',
      'footer.copyright': '© 2026 Kaizen Adv. Agency. جميع الحقوق محفوظة.',
      'footer.note': 'واجهة متصلة بالسحابة مع تحديثات مباشرة وحسابات مستخدمين.',
      'admin.badge': 'أدمن',
      'auth.signupTitle': 'إنشاء حساب جديد',
      'auth.signupSubtitle': 'سجّل اسمك ورقم هاتفك وكلمة المرور لحفظ طلباتك ومزامنتها بين الأجهزة.',
      'auth.loginTitle': 'تسجيل دخول المستخدم',
      'auth.loginSubtitle': 'استخدم رقم الهاتف وكلمة المرور للدخول إلى حسابك من أي جهاز.',
      'login.password': 'كلمة المرور',
      'login.enter': 'دخول',
      'admin.ownerLoginTitle': 'دخول لوحة الإدارة',
      'admin.ownerLoginSubtitle': 'أدخل كلمة مرور الأدمن لفتح واجهة التحكم.',
      'admin.productFormSubtitle': 'أدخل بيانات المنتج باللغتين ليظهر بشكل احترافي لكل المستخدمين.',
      'admin.portfolioFormSubtitle': 'أضف مشروعًا منفذًا ليظهر في معرض الأعمال لكل المستخدمين.',
      'forms.productName': 'اسم المنتج',
      'forms.serviceNamePlaceholder': 'مثال: كارت شخصي فاخر',
      'portfolio.emptyTitle': 'لا توجد أعمال مضافة حاليًا.',
      'portfolio.emptyText': 'يمكنك إضافة أعمال جديدة من لوحة الإدارة.',
      'clients.editTitle': 'تعديل عميل سابق',
      'quote.whatsappTitle': 'طلب من Kaizen Adv. Agency',
      'quote.whatsappFooter': 'تم الإنشاء من موقع Kaizen Adv. Agency',
      'quote.whatsappType': 'النوع',
      'quote.whatsappProduct': 'المنتج',
      'quote.whatsappCustomer': 'العميل',
      'quote.whatsappPhone': 'الهاتف',
      'quote.whatsappEmail': 'البريد',
      'quote.whatsappQuantity': 'الكمية',
      'quote.whatsappPrinting': 'نوع الطباعة',
      'quote.whatsappNotes': 'الملاحظات',
      'admin.backToStore': 'العودة للمتجر',
      'admin.logout': 'تسجيل الخروج',
      'admin.ownerTitle': 'مالك المتجر',
      'admin.ownerSubtitle': 'جلسة إدارة نشطة',
      'admin.productsTab': 'إدارة المنتجات',
      'admin.categoriesTab': 'إدارة الأقسام',
      'admin.portfolioTab': 'إدارة الأعمال',
      'admin.usersTab': 'حسابات المستخدمين',
      'admin.ordersTab': 'طلبات الشراء',
      'admin.productsTitle': 'إدارة المنتجات',
      'admin.productsSubtitle': 'أضف أو عدّل أو احذف المنتجات المتزامنة مع كل المستخدمين.',
      'admin.addProduct': 'إضافة منتج',
      'admin.searchProductsPlaceholder': 'ابحث عن منتج...',
      'admin.table.image': 'الصورة',
      'admin.table.name': 'الاسم',
      'admin.table.category': 'القسم',
      'admin.table.methods': 'طرق الطباعة',
      'admin.table.actions': 'الإجراءات',
      'admin.emptyProductsTitle': 'لا توجد منتجات.',
      'admin.emptyProductsText': 'ابدأ بإضافة أول منتج ليظهر مباشرة في المتجر.',
      'admin.categoriesTitle': 'إدارة الأقسام',
      'admin.categoriesSubtitle': 'أضف أقسامًا عربية وإنجليزية لتظهر في الفلاتر والمنتجات.',
      'admin.addCategory': 'إضافة قسم',
      'admin.saveCategory': 'حفظ القسم',
      'admin.categoryList': 'قائمة الأقسام',
      'admin.portfolioTitle': 'إدارة الأعمال السابقة',
      'admin.portfolioSubtitle': 'أضف أو عدّل أمثلة التنفيذ التي تظهر للكل لحظيًا.',
      'admin.portfolioSimpleSubtitle': 'أضف صورة العمل وحدد القسم المرتبط بها.',
      'admin.addPortfolio': 'إضافة عمل',
      'admin.emptyPortfolioTitle': 'لا توجد أعمال مضافة.',
      'admin.emptyPortfolioText': 'أضف أول عمل ليظهر ضمن قسم أعمالنا السابقة.',
      'admin.clientsTab': 'العملاء السابقون',
      'admin.clientsTitle': 'إدارة العملاء السابقون',
      'admin.clientsSubtitle': 'أضف شعارات أو صور البراندات التي تعاملتم معها سابقًا.',
      'admin.addClient': 'إضافة عميل',
      'admin.emptyClientsTitle': 'لا توجد شعارات عملاء.',
      'admin.emptyClientsText': 'أضف أول شعار عميل ليظهر في قسم العملاء السابقون.',
      'admin.usersTitle': 'حسابات المستخدمين',
      'admin.usersSubtitle': 'الحسابات المسجلة من خلال الموقع تظهر هنا من أي جهاز.',
      'admin.usersSecurityNote': 'كل الحسابات المسجلة من الموقع تظهر هنا مع بيانات الدخول الخاصة بها كما طلبت.',
      'admin.usersTable.name': 'الاسم',
      'admin.usersTable.phone': 'رقم الهاتف',
      'admin.usersTable.password': 'كلمة المرور',
      'admin.usersTable.userId': 'معرف المستخدم',
      'admin.usersTable.createdAt': 'تاريخ الإنشاء',
      'admin.emptyUsersTitle': 'لا توجد حسابات مستخدمين حتى الآن.',
      'admin.emptyUsersText': 'عندما يسجل المستخدمون من الموقع ستظهر بياناتهم هنا.',
      'admin.ordersTitle': 'طلبات الشراء والاقتباس',
      'admin.ordersSubtitle': 'كل طلب مسجل من المستخدمين يظهر هنا بشكل مباشر.',
      'admin.ordersTable.customer': 'العميل',
      'admin.ordersTable.phone': 'الهاتف',
      'admin.ordersTable.product': 'المنتج',
      'admin.ordersTable.type': 'النوع',
      'admin.ordersTable.quantity': 'الكمية',
      'admin.ordersTable.printing': 'الطباعة',
      'admin.ordersTable.date': 'التاريخ',
      'admin.emptyOrdersTitle': 'لا توجد طلبات حالية.',
      'admin.emptyOrdersText': 'عند إرسال أي طلب من المستخدمين سيظهر هنا فورًا.',
      'forms.categoryNameAr': 'اسم القسم بالعربية',
      'forms.categoryNameEn': 'اسم القسم بالإنجليزية',
      'forms.productNameAr': 'اسم المنتج بالعربية',
      'forms.productNameEn': 'اسم المنتج بالإنجليزية',
      'forms.category': 'القسم',
      'forms.mainImage': 'صورة المنتج الرئيسية',
      'forms.shortDescAr': 'وصف مختصر بالعربية',
      'forms.shortDescEn': 'وصف مختصر بالإنجليزية',
      'forms.fullDescAr': 'الوصف الكامل بالعربية',
      'forms.fullDescEn': 'الوصف الكامل بالإنجليزية',
      'forms.methods': 'طرق الطباعة المتاحة',
      'forms.projectImage': 'صورة مثال التنفيذ',
      'forms.projectDescAr': 'وصف مثال التنفيذ بالعربية',
      'forms.projectDescEn': 'وصف مثال التنفيذ بالإنجليزية',
      'forms.portfolioImage': 'صورة العمل',
      'forms.fileNote': 'اختر صورة من جهازك. عند التعديل يمكنك ترك الحقل فارغًا للاحتفاظ بالصورة الحالية.',
      'forms.addMethod': 'إضافة نوع طباعة',
      'forms.newMethodArPlaceholder': 'اسم الطريقة بالعربية',
      'forms.newMethodEnPlaceholder': 'Method name in English',
      'forms.customerName': 'اسم العميل',
      'forms.phone': 'رقم الهاتف',
      'forms.email': 'البريد الإلكتروني',
      'forms.quantity': 'الكمية المطلوبة',
      'forms.printingType': 'نوع الطباعة (اختياري)',
      'forms.notes': 'ملاحظات (اختياري)',
      'details.projectLabel': 'مثال من تنفيذ سابق',
      'details.methodsTitle': 'طرق الطباعة المتاحة',
      'details.requestQuote': 'اطلب عرض سعر',
      'details.orderNow': 'اطلب الآن',
      'common.cancel': 'إلغاء',
      'common.confirm': 'تأكيد',
      'clients.eyebrow': 'العملاء السابقون',
      'clients.title': 'براندات تعاملنا معها',
      'clients.subtitle': 'مجموعة من العلامات التجارية التي تشرفنا بالعمل معها سابقًا.',
      'clients.emptyTitle': 'لا توجد شعارات مضافة حاليًا.',
      'clients.emptyText': 'يمكنك إضافة شعارات العملاء من لوحة الإدارة.',
      'clients.modalTitle': 'إضافة عميل سابق',
      'clients.modalSubtitle': 'أضف صورة الشعار أو صورة البراند فقط.',
      'clients.imageLabel': 'صورة العميل',
      'hero.titleLine1': 'مش مجرد منتج',
      'hero.titleLine2': 'دي بصمة براندك',
      'hero.description': 'اختار من مجموعة متنوعة من المنتجات الدعائية والهدايا المخصصة، واضف لمستك الخاصة علشان كل منتج يوصل رسالة براندك ويخليه ديما في ذهن عملائك.',
      'products.all': 'الكل',
      'products.quoteTag': 'عرض سعر عند الطلب',
      'products.viewDetails': 'عرض التفاصيل',
      'products.emptyTitle': 'لا توجد منتجات متاحة.',
      'products.emptyText': 'يمكنك إضافة منتجات من لوحة الإدارة لتظهر هنا.',
      'products.noMatchTitle': 'لا توجد نتائج مطابقة.',
      'products.noMatchText': 'جرّب تغيير كلمة البحث أو القسم المحدد.',
      'admin.filterAllCategories': 'كل الأقسام',
      'quote.selectMethod': 'اختر طريقة الطباعة',
      'quote.noMethod': 'غير محدد',
      'quote.title': 'طلب عرض سعر',
      'quote.orderTitle': 'طلب شراء',
      'quote.subtitle': 'املأ البيانات التالية وسنفتح لك رسالة واتساب جاهزة.',
      'quote.orderSubtitle': 'سيتم حفظ الطلب في قاعدة البيانات ثم فتح رسالة واتساب جاهزة لك.',
      'quote.submit': 'إرسال عبر واتساب',
      'quote.orderSubmit': 'تسجيل الطلب وإرسال عبر واتساب',
      'quote.quoteType': 'عرض سعر',
      'quote.orderType': 'طلب شراء',
      'auth.welcomePrefix': 'مرحبًا',
      'auth.accountRequired': 'لازم يكون عندك حساب على الموقع علشان تطلب المنتج.',
      'auth.accountCreated': 'تم إنشاء الحساب بنجاح.',
      'auth.loggedIn': 'تم تسجيل دخولك بنجاح.',
      'auth.loggedOut': 'تم تسجيل الخروج.',
      'auth.duplicatePhone': 'رقم الهاتف مسجل بالفعل.',
      'messages.formRequiredTitle': 'بيانات ناقصة',
      'messages.formRequiredText': 'يرجى ملء كل الحقول المطلوبة.',
      'messages.methodsRequiredTitle': 'حدد طرق الطباعة',
      'messages.methodsRequiredText': 'اختر طريقة طباعة واحدة على الأقل.',
      'messages.loginSuccessTitle': 'تم الدخول',
      'messages.loginSuccessText': 'تم فتح لوحة الإدارة بنجاح.',
      'messages.loginErrorTitle': 'فشل الدخول',
      'messages.loginErrorText': 'كلمة المرور غير صحيحة.',
      'messages.productAddedTitle': 'تمت الإضافة',
      'messages.productAddedText': 'تمت إضافة المنتج بنجاح.',
      'messages.productUpdatedTitle': 'تم التحديث',
      'messages.productUpdatedText': 'تم تحديث بيانات المنتج بنجاح.',
      'messages.productDeletedTitle': 'تم الحذف',
      'messages.productDeletedText': 'تم حذف المنتج من المتجر.',
      'messages.categoryAddedTitle': 'تمت الإضافة',
      'messages.categoryAddedText': 'تمت إضافة القسم بنجاح.',
      'messages.categoryDeletedTitle': 'تم الحذف',
      'messages.categoryDeletedText': 'تم حذف القسم ونقل المنتجات التابعة له إلى قسم أخرى.',
      'messages.duplicateCategoryTitle': 'القسم موجود',
      'messages.duplicateCategoryText': 'هذا القسم موجود بالفعل.',
      'messages.portfolioAddedTitle': 'تمت الإضافة',
      'messages.portfolioAddedText': 'تمت إضافة العمل بنجاح.',
      'messages.portfolioUpdatedTitle': 'تم التحديث',
      'messages.portfolioUpdatedText': 'تم تحديث العمل بنجاح.',
      'messages.portfolioDeletedTitle': 'تم الحذف',
      'messages.portfolioDeletedText': 'تم حذف العمل من المعرض.',
      'messages.orderSavedTitle': 'تم حفظ الطلب',
      'messages.orderSavedText': 'تم تسجيل طلبك في النظام وفتحه على واتساب.',
      'messages.quoteSavedText': 'تم تسجيل طلبك في النظام.',
      'messages.openWhatsappTitle': 'فتح واتساب',
      'messages.openWhatsappText': 'جاري تجهيز الرسالة وفتح واتساب...',
      'messages.deleteProductConfirmTitle': 'حذف المنتج',
      'messages.deleteProductConfirmText': 'هل أنت متأكد من حذف هذا المنتج؟',
      'messages.deleteCategoryConfirmTitle': 'حذف القسم',
      'messages.deleteCategoryConfirmText': 'هل أنت متأكد من حذف هذا القسم؟',
      'messages.deletePortfolioConfirmTitle': 'حذف العمل',
      'messages.deletePortfolioConfirmText': 'هل أنت متأكد من حذف هذا العمل؟',
      'messages.logoutConfirmTitle': 'تسجيل الخروج',
      'messages.logoutConfirmText': 'هل تريد إنهاء جلسة الإدارة؟',
      'messages.supabaseWarningTitle': 'تنبيه Supabase',
      'messages.supabaseWarningText': 'تعذر تحميل بعض الجداول أو الـ Storage من Supabase. شغّل ملفات الإعداد المطلوبة.',
      'messages.authErrorTitle': 'تعذر تسجيل الدخول',
      'messages.authErrorText': 'تحقق من تجهيز جداول Supabase بالكامل.',
      'messages.genericSaveError': 'حدث خطأ أثناء الحفظ.',
      'messages.invalidPhoneTitle': 'رقم الهاتف غير صحيح',
      'messages.invalidPhoneText': 'اكتب رقم هاتف مصري صحيح مثل 01012345678 أو +201012345678.',
      'messages.uploadErrorTitle': 'فشل رفع الصورة',
      'messages.uploadErrorText': 'تأكد من إنشاء Storage bucket باسم kgroup-media وتفعيل الصلاحيات.',
      'messages.clientAddedTitle': 'تمت الإضافة',
      'messages.clientAddedText': 'تمت إضافة العميل السابق بنجاح.',
      'messages.serviceAddedTitle': 'تمت الإضافة',
      'messages.serviceAddedText': 'تمت إضافة الخدمة بنجاح.',
      'messages.serviceUpdatedTitle': 'تم التحديث',
      'messages.serviceUpdatedText': 'تم تحديث الخدمة بنجاح.',
      'messages.serviceDeletedTitle': 'تم الحذف',
      'messages.serviceDeletedText': 'تم حذف الخدمة بنجاح.',
      'messages.deleteServiceConfirmTitle': 'حذف الخدمة',
      'messages.deleteServiceConfirmText': 'هل أنت متأكد من حذف هذه الخدمة؟',
      'messages.methodAddedTitle': 'تمت الإضافة',
      'messages.methodAddedText': 'تمت إضافة نوع الطباعة الجديد بنجاح.',
      'messages.duplicateMethodTitle': 'الطريقة موجودة',
      'messages.duplicateMethodText': 'نوع الطباعة هذا موجود بالفعل.',
      'login.error': 'بيانات الدخول غير صحيحة.',
      'common.edit': 'تعديل',
      'common.delete': 'حذف',
      'common.save': 'حفظ',
      'common.update': 'تحديث',
      'common.guest': 'زائر'
    },
    en: {
      title: 'Kaizen Adv. Agency | Professional Printing Store',
      description: 'Kaizen Adv. Agency for custom printing and promotional products.',
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.products': 'Products',
      'nav.portfolio': 'Previous Work',
      'nav.clients': 'Previous Clients',
      'services.title': 'Our Services',
      'services.subtitle': 'Browse our custom services tailored to meet all your needs.',
      'services.signature': 'Signature collections',
      'services.signatureText': 'Choose a collection to explore its story, details, and visuals in one smooth experience.',
      'services.emptyTitle': 'No services found.',
      'services.emptyText': 'You can add services from the admin panel.',
      'admin.servicesTab': 'Manage Services',
      'admin.servicesTitle': 'Manage Services',
      'admin.servicesSubtitle': 'Add service images and assign them to Giveaway, Prints, or Exhibition stands.',
      'admin.addService': 'Add Service',
      'admin.emptyServicesTitle': 'No services.',
      'admin.emptyServicesText': 'Start by adding your first service.',
      'forms.serviceName': 'Service Name',
      'forms.serviceImage': 'Service Image',
      'admin.serviceFormSubtitle': 'Add a new service and specify category and name.',
      'admin.serviceCoversTitle': 'Section Covers',
      'admin.serviceCoversSubtitle': 'This is the main image shown to visitors for each of the three sections.',
      'admin.serviceItemsTitle': 'Section Items',
      'admin.serviceItemsSubtitle': 'Add an image and a name for each item inside the section; it will appear when the section is opened.',
      'admin.changeCover': 'Change Cover',
      'services.gallerySubtitle': 'Browse all the work listed under this section.',
      'clients.imageLabel': 'Client Image',
      'clients.modalTitle': 'Add Previous Client',
      'clients.modalSubtitle': 'Add the logo or brand image only.',
      'auth.signup': 'Create Account',
      'auth.login': 'Login',
      'auth.logout': 'Logout',
      'hero.badge': 'Premium printed identity',
      'hero.ctaPrimary': 'Browse Products',
      'hero.ctaSecondary': 'View Our Work',
      'hero.point1': 'Realtime updates for everyone',
      'hero.point2': 'Direct requests via WhatsApp',
      'hero.point3': 'User accounts and saved requests',
      'hero.previewTitle': 'Elegant interface for branded products',
      'hero.previewText': 'Promotional and commercial products worthy of your brand.',
      'hero.previewTitleSmall': 'Bilingual experience',
      'hero.previewPhone': 'Instant sync via Supabase',
      'feature.oneTitle': 'Realtime Updates',
      'feature.oneText': 'Any product add, edit, or delete appears instantly for all users.',
      'feature.twoTitle': 'User Accounts',
      'feature.twoText': 'Every customer can create an account and sign in from any device.',
      'feature.threeTitle': 'Saved Requests',
      'feature.threeText': 'Submitted purchase requests appear inside the admin panel.',
      'products.eyebrow': 'Products',
      'products.title': 'Printable Products',
      'products.subtitle': 'All products are managed from the database and synced instantly to every visitor.',
      'products.searchPlaceholder': 'Search by product name...',
      'products.resetFilters': 'Reset Filters',
      'portfolio.eyebrow': 'Previous Work',
      'portfolio.title': 'Samples from Our Work',
      'portfolio.subtitle': 'Images from our previous work grouped by product type.',
      'footer.about': 'Custom printing and visual identity solutions with a modern premium touch for companies, stores, and events.',
      'footer.quickLinks': 'Quick Links',
      'footer.contact': 'Contact',
      'footer.owner': 'Administration',
      'footer.adminEntry': 'Open Admin Panel',
      'footer.location': 'Cairo, Egypt',
      'footer.copyright': '© 2026 Kaizen Adv. Agency. All rights reserved.',
      'footer.note': 'Cloud-connected interface with live updates and user accounts.',
      'admin.badge': 'Admin',
      'auth.signupTitle': 'Create a new account',
      'auth.signupSubtitle': 'Register your name, phone number, and password to save your requests and sync them across devices.',
      'auth.loginTitle': 'Customer login',
      'auth.loginSubtitle': 'Use your phone number and password to access your account from any device.',
      'login.password': 'Password',
      'login.enter': 'Sign in',
      'admin.ownerLoginTitle': 'Admin panel login',
      'admin.ownerLoginSubtitle': 'Enter the admin password to open the control panel.',
      'admin.productFormSubtitle': 'Enter the product details in both languages so it appears professionally for every user.',
      'admin.portfolioFormSubtitle': 'Add a completed project so it appears in the gallery for all users.',
      'forms.productName': 'Product name',
      'forms.serviceNamePlaceholder': 'Example: luxury business card',
      'portfolio.emptyTitle': 'No previous work added yet.',
      'portfolio.emptyText': 'You can add new work from the admin panel.',
      'clients.title': 'Brands we have worked with',
      'clients.subtitle': 'A collection of brands we have been honored to collaborate with.',
      'clients.emptyTitle': 'No logos added yet.',
      'clients.emptyText': 'You can add client logos from the admin panel.',
      'clients.editTitle': 'Edit previous client',
      'quote.whatsappTitle': 'Request from Kaizen Adv. Agency',
      'quote.whatsappFooter': 'Generated from Kaizen Adv. Agency website',
      'quote.whatsappType': 'Type',
      'quote.whatsappProduct': 'Product',
      'quote.whatsappCustomer': 'Customer',
      'quote.whatsappPhone': 'Phone',
      'quote.whatsappEmail': 'Email',
      'quote.whatsappQuantity': 'Quantity',
      'quote.whatsappPrinting': 'Printing type',
      'quote.whatsappNotes': 'Notes',
      'admin.backToStore': 'Back to Store',
      'admin.logout': 'Logout',
      'admin.ownerTitle': 'Store Owner',
      'admin.ownerSubtitle': 'Active admin session',
      'admin.productsTab': 'Manage Products',
      'admin.categoriesTab': 'Manage Categories',
      'admin.portfolioTab': 'Manage Previous Work',
      'admin.usersTab': 'User Accounts',
      'admin.ordersTab': 'Purchase Requests',
      'admin.productsTitle': 'Manage Products',
      'admin.productsSubtitle': 'Add, edit, or delete products synced to all users.',
      'admin.addProduct': 'Add Product',
      'admin.searchProductsPlaceholder': 'Search products...',
      'admin.table.image': 'Image',
      'admin.table.name': 'Name',
      'admin.table.category': 'Category',
      'admin.table.methods': 'Print Methods',
      'admin.table.actions': 'Actions',
      'admin.emptyProductsTitle': 'No products found.',
      'admin.emptyProductsText': 'Start by adding your first product.',
      'admin.categoriesTitle': 'Manage Categories',
      'admin.categoriesSubtitle': 'Add Arabic and English categories for products and filters.',
      'admin.addCategory': 'Add Category',
      'admin.saveCategory': 'Save Category',
      'admin.categoryList': 'Categories List',
      'admin.portfolioTitle': 'Manage Previous Work',
      'admin.portfolioSubtitle': 'Add or edit previous work items that appear for everyone.',
      'admin.portfolioSimpleSubtitle': 'Add the work image and choose its category.',
      'admin.addPortfolio': 'Add Work',
      'admin.emptyPortfolioTitle': 'No portfolio items found.',
      'admin.emptyPortfolioText': 'Add your first work image to display it here.',
      'admin.clientsTab': 'Previous Clients',
      'admin.clientsTitle': 'Manage Previous Clients',
      'admin.clientsSubtitle': 'Add logos or brand images you have worked with before.',
      'admin.addClient': 'Add Client',
      'admin.emptyClientsTitle': 'No client logos found.',
      'admin.emptyClientsText': 'Add the first client logo to show it in the clients section.',
      'admin.usersTitle': 'User Accounts',
      'admin.usersSubtitle': 'Accounts created through the website appear here from any device.',
      'admin.usersSecurityNote': 'All customer accounts created on the website appear here with their saved login data as requested.',
      'admin.usersTable.name': 'Name',
      'admin.usersTable.phone': 'Phone',
      'admin.usersTable.password': 'Password',
      'admin.usersTable.userId': 'User ID',
      'admin.usersTable.createdAt': 'Created At',
      'admin.emptyUsersTitle': 'No user accounts yet.',
      'admin.emptyUsersText': 'When users register, their accounts will appear here.',
      'admin.ordersTitle': 'Purchase & Quote Requests',
      'admin.ordersSubtitle': 'Every submitted user request appears here instantly.',
      'admin.ordersTable.customer': 'Customer',
      'admin.ordersTable.phone': 'Phone',
      'admin.ordersTable.product': 'Product',
      'admin.ordersTable.type': 'Type',
      'admin.ordersTable.quantity': 'Quantity',
      'admin.ordersTable.printing': 'Printing',
      'admin.ordersTable.date': 'Date',
      'admin.emptyOrdersTitle': 'No requests yet.',
      'admin.emptyOrdersText': 'When users submit requests, they will appear here.',
      'forms.categoryNameAr': 'Category Name in Arabic',
      'forms.categoryNameEn': 'Category Name in English',
      'forms.productNameAr': 'Product Name in Arabic',
      'forms.productNameEn': 'Product Name in English',
      'forms.category': 'Category',
      'forms.mainImage': 'Main Product Image',
      'forms.shortDescAr': 'Short Description in Arabic',
      'forms.shortDescEn': 'Short Description in English',
      'forms.fullDescAr': 'Full Description in Arabic',
      'forms.fullDescEn': 'Full Description in English',
      'forms.methods': 'Available Print Methods',
      'forms.projectImage': 'Example Work Image',
      'forms.projectDescAr': 'Example Description in Arabic',
      'forms.projectDescEn': 'Example Description in English',
      'forms.portfolioImage': 'Work Image',
      'forms.fileNote': 'Choose an image from your device. When editing, leave it empty to keep the current image.',
      'forms.addMethod': 'Add Print Method',
      'forms.newMethodArPlaceholder': 'Method name in Arabic',
      'forms.newMethodEnPlaceholder': 'Method name in English',
      'forms.customerName': 'Customer Name',
      'forms.phone': 'Phone Number',
      'forms.email': 'Email',
      'forms.quantity': 'Quantity',
      'forms.printingType': 'Printing Type (Optional)',
      'forms.notes': 'Notes (Optional)',
      'details.projectLabel': 'Previous Work Sample',
      'details.methodsTitle': 'Available Print Methods',
      'details.requestQuote': 'Request Quote',
      'details.orderNow': 'Order Now',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',
      'clients.eyebrow': 'Previous Clients',
      'hero.titleLine1': 'Not just a product',
      'hero.titleLine2': 'it is your brand signature',
      'hero.description': 'Choose from a wide variety of promotional products and custom gifts, then add your own touch so every item carries your brand message and stays in your customers’ minds.',
      'products.all': 'All',
      'products.quoteTag': 'Quote on request',
      'products.viewDetails': 'View Details',
      'products.emptyTitle': 'No products available.',
      'products.emptyText': 'You can add products from the admin panel.',
      'products.noMatchTitle': 'No matching results found.',
      'products.noMatchText': 'Try changing the search keyword or selected category.',
      'admin.filterAllCategories': 'All Categories',
      'quote.selectMethod': 'Select printing method',
      'quote.noMethod': 'Not specified',
      'quote.title': 'Quote Request',
      'quote.orderTitle': 'Purchase Request',
      'quote.subtitle': 'Fill the following details and we will open a ready WhatsApp message.',
      'quote.orderSubtitle': 'Your request will be saved in the database and then WhatsApp will open for you.',
      'quote.submit': 'Send via WhatsApp',
      'quote.orderSubmit': 'Save Request & Send via WhatsApp',
      'quote.quoteType': 'Quote',
      'quote.orderType': 'Order',
      'auth.welcomePrefix': 'Hi',
      'auth.accountRequired': 'You must have an account on the website before placing an order.',
      'auth.accountCreated': 'Account created successfully.',
      'auth.loggedIn': 'You are now logged in.',
      'auth.loggedOut': 'You have been logged out.',
      'auth.duplicatePhone': 'This phone number is already registered.',
      'messages.formRequiredTitle': 'Missing fields',
      'messages.formRequiredText': 'Please fill all required fields.',
      'messages.methodsRequiredTitle': 'Select printing methods',
      'messages.methodsRequiredText': 'Please select at least one printing method.',
      'messages.loginSuccessTitle': 'Logged in',
      'messages.loginSuccessText': 'Admin panel opened successfully.',
      'messages.loginErrorTitle': 'Login failed',
      'messages.loginErrorText': 'Incorrect password.',
      'messages.productAddedTitle': 'Added successfully',
      'messages.productAddedText': 'The product has been added successfully.',
      'messages.productUpdatedTitle': 'Updated successfully',
      'messages.productUpdatedText': 'The product has been updated successfully.',
      'messages.productDeletedTitle': 'Deleted successfully',
      'messages.productDeletedText': 'The product has been deleted from the store.',
      'messages.categoryAddedTitle': 'Added successfully',
      'messages.categoryAddedText': 'The category has been added successfully.',
      'messages.categoryDeletedTitle': 'Deleted successfully',
      'messages.categoryDeletedText': 'The category was deleted and related products were moved to Other.',
      'messages.duplicateCategoryTitle': 'Category already exists',
      'messages.duplicateCategoryText': 'This category already exists.',
      'messages.portfolioAddedTitle': 'Added successfully',
      'messages.portfolioAddedText': 'The project has been added successfully.',
      'messages.portfolioUpdatedTitle': 'Updated successfully',
      'messages.portfolioUpdatedText': 'The project has been updated successfully.',
      'messages.portfolioDeletedTitle': 'Deleted successfully',
      'messages.portfolioDeletedText': 'The project has been removed from the gallery.',
      'messages.orderSavedTitle': 'Request saved',
      'messages.orderSavedText': 'Your request was saved and opened in WhatsApp.',
      'messages.quoteSavedText': 'Your request has been saved in the system.',
      'messages.openWhatsappTitle': 'Opening WhatsApp',
      'messages.openWhatsappText': 'Preparing your message and opening WhatsApp...',
      'messages.deleteProductConfirmTitle': 'Delete product',
      'messages.deleteProductConfirmText': 'Are you sure you want to delete this product?',
      'messages.deleteCategoryConfirmTitle': 'Delete category',
      'messages.deleteCategoryConfirmText': 'Are you sure you want to delete this category?',
      'messages.deletePortfolioConfirmTitle': 'Delete project',
      'messages.deletePortfolioConfirmText': 'Are you sure you want to delete this project?',
      'messages.logoutConfirmTitle': 'Logout',
      'messages.logoutConfirmText': 'Do you want to end the admin session?',
      'messages.supabaseWarningTitle': 'Supabase Warning',
      'messages.supabaseWarningText': 'Some tables or storage settings could not be loaded from Supabase. Please run the required setup scripts.',
      'messages.authErrorTitle': 'Authentication error',
      'messages.authErrorText': 'Please verify that Supabase tables are configured correctly.',
      'messages.genericSaveError': 'An error occurred while saving.',
      'messages.invalidPhoneTitle': 'Invalid phone number',
      'messages.invalidPhoneText': 'Please enter a valid Egyptian phone number like 01012345678 or +201012345678.',
      'messages.uploadErrorTitle': 'Upload failed',
      'messages.uploadErrorText': 'Please create the kgroup-media storage bucket and enable the required policies.',
      'messages.clientAddedTitle': 'Added successfully',
      'messages.clientAddedText': 'The previous client logo has been added successfully.',
      'messages.serviceAddedTitle': 'Added successfully',
      'messages.serviceAddedText': 'The service has been added successfully.',
      'messages.serviceUpdatedTitle': 'Updated successfully',
      'messages.serviceUpdatedText': 'The service has been updated successfully.',
      'messages.serviceDeletedTitle': 'Deleted successfully',
      'messages.serviceDeletedText': 'The service has been removed successfully.',
      'messages.deleteServiceConfirmTitle': 'Delete service',
      'messages.deleteServiceConfirmText': 'Are you sure you want to delete this service?',
      'messages.methodAddedTitle': 'Added successfully',
      'messages.methodAddedText': 'The new print method has been added successfully.',
      'messages.duplicateMethodTitle': 'Method already exists',
      'messages.duplicateMethodText': 'This print method already exists.',
      'login.error': 'Invalid login credentials.',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.save': 'Save',
      'common.update': 'Update',
      'common.guest': 'Guest'
    }
  };

  const state = {
    language: localStorage.getItem(STORAGE_KEYS.language) || 'ar',
    selectedCategory: 'all',
    searchTerm: '',
    currentProductId: null,
    currentRequestMode: 'quote',
    selectedPortfolioCategory: 'gifts',
    selectedServiceCategory: 'prints',
    adminAuthenticated: sessionStorage.getItem(STORAGE_KEYS.adminAuth) === 'true',
    activeAdminTab: 'products',
    currentCustomer: null,
    categories: [...DEFAULT_CATEGORIES],
    printingMethods: [...DEFAULT_PRINTING_METHODS],
    products: [...DEFAULT_PRODUCTS],
    portfolio: [...DEFAULT_PORTFOLIO],
    services: [],
    serviceCovers: {},
    activeGalleryCategory: null,
    clientLogos: [],
    users: [],
    orders: [],
    warningShown: false,
    realtimeChannel: null,
    supabaseReady: !!(window.supabase && typeof window.supabase.createClient === 'function')
  };

  const refs = {
    storeView: document.getElementById('store-view'),
    adminView: document.getElementById('admin-view'),
    toastContainer: document.getElementById('toast-container'),
    languageToggle: document.getElementById('language-toggle'),
    languageToggleLabel: document.getElementById('language-toggle-label'),
    mobileLanguageToggle: document.getElementById('mobile-language-toggle'),
    mobileLanguageToggleLabel: document.getElementById('mobile-language-toggle-label'),
    adminLanguageToggle: document.getElementById('admin-language-toggle'),
    adminLanguageToggleLabel: document.getElementById('admin-language-toggle-label'),
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    mobileMenu: document.getElementById('mobile-menu'),
    guestAuthActions: document.getElementById('guest-auth-actions'),
    userAuthActions: document.getElementById('user-auth-actions'),
    mobileGuestAuthActions: document.getElementById('mobile-guest-auth-actions'),
    mobileUserAuthActions: document.getElementById('mobile-user-auth-actions'),
    userGreeting: document.getElementById('user-greeting'),
    mobileUserGreeting: document.getElementById('mobile-user-greeting'),
    openSignupModal: document.getElementById('open-signup-modal'),
    openLoginModal: document.getElementById('open-login-modal'),
    mobileOpenSignupModal: document.getElementById('mobile-open-signup-modal'),
    mobileOpenLoginModal: document.getElementById('mobile-open-login-modal'),
    customerLogout: document.getElementById('customer-logout'),
    mobileCustomerLogout: document.getElementById('mobile-customer-logout'),
    storeAdminLogin: document.getElementById('store-admin-login'),
    mobileAdminLogin: document.getElementById('mobile-admin-login'),
    footerAdminLogin: document.getElementById('footer-admin-login'),
    backToStore: document.getElementById('back-to-store'),
    adminLogout: document.getElementById('admin-logout'),
    productSearch: document.getElementById('product-search'),
    clearSearch: document.getElementById('clear-search'),
    categoryPills: document.getElementById('category-pills'),
    categoryScrollPrev: document.getElementById('category-scroll-prev'),
    categoryScrollNext: document.getElementById('category-scroll-next'),
    resetFilters: document.getElementById('reset-filters'),
    productsGrid: document.getElementById('products-grid'),
    productsEmpty: document.getElementById('products-empty'),
    productsEmptyTitle: document.getElementById('products-empty-title'),
    productsEmptyText: document.getElementById('products-empty-text'),
    portfolioGrid: document.getElementById('portfolio-grid'),
    portfolioEmpty: document.getElementById('portfolio-empty'),
    portfolioCategoryPills: document.getElementById('portfolio-category-pills'),
    clientsGrid: document.getElementById('clients-grid'),
    clientsEmpty: document.getElementById('clients-empty'),
    detailsModal: document.getElementById('details-modal'),
    quoteModal: document.getElementById('quote-modal'),
    signupModal: document.getElementById('signup-modal'),
    userLoginModal: document.getElementById('user-login-modal'),
    loginModal: document.getElementById('login-modal'),
    productModal: document.getElementById('product-modal'),
    portfolioModal: document.getElementById('portfolio-modal'),
    confirmModal: document.getElementById('confirm-modal'),
    detailsImage: document.getElementById('details-image'),
    detailsProjectImage: document.getElementById('details-project-image'),
    detailsProjectDescription: document.getElementById('details-project-description'),
    detailsCategory: document.getElementById('details-category'),
    detailsTitle: document.getElementById('details-title'),
    detailsDescription: document.getElementById('details-description'),
    detailsMethods: document.getElementById('details-methods'),
    detailsRequestQuote: document.getElementById('details-request-quote'),
    detailsOrderNow: document.getElementById('details-order-now'),
    quoteForm: document.getElementById('quote-form'),
    quoteModalTitle: document.getElementById('quote-modal-title'),
    quoteModalSubtitle: document.getElementById('quote-modal-subtitle'),
    quoteSubmitLabel: document.getElementById('quote-submit-label'),
    quoteProduct: document.getElementById('quote-product'),
    quoteCustomerName: document.getElementById('quote-customer-name'),
    quotePhone: document.getElementById('quote-phone'),
    quoteEmail: document.getElementById('quote-email'),
    quoteQuantity: document.getElementById('quote-quantity'),
    quotePrintingType: document.getElementById('quote-printing-type'),
    quoteNotes: document.getElementById('quote-notes'),
    signupForm: document.getElementById('signup-form'),
    signupName: document.getElementById('signup-name'),
    signupPhone: document.getElementById('signup-phone'),
    signupPassword: document.getElementById('signup-password'),
    toggleSignupPassword: document.getElementById('toggle-signup-password'),
    userLoginForm: document.getElementById('user-login-form'),
    userLoginPhone: document.getElementById('user-login-phone'),
    userLoginPassword: document.getElementById('user-login-password'),
    toggleUserLoginPassword: document.getElementById('toggle-user-login-password'),
    loginForm: document.getElementById('login-form'),
    adminPassword: document.getElementById('admin-password'),
    togglePassword: document.getElementById('toggle-password'),
    loginError: document.getElementById('login-error'),
    adminNavBtns: document.querySelectorAll('.admin-nav-btn'),
    adminTabs: document.querySelectorAll('.admin-tab'),
    openAddProduct: document.getElementById('open-add-product'),
    adminProductSearch: document.getElementById('admin-product-search'),
    adminCategoryFilter: document.getElementById('admin-category-filter'),
    adminProductsBody: document.getElementById('admin-products-body'),
    adminProductsEmpty: document.getElementById('admin-products-empty'),
    categoryForm: document.getElementById('category-form'),
    categoryNameAr: document.getElementById('category-name-ar'),
    categoryNameEn: document.getElementById('category-name-en'),
    adminCategoriesBody: document.getElementById('admin-categories-body'),
    openAddPortfolio: document.getElementById('open-add-portfolio'),
    openAddClient: document.getElementById('open-add-client'),
    openAddService: document.getElementById('open-add-service'),
    adminPortfolioGrid: document.getElementById('admin-portfolio-grid'),
    adminPortfolioEmpty: document.getElementById('admin-portfolio-empty'),
    adminClientsGrid: document.getElementById('admin-clients-grid'),
    adminClientsEmpty: document.getElementById('admin-clients-empty'),
    adminUsersBody: document.getElementById('admin-users-body'),
    adminUsersEmpty: document.getElementById('admin-users-empty'),
    adminOrdersBody: document.getElementById('admin-orders-body'),
    adminOrdersEmpty: document.getElementById('admin-orders-empty'),
    productForm: document.getElementById('product-form'),
    productModalTitle: document.getElementById('product-modal-title'),
    productModalSubmitLabel: document.getElementById('product-modal-submit-label'),
    productId: document.getElementById('product-id'),
    productNameAr: document.getElementById('product-name-ar'),
    productNameEn: document.getElementById('product-name-en'),
    productCategory: document.getElementById('product-category'),
    productImage: document.getElementById('product-image'),
    productImageFile: document.getElementById('product-image-file'),
    productImagePreview: document.getElementById('product-image-preview'),
    productShortAr: document.getElementById('product-short-ar'),
    productShortEn: document.getElementById('product-short-en'),
    productFullAr: document.getElementById('product-full-ar'),
    productFullEn: document.getElementById('product-full-en'),
    productPortfolioImage: document.getElementById('product-portfolio-image'),
    productPortfolioImageFile: document.getElementById('product-portfolio-image-file'),
    productPortfolioImagePreview: document.getElementById('product-portfolio-image-preview'),
    productPortfolioDescAr: document.getElementById('product-portfolio-desc-ar'),
    productPortfolioDescEn: document.getElementById('product-portfolio-desc-en'),
    printingMethodCheckboxes: document.getElementById('printing-method-checkboxes'),
    addPrintingMethodBtn: document.getElementById('add-printing-method-btn'),
    newPrintingMethodAr: document.getElementById('new-printing-method-ar'),
    newPrintingMethodEn: document.getElementById('new-printing-method-en'),
    portfolioForm: document.getElementById('portfolio-form'),
    portfolioModalTitle: document.getElementById('portfolio-modal-title'),
    portfolioModalSubmitLabel: document.getElementById('portfolio-modal-submit-label'),
    portfolioSaveBtn: document.getElementById('portfolio-save-btn'),
    portfolioId: document.getElementById('portfolio-id'),
    portfolioTitleAr: document.getElementById('portfolio-title-ar'),
    portfolioTitleEn: document.getElementById('portfolio-title-en'),
    portfolioMethodAr: document.getElementById('portfolio-method-ar'),
    portfolioMethodEn: document.getElementById('portfolio-method-en'),
    portfolioCategory: document.getElementById('portfolio-category'),
    portfolioImage: document.getElementById('portfolio-image'),
    portfolioImageFile: document.getElementById('portfolio-image-file'),
    portfolioImagePreview: document.getElementById('portfolio-image-preview'),
    portfolioDescAr: document.getElementById('portfolio-desc-ar'),
    portfolioDescEn: document.getElementById('portfolio-desc-en'),
    clientLogoModal: document.getElementById('client-logo-modal'),
    clientLogoForm: document.getElementById('client-logo-form'),
    clientLogoModalTitle: document.getElementById('client-logo-modal-title'),
    clientLogoSubmitLabel: document.getElementById('client-logo-submit-label'),
    clientLogoId: document.getElementById('client-logo-id'),
    clientLogoImage: document.getElementById('client-logo-image'),
    clientLogoImageFile: document.getElementById('client-logo-image-file'),
    clientLogoImagePreview: document.getElementById('client-logo-image-preview'),
    confirmTitle: document.getElementById('confirm-title'),
    confirmMessage: document.getElementById('confirm-message'),
    confirmCancel: document.getElementById('confirm-cancel'),
    confirmOk: document.getElementById('confirm-ok'),
    servicesCategoriesGrid: document.getElementById('services-categories-grid'),
    servicesGalleryModal: document.getElementById('services-gallery-modal'),
    servicesGalleryTitle: document.getElementById('services-gallery-title'),
     servicesGalleryDescription: document.getElementById('services-gallery-description'),
     servicesGalleryTags: document.getElementById('services-gallery-tags'),
     servicesGalleryIndex: document.getElementById('services-gallery-index'),
    servicesGalleryGrid: document.getElementById('services-gallery-grid'),
    servicesGalleryEmpty: document.getElementById('services-gallery-empty'),
    adminServiceCoversGrid: document.getElementById('admin-service-covers-grid'),
    adminServicesGrid: document.getElementById('admin-services-grid'),
    adminServicesEmpty: document.getElementById('admin-services-empty'),
    serviceModal: document.getElementById('service-modal'),
    serviceForm: document.getElementById('service-form'),
    serviceId: document.getElementById('service-id'),
    serviceCategory: document.getElementById('service-category'),
    serviceName: document.getElementById('service-name'),
    serviceImage: document.getElementById('service-image'),
    serviceImageFile: document.getElementById('service-image-file'),
    serviceImagePreview: document.getElementById('service-image-preview'),
    serviceModalTitle: document.getElementById('service-modal-title'),
    serviceModalSubmitLabel: document.getElementById('service-modal-submit-label')
  };

  let confirmAction = null;
  let revealObserver = null;
  let searchTimer = null;
  let publicReloadTimer = null;
  let publicReloadInFlight = false;
  const supabaseClient = state.supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

  function isAdminVisible() {
    return state.adminAuthenticated || refs.adminView?.classList.contains('active');
  }

  function getTranslation(path) {
    return translations[state.language]?.[path] ?? null;
  }

  function t(path) {
    return getTranslation(path) ?? path;
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalize(value = '') {
    return String(value).trim().toLowerCase();
  }

  function slugify(value = '') {
    return value.toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function formatDate(value) {
    if (!value) return '-';
    return new Date(value).toLocaleString(state.language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  function normalizePhone(input) {
    const raw = String(input || '').replace(/\s+/g, '').replace(/-/g, '');
    if (!raw) return '';
    if (raw.startsWith('+')) return raw;
    if (raw.startsWith('00')) return `+${raw.slice(2)}`;
    if (raw.startsWith('20') && raw.length >= 12) return `+${raw}`;
    if (raw.startsWith('0') && raw.length === 11) return `+20${raw.slice(1)}`;
    if (raw.startsWith('1') && raw.length === 10) return `+20${raw}`;
    return raw;
  }

  function isValidEgyptPhone(phone) {
    return /^\+201[0-2,5]\d{8}$/.test(phone);
  }

  function currentText(arValue, enValue) {
    return state.language === 'ar' ? arValue : enValue;
  }

  function getMethodLabel(methodId) {
    const method = state.printingMethods.find(item => item.id === methodId) || DEFAULT_PRINTING_METHODS.find(item => item.id === methodId);
    return method ? currentText(method.nameAr, method.nameEn) : methodId;
  }

  function getCategoryById(categoryId) {
    return state.categories.find(item => item.id === categoryId) || state.categories.find(item => item.id === 'other') || null;
  }

  function getCategoryLabel(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? currentText(category.nameAr, category.nameEn) : '';
  }

  function getPortfolioCategoryById(categoryId) {
    return PORTFOLIO_CATEGORIES.find(item => item.id === categoryId) || null;
  }

  function getProductName(product) {
    return currentText(product.nameAr, product.nameEn);
  }

  function getProductShort(product) {
    return currentText(product.shortDescAr, product.shortDescEn);
  }

  function getProductFull(product) {
    return currentText(product.fullDescAr, product.fullDescEn);
  }

  function getProductProjectDescription(product) {
    return currentText(product.projectDescAr, product.projectDescEn);
  }

  function getPortfolioTitle(item) {
    return currentText(item.titleAr, item.titleEn);
  }

  function getPortfolioMethod(item) {
    return currentText(item.methodAr, item.methodEn);
  }

  function getPortfolioDescription(item) {
    return currentText(item.descriptionAr, item.descriptionEn);
  }

  function showToast(type, title, message) {
    if (!refs.toastContainer) return;
    const iconMap = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${iconMap[type] || 'fa-circle-info'}"></i>
      <div class="toast-content">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(message)}</p>
      </div>
      <button class="toast-close" type="button"><i class="fa-solid fa-xmark"></i></button>
    `;
    refs.toastContainer.appendChild(toast);
    const remove = () => toast.remove();
    toast.querySelector('.toast-close')?.addEventListener('click', remove);
    setTimeout(remove, 4500);
  }

  function previewImageSource(previewElement, source) {
    if (!previewElement) return;
    if (source) {
      previewElement.src = source;
      previewElement.classList.remove('hidden');
    } else {
      previewElement.removeAttribute('src');
      previewElement.classList.add('hidden');
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    const anyOpen = [...document.querySelectorAll('.modal')].some(item => !item.classList.contains('hidden'));
    if (!anyOpen) document.body.style.overflow = '';
  }

  function showConfirm(title, message, callback) {
    refs.confirmTitle.textContent = title;
    refs.confirmMessage.textContent = message;
    confirmAction = callback;
    openModal(refs.confirmModal);
  }

  function closeMobileMenu() {
    refs.mobileMenu?.classList.remove('open');
    refs.mobileMenuButton?.classList.remove('open');
  }

  function switchView(viewName) {
    refs.storeView?.classList.toggle('active', viewName === 'store');
    refs.adminView?.classList.toggle('active', viewName === 'admin');
    closeMobileMenu();
    window.scrollTo(0, 0);
    if (viewName === 'admin') {
      renderAdminPanels();
      loadUsersAndOrders();
    }
  }

  function updateAuthUI() {
    const guestVisible = !state.currentCustomer;
    refs.guestAuthActions?.classList.toggle('hidden', !guestVisible);
    refs.userAuthActions?.classList.toggle('hidden', guestVisible);
    refs.mobileGuestAuthActions?.classList.toggle('hidden', !guestVisible);
    refs.mobileUserAuthActions?.classList.toggle('hidden', guestVisible);

    const name = state.currentCustomer?.full_name || state.currentCustomer?.phone || t('common.guest');
    const greeting = `${t('auth.welcomePrefix')} ${name}`;
    if (refs.userGreeting) refs.userGreeting.textContent = greeting;
    if (refs.mobileUserGreeting) refs.mobileUserGreeting.textContent = greeting;
  }

  function bindFilePreview(fileInput, previewElement) {
    if (!fileInput || !previewElement) return;
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      previewImageSource(previewElement, URL.createObjectURL(file));
    });
  }

  function initRevealAnimations() {
    const revealItems = document.querySelectorAll('.reveal:not(.visible)');
    if (!revealItems.length) return;

    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '80px 0px' });
    }

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  function applyStaticTranslations() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    const title = getTranslation('title');
    const description = getTranslation('description');
    if (title) document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute('content', title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && description) ogDescription.setAttribute('content', description);

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = getTranslation(element.dataset.i18n);
      if (value !== null) element.textContent = value;
    });

    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
      element.textContent = state.language === 'ar' ? element.dataset.ar : element.dataset.en;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = getTranslation(element.dataset.i18nPlaceholder);
      if (value !== null) element.setAttribute('placeholder', value);
    });

    const switchLabel = state.language === 'ar' ? 'EN' : 'عربي';
    if (refs.languageToggleLabel) refs.languageToggleLabel.textContent = switchLabel;
    if (refs.mobileLanguageToggleLabel) refs.mobileLanguageToggleLabel.textContent = switchLabel;
    if (refs.adminLanguageToggleLabel) refs.adminLanguageToggleLabel.textContent = switchLabel;
    updateAuthUI();
  }

  function applyTranslations() {
    applyStaticTranslations();
    populateCategorySelects();
    populateServiceCategorySelect();
    buildPrintingMethodCheckboxes(getSelectedMethodsFromForm());
    renderStorefront();
    if (isAdminVisible()) renderAdminPanels();

    if (!refs.detailsModal.classList.contains('hidden') && state.currentProductId) openProductDetails(state.currentProductId);
    if (!refs.quoteModal.classList.contains('hidden') && state.currentProductId) prepareQuoteModal(state.currentProductId, state.currentRequestMode);
    initRevealAnimations();
  }

  function renderStorefront() {
    renderCategoryPills();
    renderProducts();
    renderServiceCategories();
    if (!refs.servicesGalleryModal?.classList.contains('hidden')) renderServicesGallery();
    renderPortfolioCategoryPills();
    renderPortfolio();
    renderClients();
  }

  function renderAdminPanels() {
    renderAdminProducts();
    renderAdminCategories();
    renderAdminPortfolio();
    renderAdminServiceCovers();
    renderAdminServices();
    renderAdminClients();
    renderAdminUsers();
    renderAdminOrders();
  }

  function buildPrintingMethodCheckboxes(selectedMethods = []) {
    if (!refs.printingMethodCheckboxes) return;
    refs.printingMethodCheckboxes.innerHTML = state.printingMethods.map(method => `
      <label class="check-item">
        <input type="checkbox" value="${method.id}" ${selectedMethods.includes(method.id) ? 'checked' : ''}>
        <span>${escapeHtml(currentText(method.nameAr, method.nameEn))}</span>
      </label>
    `).join('');
  }

  function getSelectedMethodsFromForm() {
    return refs.printingMethodCheckboxes ? [...refs.printingMethodCheckboxes.querySelectorAll('input:checked')].map(input => input.value) : [];
  }

  function populateCategorySelects() {
    if (!refs.productCategory || !refs.adminCategoryFilter) return;
    const selectedProductCategory = refs.productCategory.value;
    const selectedAdminCategory = refs.adminCategoryFilter.value || 'all';
    const selectedPortfolioCategory = refs.portfolioCategory?.value || '';

    const categoryOptions = state.categories.map(category => `
      <option value="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</option>
    `).join('');

    const portfolioOptions = PORTFOLIO_CATEGORIES.map(category => `
      <option value="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</option>
    `).join('');

    refs.productCategory.innerHTML = categoryOptions;
    if (refs.portfolioCategory) refs.portfolioCategory.innerHTML = portfolioOptions;

    refs.adminCategoryFilter.innerHTML = `
      <option value="all">${escapeHtml(t('admin.filterAllCategories'))}</option>
      ${state.categories.map(category => `<option value="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</option>`).join('')}
    `;

    if (selectedProductCategory && state.categories.some(category => category.id === selectedProductCategory)) refs.productCategory.value = selectedProductCategory;
    if (refs.portfolioCategory && selectedPortfolioCategory && PORTFOLIO_CATEGORIES.some(category => category.id === selectedPortfolioCategory)) refs.portfolioCategory.value = selectedPortfolioCategory;
    refs.adminCategoryFilter.value = state.categories.some(category => category.id === selectedAdminCategory) || selectedAdminCategory === 'all' ? selectedAdminCategory : 'all';
  }

  function productMatchesSearch(product, term) {
    const fields = [product.nameAr, product.nameEn, product.shortDescAr, product.shortDescEn, product.fullDescAr, product.fullDescEn, getCategoryLabel(product.categoryId)];
    return fields.some(field => normalize(field).includes(term));
  }

  function renderCategoryPills() {
    if (!refs.categoryPills) return;
    refs.categoryPills.innerHTML = `
      <button class="category-pill ${state.selectedCategory === 'all' ? 'active' : ''}" data-category="all">${escapeHtml(t('products.all'))}</button>
      ${state.categories.map(category => `<button class="category-pill ${state.selectedCategory === category.id ? 'active' : ''}" data-category="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</button>`).join('')}
    `;

    if (!refs.categoryPills.dataset.bound) {
      refs.categoryPills.dataset.bound = 'true';
      refs.categoryPills.addEventListener('click', event => {
        const button = event.target.closest('[data-category]');
        if (!button) return;
        state.selectedCategory = button.dataset.category;
        renderCategoryPills();
        renderProducts();
      });
    }
  }

  function renderProducts() {
    if (!refs.productsGrid || !refs.productsEmpty) return;
    const term = normalize(state.searchTerm);
    const filtered = state.products.filter(product => {
      const categoryMatch = state.selectedCategory === 'all' || product.categoryId === state.selectedCategory;
      const searchMatch = !term || productMatchesSearch(product, term);
      return categoryMatch && searchMatch;
    });

    if (!filtered.length) {
      refs.productsGrid.innerHTML = '';
      refs.productsEmpty.classList.remove('hidden');
      if (!state.products.length) {
        refs.productsEmptyTitle.textContent = t('products.emptyTitle');
        refs.productsEmptyText.textContent = t('products.emptyText');
      } else {
        refs.productsEmptyTitle.textContent = t('products.noMatchTitle');
        refs.productsEmptyText.textContent = t('products.noMatchText');
      }
      return;
    }

    refs.productsEmpty.classList.add('hidden');
    refs.productsGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-media">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(getProductName(product))}" loading="lazy" decoding="async">
          <span class="product-badge">${escapeHtml(getCategoryLabel(product.categoryId))}</span>
        </div>
        <div class="product-body">
          <h3>${escapeHtml(getProductName(product))}</h3>
          <p>${escapeHtml(getProductShort(product))}</p>
          <div class="product-footer">
            <span class="quote-tag">${escapeHtml(t('products.quoteTag'))}</span>
            <button class="primary-outline-btn small-btn view-product" type="button" data-product-id="${product.id}">${escapeHtml(t('products.viewDetails'))}</button>
          </div>
        </div>
      </article>
    `).join('');

  }

  function renderPortfolioCategoryPills() {
    if (!refs.portfolioCategoryPills) return;
    refs.portfolioCategoryPills.innerHTML = PORTFOLIO_CATEGORIES.map(category => `
      <button class="category-pill ${state.selectedPortfolioCategory === category.id ? 'active' : ''}" data-portfolio-category="${category.id}">
        ${escapeHtml(currentText(category.nameAr, category.nameEn))}
      </button>
    `).join('');

    if (!refs.portfolioCategoryPills.dataset.bound) {
      refs.portfolioCategoryPills.dataset.bound = 'true';
      refs.portfolioCategoryPills.addEventListener('click', event => {
        const button = event.target.closest('[data-portfolio-category]');
        if (!button) return;
        state.selectedPortfolioCategory = button.dataset.portfolioCategory;
        renderPortfolioCategoryPills();
        renderPortfolio();
      });
    }
  }

  function getPortfolioItemCategoryId(item) {
    const values = [item.titleAr, item.titleEn, item.methodAr, item.methodEn];
    const matched = PORTFOLIO_CATEGORIES.find(category => {
      const aliases = PORTFOLIO_CATEGORY_ALIASES[category.id] || [category.nameAr, category.nameEn];
      return values.some(value => aliases.includes(value));
    });
    return matched?.id || null;
  }

  function renderPortfolio() {
    if (!refs.portfolioGrid || !refs.portfolioEmpty) return;

    const filtered = state.portfolio.filter(item => getPortfolioItemCategoryId(item) === state.selectedPortfolioCategory);

    if (!filtered.length) {
      refs.portfolioGrid.innerHTML = '';
      refs.portfolioEmpty.classList.remove('hidden');
      return;
    }

    refs.portfolioEmpty.classList.add('hidden');
    refs.portfolioGrid.innerHTML = filtered.map(item => `
      <article class="portfolio-card simple-portfolio-card">
        <div class="portfolio-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(getPortfolioTitle(item))}" loading="lazy" decoding="async">
        </div>
      </article>
    `).join('');
  }

  const SERVICE_CATEGORIES = [
    { id: 'prints', nameAr: 'المطبوعات', nameEn: 'Prints' },
    { id: 'gifts', nameAr: 'الهدايا', nameEn: 'Giveaway' },
    { id: 'stands', nameAr: 'ستاندات المعارض', nameEn: 'Exhibition stands' }
  ];

  const SERVICE_CATEGORY_DETAILS = {
    prints: {
      descriptionAr: 'مطبوعات بتفاصيل دقيقة وتشطيبات أنيقة تمنح كل نقطة تواصل مع عميلك حضورًا يليق بهوية علامتك.',
      descriptionEn: 'Precise printed pieces with refined finishes that make every brand touchpoint feel considered and unmistakably yours.',
      tagsAr: ['هوية بصرية', 'تشطيبات فاخرة', 'تنفيذ متكامل'],
      tagsEn: ['Brand identity', 'Premium finishes', 'End-to-end'],
      fallback: [
        'https://images.pexels.com/photos/5706020/pexels-photo-5706020.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720',
        'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720',
        'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720'
      ]
    },
    gifts: {
      descriptionAr: 'هدايا دعائية مخصصة تُحكى بها قصة البراند، من القطعة الأولى وحتى التغليف واللمسة الأخيرة.',
      descriptionEn: 'Thoughtful promotional gifts that tell your brand story, from the first piece to the packaging and final detail.',
      tagsAr: ['هدايا مخصصة', 'تغليف أنيق', 'لمسة شخصية'],
      tagsEn: ['Custom gifts', 'Elegant packaging', 'Personal touch'],
      fallback: [
        'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720',
        'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720',
        'https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720'
      ]
    },
    stands: {
      descriptionAr: 'ستاندات وتجهيزات معارض مصممة لتجذب الانتباه، تنظم الرسالة، وتحوّل المساحة إلى تجربة للزائر.',
      descriptionEn: 'Exhibition stands designed to attract attention, clarify your message, and turn physical space into an experience.',
      tagsAr: ['تصميم ثلاثي الأبعاد', 'تركيب احترافي', 'حضور قوي'],
      tagsEn: ['3D design', 'Professional setup', 'Strong presence'],
      fallback: [
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720',
        'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=720'
      ]
    }
  };

  function getServiceCategoryLabel(categoryId) {
    const category = SERVICE_CATEGORIES.find(item => item.id === categoryId);
    return category ? currentText(category.nameAr, category.nameEn) : categoryId;
  }

  function getServiceCategoryDetails(categoryId) {
    return SERVICE_CATEGORY_DETAILS[categoryId] || SERVICE_CATEGORY_DETAILS.prints;
  }

  function populateServiceCategorySelect() {
    if (!refs.serviceCategory) return;
    const current = refs.serviceCategory.value;
    refs.serviceCategory.innerHTML = SERVICE_CATEGORIES.map(category => `
      <option value="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</option>
    `).join('');
    if (current && SERVICE_CATEGORIES.some(category => category.id === current)) {
      refs.serviceCategory.value = current;
    }
  }

  function getServiceCoverImage(categoryId) {
    const explicitCover = state.serviceCovers[categoryId];
    if (explicitCover) return explicitCover;
    const firstItem = state.services.find(item => item.category === categoryId);
    return firstItem ? firstItem.image : getServiceCategoryDetails(categoryId).fallback[0];
  }

  function renderServiceCategories() {
    if (!refs.servicesCategoriesGrid) return;
    refs.servicesCategoriesGrid.innerHTML = SERVICE_CATEGORIES.map(category => {
      const cover = getServiceCoverImage(category.id);
      const label = escapeHtml(currentText(category.nameAr, category.nameEn));
      const details = getServiceCategoryDetails(category.id);
      const description = escapeHtml(currentText(details.descriptionAr, details.descriptionEn));
      return `
        <article class="service-category-card" data-service-category="${category.id}" role="button" tabindex="0" aria-label="${label}">
          <div class="service-category-media">
            <img src="${escapeHtml(cover)}" alt="${label}" loading="lazy" decoding="async">
            <span class="service-category-number">${String(SERVICE_CATEGORIES.indexOf(category) + 1).padStart(2, '0')}</span>
            <span class="service-category-arrow"><i class="fa-solid fa-arrow-left"></i></span>
          </div>
          <div class="service-category-content">
            <div class="service-category-name">${label}</div>
            <p>${description}</p>
            <span class="service-category-link">${escapeHtml(state.language === 'ar' ? 'استكشف المجموعة' : 'Explore collection')} <i class="fa-solid fa-arrow-left"></i></span>
          </div>
        </article>
      `;
    }).join('');

    if (!refs.servicesCategoriesGrid.dataset.bound) {
      refs.servicesCategoriesGrid.dataset.bound = 'true';
      refs.servicesCategoriesGrid.addEventListener('click', event => {
        const card = event.target.closest('[data-service-category]');
        if (!card) return;
        openServicesGallery(card.dataset.serviceCategory);
      });
      refs.servicesCategoriesGrid.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const card = event.target.closest('[data-service-category]');
        if (!card) return;
        event.preventDefault();
        openServicesGallery(card.dataset.serviceCategory);
      });
    }
  }

  function renderServicesGallery() {
    if (!refs.servicesGalleryGrid || !refs.servicesGalleryEmpty || !state.activeGalleryCategory) return;
    const filtered = state.services.filter(item => item.category === state.activeGalleryCategory);
    const categoryDetails = getServiceCategoryDetails(state.activeGalleryCategory);
    const fallbackImages = categoryDetails.fallback || [];

    if (refs.servicesGalleryTitle) {
      refs.servicesGalleryTitle.textContent = getServiceCategoryLabel(state.activeGalleryCategory);
    }
    if (refs.servicesGalleryDescription) {
      refs.servicesGalleryDescription.textContent = currentText(categoryDetails.descriptionAr, categoryDetails.descriptionEn);
    }
    if (refs.servicesGalleryIndex) {
      const index = SERVICE_CATEGORIES.findIndex(item => item.id === state.activeGalleryCategory) + 1;
      refs.servicesGalleryIndex.textContent = String(Math.max(index, 1)).padStart(2, '0');
    }
    if (refs.servicesGalleryTags) {
      const tags = currentText(categoryDetails.tagsAr, categoryDetails.tagsEn);
      refs.servicesGalleryTags.innerHTML = tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
    }

    if (!filtered.length) {
      refs.servicesGalleryEmpty.classList.add('hidden');
      refs.servicesGalleryGrid.innerHTML = fallbackImages.map((image, index) => `
        <article class="service-gallery-card service-gallery-card-fallback" tabindex="-1">
          <div class="service-gallery-media">
            <img src="${escapeHtml(image)}" alt="${escapeHtml(getServiceCategoryLabel(state.activeGalleryCategory))}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
            <span>${String(index + 1).padStart(2, '0')}</span>
          </div>
          <div class="service-gallery-caption">
            <strong>${escapeHtml(currentText('لمسة من المجموعة', 'A glimpse of the collection'))}</strong>
            <small>${escapeHtml(getServiceCategoryLabel(state.activeGalleryCategory))}</small>
          </div>
        </article>
      `).join('');
      return;
    }

    refs.servicesGalleryEmpty.classList.add('hidden');
    refs.servicesGalleryGrid.innerHTML = filtered.map(item => `
      <article class="service-gallery-card" tabindex="-1">
        <div class="service-gallery-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" decoding="async">
          <span>${escapeHtml(getServiceCategoryLabel(state.activeGalleryCategory))}</span>
        </div>
        <div class="service-gallery-caption">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(currentText('تنفيذ مخصص من Kaizen', 'Custom work by Kaizen'))}</small>
        </div>
      </article>
    `).join('');
  }

  function openServicesGallery(categoryId) {
    state.activeGalleryCategory = categoryId;
    renderServicesGallery();
    openModal(refs.servicesGalleryModal);
    requestAnimationFrame(() => refs.servicesGalleryGrid?.querySelector('.service-gallery-card')?.focus?.());
  }

  function renderClients() {
    if (!refs.clientsGrid || !refs.clientsEmpty) return;
    if (!state.clientLogos.length) {
      refs.clientsGrid.innerHTML = '';
      refs.clientsEmpty.classList.remove('hidden');
      return;
    }

    refs.clientsEmpty.classList.add('hidden');
    refs.clientsGrid.innerHTML = state.clientLogos.map(item => `
      <article class="client-logo-card">
        <img src="${escapeHtml(item.image)}" alt="Client logo" loading="lazy" decoding="async">
      </article>
    `).join('');
  }

  function renderAdminProducts() {
    if (!refs.adminProductsBody || !refs.adminProductsEmpty) return;
    const searchValue = normalize(refs.adminProductSearch?.value || '');
    const categoryValue = refs.adminCategoryFilter?.value || 'all';
    const filtered = state.products.filter(product => {
      const categoryMatch = categoryValue === 'all' || product.categoryId === categoryValue;
      const searchMatch = !searchValue || productMatchesSearch(product, searchValue);
      return categoryMatch && searchMatch;
    });

    if (!filtered.length) {
      refs.adminProductsBody.innerHTML = '';
      refs.adminProductsEmpty.classList.remove('hidden');
      return;
    }

    refs.adminProductsEmpty.classList.add('hidden');
    refs.adminProductsBody.innerHTML = filtered.map(product => `
      <tr>
        <td><img class="admin-thumb" src="${escapeHtml(product.image)}" alt="${escapeHtml(getProductName(product))}"></td>
        <td>${escapeHtml(getProductName(product))}</td>
        <td>${escapeHtml(getCategoryLabel(product.categoryId))}</td>
        <td><div class="admin-method-tags">${product.methods.map(method => `<span>${escapeHtml(getMethodLabel(method))}</span>`).join('')}</div></td>
        <td>
          <div class="table-actions">
            <button class="icon-btn edit edit-product" type="button" data-id="${product.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="icon-btn delete delete-product" type="button" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

  }

  function renderAdminCategories() {
    if (!refs.adminCategoriesBody) return;
    refs.adminCategoriesBody.innerHTML = state.categories.map(category => `
      <tr>
        <td>${escapeHtml(category.nameAr)} / ${escapeHtml(category.nameEn)}</td>
        <td>
          <div class="table-actions">
            ${category.id !== 'other' ? `<button class="icon-btn delete delete-category" type="button" data-id="${category.id}"><i class="fa-solid fa-trash"></i></button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');

  }

  function renderAdminPortfolio() {
    if (!refs.adminPortfolioGrid || !refs.adminPortfolioEmpty) return;
    if (!state.portfolio.length) {
      refs.adminPortfolioGrid.innerHTML = '';
      refs.adminPortfolioEmpty.classList.remove('hidden');
      return;
    }

    refs.adminPortfolioEmpty.classList.add('hidden');
    refs.adminPortfolioGrid.innerHTML = state.portfolio.map(item => `
      <article class="admin-portfolio-card">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(getPortfolioTitle(item))}">
        <div class="admin-portfolio-body">
          <h3>${escapeHtml(getPortfolioTitle(item))}</h3>
        </div>
        <div class="admin-portfolio-actions">
          <button class="ghost-btn small-btn edit-portfolio" type="button" data-id="${item.id}"><i class="fa-solid fa-pen"></i>${escapeHtml(t('common.edit'))}</button>
          <button class="danger-btn small-btn delete-portfolio" type="button" data-id="${item.id}"><i class="fa-solid fa-trash"></i>${escapeHtml(t('common.delete'))}</button>
        </div>
      </article>
    `).join('');

  }

  function renderAdminServiceCovers() {
    if (!refs.adminServiceCoversGrid) return;
    refs.adminServiceCoversGrid.innerHTML = SERVICE_CATEGORIES.map(category => {
      const cover = state.serviceCovers[category.id] || '';
      const label = escapeHtml(currentText(category.nameAr, category.nameEn));
      return `
        <article class="admin-cover-card">
          <div class="admin-cover-media">
            ${cover ? `<img src="${escapeHtml(cover)}" alt="${label}">` : '<i class="fa-regular fa-image admin-cover-placeholder"></i>'}
          </div>
          <div class="admin-cover-body">
            <h4>${label}</h4>
            <label class="ghost-btn small-btn admin-cover-upload-label">
              <i class="fa-solid fa-upload"></i>
              <span>${escapeHtml(t('admin.changeCover'))}</span>
              <input type="file" accept="image/*" data-cover-category="${category.id}">
            </label>
          </div>
        </article>
      `;
    }).join('');

    if (!refs.adminServiceCoversGrid.dataset.bound) {
      refs.adminServiceCoversGrid.dataset.bound = 'true';
      refs.adminServiceCoversGrid.addEventListener('change', event => {
        const input = event.target.closest('[data-cover-category]');
        if (!input) return;
        const file = input.files?.[0];
        if (!file) return;
        const categoryId = input.dataset.coverCategory;
        input.value = '';
        saveServiceCover(categoryId, file).catch(error => {
          console.error(error);
          showToast('error', t('messages.genericSaveError'), error?.message || t('messages.genericSaveError'));
        });
      });
    }
  }

  function renderAdminServices() {
    if (!refs.adminServicesGrid || !refs.adminServicesEmpty) return;
    if (!state.services.length) {
      refs.adminServicesGrid.innerHTML = '';
      refs.adminServicesEmpty.classList.remove('hidden');
      return;
    }

    refs.adminServicesEmpty.classList.add('hidden');
    refs.adminServicesGrid.innerHTML = state.services.map(item => `
      <article class="admin-portfolio-card">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
        <div class="admin-portfolio-body">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(getServiceCategoryLabel(item.category))}</p>
        </div>
        <div class="admin-portfolio-actions">
          <button class="ghost-btn small-btn edit-service" type="button" data-id="${item.id}"><i class="fa-solid fa-pen"></i>${escapeHtml(t('common.edit'))}</button>
          <button class="danger-btn small-btn delete-service" type="button" data-id="${item.id}"><i class="fa-solid fa-trash"></i>${escapeHtml(t('common.delete'))}</button>
        </div>
      </article>
    `).join('');
  }

  function renderAdminClients() {
    if (!refs.adminClientsGrid || !refs.adminClientsEmpty) return;
    if (!state.clientLogos.length) {
      refs.adminClientsGrid.innerHTML = '';
      refs.adminClientsEmpty.classList.remove('hidden');
      return;
    }

    refs.adminClientsEmpty.classList.add('hidden');
    refs.adminClientsGrid.innerHTML = state.clientLogos.map(item => `
      <article class="admin-portfolio-card">
        <img src="${escapeHtml(item.image)}" alt="Client logo">
        <div class="admin-portfolio-actions">
          <button class="ghost-btn small-btn edit-client" type="button" data-id="${item.id}"><i class="fa-solid fa-pen"></i>${escapeHtml(t('common.edit'))}</button>
          <button class="danger-btn small-btn delete-client" type="button" data-id="${item.id}"><i class="fa-solid fa-trash"></i>${escapeHtml(t('common.delete'))}</button>
        </div>
      </article>
    `).join('');
  }

  function renderAdminUsers() {
    if (!refs.adminUsersBody || !refs.adminUsersEmpty) return;
    if (!state.users.length) {
      refs.adminUsersBody.innerHTML = '';
      refs.adminUsersEmpty.classList.remove('hidden');
      return;
    }

    refs.adminUsersEmpty.classList.add('hidden');
    refs.adminUsersBody.innerHTML = state.users.map(user => `
      <tr>
        <td>${escapeHtml(user.full_name || '-')}</td>
        <td>${escapeHtml(user.phone || '-')}</td>
        <td>${escapeHtml(user.password_text || '-')}</td>
        <td>${escapeHtml(user.id || '-')}</td>
        <td>${escapeHtml(formatDate(user.created_at))}</td>
      </tr>
    `).join('');
  }

  function renderAdminOrders() {
    if (!refs.adminOrdersBody || !refs.adminOrdersEmpty) return;
    if (!state.orders.length) {
      refs.adminOrdersBody.innerHTML = '';
      refs.adminOrdersEmpty.classList.remove('hidden');
      return;
    }

    refs.adminOrdersEmpty.classList.add('hidden');
    refs.adminOrdersBody.innerHTML = state.orders.map(order => `
      <tr>
        <td>${escapeHtml(order.customer_name || '-')}</td>
        <td>${escapeHtml(order.phone || '-')}</td>
        <td>${escapeHtml(currentText(order.product_name_ar, order.product_name_en) || '-')}</td>
        <td>${escapeHtml(order.request_type === 'order' ? t('quote.orderType') : t('quote.quoteType'))}</td>
        <td>${escapeHtml(String(order.quantity || '-'))}</td>
        <td>${escapeHtml(order.printing_type || t('quote.noMethod'))}</td>
        <td>${escapeHtml(formatDate(order.created_at))}</td>
      </tr>
    `).join('');
  }

  function openProductDetails(productId) {
    const product = state.products.find(item => item.id === productId);
    if (!product) return;
    state.currentProductId = productId;
    refs.detailsImage.src = product.image;
    refs.detailsImage.alt = getProductName(product);
    refs.detailsProjectImage.src = product.projectImage;
    refs.detailsProjectImage.alt = getProductName(product);
    refs.detailsProjectDescription.textContent = getProductProjectDescription(product);
    refs.detailsCategory.textContent = getCategoryLabel(product.categoryId);
    refs.detailsTitle.textContent = getProductName(product);
    refs.detailsDescription.textContent = getProductFull(product);
    refs.detailsMethods.innerHTML = product.methods.map(method => `<span>${escapeHtml(getMethodLabel(method))}</span>`).join('');
    openModal(refs.detailsModal);
  }

  function prepareQuoteModal(productId, mode = 'quote') {
    const product = state.products.find(item => item.id === productId);
    if (!product) return;
    state.currentProductId = productId;
    state.currentRequestMode = mode;
    refs.quoteProduct.value = getProductName(product);
    refs.quotePrintingType.innerHTML = `
      <option value="">${escapeHtml(t('quote.selectMethod'))}</option>
      ${product.methods.map(methodId => `<option value="${escapeHtml(getMethodLabel(methodId))}">${escapeHtml(getMethodLabel(methodId))}</option>`).join('')}
    `;
    refs.quoteCustomerName.value = state.currentCustomer?.full_name || '';
    refs.quotePhone.value = state.currentCustomer?.phone || '';

    if (mode === 'order') {
      refs.quoteModalTitle.textContent = t('quote.orderTitle');
      refs.quoteModalSubtitle.textContent = t('quote.orderSubtitle');
      refs.quoteSubmitLabel.textContent = t('quote.orderSubmit');
    } else {
      refs.quoteModalTitle.textContent = t('quote.title');
      refs.quoteModalSubtitle.textContent = t('quote.subtitle');
      refs.quoteSubmitLabel.textContent = t('quote.submit');
    }

    openModal(refs.quoteModal);
  }

  function mapCategoryRow(row) {
    return { id: row.id, nameAr: row.name_ar, nameEn: row.name_en, createdAt: row.created_at };
  }

  function mapMethodRow(row) {
    return { id: row.id, nameAr: row.name_ar, nameEn: row.name_en, createdAt: row.created_at };
  }

  function mapProductRow(row) {
    return {
      id: row.id,
      categoryId: row.category_id,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      shortDescAr: row.short_desc_ar,
      shortDescEn: row.short_desc_en,
      fullDescAr: row.full_desc_ar,
      fullDescEn: row.full_desc_en,
      image: row.image,
      methods: Array.isArray(row.methods) ? row.methods : [],
      projectImage: row.project_image,
      projectDescAr: row.project_desc_ar,
      projectDescEn: row.project_desc_en,
      createdAt: row.created_at
    };
  }

  function mapPortfolioRow(row) {
    return {
      id: row.id,
      titleAr: row.title_ar,
      titleEn: row.title_en,
      methodAr: row.method_ar,
      methodEn: row.method_en,
      image: row.image,
      descriptionAr: row.description_ar,
      descriptionEn: row.description_en,
      createdAt: row.created_at
    };
  }

  function mapClientLogoRow(row) {
    return {
      id: row.id,
      image: row.image,
      createdAt: row.created_at
    };
  }

  function mapServiceRow(row) {
    return {
      id: row.id,
      category: row.category,
      image: row.image,
      name: row.name,
      createdAt: row.created_at
    };
  }

  function mapServiceCoverRow(row) {
    return { id: row.id, image: row.image };
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadFileToStorage(file, folder) {
    if (!file) return null;

    if (!supabaseClient) {
      return await fileToDataUrl(file);
    }

    const safeName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '');
    const filePath = `${folder}/${Date.now()}-${safeName}`;
    const { error } = await supabaseClient.storage.from(MEDIA_BUCKET).upload(filePath, file, { upsert: true });

    if (error) {
      console.warn('Storage upload failed, falling back to base64 image storage:', error.message);
      return await fileToDataUrl(file);
    }

    const { data } = supabaseClient.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);
    return data?.publicUrl || await fileToDataUrl(file);
  }

  async function safeSelect(tableName, mapper, fallback = []) {
    if (!supabaseClient) return fallback;
    const { data, error } = await supabaseClient.from(tableName).select('*');
    if (error) {
      showSupabaseWarning(error);
      return fallback;
    }
    return Array.isArray(data) ? data.map(mapper) : fallback;
  }

  async function loadPrintingMethods() {
    const methods = await safeSelect('printing_methods', mapMethodRow, DEFAULT_PRINTING_METHODS);
    state.printingMethods = methods.length ? methods : DEFAULT_PRINTING_METHODS;
    buildPrintingMethodCheckboxes(getSelectedMethodsFromForm());
    if (isAdminVisible()) renderAdminProducts();
  }

  function schedulePublicReload() {
    if (publicReloadTimer) clearTimeout(publicReloadTimer);
    publicReloadTimer = setTimeout(() => {
      if (publicReloadInFlight) {
        schedulePublicReload();
        return;
      }
      loadPublicCollections();
    }, 180);
  }

  async function loadPublicCollections() {
    if (publicReloadInFlight) {
      schedulePublicReload();
      return;
    }
    publicReloadInFlight = true;
    try {
      const [categories, products, portfolio, clientLogos, services, serviceCoverRows] = await Promise.all([
        safeSelect('categories', mapCategoryRow, DEFAULT_CATEGORIES),
        safeSelect('products', mapProductRow, DEFAULT_PRODUCTS),
        safeSelect('portfolio_items', mapPortfolioRow, DEFAULT_PORTFOLIO),
        safeSelect('client_logos', mapClientLogoRow, []),
        safeSelect('services_items', mapServiceRow, []),
        safeSelect('service_categories', mapServiceCoverRow, [])
      ]);

      state.categories = categories.length ? categories : DEFAULT_CATEGORIES;
      if (!state.categories.some(item => item.id === 'other')) state.categories.push({ id: 'other', nameAr: 'أخرى', nameEn: 'Other' });
      state.products = products;
      state.portfolio = portfolio;
      state.clientLogos = clientLogos;
      state.services = services;
      state.serviceCovers = serviceCoverRows.reduce((acc, row) => {
        if (row.image) acc[row.id] = row.image;
        return acc;
      }, {});
      populateCategorySelects();
      renderStorefront();
      if (isAdminVisible()) {
        renderAdminProducts();
        renderAdminCategories();
        renderAdminPortfolio();
        renderAdminServiceCovers();
        renderAdminServices();
        renderAdminClients();
      }
    } finally {
      publicReloadInFlight = false;
    }
  }

  async function loadUsersAndOrders() {
    if (!supabaseClient) return;
    const [usersResponse, ordersResponse] = await Promise.all([
      supabaseClient.from('customer_accounts').select('*').order('created_at', { ascending: false }),
      supabaseClient.from('orders').select('*').order('created_at', { ascending: false })
    ]);

    state.users = usersResponse.error ? [] : (usersResponse.data || []);
    state.orders = ordersResponse.error ? [] : (ordersResponse.data || []);
    if (usersResponse.error) showSupabaseWarning(usersResponse.error);
    if (ordersResponse.error) showSupabaseWarning(ordersResponse.error);
    renderAdminUsers();
    renderAdminOrders();
  }

  function saveCustomerSession(customer) {
    state.currentCustomer = customer;
    localStorage.setItem(STORAGE_KEYS.customerSession, JSON.stringify(customer));
    updateAuthUI();
  }

  function clearCustomerSession() {
    state.currentCustomer = null;
    localStorage.removeItem(STORAGE_KEYS.customerSession);
    updateAuthUI();
  }

  async function initializeCustomerSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.customerSession);
    if (!raw || !supabaseClient) {
      updateAuthUI();
      return;
    }
    try {
      const saved = JSON.parse(raw);
      if (!saved?.id) {
        clearCustomerSession();
        return;
      }
      const { data, error } = await supabaseClient.from('customer_accounts').select('*').eq('id', saved.id).maybeSingle();
      if (error || !data) {
        clearCustomerSession();
        return;
      }
      state.currentCustomer = data;
      updateAuthUI();
    } catch {
      clearCustomerSession();
    }
  }

  function initializeRealtime() {
    if (!supabaseClient) return;
    if (state.realtimeChannel) supabaseClient.removeChannel(state.realtimeChannel);

    state.realtimeChannel = supabaseClient
      .channel('kgroup-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, schedulePublicReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
        schedulePublicReload();
        if (!refs.detailsModal.classList.contains('hidden') && state.currentProductId) {
          setTimeout(() => openProductDetails(state.currentProductId), 220);
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_items' }, schedulePublicReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_logos' }, schedulePublicReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services_items' }, schedulePublicReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'service_categories' }, schedulePublicReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'printing_methods' }, loadPrintingMethods)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'customer_accounts' }, () => {
        if (isAdminVisible()) loadUsersAndOrders();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        if (isAdminVisible()) loadUsersAndOrders();
      })
      .subscribe();
  }

  async function addPrintingMethod() {
    if (!supabaseClient) return;
    const nameAr = refs.newPrintingMethodAr.value.trim();
    const nameEn = refs.newPrintingMethodEn.value.trim();
    if (!nameAr || !nameEn) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }
    const id = slugify(nameEn) || slugify(nameAr) || `method-${Date.now()}`;
    const exists = state.printingMethods.some(method => method.id === id || normalize(method.nameAr) === normalize(nameAr) || normalize(method.nameEn) === normalize(nameEn));
    if (exists) {
      showToast('info', t('messages.duplicateMethodTitle'), t('messages.duplicateMethodText'));
      return;
    }

    const { error } = await supabaseClient.from('printing_methods').upsert({ id, name_ar: nameAr, name_en: nameEn }, { onConflict: 'id' });
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const selected = getSelectedMethodsFromForm();
    if (!selected.includes(id)) selected.push(id);
    refs.newPrintingMethodAr.value = '';
    refs.newPrintingMethodEn.value = '';
    await loadPrintingMethods();
    buildPrintingMethodCheckboxes(selected);
    showToast('success', t('messages.methodAddedTitle'), t('messages.methodAddedText'));
  }

  async function signUpUser(name, phone, password) {
    if (!supabaseClient) return;
    const normalizedPhone = normalizePhone(phone);
    if (!isValidEgyptPhone(normalizedPhone)) {
      showToast('error', t('messages.invalidPhoneTitle'), t('messages.invalidPhoneText'));
      return;
    }

    const { data: existing, error: existingError } = await supabaseClient.from('customer_accounts').select('*').eq('phone', normalizedPhone).maybeSingle();
    if (existingError) {
      showToast('error', t('messages.authErrorTitle'), existingError.message || t('messages.authErrorText'));
      return;
    }
    if (existing) {
      showToast('error', t('auth.signup'), t('auth.duplicatePhone'));
      return;
    }

    const { data, error } = await supabaseClient.from('customer_accounts').insert({
      id: crypto.randomUUID(),
      full_name: name,
      phone: normalizedPhone,
      password_text: password
    }).select().single();

    if (error) {
      showToast('error', t('messages.authErrorTitle'), error.message || t('messages.authErrorText'));
      return;
    }

    saveCustomerSession(data);
    refs.signupForm.reset();
    closeModal(refs.signupModal);
    await loadUsersAndOrders();
    showToast('success', t('auth.signup'), t('auth.accountCreated'));
  }

  async function signInUser(phone, password) {
    if (!supabaseClient) return;
    const normalizedPhone = normalizePhone(phone);
    if (!isValidEgyptPhone(normalizedPhone)) {
      showToast('error', t('messages.invalidPhoneTitle'), t('messages.invalidPhoneText'));
      return;
    }

    const { data, error } = await supabaseClient.from('customer_accounts').select('*').eq('phone', normalizedPhone).eq('password_text', password).maybeSingle();
    if (error) {
      showToast('error', t('messages.authErrorTitle'), error.message || t('messages.authErrorText'));
      return;
    }
    if (!data) {
      showToast('error', t('messages.authErrorTitle'), t('login.error'));
      return;
    }

    saveCustomerSession(data);
    refs.userLoginForm.reset();
    closeModal(refs.userLoginModal);
    showToast('success', t('auth.login'), t('auth.loggedIn'));
  }

  function signOutCustomer() {
    clearCustomerSession();
    showToast('info', t('auth.logout'), t('auth.loggedOut'));
  }

  async function deleteProduct(productId) {
    const { error } = await supabaseClient.from('products').delete().eq('id', productId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.products = state.products.filter(item => item.id !== productId);
    renderProducts();
    renderAdminProducts();
    showToast('success', t('messages.productDeletedTitle'), t('messages.productDeletedText'));
  }

  async function deleteCategory(categoryId) {
    state.products = state.products.map(product => product.categoryId === categoryId ? { ...product, categoryId: 'other' } : product);
    for (const product of state.products.filter(item => item.categoryId === 'other')) {
      await supabaseClient.from('products').upsert({
        id: product.id,
        category_id: product.categoryId,
        name_ar: product.nameAr,
        name_en: product.nameEn,
        short_desc_ar: product.shortDescAr,
        short_desc_en: product.shortDescEn,
        full_desc_ar: product.fullDescAr,
        full_desc_en: product.fullDescEn,
        image: product.image,
        methods: product.methods,
        project_image: product.projectImage,
        project_desc_ar: product.projectDescAr,
        project_desc_en: product.projectDescEn
      }, { onConflict: 'id' });
    }
    const { error } = await supabaseClient.from('categories').delete().eq('id', categoryId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.categories = state.categories.filter(item => item.id !== categoryId);
    if (!state.categories.some(item => item.id === 'other')) state.categories.push({ id: 'other', nameAr: 'أخرى', nameEn: 'Other' });
    if (state.selectedCategory === categoryId) state.selectedCategory = 'all';
    populateCategorySelects();
    renderCategoryPills();
    renderProducts();
    renderAdminProducts();
    renderAdminCategories();
    showToast('success', t('messages.categoryDeletedTitle'), t('messages.categoryDeletedText'));
  }

  async function deletePortfolio(portfolioId) {
    const { error } = await supabaseClient.from('portfolio_items').delete().eq('id', portfolioId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.portfolio = state.portfolio.filter(item => item.id !== portfolioId);
    renderPortfolio();
    renderAdminPortfolio();
    showToast('success', t('messages.portfolioDeletedTitle'), t('messages.portfolioDeletedText'));
  }

  async function saveProductFromForm() {
    const methods = getSelectedMethodsFromForm();
    if (!methods.length) {
      showToast('error', t('messages.methodsRequiredTitle'), t('messages.methodsRequiredText'));
      return;
    }

    let mainImageUrl = refs.productImage.value.trim();
    let projectImageUrl = refs.productPortfolioImage.value.trim();
    const mainFile = refs.productImageFile.files?.[0] || null;
    const projectFile = refs.productPortfolioImageFile.files?.[0] || null;

    if (mainFile) {
      const uploaded = await uploadFileToStorage(mainFile, 'products/main');
      if (!uploaded) return;
      mainImageUrl = uploaded;
    }
    if (projectFile) {
      const uploaded = await uploadFileToStorage(projectFile, 'products/projects');
      if (!uploaded) return;
      projectImageUrl = uploaded;
    }

    const payload = {
      id: refs.productId.value || `prod-${Date.now()}`,
      categoryId: refs.productCategory.value,
      nameAr: refs.productNameAr.value.trim(),
      nameEn: refs.productNameEn.value.trim(),
      shortDescAr: refs.productShortAr.value.trim(),
      shortDescEn: refs.productShortEn.value.trim(),
      fullDescAr: refs.productFullAr.value.trim(),
      fullDescEn: refs.productFullEn.value.trim(),
      image: mainImageUrl,
      methods,
      projectImage: projectImageUrl,
      projectDescAr: refs.productPortfolioDescAr.value.trim(),
      projectDescEn: refs.productPortfolioDescEn.value.trim()
    };

    if (!payload.nameAr || !payload.nameEn || !payload.categoryId || !payload.image || !payload.projectImage) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }

    const { error } = await supabaseClient.from('products').upsert({
      id: payload.id,
      category_id: payload.categoryId,
      name_ar: payload.nameAr,
      name_en: payload.nameEn,
      short_desc_ar: payload.shortDescAr,
      short_desc_en: payload.shortDescEn,
      full_desc_ar: payload.fullDescAr,
      full_desc_en: payload.fullDescEn,
      image: payload.image,
      methods: payload.methods,
      project_image: payload.projectImage,
      project_desc_ar: payload.projectDescAr,
      project_desc_en: payload.projectDescEn
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const isEditing = Boolean(refs.productId.value);
    const existingIndex = state.products.findIndex(product => product.id === payload.id);
    if (existingIndex >= 0) state.products[existingIndex] = payload;
    else state.products.push(payload);

    closeModal(refs.productModal);
    renderProducts();
    renderAdminProducts();
    showToast('success', isEditing ? t('messages.productUpdatedTitle') : t('messages.productAddedTitle'), isEditing ? t('messages.productUpdatedText') : t('messages.productAddedText'));
  }

  async function saveCategoryFromForm() {
    const nameAr = refs.categoryNameAr.value.trim();
    const nameEn = refs.categoryNameEn.value.trim();
    if (!nameAr || !nameEn) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }
    const exists = state.categories.some(category => normalize(category.nameAr) === normalize(nameAr) || normalize(category.nameEn) === normalize(nameEn));
    if (exists) {
      showToast('info', t('messages.duplicateCategoryTitle'), t('messages.duplicateCategoryText'));
      return;
    }

    const payload = { id: `${slugify(nameEn)}-${Date.now()}`, nameAr, nameEn };
    const { error } = await supabaseClient.from('categories').upsert({ id: payload.id, name_ar: payload.nameAr, name_en: payload.nameEn }, { onConflict: 'id' });
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    state.categories.push(payload);
    refs.categoryForm.reset();
    populateCategorySelects();
    renderCategoryPills();
    renderAdminCategories();
    renderAdminProducts();
    showToast('success', t('messages.categoryAddedTitle'), t('messages.categoryAddedText'));
  }

  async function savePortfolioFromForm() {
    let imageUrl = refs.portfolioImage.value.trim();
    const file = refs.portfolioImageFile.files?.[0] || null;
    if (file) {
      const uploaded = await uploadFileToStorage(file, 'portfolio');
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const selectedCategory = getPortfolioCategoryById(refs.portfolioCategory.value);
    const selectedPortfolioCategoryId = refs.portfolioCategory.value;
    const payload = {
      id: refs.portfolioId.value || `port-${Date.now()}`,
      titleAr: selectedCategory?.nameAr || '',
      titleEn: selectedCategory?.nameEn || '',
      methodAr: selectedCategory?.nameAr || '',
      methodEn: selectedCategory?.nameEn || '',
      image: imageUrl,
      descriptionAr: '',
      descriptionEn: ''
    };

    if (!payload.titleAr || !payload.titleEn || !payload.image) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }

    const { error } = await supabaseClient.from('portfolio_items').upsert({
      id: payload.id,
      title_ar: payload.titleAr,
      title_en: payload.titleEn,
      method_ar: payload.methodAr,
      method_en: payload.methodEn,
      image: payload.image,
      description_ar: payload.descriptionAr,
      description_en: payload.descriptionEn
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const isEditing = Boolean(refs.portfolioId.value);
    const existingIndex = state.portfolio.findIndex(item => item.id === payload.id);
    if (existingIndex >= 0) state.portfolio[existingIndex] = payload;
    else state.portfolio.push(payload);

    state.selectedPortfolioCategory = selectedPortfolioCategoryId;
    closeModal(refs.portfolioModal);
    renderPortfolioCategoryPills();
    renderPortfolio();
    renderAdminPortfolio();
    showToast('success', isEditing ? t('messages.portfolioUpdatedTitle') : t('messages.portfolioAddedTitle'), isEditing ? t('messages.portfolioUpdatedText') : t('messages.portfolioAddedText'));
  }

  async function saveClientLogoFromForm() {
    let imageUrl = refs.clientLogoImage.value.trim();
    const file = refs.clientLogoImageFile.files?.[0] || null;
    if (file) {
      const uploaded = await uploadFileToStorage(file, 'clients');
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const payload = {
      id: refs.clientLogoId.value || crypto.randomUUID(),
      image: imageUrl
    };

    if (!payload.image) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }

    const { error } = await supabaseClient.from('client_logos').upsert({
      id: payload.id,
      image: payload.image
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const existingIndex = state.clientLogos.findIndex(item => item.id === payload.id);
    if (existingIndex >= 0) state.clientLogos[existingIndex] = payload;
    else state.clientLogos.push(payload);

    closeModal(refs.clientLogoModal);
    renderClients();
    renderAdminClients();
    showToast('success', t('messages.clientAddedTitle'), t('messages.clientAddedText'));
  }

  async function saveServiceFromForm() {
    let imageUrl = refs.serviceImage.value.trim();
    const file = refs.serviceImageFile.files?.[0] || null;
    if (file) {
      const uploaded = await uploadFileToStorage(file, 'services');
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const category = refs.serviceCategory.value;
    const name = refs.serviceName.value.trim();
    const payload = {
      id: refs.serviceId.value || `svc-${Date.now()}`,
      category,
      image: imageUrl,
      name
    };

    if (!payload.category || !payload.name || !payload.image) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }

    const { error } = await supabaseClient.from('services_items').upsert({
      id: payload.id,
      category: payload.category,
      image: payload.image,
      name: payload.name
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const isEditing = Boolean(refs.serviceId.value);
    const existingIndex = state.services.findIndex(item => item.id === payload.id);
    if (existingIndex >= 0) state.services[existingIndex] = payload;
    else state.services.push(payload);

    closeModal(refs.serviceModal);
    renderServiceCategories();
    if (state.activeGalleryCategory === payload.category) renderServicesGallery();
    renderAdminServices();
    renderAdminServiceCovers();
    showToast('success', isEditing ? t('messages.serviceUpdatedTitle') : t('messages.serviceAddedTitle'), isEditing ? t('messages.serviceUpdatedText') : t('messages.serviceAddedText'));
  }

  async function deleteService(serviceId) {
    const { error } = await supabaseClient.from('services_items').delete().eq('id', serviceId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    const removed = state.services.find(item => item.id === serviceId);
    state.services = state.services.filter(item => item.id !== serviceId);
    renderServiceCategories();
    if (removed && state.activeGalleryCategory === removed.category) renderServicesGallery();
    renderAdminServices();
    renderAdminServiceCovers();
    showToast('success', t('messages.serviceDeletedTitle'), t('messages.serviceDeletedText'));
  }

  async function saveServiceCover(categoryId, file) {
    if (!supabaseClient) {
      showToast('error', t('messages.genericSaveError'), t('messages.genericSaveError'));
      return;
    }

    const uploaded = await uploadFileToStorage(file, 'service-covers');
    if (!uploaded) {
      showToast('error', t('messages.genericSaveError'), t('messages.genericSaveError'));
      return;
    }

    const { error } = await supabaseClient.from('service_categories').upsert({
      id: categoryId,
      image: uploaded,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    state.serviceCovers[categoryId] = uploaded;
    renderAdminServiceCovers();
    renderServiceCategories();
    showToast('success', t('messages.serviceUpdatedTitle'), t('messages.serviceUpdatedText'));
  }

  async function deleteClientLogo(clientId) {
    const { error } = await supabaseClient.from('client_logos').delete().eq('id', clientId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.clientLogos = state.clientLogos.filter(item => item.id !== clientId);
    renderClients();
    renderAdminClients();
    showToast('success', t('messages.portfolioDeletedTitle'), t('messages.portfolioDeletedText'));
  }

  async function saveRequestFromForm() {
    const product = state.products.find(item => item.id === state.currentProductId);
    const customerName = refs.quoteCustomerName.value.trim();
    const phone = normalizePhone(refs.quotePhone.value.trim());
    const email = refs.quoteEmail.value.trim();
    const quantity = refs.quoteQuantity.value.trim();
    const printingType = refs.quotePrintingType.value || t('quote.noMethod');
    const notes = refs.quoteNotes.value.trim() || '-';
    const requestType = state.currentRequestMode;

    if (!product || !customerName || !phone || !quantity) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }
    if (!isValidEgyptPhone(phone)) {
      showToast('error', t('messages.invalidPhoneTitle'), t('messages.invalidPhoneText'));
      return;
    }
    if (requestType === 'order' && !state.currentCustomer) {
      closeModal(refs.quoteModal);
      openModal(refs.userLoginModal);
      showToast('error', t('auth.login'), t('auth.accountRequired'));
      return;
    }

    const { error } = await supabaseClient.from('orders').insert({
      id: crypto.randomUUID(),
      account_id: state.currentCustomer?.id || null,
      user_id: null,
      product_id: product.id,
      product_name_ar: product.nameAr,
      product_name_en: product.nameEn,
      customer_name: customerName,
      phone,
      email: email || null,
      quantity: Number(quantity),
      printing_type: printingType,
      notes,
      request_type: requestType,
      status: 'new'
    });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const message = [
      `*${t('quote.whatsappTitle')}*`,
      '',
      `*${t('quote.whatsappType')}:* ${requestType === 'order' ? t('quote.orderType') : t('quote.quoteType')}`,
      `*${t('quote.whatsappProduct')}:* ${getProductName(product)}`,
      `*${t('quote.whatsappCustomer')}:* ${customerName}`,
      `*${t('quote.whatsappPhone')}:* ${phone}`,
      `*${t('quote.whatsappEmail')}:* ${email || '-'}`,
      `*${t('quote.whatsappQuantity')}:* ${quantity}`,
      `*${t('quote.whatsappPrinting')}:* ${printingType}`,
      `*${t('quote.whatsappNotes')}:* ${notes}`,
      '',
      `_${t('quote.whatsappFooter')}_`
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    closeModal(refs.quoteModal);
    refs.quoteForm.reset();
    await loadUsersAndOrders();
    showToast('info', t('messages.openWhatsappTitle'), t('messages.openWhatsappText'));
    showToast('success', t('messages.orderSavedTitle'), requestType === 'order' ? t('messages.orderSavedText') : t('messages.quoteSavedText'));
    setTimeout(() => window.open(whatsappUrl, '_blank'), 300);
  }

  function resetProductForm() {
    refs.productForm.reset();
    refs.productId.value = '';
    refs.productImage.value = '';
    refs.productPortfolioImage.value = '';
    if (refs.productImageFile) refs.productImageFile.value = '';
    if (refs.productPortfolioImageFile) refs.productPortfolioImageFile.value = '';
    previewImageSource(refs.productImagePreview, null);
    previewImageSource(refs.productPortfolioImagePreview, null);
    buildPrintingMethodCheckboxes([]);
  }

  function resetPortfolioForm() {
    refs.portfolioForm.reset();
    refs.portfolioId.value = '';
    refs.portfolioImage.value = '';
    if (refs.portfolioImageFile) refs.portfolioImageFile.value = '';
    previewImageSource(refs.portfolioImagePreview, null);
  }

  function resetClientLogoForm() {
    refs.clientLogoForm.reset();
    refs.clientLogoId.value = '';
    refs.clientLogoImage.value = '';
    if (refs.clientLogoImageFile) refs.clientLogoImageFile.value = '';
    previewImageSource(refs.clientLogoImagePreview, null);
  }

  function resetServiceForm() {
    refs.serviceForm.reset();
    refs.serviceId.value = '';
    refs.serviceImage.value = '';
    if (refs.serviceImageFile) refs.serviceImageFile.value = '';
    previewImageSource(refs.serviceImagePreview, null);
    if (refs.serviceCategory) refs.serviceCategory.value = 'prints';
  }

  function openProductModal(productId = null) {
    resetProductForm();
    populateCategorySelects();

    if (productId) {
      const product = state.products.find(item => item.id === productId);
      if (!product) return;
      refs.productId.value = product.id;
      refs.productNameAr.value = product.nameAr;
      refs.productNameEn.value = product.nameEn;
      refs.productCategory.value = product.categoryId;
      refs.productImage.value = product.image;
      refs.productShortAr.value = product.shortDescAr;
      refs.productShortEn.value = product.shortDescEn;
      refs.productFullAr.value = product.fullDescAr;
      refs.productFullEn.value = product.fullDescEn;
      refs.productPortfolioImage.value = product.projectImage;
      refs.productPortfolioDescAr.value = product.projectDescAr;
      refs.productPortfolioDescEn.value = product.projectDescEn;
      previewImageSource(refs.productImagePreview, product.image);
      previewImageSource(refs.productPortfolioImagePreview, product.projectImage);
      buildPrintingMethodCheckboxes(product.methods || []);
      refs.productModalTitle.textContent = `${t('common.edit')} - ${getProductName(product)}`;
      refs.productModalSubmitLabel.textContent = t('common.update');
    } else {
      refs.productModalTitle.textContent = t('admin.addProduct');
      refs.productModalSubmitLabel.textContent = t('common.save');
    }

    openModal(refs.productModal);
  }

  function openPortfolioModal(portfolioId = null) {
    resetPortfolioForm();
    populateCategorySelects();

    if (portfolioId) {
      const item = state.portfolio.find(entry => entry.id === portfolioId);
      if (!item) return;
      refs.portfolioId.value = item.id;
      refs.portfolioTitleAr.value = item.titleAr;
      refs.portfolioTitleEn.value = item.titleEn;
      refs.portfolioMethodAr.value = item.methodAr;
      refs.portfolioMethodEn.value = item.methodEn;
      refs.portfolioDescAr.value = item.descriptionAr;
      refs.portfolioDescEn.value = item.descriptionEn;
      refs.portfolioImage.value = item.image;
      previewImageSource(refs.portfolioImagePreview, item.image);

      const matchedId = getPortfolioItemCategoryId(item);
      if (matchedId && refs.portfolioCategory) {
        refs.portfolioCategory.value = matchedId;
      }

      refs.portfolioModalTitle.textContent = `${t('common.edit')} - ${getPortfolioTitle(item)}`;
      refs.portfolioModalSubmitLabel.textContent = t('common.update');
    } else {
      refs.portfolioModalTitle.textContent = t('admin.addPortfolio');
      refs.portfolioModalSubmitLabel.textContent = t('common.save');
    }

    openModal(refs.portfolioModal);
  }

  function openClientLogoModal(clientId = null) {
    resetClientLogoForm();

    if (clientId) {
      const item = state.clientLogos.find(entry => entry.id === clientId);
      if (!item) return;
      refs.clientLogoId.value = item.id;
      refs.clientLogoImage.value = item.image;
      previewImageSource(refs.clientLogoImagePreview, item.image);
      refs.clientLogoModalTitle.textContent = t('clients.editTitle');
      refs.clientLogoSubmitLabel.textContent = t('common.update');
    } else {
      refs.clientLogoModalTitle.textContent = t('clients.modalTitle');
      refs.clientLogoSubmitLabel.textContent = t('common.save');
    }

    openModal(refs.clientLogoModal);
  }

  function openServiceAdminModal(serviceId = null) {
    populateServiceCategorySelect();
    resetServiceForm();

    if (serviceId) {
      const item = state.services.find(entry => entry.id === serviceId);
      if (!item) return;
      refs.serviceId.value = item.id;
      refs.serviceCategory.value = item.category;
      refs.serviceName.value = item.name;
      refs.serviceImage.value = item.image;
      previewImageSource(refs.serviceImagePreview, item.image);
      refs.serviceModalTitle.textContent = `${t('common.edit')} - ${item.name}`;
      refs.serviceModalSubmitLabel.textContent = t('common.update');
    } else {
      refs.serviceModalTitle.textContent = t('admin.addService');
      refs.serviceModalSubmitLabel.textContent = t('common.save');
    }

    openModal(refs.serviceModal);
  }

  window.openProductAdminModal = openProductModal;
  window.openPortfolioAdminModal = openPortfolioModal;
  window.openClientLogoModal = openClientLogoModal;
  window.openServiceAdminModal = openServiceAdminModal;
  window.submitPortfolioWorkForm = async () => {
    try {
      await savePortfolioFromForm();
    } catch (error) {
      console.error(error);
      showToast('error', t('messages.genericSaveError'), error?.message || t('messages.genericSaveError'));
    }
  };

  function bindEvents() {
    document.addEventListener('click', async event => {
      const target = event.target.closest('button, .product-card, .view-product');
      if (!target) return;

      if (target.matches('#open-add-product')) {
        event.preventDefault();
        openProductModal();
        return;
      }

      if (target.matches('#open-add-portfolio')) {
        event.preventDefault();
        openPortfolioModal();
        return;
      }

      if (target.matches('#open-add-client')) {
        event.preventDefault();
        openClientLogoModal();
        return;
      }

      if (target.matches('#open-add-service')) {
        event.preventDefault();
        openServiceAdminModal();
        return;
      }

      if (target.matches('.edit-product')) {
        event.preventDefault();
        openProductModal(target.dataset.id);
        return;
      }

      if (target.matches('.delete-product')) {
        event.preventDefault();
        showConfirm(t('messages.deleteProductConfirmTitle'), t('messages.deleteProductConfirmText'), async () => deleteProduct(target.dataset.id));
        return;
      }

      if (target.matches('.edit-portfolio')) {
        event.preventDefault();
        openPortfolioModal(target.dataset.id);
        return;
      }

      if (target.matches('.delete-portfolio')) {
        event.preventDefault();
        showConfirm(t('messages.deletePortfolioConfirmTitle'), t('messages.deletePortfolioConfirmText'), async () => deletePortfolio(target.dataset.id));
        return;
      }

      if (target.matches('.edit-client')) {
        event.preventDefault();
        openClientLogoModal(target.dataset.id);
        return;
      }

      if (target.matches('.delete-client')) {
        event.preventDefault();
        showConfirm(t('messages.deletePortfolioConfirmTitle'), t('messages.deletePortfolioConfirmText'), async () => deleteClientLogo(target.dataset.id));
        return;
      }

      if (target.matches('.edit-service')) {
        event.preventDefault();
        openServiceAdminModal(target.dataset.id);
        return;
      }

      if (target.matches('.delete-service')) {
        event.preventDefault();
        showConfirm(t('messages.deleteServiceConfirmTitle'), t('messages.deleteServiceConfirmText'), async () => deleteService(target.dataset.id));
        return;
      }

      if (target.matches('.delete-category')) {
        event.preventDefault();
        showConfirm(t('messages.deleteCategoryConfirmTitle'), t('messages.deleteCategoryConfirmText'), async () => deleteCategory(target.dataset.id));
        return;
      }

      if (target.matches('.view-product') || target.matches('.product-card')) {
        const productId = target.dataset.productId || target.closest('.product-card')?.dataset.productId;
        if (productId) {
          event.preventDefault();
          openProductDetails(productId);
        }
      }
    });

    refs.languageToggle?.addEventListener('click', () => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      applyTranslations();
    });
    refs.mobileLanguageToggle?.addEventListener('click', () => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      applyTranslations();
    });
    refs.adminLanguageToggle?.addEventListener('click', () => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      applyTranslations();
    });

    refs.mobileMenuButton?.addEventListener('click', () => {
      refs.mobileMenuButton.classList.toggle('open');
      refs.mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMobileMenu));
    [refs.openSignupModal, refs.mobileOpenSignupModal].forEach(button => button?.addEventListener('click', () => { closeMobileMenu(); openModal(refs.signupModal); }));
    [refs.openLoginModal, refs.mobileOpenLoginModal].forEach(button => button?.addEventListener('click', () => { closeMobileMenu(); openModal(refs.userLoginModal); }));
    [refs.storeAdminLogin, refs.mobileAdminLogin, refs.footerAdminLogin].forEach(button => button?.addEventListener('click', () => { closeMobileMenu(); openModal(refs.loginModal); }));
    refs.customerLogout?.addEventListener('click', signOutCustomer);
    refs.mobileCustomerLogout?.addEventListener('click', () => { closeMobileMenu(); signOutCustomer(); });
    refs.backToStore?.addEventListener('click', () => switchView('store'));

    refs.adminLogout?.addEventListener('click', () => {
      showConfirm(t('messages.logoutConfirmTitle'), t('messages.logoutConfirmText'), () => {
        state.adminAuthenticated = false;
        sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
        switchView('store');
      });
    });

    refs.productSearch?.addEventListener('input', event => {
      state.searchTerm = event.target.value;
      refs.clearSearch?.classList.toggle('hidden', !state.searchTerm.trim());
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderProducts, 160);
    });

    refs.clearSearch?.addEventListener('click', () => {
      state.searchTerm = '';
      refs.productSearch.value = '';
      refs.clearSearch.classList.add('hidden');
      renderProducts();
    });

    refs.resetFilters?.addEventListener('click', () => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      refs.productSearch.value = '';
      refs.clearSearch.classList.add('hidden');
      renderCategoryPills();
      renderProducts();
    });

    refs.categoryScrollPrev?.addEventListener('click', () => {
      refs.categoryPills.scrollBy({ left: document.documentElement.dir === 'rtl' ? 220 : -220, behavior: 'smooth' });
    });
    refs.categoryScrollNext?.addEventListener('click', () => {
      refs.categoryPills.scrollBy({ left: document.documentElement.dir === 'rtl' ? -220 : 220, behavior: 'smooth' });
    });

    refs.detailsRequestQuote?.addEventListener('click', () => {
      closeModal(refs.detailsModal);
      prepareQuoteModal(state.currentProductId, 'quote');
    });
    refs.detailsOrderNow?.addEventListener('click', () => {
      closeModal(refs.detailsModal);
      if (!state.currentCustomer) {
        showToast('error', t('auth.login'), t('auth.accountRequired'));
        openModal(refs.userLoginModal);
        return;
      }
      prepareQuoteModal(state.currentProductId, 'order');
    });

    refs.signupForm?.addEventListener('submit', async event => {
      event.preventDefault();
      const name = refs.signupName.value.trim();
      const phone = refs.signupPhone.value.trim();
      const password = refs.signupPassword.value.trim();
      if (!name || !phone || !password) {
        showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
        return;
      }
      await signUpUser(name, phone, password);
    });

    refs.userLoginForm?.addEventListener('submit', async event => {
      event.preventDefault();
      const phone = refs.userLoginPhone.value.trim();
      const password = refs.userLoginPassword.value.trim();
      if (!phone || !password) {
        showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
        return;
      }
      await signInUser(phone, password);
    });

    refs.quoteForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveRequestFromForm();
    });

    refs.toggleSignupPassword?.addEventListener('click', () => {
      const isPassword = refs.signupPassword.type === 'password';
      refs.signupPassword.type = isPassword ? 'text' : 'password';
      refs.toggleSignupPassword.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });
    refs.toggleUserLoginPassword?.addEventListener('click', () => {
      const isPassword = refs.userLoginPassword.type === 'password';
      refs.userLoginPassword.type = isPassword ? 'text' : 'password';
      refs.toggleUserLoginPassword.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });
    refs.togglePassword?.addEventListener('click', () => {
      const isPassword = refs.adminPassword.type === 'password';
      refs.adminPassword.type = isPassword ? 'text' : 'password';
      refs.togglePassword.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });

    refs.loginForm?.addEventListener('submit', event => {
      event.preventDefault();
      if (refs.adminPassword.value === ADMIN_PASSWORD) {
        state.adminAuthenticated = true;
        sessionStorage.setItem(STORAGE_KEYS.adminAuth, 'true');
        refs.loginError.classList.add('hidden');
        refs.loginForm.reset();
        closeModal(refs.loginModal);
        switchView('admin');
        loadUsersAndOrders();
        showToast('success', t('messages.loginSuccessTitle'), t('messages.loginSuccessText'));
      } else {
        refs.loginError.classList.remove('hidden');
        const card = refs.loginModal.querySelector('.modal-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        showToast('error', t('messages.loginErrorTitle'), t('messages.loginErrorText'));
      }
    });

    refs.adminNavBtns.forEach(button => {
      button.addEventListener('click', () => {
        state.activeAdminTab = button.dataset.tab;
        refs.adminNavBtns.forEach(item => item.classList.toggle('active', item === button));
        refs.adminTabs.forEach(tab => tab.classList.toggle('active', tab.id === `admin-tab-${state.activeAdminTab}`));
        if (state.activeAdminTab === 'users' || state.activeAdminTab === 'orders') loadUsersAndOrders();
        if (state.activeAdminTab === 'clients') renderAdminClients();
        if (state.activeAdminTab === 'services') renderAdminServices();
      });
    });

    refs.openAddProduct?.addEventListener('click', () => openProductModal());
    refs.openAddPortfolio?.addEventListener('click', () => openPortfolioModal());
    refs.openAddClient?.addEventListener('click', () => openClientLogoModal());
    refs.openAddService?.addEventListener('click', () => openServiceAdminModal());
    refs.adminProductSearch?.addEventListener('input', renderAdminProducts);
    refs.adminCategoryFilter?.addEventListener('change', renderAdminProducts);
    refs.addPrintingMethodBtn?.addEventListener('click', addPrintingMethod);

    refs.categoryForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveCategoryFromForm();
    });
    refs.productForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveProductFromForm();
    });
    refs.portfolioForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await savePortfolioFromForm();
    });
    refs.clientLogoForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveClientLogoFromForm();
    });
    refs.serviceForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveServiceFromForm();
    });

    refs.confirmCancel?.addEventListener('click', () => {
      confirmAction = null;
      closeModal(refs.confirmModal);
    });
    refs.confirmOk?.addEventListener('click', () => {
      if (typeof confirmAction === 'function') confirmAction();
      confirmAction = null;
      closeModal(refs.confirmModal);
    });

    document.querySelectorAll('[data-close]').forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.close);
        if (modal) closeModal(modal);
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal(modal);
      });
    });

    bindFilePreview(refs.productImageFile, refs.productImagePreview);
    bindFilePreview(refs.productPortfolioImageFile, refs.productPortfolioImagePreview);
    bindFilePreview(refs.portfolioImageFile, refs.portfolioImagePreview);
    bindFilePreview(refs.clientLogoImageFile, refs.clientLogoImagePreview);
    bindFilePreview(refs.serviceImageFile, refs.serviceImagePreview);
  }

  function showSupabaseWarning(error) {
    if (state.warningShown) return;
    state.warningShown = true;
    showToast('error', t('messages.supabaseWarningTitle'), t('messages.supabaseWarningText'));
    console.error(error);
  }

  async function initialize() {
    refs.clearSearch?.classList.toggle('hidden', !refs.productSearch?.value?.trim());
    buildPrintingMethodCheckboxes([]);
    bindEvents();
    applyStaticTranslations();

    if (!supabaseClient) {
      showToast('error', t('messages.supabaseWarningTitle'), t('messages.supabaseWarningText'));
      renderStorefront();
      switchView(state.adminAuthenticated ? 'admin' : 'store');
      return;
    }

    await initializeCustomerSession();
    await loadPrintingMethods();
    await loadPublicCollections();
    initializeRealtime();
    switchView(state.adminAuthenticated ? 'admin' : 'store');
    initRevealAnimations();
  }

  initialize();
});
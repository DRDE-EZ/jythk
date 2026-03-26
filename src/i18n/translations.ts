export type Locale = "en" | "zh";

export const translations = {
  // ═══════ COMMON / SHARED ═══════
  common: {
    companyName: { en: "Jingyuntong Hong Kong", zh: "京运通香港" },
    jytCorp: { en: "JYT Corp", zh: "京运通集团" },
    jytHk: { en: "JYT HK", zh: "京运通香港" },
    shopNow: { en: "Shop Now", zh: "立即选购" },
    learnMore: { en: "Learn More", zh: "了解更多" },
    viewAll: { en: "View All", zh: "查看全部" },
    getQuote: { en: "Get a Quote", zh: "获取报价" },
    contactUs: { en: "Contact Us", zh: "联系我们" },
    browseProducts: { en: "Browse Products", zh: "浏览产品" },
    viewProjects: { en: "View Projects", zh: "查看项目" },
    details: { en: "Details", zh: "详情" },
    allProducts: { en: "All Products", zh: "全部产品" },
    subscribe: { en: "Subscribe", zh: "订阅" },
    sendMessage: { en: "Send Message", zh: "发送消息" },
    sending: { en: "Sending...", zh: "发送中..." },
    submitting: { en: "Submitting...", zh: "提交中..." },
    submit: { en: "Submit", zh: "提交" },
    signIn: { en: "Sign In", zh: "登录" },
    signOut: { en: "Sign out", zh: "退出登录" },
    logout: { en: "Logout", zh: "退出" },
    signInWithGoogle: { en: "Sign in with Google", zh: "使用 Google 登录" },
    continueWithGoogle: { en: "Continue with Google", zh: "使用 Google 继续" },
    aboutUs: { en: "About Us", zh: "关于我们" },
    backToProjects: { en: "Back to Projects", zh: "返回项目" },
    resetFilters: { en: "Reset Filters", zh: "重置筛选" },
    tryAgain: { en: "Try Again", zh: "重试" },
    admin: { en: "Admin", zh: "管理员" },
  },

  // ═══════ NAV ═══════
  nav: {
    products: { en: "Products", zh: "产品" },
    projects: { en: "Projects", zh: "项目" },
    partners: { en: "Partners", zh: "合作伙伴" },
    contact: { en: "Contact", zh: "联系我们" },
    about: { en: "About", zh: "关于" },
    portal: { en: "Portal", zh: "门户" },
    browseProducts: { en: "Browse Products", zh: "浏览产品" },
    exploreCategories: { en: "Explore our product categories", zh: "探索我们的产品类别" },
    loadingCategories: { en: "Loading categories...", zh: "加载分类中..." },
    browseAllProducts: { en: "Browse all products", zh: "浏览所有产品" },
    viewAllProducts: { en: "View All Products", zh: "查看所有产品" },
  },

  // ═══════ MOBILE MENU ═══════
  mobileMenu: {
    navigationMenu: { en: "Navigation Menu", zh: "导航菜单" },
    shop: { en: "Shop", zh: "商店" },
    allProducts: { en: "All Products", zh: "全部产品" },
    browseFullCatalogue: { en: "Browse our full catalogue", zh: "浏览完整目录" },
    collections: { en: "Collections", zh: "系列" },
    categories: { en: "categories", zh: "个分类" },
    view: { en: "View", zh: "查看" },
    info: { en: "Info", zh: "信息" },
    account: { en: "Account", zh: "账户" },
    myDashboard: { en: "My Dashboard", zh: "我的面板" },
    ordersSettings: { en: "Orders & settings", zh: "订单和设置" },
    endSession: { en: "End your session", zh: "结束会话" },
    projectsDesc: { en: "Our latest work", zh: "最新项目" },
    partnersDesc: { en: "Who we work with", zh: "合作伙伴" },
    contactDesc: { en: "Get in touch", zh: "联系我们" },
    aboutDesc: { en: "Our story", zh: "我们的故事" },
    portalDesc: { en: "Client access", zh: "客户入口" },
  },

  // ═══════ HOME PAGE ═══════
  home: {
    heroBadge: {
      en: "ISO 9001 Certified \u00B7 10+ Years in Business",
      zh: "ISO 9001 认证 \u00B7 10+ 年行业经验",
    },
    heroTitle1: { en: "Jingyuntong", zh: "京运通" },
    heroTitle2: { en: "Hong Kong", zh: "香港" },
    heroSubtitle: {
      en: "Your trusted supplier for solar solutions & custom projects.",
      zh: "您值得信赖的太阳能解决方案和定制项目供应商。",
    },
    heroDescription: {
      en: "Quality products, competitive pricing, reliable delivery to 30+ countries worldwide.",
      zh: "优质产品、有竞争力的价格、可靠的交付，覆盖全球30多个国家。",
    },
    statsProjectsDelivered: { en: "Projects Delivered", zh: "项目交付" },
    statsCountriesServed: { en: "Countries Served", zh: "服务国家" },
    statsClientSatisfaction: { en: "Client Satisfaction", zh: "客户满意度" },
    statsYearsExperience: { en: "Years Experience", zh: "年行业经验" },
    ourWork: { en: "Our Work", zh: "我们的项目" },
    featuredProjects: { en: "Featured Projects", zh: "精选项目" },
    projectLeshanTitle: { en: "Leshan Solar Farm", zh: "乐山光伏电站" },
    projectLeshanDesc: {
      en: "Large-scale photovoltaic power station serving 15,000+ households across the region.",
      zh: "大规模光伏发电站，为该地区超过15,000户家庭提供服务。",
    },
    projectLeshanLocation: { en: "Leshan, China", zh: "中国·乐山" },
    projectUtilityScale: { en: "Utility Scale", zh: "公用事业规模" },
    projectRooftopTitle: { en: "Industrial Rooftop", zh: "工业屋顶电站" },
    projectRooftopDesc: {
      en: "Commercial rooftop installation with smart monitoring across 25,000 m\u00B2 of panels.",
      zh: "商业屋顶安装，25,000平方米光伏板配备智能监控。",
    },
    projectRooftopLocation: { en: "Suzhou, Jiangsu", zh: "中国·苏州" },
    projectCommercial: { en: "Commercial", zh: "商业" },
    projectFloatingTitle: { en: "Floating Solar Plant", zh: "水上漂浮电站" },
    projectFloatingDesc: {
      en: "Innovative floating PV installation on water reservoir, maximising unused surface area.",
      zh: "创新的水库漂浮光伏安装，最大化利用闲置水面。",
    },
    projectFloatingLocation: { en: "Anhui Province", zh: "中国·安徽" },
    projectInnovation: { en: "Innovation", zh: "创新" },
    productRange: { en: "Product Range", zh: "产品范围" },
    browseCategories: { en: "Browse Our Categories", zh: "浏览产品类别" },
    categoriesDesc: {
      en: "High-quality solar products and components for projects of every scale.",
      zh: "适用于各种规模项目的高品质太阳能产品和组件。",
    },
    // Category items
    categorySolarCells: { en: "Solar Cells", zh: "太阳能电池片" },
    categorySolarCellsDesc: {
      en: "High-efficiency monocrystalline and polycrystalline cells for panel manufacturing.",
      zh: "用于组件制造的高效单晶和多晶电池片。",
    },
    categorySolarWafers: { en: "Solar Wafers", zh: "太阳能硅片" },
    categorySolarWafersDesc: {
      en: "Premium silicon wafers in various sizes for cell production.",
      zh: "用于电池片生产的各种规格优质硅片。",
    },
    categoryOffGrid: { en: "Off-Grid Solar Kits", zh: "离网太阳能套件" },
    categoryOffGridDesc: {
      en: "Complete standalone systems for remote locations and backup power.",
      zh: "适用于偏远地区和备用电源的完整独立系统。",
    },
    categoryBess: { en: "BESS", zh: "储能系统" },
    categoryBessDesc: {
      en: "Battery Energy Storage Systems for residential and commercial applications.",
      zh: "适用于住宅和商业应用的电池储能系统。",
    },
    categoryAccessories: { en: "Solar Accessories", zh: "太阳能配件" },
    categoryAccessoriesDesc: {
      en: "Mounting hardware, cables, connectors, and monitoring equipment.",
      zh: "安装支架、电缆、连接器和监控设备。",
    },
    categorySCR: { en: "SCR Catalyst", zh: "SCR催化剂" },
    categorySCRDesc: {
      en: "Selective Catalytic Reduction systems for emission control.",
      zh: "用于排放控制的选择性催化还原系统。",
    },
    ourPromise: { en: "Our Promise", zh: "我们的承诺" },
    whyChooseUs: { en: "Why Choose Us", zh: "为什么选择我们" },
    whyChooseUsDesc: {
      en: "Trusted by installers and developers worldwide",
      zh: "受全球安装商和开发商信赖",
    },
    qualityAssured: { en: "Quality Assured", zh: "品质保证" },
    qualityAssuredDesc: {
      en: "International standards with full certification on every product.",
      zh: "每款产品均符合国际标准并获得完整认证。",
    },
    globalDelivery: { en: "Global Delivery", zh: "全球配送" },
    globalDeliveryDesc: {
      en: "Shipping to 30+ countries with real-time tracking.",
      zh: "发货至30多个国家，支持实时追踪。",
    },
    onTimeDelivery: { en: "On-Time Delivery", zh: "准时交付" },
    onTimeDeliveryDesc: {
      en: "99% on-time rate. Your timelines matter to us.",
      zh: "99%准时率。您的时间表对我们至关重要。",
    },
    tenYears: { en: "10+ Years", zh: "10+ 年" },
    tenYearsDesc: { en: "Trusted worldwide since 2014.", zh: "自2014年以来，值得全球信赖。" },
    partnerWithUs: { en: "Partner With Us", zh: "与我们合作" },
    lookingForA: { en: "Looking for a", zh: "寻找" },
    trustedSupplier: { en: "Trusted Supplier", zh: "可信赖的供应商" },
    ctaDescription: {
      en: "Quality products, competitive prices, and reliable delivery. Your overseas partner for solar solutions and custom projects.",
      zh: "优质产品、有竞争力的价格和可靠的交付。您的海外太阳能解决方案和定制项目合作伙伴。",
    },
  },

  // ═══════ FOOTER ═══════
  footer: {
    brandDescription: {
      en: "Your trusted overseas supplier for solar solutions and custom projects. Quality products delivered on time.",
      zh: "您值得信赖的海外太阳能解决方案和定制项目供应商。优质产品，准时交付。",
    },
    company: { en: "Company", zh: "公司" },
    support: { en: "Support", zh: "支持" },
    contact: { en: "Contact", zh: "联系方式" },
    about: { en: "About", zh: "关于" },
    shop: { en: "Shop", zh: "商店" },
    projects: { en: "Projects", zh: "项目" },
    helpCenter: { en: "Help Center", zh: "帮助中心" },
    shipping: { en: "Shipping", zh: "物流" },
    terms: { en: "Terms", zh: "条款" },
    privacy: { en: "Privacy", zh: "隐私" },
    cookies: { en: "Cookies", zh: "Cookie政策" },
    newsletter: { en: "Newsletter", zh: "新闻通讯" },
    newsletterDesc: {
      en: "Subscribe for product updates and industry news.",
      zh: "订阅产品更新和行业新闻。",
    },
    enterEmail: { en: "Enter your email", zh: "输入您的邮箱" },
    copyright: {
      en: "Jingyuntong Hong Kong. All rights reserved.",
      zh: "京运通香港。保留所有权利。",
    },
    hongKongSAR: { en: "Hong Kong SAR", zh: "中国香港特别行政区" },
  },

  // ═══════ ABOUT PAGE ═══════
  about: {
    heroLabel: { en: "About Us", zh: "关于我们" },
    heroTitle1: { en: "Powering the Future with", zh: "以清洁能源" },
    heroTitle2: { en: "Clean Energy", zh: "驱动未来" },
    heroSubtitle: {
      en: "From a small tech company in Beijing to a global leader in renewable energy solutions \u2014 this is our story.",
      zh: "从北京的一家小型科技公司到全球可再生能源解决方案的领导者——这是我们的故事。",
    },
    statProjects: { en: "Projects", zh: "项目" },
    statDelivered: { en: "Delivered", zh: "已交付" },
    statCountries: { en: "Countries", zh: "国家" },
    statServed: { en: "Served", zh: "已服务" },
    statClient: { en: "Client", zh: "客户" },
    statSatisfaction: { en: "Satisfaction", zh: "满意度" },
    statYears: { en: "Years", zh: "年" },
    statExperience: { en: "Experience", zh: "经验" },
    ourStory: { en: "Our Story", zh: "我们的故事" },
    fromBeijing: { en: "From Beijing to the World", zh: "从北京走向世界" },
    storyP1: {
      en: "Established in August 2002, ",
      zh: "成立于2002年8月，",
    },
    storyCompanyName: {
      en: "Beijing Jingyuntong Technology Co., Ltd",
      zh: "北京京运通科技股份有限公司",
    },
    storyP1End: {
      en: " began with a vision to revolutionize how the world generates and consumes energy.",
      zh: "以革新全球能源生产和消费方式为愿景而创立。",
    },
    storyP2: {
      en: "Today, we operate across four major industries: high-end equipment, new materials, new energy power generation, and energy conservation & environmental protection.",
      zh: "如今，我们在四大产业领域运营：高端装备、新材料、新能源发电和节能环保。",
    },
    storyP3Start: {
      en: "Listed on the Shanghai Stock Exchange in 2015 ",
      zh: "2015年在上海证券交易所上市",
    },
    stockCode: { en: "(Stock Code: 601778)", zh: "（股票代码：601778）" },
    storyP3End: {
      en: ", we continue to push the boundaries of what's possible in renewable energy.",
      zh: "，我们持续突破可再生能源的边界。",
    },
    installedCapacity: { en: "Installed Capacity", zh: "装机容量" },
    kwhGenerated: { en: "kWh Generated", zh: "发电量（千瓦时）" },
    co2Reduced: { en: "11.7M tons CO\u2082 reduced", zh: "减少1170万吨CO\u2082排放" },
    equivalentTrees: {
      en: "Equivalent to planting millions of trees",
      zh: "相当于种植数百万棵树",
    },
    ourJourney: { en: "Our Journey", zh: "发展历程" },
    milestones: { en: "Milestones That Define Us", zh: "定义我们的里程碑" },
    swipeToExplore: { en: "\u2190 Swipe to explore \u2192", zh: "\u2190 滑动浏览 \u2192" },
    // Timeline
    timelineCompanyFounded: { en: "Company Founded", zh: "公司成立" },
    timelineCompanyFoundedDesc: {
      en: "Beijing Jingyuntong Technology established",
      zh: "北京京运通科技成立",
    },
    timelineFirstPlant: { en: "First Plant", zh: "首个工厂" },
    timelineFirstPlantDesc: { en: "Manufacturing operations begin", zh: "制造业务启动" },
    timelineSolarLaunch: { en: "Solar Launch", zh: "太阳能业务启动" },
    timelineSolarLaunchDesc: { en: "Entering renewable energy sector", zh: "进入可再生能源领域" },
    timelineGlobalExpansion: { en: "Global Expansion", zh: "全球拓展" },
    timelineGlobalExpansionDesc: { en: "International market presence", zh: "建立国际市场影响力" },
    timelineIPO: { en: "IPO", zh: "上市" },
    timelineIPODesc: { en: "Listed on Shanghai Stock Exchange", zh: "在上海证券交易所上市" },
    timelineMarketLeader: { en: "Market Leader", zh: "市场领导者" },
    timelineMarketLeaderDesc: { en: "500+ projects worldwide", zh: "全球500多个项目" },
    // Business divisions
    whatWeDo: { en: "What We Do", zh: "业务板块" },
    fourPillars: { en: "Four Pillars of Innovation", zh: "四大创新支柱" },
    fourPillarsDesc: {
      en: "Our diversified portfolio drives sustainable growth across multiple industries",
      zh: "我们多元化的业务组合推动多个行业的可持续发展",
    },
    highEndEquipment: { en: "High-end Equipment", zh: "高端装备" },
    highEndEquipmentDesc: {
      en: "Advanced manufacturing equipment and precision instruments for industrial applications.",
      zh: "用于工业应用的先进制造设备和精密仪器。",
    },
    newMaterials: { en: "New Materials", zh: "新材料" },
    newMaterialsDesc: {
      en: "Cutting-edge photovoltaic materials, semiconductors, and advanced composites.",
      zh: "前沿光伏材料、半导体和先进复合材料。",
    },
    newEnergy: { en: "New Energy", zh: "新能源" },
    newEnergyDesc: {
      en: "Comprehensive solar power solutions from design to utility-scale installation.",
      zh: "从设计到公用事业规模安装的全面太阳能解决方案。",
    },
    environmentalProtection: { en: "Environmental Protection", zh: "节能环保" },
    environmentalProtectionDesc: {
      en: "Sustainable solutions for energy efficiency and carbon footprint reduction.",
      zh: "提高能效和减少碳足迹的可持续解决方案。",
    },
    learnMoreText: { en: "Learn more", zh: "了解更多" },
    // Core values
    ourFoundation: { en: "Our Foundation", zh: "我们的基石" },
    valuesGuideUs: { en: "Values That Guide Us", zh: "指引我们的价值观" },
    valuesDesc: {
      en: "The principles that drive our commitment to excellence.",
      zh: "推动我们追求卓越的原则。",
    },
    qualityFirst: { en: "Quality First", zh: "品质至上" },
    qualityFirstDesc: {
      en: "Rigorous standards and international certifications.",
      zh: "严格的标准和国际认证。",
    },
    innovation: { en: "Innovation", zh: "创新" },
    innovationDesc: {
      en: "Leading edge solar technology advancements.",
      zh: "引领太阳能技术前沿。",
    },
    sustainability: { en: "Sustainability", zh: "可持续发展" },
    sustainabilityDesc: {
      en: "Committed to clean energy worldwide.",
      zh: "致力于全球清洁能源。",
    },
    // Certificates
    certificatesAwards: { en: "Certificates & Awards", zh: "证书与荣誉" },
    recognizedExcellence: {
      en: "Recognized for excellence in innovation and quality",
      zh: "因创新和品质卓越而获得认可",
    },
    clickToView: { en: "Click to view", zh: "点击查看" },
    tapToClose: {
      en: "Tap anywhere to close \u2022 Pinch to zoom",
      zh: "点击任意处关闭 \u2022 捏合缩放",
    },
    // CTA
    readyToStart: { en: "Ready to Start?", zh: "准备好开始了吗？" },
    buildFuture: { en: "Let's Build the Future Together", zh: "让我们共建未来" },
    ctaDesc: {
      en: "Join hundreds of satisfied clients who have made the switch to clean, renewable energy.",
      zh: "加入数百位满意的客户，共同迈向清洁可再生能源。",
    },
  },

  // ═══════ CONTACT PAGE ═══════
  contact: {
    heroLabel: { en: "Get In Touch", zh: "联系我们" },
    heroTitle: { en: "Contact Us", zh: "联系我们" },
    heroSubtitle: {
      en: "We're here to help. Reach out to us for any inquiries or support.",
      zh: "我们随时为您服务。如有任何咨询或需要支持，请联系我们。",
    },
    contactInfo: { en: "Contact Information", zh: "联系信息" },
    contactInfoDesc: {
      en: "Have a question or need assistance? Our team is ready to help you. Fill out the form or reach us directly through any of the channels below.",
      zh: "有问题或需要帮助？我们的团队随时为您服务。请填写表格或通过以下任一渠道直接联系我们。",
    },
    emailUs: { en: "Email Us", zh: "发送邮件" },
    callUs: { en: "Call Us", zh: "致电我们" },
    visitUs: { en: "Visit Us", zh: "拜访我们" },
    businessHours: { en: "Business Hours", zh: "营业时间" },
    quickResponse: { en: "Quick Response", zh: "快速回复" },
    quickResponseDesc: {
      en: "We typically respond to all inquiries within 24 hours during business days.",
      zh: "我们通常在工作日24小时内回复所有咨询。",
    },
    sendUsMessage: { en: "Send Us a Message", zh: "给我们留言" },
    fullName: { en: "Full Name", zh: "姓名" },
    emailAddress: { en: "Email Address", zh: "邮箱地址" },
    phoneNumber: { en: "Phone Number", zh: "电话号码" },
    subject: { en: "Subject", zh: "主题" },
    message: { en: "Message", zh: "留言" },
    yourName: { en: "Your Name", zh: "您的姓名" },
    howCanWeHelp: { en: "How can we help?", zh: "我们如何帮助您？" },
    tellUsMore: {
      en: "Tell us more about your inquiry...",
      zh: "请告诉我们更多关于您的咨询...",
    },
  },

  // ═══════ PARTNERS PAGE ═══════
  partners: {
    heroLabel: { en: "Trusted Network", zh: "值得信赖的合作网络" },
    heroTitle: { en: "Our Partners", zh: "我们的合作伙伴" },
    heroSubtitle: {
      en: "Collaborating with industry leaders to deliver world-class solar solutions",
      zh: "与行业领导者合作，提供世界一流的太阳能解决方案",
    },
    benefitsLabel: { en: "Benefits", zh: "合作优势" },
    whyPartner: { en: "Why Partner With Us", zh: "为什么与我们合作" },
    globalReach: { en: "Global Reach", zh: "全球覆盖" },
    globalReachDesc: {
      en: "Access to international markets with our extensive distribution network spanning 30+ countries.",
      zh: "通过我们覆盖30多个国家的广泛分销网络进入国际市场。",
    },
    qualityAssurance: { en: "Quality Assurance", zh: "品质保证" },
    qualityAssuranceDesc: {
      en: "Rigorous quality control standards and international certifications ensure product excellence.",
      zh: "严格的质量控制标准和国际认证确保产品卓越品质。",
    },
    technicalSupport: { en: "Technical Support", zh: "技术支持" },
    technicalSupportDesc: {
      en: "Comprehensive technical assistance and training programs for all partner organizations.",
      zh: "为所有合作伙伴组织提供全面的技术支持和培训计划。",
    },
    industryLeaders: { en: "Industry Leaders", zh: "行业领导者" },
    strategicPartners: { en: "Strategic Partners", zh: "战略合作伙伴" },
    strategicPartnersDesc: {
      en: "We collaborate with the world's leading manufacturers and technology providers to ensure our clients receive the highest quality solar products and solutions.",
      zh: "我们与全球领先的制造商和技术供应商合作，确保客户获得最高品质的太阳能产品和解决方案。",
    },
    certificationsTitle: { en: "Certifications & Standards", zh: "认证与标准" },
    certificationsDesc: {
      en: "Our commitment to quality is backed by numerous international certifications and compliance standards.",
      zh: "我们对品质的承诺由众多国际认证和合规标准支撑。",
    },
    ourCertifications: { en: "Our Certifications & Awards", zh: "我们的认证与荣誉" },
    joinNetwork: { en: "Join Our Network", zh: "加入我们的合作网络" },
    becomePartner: { en: "Become a Partner", zh: "成为合作伙伴" },
    becomePartnerDesc: {
      en: "Fill out the form below and we'll get back to you within 24 hours",
      zh: "请填写以下表格，我们将在24小时内回复您",
    },
    joinNetworkDesc: {
      en: "Join our network of trusted partners and grow your business with Jingyuntong Hong Kong",
      zh: "加入我们值得信赖的合作伙伴网络，与京运通香港共同发展",
    },
    learnMoreAboutUs: { en: "Learn More About Us", zh: "了解更多关于我们" },
    // Certifications list
    iso9001: { en: "ISO 9001 Quality Management", zh: "ISO 9001 质量管理" },
    iso14001: { en: "ISO 14001 Environmental Management", zh: "ISO 14001 环境管理" },
    iso45001: { en: "ISO 45001 Occupational Health & Safety", zh: "ISO 45001 职业健康与安全" },
    tuv: { en: "TUV Certification", zh: "TUV 认证" },
    ce: { en: "CE Certification", zh: "CE 认证" },
    ul: { en: "UL Certification", zh: "UL 认证" },
    iec: { en: "IEC Standards Compliance", zh: "IEC 标准合规" },
    ohsas: { en: "OHSAS 18001", zh: "OHSAS 18001" },
    carbonFootprint: { en: "Carbon Footprint Verification", zh: "碳足迹验证" },
    greenBuilding: { en: "Green Building Certification", zh: "绿色建筑认证" },
    energyStar: { en: "Energy Star Certification", zh: "能源之星认证" },
    pvCycle: { en: "PV Cycle Membership", zh: "PV Cycle 会员" },
  },

  // ═══════ PROJECTS PAGE ═══════
  projects: {
    heroLabel: { en: "Project Solutions", zh: "项目解决方案" },
    heroTitle: { en: "Start Your Project", zh: "开始您的项目" },
    heroSubtitle: {
      en: "Tell us about your project and get a customized quote within 24 hours",
      zh: "告诉我们您的项目需求，24小时内获得定制报价",
    },
    dragToRotate: { en: "Drag to rotate", zh: "拖动旋转" },
    // Stats
    projectsCompleted: { en: "Projects Completed", zh: "已完成项目" },
    totalCapacity: { en: "Total Capacity Installed", zh: "总装机容量" },
    countriesWorldwide: { en: "Countries Worldwide", zh: "覆盖国家" },
    co2Reduced: { en: "Tons CO2 Reduced", zh: "吨CO2减排量" },
    // Project types
    getStarted: { en: "Get Started", zh: "开始" },
    chooseProjectType: { en: "Choose Your Project Type", zh: "选择您的项目类型" },
    chooseProjectTypeDesc: {
      en: "Select the type of project you're interested in to get started with a customized inquiry form",
      zh: "选择您感兴趣的项目类型，开始定制咨询",
    },
    solarFarm: { en: "Solar Farm", zh: "光伏电站" },
    solarFarmDesc: {
      en: "Large-scale ground-mounted solar installations for utility and commercial applications. From 1MW to 100MW+ capacity.",
      zh: "用于公用事业和商业应用的大规模地面太阳能安装。容量从1MW到100MW以上。",
    },
    bess: { en: "BESS", zh: "储能系统" },
    bessDesc: {
      en: "Battery Energy Storage Systems for grid stabilization, peak shaving, and renewable energy integration.",
      zh: "电池储能系统，用于电网稳定、削峰填谷和可再生能源整合。",
    },
    rooftopInstallation: { en: "Rooftop Installation", zh: "屋顶安装" },
    rooftopDesc: {
      en: "Commercial and industrial rooftop solar systems. Maximize unused roof space for clean energy generation.",
      zh: "商业和工业屋顶太阳能系统。最大化利用闲置屋顶空间进行清洁能源发电。",
    },
    customProjects: { en: "Custom Projects", zh: "定制项目" },
    customProjectsDesc: {
      en: "Tailored solar solutions for unique requirements. Floating solar, agrivoltaics, hybrid systems, and more.",
      zh: "针对特殊需求的定制太阳能解决方案。水上漂浮、农光互补、混合系统等。",
    },
    getQuote: { en: "Get Quote", zh: "获取报价" },
    // Features
    groundMounted: { en: "Ground-mounted systems", zh: "地面安装系统" },
    utilityScale: { en: "Utility-scale projects", zh: "公用事业规模项目" },
    highCapacity: { en: "High-capacity generation", zh: "高容量发电" },
    longTermROI: { en: "Long-term ROI", zh: "长期投资回报" },
    energyStorage: { en: "Energy storage solutions", zh: "储能解决方案" },
    gridStabilization: { en: "Grid stabilization", zh: "电网稳定" },
    peakDemand: { en: "Peak demand management", zh: "峰值需求管理" },
    renewableIntegration: { en: "Renewable integration", zh: "可再生能源整合" },
    commercialRooftops: { en: "Commercial rooftops", zh: "商业屋顶" },
    industrialFacilities: { en: "Industrial facilities", zh: "工业设施" },
    spaceOptimization: { en: "Space optimization", zh: "空间优化" },
    immediateSavings: { en: "Immediate savings", zh: "即时节省" },
    floatingSolar: { en: "Floating solar", zh: "水上漂浮" },
    agrivoltaic: { en: "Agrivoltaic systems", zh: "农光互补系统" },
    hybridSolutions: { en: "Hybrid solutions", zh: "混合解决方案" },
    innovativeDesigns: { en: "Innovative designs", zh: "创新设计" },
    // Why choose us
    ourExpertise: { en: "Our Expertise", zh: "我们的专业" },
    whyChooseJYT: { en: "Why Choose Jingyuntong Hong Kong?", zh: "为什么选择京运通香港？" },
    trustedPartner: {
      en: "Your trusted partner for solar solutions worldwide",
      zh: "您值得信赖的全球太阳能解决方案合作伙伴",
    },
    expertEngineering: { en: "Expert Engineering", zh: "专业工程" },
    expertEngineeringDesc: {
      en: "Over 10 years of experience designing and implementing solar projects globally",
      zh: "超过10年全球太阳能项目设计和实施经验",
    },
    qualityComponents: { en: "Quality Components", zh: "优质组件" },
    qualityComponentsDesc: {
      en: "We source only the highest quality solar panels, inverters, and storage systems",
      zh: "我们只采购最高品质的太阳能板、逆变器和储能系统",
    },
    fullSupport: { en: "Full Support", zh: "全程支持" },
    fullSupportDesc: {
      en: "From initial consultation to post-installation support, we're with you every step",
      zh: "从初步咨询到安装后支持，我们全程陪伴",
    },
    // CTA
    readyToGetStarted: { en: "Ready to Get Started?", zh: "准备好开始了吗？" },
    ctaDesc: {
      en: "Choose your project type above to fill out a customized inquiry form, or contact us directly",
      zh: "选择上方的项目类型填写定制咨询表，或直接联系我们",
    },
  },

  // ═══════ PORTAL PAGE ═══════
  portal: {
    heroLabel: { en: "Client Access", zh: "客户入口" },
    heroTitle: { en: "Portal", zh: "门户" },
    heroSubtitle: {
      en: "Access your dashboard to manage orders and track project progress",
      zh: "访问您的面板以管理订单和跟踪项目进度",
    },
    customerPortal: { en: "Customer Portal", zh: "客户门户" },
    customerPortalDesc: {
      en: "Track orders, view purchase history, and manage your account",
      zh: "跟踪订单、查看购买历史和管理您的账户",
    },
    tryDemo: { en: "Try Demo", zh: "试用演示" },
    adminPortal: { en: "Admin Portal", zh: "管理员门户" },
    adminPortalDesc: {
      en: "Manage inventory, oversee orders, and access admin functions",
      zh: "管理库存、监督订单和访问管理功能",
    },
    adminDemo: { en: "Admin Demo", zh: "管理员演示" },
    adminAccess: { en: "Admin Access", zh: "管理员访问" },
    googleOAuth: { en: "Google OAuth authentication", zh: "Google OAuth 认证" },
    autoRedirect: { en: "Automatic redirect for admin users", zh: "管理员用户自动跳转" },
    restrictedEmails: { en: "Restricted to authorized emails", zh: "仅限授权邮箱" },
    fullSystemAccess: { en: "Full system management access", zh: "完整系统管理权限" },
    demoNote: {
      en: "Demo accounts include sample data for testing",
      zh: "演示账户包含测试用样本数据",
    },
    newToPlatform: {
      en: "New to our platform? Learn more about our services",
      zh: "初次使用我们的平台？了解更多关于我们的服务",
    },
  },

  // ═══════ QUOTE PAGE ═══════
  quote: {
    quote: { en: "Quote", zh: "报价" },
    solarFarm: { en: "Solar Farm", zh: "光伏电站" },
    solarFarmDesc: { en: "Large-scale ground-mounted solar installations", zh: "大规模地面太阳能安装" },
    bess: { en: "BESS", zh: "储能系统" },
    bessDesc: { en: "Battery Energy Storage Systems", zh: "电池储能系统" },
    rooftopInstallation: { en: "Rooftop Installation", zh: "屋顶安装" },
    rooftopDesc: { en: "Commercial and industrial rooftop solar", zh: "商业和工业屋顶太阳能" },
    customProject: { en: "Custom Project", zh: "定制项目" },
    customProjectDesc: { en: "Tailored solar solutions for unique requirements", zh: "针对特殊需求的定制太阳能解决方案" },
    contactInformation: { en: "Contact Information", zh: "联系信息" },
    companyName: { en: "Company Name", zh: "公司名称" },
    contactName: { en: "Contact Name", zh: "联系人" },
    emailAddress: { en: "Email Address", zh: "邮箱地址" },
    phoneNumber: { en: "Phone Number", zh: "电话号码" },
    projectDetails: { en: "Project Details", zh: "项目详情" },
    storageCapacity: { en: "Storage Capacity (MWh)", zh: "储能容量 (MWh)" },
    projectCapacity: { en: "Project Capacity (MW)", zh: "项目容量 (MW)" },
    projectLocation: { en: "Project Location", zh: "项目地点" },
    expectedTimeline: { en: "Expected Timeline", zh: "预期时间线" },
    estimatedBudget: { en: "Estimated Budget", zh: "预算估计" },
    additionalInfo: { en: "Additional Information", zh: "补充信息" },
    projectDetailsQuestions: { en: "Project Details & Questions", zh: "项目详情与问题" },
    additionalDetailsPlaceholder: {
      en: "Tell us more about your project requirements, site conditions, grid connection details, or any specific questions...",
      zh: "请告诉我们更多关于您的项目需求、场地条件、电网接入详情或任何具体问题...",
    },
    sendingRequest: { en: "Sending Request...", zh: "发送请求中..." },
    requestQuote: { en: "Request Quote", zh: "请求报价" },
    responseTime: {
      en: "We typically respond within 24 hours during business days.",
      zh: "我们通常在工作日24小时内回复。",
    },
    successMessage: {
      en: "Quote request sent! We'll get back to you within 24 hours.",
      zh: "报价请求已发送！我们将在24小时内回复您。",
    },
    errorMessage: {
      en: "Failed to send quote request. Please try again.",
      zh: "发送报价请求失败。请重试。",
    },
  },

  // ═══════ SHOP PAGE ═══════
  shop: {
    resultsFor: { en: "Results for", zh: "搜索结果" },
    productFound: { en: "product", zh: "个产品" },
    productsFound: { en: "products", zh: "个产品" },
    found: { en: "found", zh: "已找到" },
    showingResults: { en: "Showing search results for", zh: "显示搜索结果" },
    noProductsFound: { en: "No products found", zh: "未找到产品" },
    noProductsMatchQuery: {
      en: "We couldn't find any products matching",
      zh: "我们找不到匹配的产品",
    },
    tryAdjusting: {
      en: ". Try adjusting your search or filters.",
      zh: "。请尝试调整搜索条件或筛选。",
    },
    noProductsMatchFilters: {
      en: "No products match your current filters. Try adjusting your selection.",
      zh: "没有产品匹配当前筛选条件。请尝试调整选择。",
    },
    unableToLoad: { en: "Unable to Load Products", zh: "无法加载产品" },
    troubleConnecting: {
      en: "We're having trouble connecting to the product catalog. Please try again later.",
      zh: "我们连接产品目录时遇到问题。请稍后重试。",
    },
  },

  // ═══════ SHOPPING CART ═══════
  cart: {
    yourCart: { en: "Your Cart", zh: "您的购物车" },
    item: { en: "item", zh: "件商品" },
    items: { en: "items", zh: "件商品" },
    cartEmpty: { en: "Your cart is empty", zh: "您的购物车为空" },
    addProducts: { en: "Add some products to get started", zh: "添加一些产品开始购物" },
    subtotal: { en: "Subtotal", zh: "小计" },
    shippingTaxes: {
      en: "Shipping and taxes calculated at checkout",
      zh: "运费和税费将在结算时计算",
    },
  },

  // ═══════ USER BUTTON ═══════
  user: {
    adminDashboard: { en: "Admin Dashboard", zh: "管理面板" },
    myDashboard: { en: "My Dashboard", zh: "我的面板" },
    customer: { en: "Customer", zh: "客户" },
    signedIn: { en: "Signed in", zh: "已登录" },
  },

  // ═══════ PARTNER FORM ═══════
  partnerForm: {
    name: { en: "Name", zh: "姓名" },
    email: { en: "Email", zh: "邮箱" },
    location: { en: "Location", zh: "地点" },
    interest: { en: "Interest", zh: "感兴趣的领域" },
    selectInterest: { en: "Select your interest...", zh: "选择您的兴趣..." },
    rooftopInstallation: { en: "Rooftop Installation", zh: "屋顶安装" },
    wholesale: { en: "Wholesale", zh: "批发" },
    landPartnership: { en: "Land Partnership", zh: "土地合作" },
    other: { en: "Other", zh: "其他" },
    additionalInfo: { en: "Additional Information", zh: "补充信息" },
    additionalInfoPlaceholder: {
      en: "Tell us more about your project or partnership goals...",
      zh: "请告诉我们更多关于您的项目或合作目标...",
    },
    submitInquiry: { en: "Submit Partnership Inquiry", zh: "提交合作咨询" },
    successMessage: { en: "Partner inquiry submitted successfully!", zh: "合作咨询已成功提交！" },
    failedMessage: { en: "Failed to submit. Please try again.", zh: "提交失败。请重试。" },
    errorMessage: { en: "An error occurred. Please try again.", zh: "发生错误。请重试。" },
    yourFullName: { en: "Your full name", zh: "您的全名" },
    cityCountry: { en: "City, Country", zh: "城市，国家" },
  },

  // ═══════ LANGUAGE TOGGLE ═══════
  language: {
    en: { en: "EN", zh: "EN" },
    zh: { en: "中", zh: "中" },
  },
} as const;

export type TranslationKeys = typeof translations;

// ═══════ DYNAMIC COLLECTION TRANSLATIONS ═══════
// Maps Wix collection slugs or lowercase names to Chinese translations.
// English name is pulled directly from Wix data; only zh needs a map.
export const collectionTranslations: Record<string, { name: string; description: string }> = {
  "solar-cells": { name: "太阳能电池片", description: "用于组件制造的高效单晶和多晶电池片" },
  "solar-wafers": { name: "太阳能硅片", description: "用于电池片生产的各种规格优质硅片" },
  "off-grid-solar-kits": { name: "离网太阳能套件", description: "适用于偏远地区和备用电源的完整独立系统" },
  "bess": { name: "储能系统", description: "适用于住宅和商业应用的电池储能系统" },
  "solar-accessories": { name: "太阳能配件", description: "安装支架、电缆、连接器和监控设备" },
  "scr-catalyst": { name: "SCR催化剂", description: "用于排放控制的选择性催化还原系统" },
  "all-products": { name: "全部产品", description: "浏览我们完整的建筑材料和设备系列" },
  "concrete": { name: "混凝土", description: "各类建筑项目的高品质混凝土混合料和密封剂" },
  "construction-tools": { name: "建筑工具", description: "适用于各类工程的专业建筑工具和设备" },
  "forklifts": { name: "叉车", description: "工业叉车及物料搬运替换零件" },
  "industrial-equipment": { name: "工业设备", description: "重型工业机械和组件" },
  "sustainable-materials": { name: "可持续材料", description: "环保建筑材料和可持续建设解决方案" },
  "wall-panels": { name: "墙板", description: "适用于室内外应用的耐用墙板" },
};

/**
 * Get translated collection name based on locale.
 * Falls back to the original Wix name for English or unknown collections.
 */
export function getCollectionTranslation(
  slug: string | undefined | null,
  name: string | undefined | null,
  locale: Locale,
): { name: string; description: string | null } {
  const originalName = name || "Collection";

  if (locale === "en") {
    return { name: originalName, description: null };
  }

  // Try exact slug match first
  if (slug && collectionTranslations[slug]) {
    return collectionTranslations[slug];
  }

  // Try fuzzy match on slug keywords
  const slugLower = (slug || "").toLowerCase();
  for (const [key, val] of Object.entries(collectionTranslations)) {
    if (slugLower.includes(key) || key.includes(slugLower)) {
      return val;
    }
  }

  // Fallback: return original name with a generic Chinese description
  return { name: originalName, description: `探索我们的${originalName}系列优质产品` };
}

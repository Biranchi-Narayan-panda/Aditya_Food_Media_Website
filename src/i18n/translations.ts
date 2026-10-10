export type Language = 'or' | 'en';

export interface TranslationDictionary {
  // Navigation & Header
  nav: {
    brandTitle: string;
    brandSubtitle: string;
    tagline: string;
    home: string;
    about: string;
    foods: string;
    foodsOverview: string;
    dairyProducts: string;
    foodConsultation: string;
    media: string;
    mediaOverview: string;
    videoGallery: string;
    mediaPortfolio: string;
    contact: string;
    getInTouch: string;
    whatsapp: string;
    menu: string;
    close: string;
    officialDivision: string;
    switchLanguage: string;
    currentLanguageName: string;
  };

  // Home Page
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    exploreFoodsBtn: string;
    exploreMediaBtn: string;
    contactBtn: string;
    stats: {
      pureQualityLabel: string;
      pureQualityDesc: string;
      viewsLabel: string;
      viewsDesc: string;
      experienceLabel: string;
      experienceDesc: string;
      householdsLabel: string;
      householdsDesc: string;
    };
    foodsIntroKicker: string;
    foodsIntroTitle: string;
    foodsIntroDesc: string;
    mediaIntroKicker: string;
    mediaIntroTitle: string;
    mediaIntroDesc: string;
    viewAllProducts: string;
    viewAllVideos: string;
    quickInquiryTitle: string;
    quickInquirySubtitle: string;
    pillarsTitle: string;
    pillarsSubtitle: string;
    purityPillar: string;
    purityPillarDesc: string;
    coldChainPillar: string;
    coldChainPillarDesc: string;
    creativityPillar: string;
    creativityPillarDesc: string;
    communityPillar: string;
    communityPillarDesc: string;
  };

  // About Page
  about: {
    heroTitle: string;
    heroSubtitle: string;
    heritageTitle: string;
    heritageText1: string;
    heritageText2: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    valuesTitle: string;
    purityValue: string;
    purityValueDesc: string;
    creativityValue: string;
    creativityValueDesc: string;
    trustValue: string;
    trustValueDesc: string;
    excellenceValue: string;
    excellenceValueDesc: string;
    contactCtaTitle: string;
    contactCtaSubtitle: string;
    contactCtaBtn: string;
  };

  // Foods & Products
  foods: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    productsHeading: string;
    productsSubtitle: string;
    filterAll: string;
    filterMilk: string;
    filterGhee: string;
    filterButter: string;
    filterPaneer: string;
    filterCurd: string;
    orderWhatsApp: string;
    viewSpecs: string;
    specifications: string;
    packaging: string;
    availability: string;
    qualityAssuranceTitle: string;
    qualityAssuranceDesc: string;
    consultationCtaTitle: string;
    consultationCtaDesc: string;
    consultationCtaBtn: string;
  };

  // Food Consultation
  consultation: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    processingTitle: string;
    processingDesc: string;
    packagingTitle: string;
    packagingDesc: string;
    distributionTitle: string;
    distributionDesc: string;
    complianceTitle: string;
    complianceDesc: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    consultationTopic: string;
    message: string;
    submitBtn: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
  };

  // Media & Videos & Portfolio
  media: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    servicesTitle: string;
    servicesSubtitle: string;
    broadcastingTitle: string;
    broadcastingDesc: string;
    cinematographyTitle: string;
    cinematographyDesc: string;
    musicStudioTitle: string;
    musicStudioDesc: string;
    brandCampaignsTitle: string;
    brandCampaignsDesc: string;
    latestReelsTitle: string;
    latestReelsSubtitle: string;
    viewGalleryBtn: string;
    viewPortfolioBtn: string;
    watchVideo: string;
    watchFullContentYouTube: string;
    duration: string;
    publishedOn: string;
    portfolioHeading: string;
    portfolioSubtitle: string;
    filterAll: string;
    filterFilm: string;
    filterBroadcast: string;
    filterMusic: string;
    filterCommercial: string;
    collaborateCtaTitle: string;
    collaborateCtaSubtitle: string;
    collaborateCtaBtn: string;
  };

  // Contact Page
  contact: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    touchTitle: string;
    phoneLabel: string;
    emailLabel: string;
    officeLabel: string;
    hoursLabel: string;
    hoursValue: string;
    whatsappLabel: string;
    whatsappAction: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    email: string;
    phone: string;
    subjectType: string;
    typeGeneral: string;
    typeProduct: string;
    typeConsultation: string;
    typeMedia: string;
    message: string;
    submitBtn: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    quickHelpTitle: string;
    quickHelpDesc: string;
  };

  // Footer & Legal
  footer: {
    aboutText: string;
    quickLinks: string;
    foodsDivision: string;
    mediaDivision: string;
    contactHeading: string;
    rightsReserved: string;
    privacyPolicy: string;
    termsConditions: string;
    backToTop: string;
  };

  // Common & UI Elements
  common: {
    loading: string;
    noItemsFound: string;
    close: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    back: string;
    learnMore: string;
    viewAll: string;
    verified: string;
    popular: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  // 1. ODIA (DEFAULT LANGUAGE)
  or: {
    nav: {
      brandTitle: 'ଆଦିତ୍ୟ',
      brandSubtitle: 'ଫୁଡ୍ସ ଏବଂ ମିଡିଆ',
      tagline: 'ଗୁଣବତ୍ତା ଏବଂ ସୃଜନଶୀଳତା',
      home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
      about: 'ଆମ ବିଷୟରେ',
      foods: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ',
      foodsOverview: 'ଖାଦ୍ୟ ସମୀକ୍ଷା',
      dairyProducts: 'ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ',
      foodConsultation: 'ଖାଦ୍ୟ ପରାମର୍ଶ',
      media: 'ଆଦିତ୍ୟ ମିଡିଆ',
      mediaOverview: 'ମିଡିଆ ସମୀକ୍ଷା',
      videoGallery: 'ଭିଡିଓ ଗ୍ୟାଲେରୀ',
      mediaPortfolio: 'ମିଡିଆ ପୋର୍ଟଫୋଲିଓ',
      contact: 'ଯୋଗାଯୋଗ',
      getInTouch: 'ସମ୍ପର୍କ କରନ୍ତୁ',
      whatsapp: 'ହ୍ୱାଟ୍ସଆପ୍',
      menu: 'ମେନୁ',
      close: 'ବନ୍ଦ କରନ୍ତୁ',
      officialDivision: 'ଅଫିସିଆଲ୍ ବିଭାଗ',
      switchLanguage: 'ଭାଷା ବଦଳାନ୍ତୁ',
      currentLanguageName: 'ଓଡ଼ିଆ',
    },
    home: {
      heroKicker: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ',
      heroTitle: 'ପ୍ରତ୍ୟେକ ସ୍ୱାଦରେ ସତେଜତା, ପ୍ରତ୍ୟେକ ଦୃଶ୍ୟରେ ସୃଜନଶୀଳତା।',
      heroSubtitle: 'ବିଶୁଦ୍ଧ ପ୍ରାକୃତିକ ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ, ବ୍ୟବସାୟିକ ପରାମର୍ଶ ଏବଂ ଉଚ୍ଚମାନର ସିନେମାଟିକ୍ ମିଡିଆ ପ୍ରଯୋଜନାର ଏକ ଅନନ୍ୟ ସଙ୍ଗମ।',
      exploreFoodsBtn: 'ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ ଦେଖନ୍ତୁ',
      exploreMediaBtn: 'ମିଡିଆ ଭିଡିଓ ଗ୍ୟାଲେରୀ',
      contactBtn: 'ସମ୍ପର୍କ କରନ୍ତୁ',
      stats: {
        pureQualityLabel: '୧୦୦% ବିଶୁଦ୍ଧ',
        pureQualityDesc: 'କୌଣସି ରାସାୟନିକ ମିଶ୍ରଣ ବିନା ପ୍ରାକୃତିକ ଦୁଗ୍ଧ',
        viewsLabel: '୧M+',
        viewsDesc: 'ପ୍ରସାରଣ ଏବଂ ଡିଜିଟାଲ୍ ଦର୍ଶକଙ୍କ ସଂଖ୍ୟା',
        experienceLabel: '୧୦+ ବର୍ଷ',
        experienceDesc: 'ଗୁଣବତ୍ତା ଏବଂ ଗ୍ରାହକଙ୍କ ବିଶ୍ୱସନୀୟତା',
        householdsLabel: 'Coming Soon',
        householdsDesc: 'ନିୟମିତ ଭାବରେ ସେବାପ୍ରାପ୍ତ ପରିବାର',
      },
      foodsIntroKicker: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ ବିଭାଗ',
      foodsIntroTitle: 'ପ୍ରାକୃତିକ ସୁସ୍ୱାଦୁ ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ',
      foodsIntroDesc: 'ଫାର୍ମରୁ ସିଧାସଳଖ ଆପଣଙ୍କ ପରିବାର ପର୍ଯ୍ୟନ୍ତ ଶୀତଳୀକରଣ ପ୍ରକ୍ରିୟା ଦ୍ୱାରା ସତେଜତା ଏବଂ ପୌଷ୍ଟିକତା ସୁରକ୍ଷିତ ରଖାଯାଏ।',
      mediaIntroKicker: 'ଆଦିତ୍ୟ ମିଡିଆ ବିଭାଗ',
      mediaIntroTitle: 'ଚିତ୍ତାକର୍ଷକ ସିନେମାଟିକ୍ କାହାଣୀ ଓ ପ୍ରସାରଣ',
      mediaIntroDesc: 'ଟେଲିଭିଜନ ପ୍ରସାରଣ, ଚଳଚ୍ଚିତ୍ର ନିର୍ମାଣ, ରେକର୍ଡିଂ ଷ୍ଟୁଡିଓ ଏବଂ ବ୍ରାଣ୍ଡ୍ ପ୍ରମୋସନର ଏକ ସମନ୍ୱିତ ପ୍ଲାଟଫର୍ମ।',
      viewAllProducts: 'ସମସ୍ତ ଉତ୍ପାଦ ଦେଖନ୍ତୁ',
      viewAllVideos: 'ସମସ୍ତ ଭିଡିଓ ଦେଖନ୍ତୁ',
      quickInquiryTitle: 'ଆପଣଙ୍କର କୌଣସି ପ୍ରଶ୍ନ ଅଛି କି?',
      quickInquirySubtitle: 'ଆମ ଟିମ୍ ସହିତ ସିଧାସଳଖ କଥାବାର୍ତ୍ତା କରନ୍ତୁ କିମ୍ବା ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ ସୂଚନା ପାଆନ୍ତୁ।',
      pillarsTitle: 'ଆମ ଗୁଣବତ୍ତାର ୪ଟି ମୂଳସ୍ତମ୍ଭ',
      pillarsSubtitle: 'ଉଭୟ ଖାଦ୍ୟ ଏବଂ ମିଡିଆ କ୍ଷେତ୍ରରେ ଆମେ ସର୍ବଦା ଶ୍ରେଷ୍ଠ ମାନଦଣ୍ଡ ପାଳନ କରୁ।',
      purityPillar: 'ସମ୍ପୂର୍ଣ୍ଣ ବିଶୁଦ୍ଧତା',
      purityPillarDesc: 'ପ୍ରତ୍ୟେକ ଦୁଗ୍ଧ ଉତ୍ପାଦ ଫାର୍ମରୁ କଡ଼ା ପରୀକ୍ଷା ନିରୀକ୍ଷା ପରେ ପ୍ରସ୍ତୁତ କରାଯାଏ।',
      coldChainPillar: 'ଆଧୁନିକ କୋଲ୍ଡ ଚେନ୍',
      coldChainPillarDesc: '୪° ସେଣ୍ଟିଗ୍ରେଡ୍ ଶୀତଳୀକରଣ ଦ୍ୱାରା ପ୍ରାକୃତିକ ସତେଜତା ଓ ସ୍ୱାଦ ବଜାୟ ରହେ।',
      creativityPillar: 'ଅତୁଳନୀୟ ସୃଜନଶୀଳତା',
      creativityPillarDesc: 'ଅତ୍ୟାଧୁନିକ କ୍ୟାମେରା ଓ ଧ୍ୱନି ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ଦ୍ୱାରା ଉଚ୍ଚମାନର ସିନେମାଟିକ୍ ଅଭିଜ୍ଞତା।',
      communityPillar: 'ଲୋକଙ୍କ ବିଶ୍ୱାସ',
      communityPillarDesc: 'ଓଡ଼ିଶାର ହଜାର ହଜାର ପରିବାରଙ୍କ ଆସ୍ଥାଭାଜନ ହୋଇ ଆମେ ସେବା ଯୋଗାଉଛୁ।',
    },
    about: {
      heroTitle: 'ଦୁଇଟି ଦିଗ, ଉତ୍କର୍ଷତାର ଗୋଟିଏ ସଂକଳ୍ପ',
      heroSubtitle: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ ଏକ ସୁଚିନ୍ତିତ ପରିକଳ୍ପନା ଯାହା ପୁଷ୍ଟିକର ଖାଦ୍ୟ ଏବଂ ଆନନ୍ଦଦାୟକ ମନୋରଞ୍ଜନକୁ ଏକାଠି ଆଣିଥାଏ।',
      heritageTitle: 'ଆମର ଐତିହ୍ୟ ଓ ଲକ୍ଷ୍ୟ',
      heritageText1: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆର ଆରମ୍ଭ ଏକ ସ୍ପଷ୍ଟ ସଂକଳ୍ପରୁ ହୋଇଥିଲା — ଗ୍ରାହକମାନଙ୍କୁ ଶୁଦ୍ଧ, ଅପମିଶ୍ରଣ ମୁକ୍ତ ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ ପ୍ରଦାନ କରିବା ସହିତ ଓଡ଼ିଶାର ସମୃଦ୍ଧ କଳା, ସଂସ୍କୃତି ଏବଂ ସିନେମାକୁ ବିଶ୍ୱ ସ୍ତରରେ ପହଞ୍ଚାଇବା।',
      heritageText2: 'ଆମ ଫୁଡ୍ସ ଡିଭିଜନ୍ ପ୍ରତିଦିନ ସତେଜ କ୍ଷୀର, ଖାଣ୍ଟି ଘିଅ, ଲହୁଣୀ ଏବଂ ପନୀର ଉତ୍ପାଦନ କରେ। ଆମ ମିଡିଆ ଡିଭିଜନ୍ ଉଚ୍ଚକୋଟୀର ଚଳଚ୍ଚିତ୍ର, ଟେଲିଭିଜନ ବିଜ୍ଞାପନ ଏବଂ ସଙ୍ଗୀତ କାର୍ଯ୍ୟକ୍ରମ ପ୍ରସ୍ତୁତ କରେ।',
      missionTitle: 'ଆମ ଲକ୍ଷ୍ୟ',
      missionDesc: 'ପ୍ରତିଟି ଘରେ ସ୍ୱାସ୍ଥ୍ୟପ୍ରଦ ପୁଷ୍ଟିକର ଖାଦ୍ୟ ପହଞ୍ଚାଇବା ଏବଂ ସୃଜନଶୀଳ କାହାଣୀ ମାଧ୍ୟମରେ ଦର୍ଶକଙ୍କ ମନ ଜିତିବା।',
      visionTitle: 'ଆମ ଦୂରଦୃଷ୍ଟି',
      visionDesc: 'ଓଡ଼ିଶା ତଥା ସମଗ୍ର ଦେଶରେ ଗୁଣବତ୍ତା ଓ ସୃଜନଶୀଳତାର ଏକ ଅଗ୍ରଣୀ ବିଶ୍ୱସନୀୟ ବ୍ରାଣ୍ଡ୍ ହେବା।',
      valuesTitle: 'ଆମ ମୂଲ୍ୟବୋଧ',
      purityValue: 'ଶୁଦ୍ଧତା',
      purityValueDesc: 'କୌଣସି ରାସାୟନିକ ଅପମିଶ୍ରଣ ବିନା ପ୍ରାକୃତିକ ଗୁଣବତ୍ତା।',
      creativityValue: 'ନୂତନତା',
      creativityValueDesc: 'ନୂତନ ଭାବନା ଏବଂ ସିନେମାଟିକ୍ ଉତ୍କର୍ଷତା।',
      trustValue: 'ସଚ୍ଚୋଟତା',
      trustValueDesc: 'ଗ୍ରାହକ ଏବଂ ଅଂଶୀଦାରମାନଙ୍କ ସହିତ ସ୍ୱଚ୍ଛ ସମ୍ପର୍କ।',
      excellenceValue: 'ନିରନ୍ତର ଉନ୍ନତି',
      excellenceValueDesc: 'ଉତ୍ପାଦ ଏବଂ ସେବାର ପ୍ରତିଟି ସ୍ତରରେ ସର୍ବୋତ୍ତମ ମାନଦଣ୍ଡ।',
      contactCtaTitle: 'ଆମ ସହ ଯୋଡ଼ି ହୁଅନ୍ତୁ',
      contactCtaSubtitle: 'ଉତ୍ପାଦ କ୍ରୟ କିମ୍ବା ମିଡିଆ ପ୍ରଯୋଜନା ପାଇଁ ଆଜି ହିଁ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
      contactCtaBtn: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
    },
    foods: {
      badge: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ',
      heroTitle: 'ଖାଣ୍ଟି ଗୁଣବତ୍ତା, ପ୍ରାକୃତିକ ସ୍ୱାଦ',
      heroSubtitle: 'ଗୋ-ପାଳକଙ୍କ ଫାର୍ମରୁ ସିଧାସଳଖ ସଂଗୃହୀତ ସତେଜ କ୍ଷୀର, ସ୍ୱାଦିଷ୍ଟ ଘିଅ, କୋମଳ ପନୀର ଓ ସ୍ୱାସ୍ଥ୍ୟପ୍ରଦ ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ।',
      productsHeading: 'ଆମର ଦୁଗ୍ଧଜାତ ଉତ୍ପାଦଗୁଡ଼ିକ',
      productsSubtitle: 'କଠୋର ପରୀକ୍ଷଣ ଏବଂ ସ୍ୱଚ୍ଛ ପରିବେଶରେ ପ୍ରସ୍ତୁତ ପ୍ରିମିୟମ୍ ସାମଗ୍ରୀ।',
      filterAll: 'ସମସ୍ତ ସାମଗ୍ରୀ',
      filterMilk: 'କ୍ଷୀର (Milk)',
      filterGhee: 'ଘିଅ (Ghee)',
      filterButter: 'ଲହୁଣୀ (Butter)',
      filterPaneer: 'ପନୀର (Paneer)',
      filterCurd: 'ଦହି (Curd)',
      orderWhatsApp: 'ହ୍ୱାଟ୍ସଆପ୍ ରେ ଅର୍ଡର କରନ୍ତୁ',
      viewSpecs: 'ବିଶେଷତା ଦେଖନ୍ତୁ',
      specifications: 'ମାନଦଣ୍ଡ ଓ ବିଶେଷତା',
      packaging: 'ପ୍ୟାକେଜିଂ ବିବରଣୀ',
      availability: 'ଉପଲବ୍ଧତା',
      qualityAssuranceTitle: 'ଗୁଣବତ୍ତାର ପ୍ରତିଶ୍ରୁତି',
      qualityAssuranceDesc: 'ଆମର ସମସ୍ତ ଉତ୍ପାଦ ପୁଷ୍ଟିକର, ସ୍ୱଚ୍ଛ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟକର ମାନଦଣ୍ଡରେ ପ୍ରସ୍ତୁତ।',
      consultationCtaTitle: 'ଖାଦ୍ୟ ବ୍ୟବସାୟ ପରାମର୍ଶ ଆବଶ୍ୟକ କି?',
      consultationCtaDesc: 'ଡାଏରୀ ପ୍ରକ୍ରିୟାକରଣ, କୋଲ୍ଡ ଚେନ୍ ଏବଂ ପ୍ୟାକେଜିଂ ପାଇଁ ଆମର ବିଶେଷଜ୍ଞ ଟିମ୍ ଉପଲବ୍ଧ।',
      consultationCtaBtn: 'ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ',
    },
    consultation: {
      badge: 'ଖାଦ୍ୟ ପରାମର୍ଶ ସେବା',
      heroTitle: 'ଡାଏରୀ ଏବଂ ଖାଦ୍ୟ ବ୍ୟବସାୟ ପରାମର୍ଶ',
      heroSubtitle: 'ପ୍ରକ୍ରିୟାକରଣ, ପ୍ୟାକେଜିଂ, ସଂରକ୍ଷଣ ଏବଂ ବଜାର ବିତରଣ ପାଇଁ ଅଭିଜ୍ଞ ବିଶେଷଜ୍ଞଙ୍କ ନିର୍ଭୁଲ ମାର୍ଗଦର୍ଶନ।',
      whyChooseTitle: 'ଆମେ କିପରି ସାହାଯ୍ୟ କରୁ',
      whyChooseSubtitle: 'ଆପଣଙ୍କ ଖାଦ୍ୟ ଉଦ୍ୟୋଗକୁ ସଫଳ କରିବା ପାଇଁ ବ୍ୟବହାରିକ ପରାମର୍ଶ।',
      processingTitle: 'ଡାଏରୀ ପ୍ରକ୍ରିୟାକରଣ ପଦ୍ଧତି',
      processingDesc: 'ପାଶ୍ଚରାଇଜେସନ୍, ହୋମୋଜେନାଇଜେସନ୍ ଏବଂ ସ୍ୱଚ୍ଛତା ନିୟନ୍ତ୍ରଣ।',
      packagingTitle: 'ଆଧୁନିକ ପ୍ୟାକେଜିଂ ସମାଧାନ',
      packagingDesc: 'ଶୀତଳୀକରଣ ଏବଂ ବୈଜ୍ଞାନିକ ପ୍ୟାକିଂ ଯାହା ସତେଜତା ବଜାୟ ରଖେ।',
      distributionTitle: 'କୋଲ୍ଡ ଚେନ୍ ଓ ବିତରଣ',
      distributionDesc: 'ସଠିକ୍ ତାପମାତ୍ରାରେ ଉତ୍ପାଦ ପରିବହନ ଓ ବଜାର ଯୋଗାଣ।',
      complianceTitle: 'ମାନକ ଓ ଲାଇସେନ୍ସିଂ',
      complianceDesc: 'FSSAI ନିୟମାବଳୀ ଓ ଗୁଣବତ୍ତା ପ୍ରମାଣପତ୍ର ସହାୟତା।',
      formTitle: 'ପରାମର୍ଶ ଅନୁରୋଧ ଫର୍ମ',
      formSubtitle: 'ଆପଣଙ୍କ ବ୍ୟବସାୟିକ ଆବଶ୍ୟକତା ଜଣାନ୍ତୁ, ଆମେ ଯୋଗାଯୋଗ କରିବୁ।',
      fullName: 'ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ',
      email: 'ଇମେଲ୍ ଠିକଣା',
      phone: 'ଫୋନ୍ ନମ୍ବର',
      businessName: 'ବ୍ୟବସାୟ / କମ୍ପାନୀ ନାମ (ଇଚ୍ଛାଧୀନ)',
      consultationTopic: 'ପରାମର୍ଶର ବିଷୟ',
      message: 'ବାର୍ତ୍ତା / ଆବଶ୍ୟକତା ସମ୍ବନ୍ଧରେ ଲେଖନ୍ତୁ',
      submitBtn: 'ଅନୁରୋଧ ପଠାନ୍ତୁ',
      submitting: 'ପଠାଯାଉଛି...',
      successMessage: 'ଧନ୍ୟବାଦ! ଆପଣଙ୍କ ପରାମର୍ଶ ଅନୁରୋଧ ସଫଳତାର ସହ ଗ୍ରହଣ କରାଯାଇଛି।',
      errorMessage: 'ଅନୁରୋଧ ପଠାଇବାରେ ତ୍ରୁଟି ହେଲା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ କିମ୍ବା ହ୍ୱାଟ୍ସଆପ୍ କରନ୍ତୁ।',
    },
    media: {
      badge: 'ଆଦିତ୍ୟ ମିଡିଆ',
      heroTitle: 'ହୃଦୟସ୍ପର୍ଶୀ କାହାଣୀ, ଅଭିନବ ମିଡିଆ',
      heroSubtitle: 'ଚଳଚ୍ଚିତ୍ର ନିର୍ମାଣ, ଟେଲିଭିଜନ କାର୍ଯ୍ୟକ୍ରମ, ସଙ୍ଗୀତ ରେକର୍ଡିଂ ଏବଂ ଡିଜିଟାଲ୍ ବିଷୟବସ୍ତୁର ଆକର୍ଷଣୀୟ ଦୁନିଆ।',
      servicesTitle: 'ଆମର ମିଡିଆ ସେବାସମୂହ',
      servicesSubtitle: 'ଚିନ୍ତାଧାରାରୁ ସିନେମା ପରଦା ପର୍ଯ୍ୟନ୍ତ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରଯୋଜନା।',
      broadcastingTitle: 'ଟେଲିଭିଜନ ଓ ପ୍ରସାରଣ',
      broadcastingDesc: 'ଲାଇଭ୍ ଇଭେଣ୍ଟ, ସାଂସ୍କୃତିକ ପ୍ରସାରଣ ଏବଂ ଡିଜିଟାଲ୍ ସୋ।',
      cinematographyTitle: 'ସିନେମାଟୋଗ୍ରାଫି ଓ ଫିଲ୍ମ ନିର୍ମାଣ',
      cinematographyDesc: '୪K କ୍ୟାମେରା, ଡ୍ରୋନ୍ ସୁଟ୍ ଏବଂ ଉନ୍ନତ ରଙ୍ଗ ସଂଶୋଧନ।',
      musicStudioTitle: 'ଅତ୍ୟାଧୁନିକ ମ୍ୟୁଜିକ୍ ଷ୍ଟୁଡିଓ',
      musicStudioDesc: 'ଧ୍ୱନି ମୁଦ୍ରଣ, ସଙ୍ଗୀତ ରଚନା, ମିକ୍ସିଂ ଏବଂ ମାଷ୍ଟରିଂ।',
      brandCampaignsTitle: 'କମେଡି ଓ ମନୋରଞ୍ଜନ',
      brandCampaignsDesc: 'ଦର୍ଶକଙ୍କୁ ହସାଇବା, ଆନନ୍ଦ ଦେବା ଏବଂ ପ୍ରତ୍ୟେକ ମୁହୂର୍ତ୍ତକୁ ଉପଭୋଗ୍ୟ କରିବା ପାଇଁ ପ୍ରସ୍ତୁତ କମେଡି ଓ ମନୋରଞ୍ଜନ ଭିଡିଓ। ଆମର ସବୁଠାରୁ ଲୋକପ୍ରିୟ ଭିଡିଓ ଦେଖନ୍ତୁ ଏବଂ ଆମ ଅଫିସିଆଲ୍ ୟୁଟ୍ୟୁବ୍ ଚ୍ୟାନେଲରେ ସମ୍ପୂର୍ଣ୍ଣ ସଂଗ୍ରହ ଅନୁସନ୍ଧାନ କରନ୍ତୁ।',
      latestReelsTitle: 'ସଦ୍ୟତମ ଭିଡିଓ ଓ ରିଲ୍ସ',
      latestReelsSubtitle: 'ଆମ ୟୁଟ୍ୟୁବ୍ ଚ୍ୟାନେଲ୍ ଏବଂ ଷ୍ଟୁଡିଓ କାର୍ଯ୍ୟକ୍ରମର ଏକ ଝଲକ।',
      viewGalleryBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଭିଡିଓ ଗ୍ୟାଲେରୀ',
      viewPortfolioBtn: 'ପ୍ରୋଜେକ୍ଟ ପୋର୍ଟଫୋଲିଓ',
      watchVideo: 'ଭିଡିଓ ଦେଖନ୍ତୁ',
      watchFullContentYouTube: 'Watch Full Content on YouTube',
      duration: 'ସମୟ',
      publishedOn: 'ପ୍ରକାଶିତ',
      portfolioHeading: 'ସୃଜନଶୀଳ କାର୍ଯ୍ୟାବଳୀ',
      portfolioSubtitle: 'ସଫଳତାର ସହ ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଥିବା ପ୍ରମୁଖ ମିଡିଆ ପ୍ରକଳ୍ପ।',
      filterAll: 'ସମସ୍ତ ପ୍ରକଳ୍ପ',
      filterFilm: 'ଚଳଚ୍ଚିତ୍ର (Films)',
      filterBroadcast: 'ପ୍ରସାରଣ (Broadcast)',
      filterMusic: 'ସଙ୍ଗୀତ (Music)',
      filterCommercial: 'ବିଜ୍ଞାପନ (Commercials)',
      collaborateCtaTitle: 'ଏକ ମିଡିଆ ପ୍ରୋଜେକ୍ଟ କରିବାକୁ ଚାହାଁନ୍ତି କି?',
      collaborateCtaSubtitle: 'ଆପଣଙ୍କ ବ୍ରାଣ୍ଡ୍ କିମ୍ବା କାହାଣୀକୁ ଜୀବନ୍ତ କରିବା ପାଇଁ ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
      collaborateCtaBtn: 'ପ୍ରୋଜେକ୍ଟ ଆରମ୍ଭ କରନ୍ତୁ',
    },
    contact: {
      badge: 'ସମ୍ପର୍କ ସୂଚନା',
      heroTitle: 'ଆମ ସହିତ ସିଧାସଳଖ କଥାବାର୍ତ୍ତା କରନ୍ତୁ',
      heroSubtitle: 'ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ କ୍ରୟ, ଖାଦ୍ୟ ପରାମର୍ଶ କିମ୍ବା ମିଡିଆ ସହଯୋଗ ପାଇଁ ଆମେ ସର୍ବଦା ପ୍ରସ୍ତୁତ।',
      touchTitle: 'ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ ଓ ଯୋଗାଯୋଗ',
      phoneLabel: 'ଟେଲିଫୋନ୍ ନମ୍ବର',
      emailLabel: 'ଇମେଲ୍ ଠିକଣା',
      officeLabel: 'କାର୍ଯ୍ୟାଳୟ ଠିକଣା',
      hoursLabel: 'କାର୍ଯ୍ୟାଳୟ ସମୟ',
      hoursValue: 'ସୋମବାର - ଶନିବାର: ସକାଳ ୮ଟା ରୁ ସନ୍ଧ୍ୟା ୮ଟା',
      whatsappLabel: 'ହ୍ୱାଟ୍ସଆପ୍ ସେବା',
      whatsappAction: 'ହ୍ୱାଟ୍ସଆପ୍ ରେ ଚାଟ୍ କରନ୍ତୁ',
      formTitle: 'ସନ୍ଦେଶ ପଠାନ୍ତୁ',
      formSubtitle: 'ତଳେ ଦିଆଯାଇଥିବା ଫର୍ମ ପୂରଣ କରନ୍ତୁ, ଆମ ଟିମ୍ ତୁରନ୍ତ ଉତ୍ତର ଦେବେ।',
      fullName: 'ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ',
      email: 'ଇମେଲ୍ ଠିକଣା',
      phone: 'ଫୋନ୍ ନମ୍ବର',
      subjectType: 'ଅନୁସନ୍ଧାନର ବିଷୟ',
      typeGeneral: 'ସାଧାରଣ ପଚରାଉଚୁରା',
      typeProduct: 'ଦୁଗ୍ଧ ଉତ୍ପାଦ କ୍ରୟ',
      typeConsultation: 'ଖାଦ୍ୟ ପରାମର୍ଶ ସେବା',
      typeMedia: 'ମିଡିଆ ଓ ଚଳଚ୍ଚିତ୍ର ପ୍ରକଳ୍ପ',
      message: 'ଆପଣଙ୍କ ବାର୍ତ୍ତା',
      submitBtn: 'ସନ୍ଦେଶ ପଠାନ୍ତୁ',
      submitting: 'ପଠାଯାଉଛି...',
      successMessage: 'ଧନ୍ୟବାଦ! ଆପଣଙ୍କ ସନ୍ଦେଶ ସଫଳତାର ସହ ପହଞ୍ଚିଛି। ଆମେ ଶୀଘ୍ର ଆପଣଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିବୁ।',
      errorMessage: 'ସନ୍ଦେଶ ପଠାଇବାରେ ତ୍ରୁଟି ହେଲା। ଦୟାକରି ସିଧାସଳଖ ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
      quickHelpTitle: 'ଶୀଘ୍ର ସହାୟତା ପାଇଁ',
      quickHelpDesc: 'ତୁରନ୍ତ ସୂଚନା ପାଇବା ପାଇଁ ଆମ ହେଲ୍ପଲାଇନ୍ ନମ୍ବରରେ କଲ୍ କରନ୍ତୁ କିମ୍ବା ହ୍ୱାଟ୍ସଆପ୍ କରନ୍ତୁ।',
    },
    footer: {
      aboutText: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ ଏବଂ ମିଡିଆ — ବିଶୁଦ୍ଧ ଦୁଗ୍ଧଜାତ ସାମଗ୍ରୀ, ବିଶେଷଜ୍ଞ ପରାମର୍ଶ ଏବଂ ସିନେମାଟିକ୍ ମନୋରଞ୍ଜନର ଏକ ବିଶ୍ୱସନୀୟ ଓଡ଼ିଶା ବ୍ରାଣ୍ଡ୍।',
      quickLinks: 'ସିଧାସଳଖ ଲିଙ୍କ୍',
      foodsDivision: 'ଆଦିତ୍ୟ ଫୁଡ୍ସ',
      mediaDivision: 'ଆଦିତ୍ୟ ମିଡିଆ',
      contactHeading: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
      rightsReserved: 'ସର୍ବସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ।',
      privacyPolicy: 'ଗୋପନୀୟତା ନୀତି',
      termsConditions: 'ନିୟମ ଓ ସର୍ତ୍ତାବଳୀ',
      backToTop: 'ଉପରକୁ ଯାଆନ୍ତୁ',
    },
    common: {
      loading: 'ଲୋଡ୍ ହେଉଛି...',
      noItemsFound: 'କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ',
      close: 'ବନ୍ଦ କରନ୍ତୁ',
      cancel: 'ବାତିଲ୍ କରନ୍ତୁ',
      confirm: 'ନିଶ୍ଚିତ କରନ୍ତୁ',
      save: 'ସଂରକ୍ଷଣ କରନ୍ତୁ',
      delete: 'ହଟାନ୍ତୁ',
      edit: 'ସମ୍ପାଦନ କରନ୍ତୁ',
      back: 'ଫେରନ୍ତୁ',
      learnMore: 'ଅଧିକ ଜାଣନ୍ତୁ',
      viewAll: 'ସବୁ ଦେଖନ୍ତୁ',
      verified: 'ପ୍ରମାଣିତ',
      popular: 'ଲୋକପ୍ରିୟ',
    },
  },

  // 2. ENGLISH LANGUAGE
  en: {
    nav: {
      brandTitle: 'ADITYA',
      brandSubtitle: 'FOOD & MEDIA',
      tagline: 'Quality & Creativity',
      home: 'Home',
      about: 'About Us',
      foods: 'Aditya Foods',
      foodsOverview: 'Foods Overview',
      dairyProducts: 'Dairy Products',
      foodConsultation: 'Food Consultation',
      media: 'Aditya Media',
      mediaOverview: 'Media Overview',
      videoGallery: 'Video Gallery',
      mediaPortfolio: 'Media Portfolio',
      contact: 'Contact Us',
      getInTouch: 'Get in Touch',
      whatsapp: 'WhatsApp',
      menu: 'Menu',
      close: 'Close',
      officialDivision: 'Official Division',
      switchLanguage: 'Switch Language',
      currentLanguageName: 'English',
    },
    home: {
      heroKicker: 'Aditya Food & Media',
      heroTitle: 'Freshness in Every Bite. Creativity in Every Frame.',
      heroSubtitle: 'A harmonious blend of certified pure dairy products, food processing consultation, and high-impact cinematic media entertainment.',
      exploreFoodsBtn: 'Explore Dairy Products',
      exploreMediaBtn: 'Watch Video Gallery',
      contactBtn: 'Contact Us',
      stats: {
        pureQualityLabel: '100% Pure',
        pureQualityDesc: 'Ethically sourced hormone-free natural dairy',
        viewsLabel: '1M+',
        viewsDesc: 'Television broadcast and digital audiences',
        experienceLabel: '10+ Years',
        experienceDesc: 'Uncompromising quality and customer trust',
        householdsLabel: 'Coming Soon',
        householdsDesc: 'Daily served households across Odisha',
      },
      foodsIntroKicker: 'Aditya Foods Division',
      foodsIntroTitle: 'Pure, Farm-Fresh Dairy Nutrition',
      foodsIntroDesc: 'Rapidly pasteurized and maintained at strict 4°C cold chain temperatures to preserve authentic sweetness, natural nutrients, and farm fresh aroma.',
      mediaIntroKicker: 'Aditya Media Division',
      mediaIntroTitle: 'Stories That Inspire. Media That Connects.',
      mediaIntroDesc: 'From television broadcasting and feature documentaries to professional sound recording and compelling brand advertising.',
      viewAllProducts: 'View All Products',
      viewAllVideos: 'View All Videos',
      quickInquiryTitle: 'Have Questions or Looking to Partner?',
      quickInquirySubtitle: 'Speak directly with our team or receive immediate assistance on WhatsApp.',
      pillarsTitle: 'Our 4 Pillars of Excellence',
      pillarsSubtitle: 'Whether in food safety or visual storytelling, we adhere to the most rigorous standards.',
      purityPillar: 'Absolute Purity',
      purityPillarDesc: 'Every batch of milk undergoes multi-stage laboratory testing before processing.',
      coldChainPillar: '4°C Cold Chain Precision',
      coldChainPillarDesc: 'Immediate temperature management ensures zero spoilage and authentic taste.',
      creativityPillar: 'Cinematic Craftsmanship',
      creativityPillarDesc: 'Ultra-HD cameras, acoustic studio mastering, and emotive storytelling.',
      communityPillar: 'Rooted in Trust',
      communityPillarDesc: 'Deeply committed to Odisha’s farmers, consumers, and artistic heritage.',
    },
    about: {
      heroTitle: 'Two Worlds. One Vision for Excellence.',
      heroSubtitle: 'Aditya Food & Media unites agricultural purity with creative storytelling to enrich daily life and cultural pride.',
      heritageTitle: 'Our Story & Purpose',
      heritageText1: 'Aditya Food & Media was born from a unified philosophy: food must nourish the body with unwavering integrity, and media must inspire the soul with genuine artistry.',
      heritageText2: 'Our Foods division operates ethical dairy sourcing, processing fresh farm milk, pure golden ghee, cultured butter, and tender paneer. Our Media division produces television broadcasts, musical compositions, and cinematic campaigns.',
      missionTitle: 'Our Mission',
      missionDesc: 'To deliver wholesome nutrition to every family while creating compelling media that elevates regional talent onto national stages.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be Odisha’s foremost household name recognized for gold-standard food quality and cutting-edge creative media.',
      valuesTitle: 'Our Core Values',
      purityValue: 'Uncompromised Purity',
      purityValueDesc: 'Natural nutrition free of synthetic hormones or fillers.',
      creativityValue: 'Bold Creativity',
      creativityValueDesc: 'Pushing boundaries in cinematography and storytelling.',
      trustValue: 'Enduring Trust',
      trustValueDesc: 'Transparent relationships with farmers, clients, and viewers.',
      excellenceValue: 'Continuous Excellence',
      excellenceValueDesc: 'Setting benchmarks in quality control and artistic output.',
      contactCtaTitle: 'Partner With Us Today',
      contactCtaSubtitle: 'Connect with our team for bulk orders, distribution, or media productions.',
      contactCtaBtn: 'Get in Touch',
    },
    foods: {
      badge: 'Aditya Foods',
      heroTitle: 'Pure Quality. Authentic Taste.',
      heroSubtitle: 'Fresh farm milk, artisanal golden ghee, farm-fresh butter, and melt-in-the-mouth paneer crafted with generational care.',
      productsHeading: 'Our Farm-Fresh Dairy Catalog',
      productsSubtitle: 'Produced under strict hygiene and temperature controls for unmatched freshness.',
      filterAll: 'All Products',
      filterMilk: 'Fresh Milk',
      filterGhee: 'Pure Ghee',
      filterButter: 'Table Butter',
      filterPaneer: 'Malai Paneer',
      filterCurd: 'Farmhouse Curd',
      orderWhatsApp: 'Order / Enquire on WhatsApp',
      viewSpecs: 'View Specifications',
      specifications: 'Specifications & Standards',
      packaging: 'Packaging Options',
      availability: 'Availability',
      qualityAssuranceTitle: 'Our Quality Assurance',
      qualityAssuranceDesc: 'Free from synthetic hormones, adulterants, or chemical softeners. Tested every morning.',
      consultationCtaTitle: 'Starting or Scaling a Food Enterprise?',
      consultationCtaDesc: 'Our food consultancy helps dairy entrepreneurs with processing, packaging, cold storage, and certifications.',
      consultationCtaBtn: 'Book a Consultation',
    },
    consultation: {
      badge: 'Food Consultation Services',
      heroTitle: 'Dairy & Food Business Consultation',
      heroSubtitle: 'Actionable guidance on processing, cold-chain preservation, packaging, and regulatory compliance.',
      whyChooseTitle: 'How We Accelerate Your Food Venture',
      whyChooseSubtitle: 'Decades of hands-on dairy industry insight delivered to your team.',
      processingTitle: 'Processing & Plant Optimization',
      processingDesc: 'Pasteurization, homogenization, batch testing, and hygiene setup.',
      packagingTitle: 'Packaging & Shelf-Life Extension',
      packagingDesc: 'Eco-friendly and protective packaging that safeguards freshness.',
      distributionTitle: 'Cold-Chain & Route Logistics',
      distributionDesc: 'Temperature-controlled routing for zero spoilage from farm to retail.',
      complianceTitle: 'Certifications & FSSAI Standards',
      complianceDesc: 'Regulatory documentation, safety audits, and laboratory compliance.',
      formTitle: 'Consultation Inquiry Form',
      formSubtitle: 'Share your requirements and our senior advisors will connect with you.',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      businessName: 'Business / Brand Name (Optional)',
      consultationTopic: 'Topic of Consultation',
      message: 'Provide details about your venture or challenges',
      submitBtn: 'Submit Consultation Request',
      submitting: 'Submitting...',
      successMessage: 'Thank you! Your consultation request has been submitted successfully.',
      errorMessage: 'Failed to submit request. Please try again or message us on WhatsApp.',
    },
    media: {
      badge: 'Aditya Media',
      heroTitle: 'Stories That Inspire. Media That Connects.',
      heroSubtitle: 'Explore the creative world of Aditya Media — television broadcasting, documentaries, musical sessions, and high-impact brand commercials.',
      servicesTitle: 'Our Media Production Capabilities',
      servicesSubtitle: 'Comprehensive services from script development to final 4K post-production.',
      broadcastingTitle: 'Television & Live Broadcast',
      broadcastingDesc: 'Multi-camera studio setups, live sports, and cultural festivals.',
      cinematographyTitle: 'Cinematography & Films',
      cinematographyDesc: '4K/6K cinema cameras, aerial drones, and color grading.',
      musicStudioTitle: 'Acoustic Sound & Music Studio',
      musicStudioDesc: 'Dolby Atmos mixing, vocal recording, and original compositions.',
      brandCampaignsTitle: 'Comedy & Entertainment',
      brandCampaignsDesc: 'Enjoy comedy, entertaining videos, and engaging content created to make audiences laugh, relax, and enjoy every moment. Discover our most popular videos and explore the full collection on our official YouTube channel.',
      latestReelsTitle: 'Featured Video Showcase',
      latestReelsSubtitle: 'Curated selections from our YouTube reels and studio productions.',
      viewGalleryBtn: 'Open Video Gallery',
      viewPortfolioBtn: 'Explore Media Portfolio',
      watchVideo: 'Watch Video',
      watchFullContentYouTube: 'Watch Full Content on YouTube',
      duration: 'Duration',
      publishedOn: 'Published',
      portfolioHeading: 'Selected Production Showcase',
      portfolioSubtitle: 'Highlighting standout documentary, broadcast, and musical projects.',
      filterAll: 'All Projects',
      filterFilm: 'Films',
      filterBroadcast: 'Broadcast',
      filterMusic: 'Music Studio',
      filterCommercial: 'Commercials',
      collaborateCtaTitle: 'Have a Story to Tell?',
      collaborateCtaSubtitle: 'Let’s produce your next film, advertisement, or studio album together.',
      collaborateCtaBtn: 'Start a Project',
    },
    contact: {
      badge: 'Get in Touch',
      heroTitle: 'Connect With Aditya Food & Media',
      heroSubtitle: 'Whether you need farm-fresh dairy supplies, business consultation, or cinematic media production, our doors are always open.',
      touchTitle: 'Office & Direct Communication',
      phoneLabel: 'Phone Support',
      emailLabel: 'Official Email',
      officeLabel: 'Headquarters',
      hoursLabel: 'Working Hours',
      hoursValue: 'Monday – Saturday: 8:00 AM – 8:00 PM',
      whatsappLabel: 'WhatsApp Assistance',
      whatsappAction: 'Chat on WhatsApp',
      formTitle: 'Send Us a Direct Message',
      formSubtitle: 'Fill out the form below and our leadership team will respond promptly.',
      fullName: 'Your Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subjectType: 'Reason for Inquiry',
      typeGeneral: 'General Inquiry',
      typeProduct: 'Dairy Products Order / Distribution',
      typeConsultation: 'Food Business Consultation',
      typeMedia: 'Media & Production Collaboration',
      message: 'Your Message',
      submitBtn: 'Send Message',
      submitting: 'Sending...',
      successMessage: 'Thank you! Your message has been received. We will get back to you shortly.',
      errorMessage: 'Could not send message. Please try again or WhatsApp us directly.',
      quickHelpTitle: 'Need Immediate Help?',
      quickHelpDesc: 'Call our direct office line or click to chat with a representative on WhatsApp.',
    },
    footer: {
      aboutText: 'Aditya Food & Media — Where Quality Meets Creativity. Delivering certified pure dairy products, food consultation, and cinematic storytelling across Odisha and beyond.',
      quickLinks: 'Quick Navigation',
      foodsDivision: 'Aditya Foods',
      mediaDivision: 'Aditya Media',
      contactHeading: 'Headquarters',
      rightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      backToTop: 'Back to Top',
    },
    common: {
      loading: 'Loading...',
      noItemsFound: 'No records found',
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      learnMore: 'Learn More',
      viewAll: 'View All',
      verified: 'Verified',
      popular: 'Popular',
    },
  },
};

/**
 * Natural Odia product translations mapper
 */
export const PRODUCT_TRANSLATIONS: Record<string, { name: string; category: string; description: string; packaging?: string; availability?: string }> = {
  'prod-milk': {
    name: 'ସତେଜ ଫାର୍ମ କ୍ଷୀର (Fresh Milk)',
    category: 'କ୍ଷୀର',
    description: 'ଗୋ-ପାଳକଙ୍କ ଫାର୍ମରୁ ସିଧାସଳଖ ସଂଗୃହୀତ, ୪° ସେଣ୍ଟିଗ୍ରେଡ୍ ଶୀତଳୀକରଣ ଦ୍ୱାରା ପ୍ରାକୃତିକ ମିଠାସ୍ୱାଦ, ଆବଶ୍ୟକ ଖଣିଜ ଲବଣ ଏବଂ ସତେଜତା ସଂରକ୍ଷିତ।',
    packaging: 'Coming Soon',
    availability: 'Coming Soon',
  },
  'prod-ghee': {
    name: 'ଖାଣ୍ଟି ସୁବର୍ଣ୍ଣ ଘିଅ (Pure Ghee)',
    category: 'ଘିଅ',
    description: 'ପାରମ୍ପରିକ ଦାନାଦାର ଗଠନ ଏବଂ ଆକର୍ଷଣୀୟ ସୁବାସ ଯୁକ୍ତ ୧୦୦% ବିଶୁଦ୍ଧ ଦେଶୀ ଗୁଆ ଘିଅ।',
    packaging: 'Coming Soon',
    availability: 'Coming Soon',
  },
  'prod-butter': {
    name: 'ସତେଜ ଟେବୁଲ୍ ଲହୁଣୀ (Table Butter)',
    category: 'ଲହୁଣୀ',
    description: 'ଶୁଦ୍ଧ ତାଜା କ୍ରିମରୁ ପ୍ରସ୍ତୁତ କୋମଳ ଓ ସୁସ୍ୱାଦୁ ଲହୁଣୀ, କୌଣସି କୃତ୍ରିମ ରଙ୍ଗ ବା ସଂରକ୍ଷକ ବିନା।',
    packaging: 'Coming Soon',
    availability: 'Coming Soon',
  },
  'prod-paneer': {
    name: 'ସତେଜ ମଲାଇ ପନୀର (Malai Paneer)',
    category: 'ପନୀର',
    description: 'ନରମ, କୋମଳ ଓ ଉଚ୍ଚ ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ପ୍ରିମିୟମ୍ ପନୀର, ଯାହା ମୁହଁରେ ମିଳାଇଯାଏ।',
    packaging: 'Coming Soon',
    availability: 'Coming Soon',
  },
  'prod-curd': {
    name: 'ଗାଢ଼ ଫାର୍ମ ଦହି (Thick Curd / Dahi)',
    category: 'ଦହି',
    description: 'ଉପକାରୀ ପ୍ରୋବାୟୋଟିକ୍ ସଂସ୍କୃତି ସହିତ ପ୍ରସ୍ତୁତ ଗାଢ଼, ସୁସ୍ୱାଦୁ ଓ ଶୀତଳକାରୀ ଦହି।',
    packaging: 'Coming Soon',
    availability: 'Coming Soon',
  },
};

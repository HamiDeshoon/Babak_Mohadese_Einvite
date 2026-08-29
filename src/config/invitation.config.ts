export interface InvitationConfig {
  couple: {
    groomEn: string;
    groomFa: string;
    brideEn: string;
    brideFa: string;
    monogramEn: string;
    monogramFa: string;
    groomFamilyEn: string;
    groomFamilyFa: string;
    brideFamilyEn: string;
    brideFamilyFa: string;
  };
  event: {
    targetIsoDate: string;
    endIsoDate: string;
    dateEn: string;
    dateFa: string;
    timeEn: string;
    timeFa: string;
    venueNameEn: string;
    venueNameFa: string;
    venueAddressEn: string;
    venueAddressFa: string;
    cityEn: string;
    cityFa: string;
  };
  navigation: {
    googleMapsEmbedUrl: string;
    googleMapsDirectUrl: string;
    appleMapsDirectUrl: string;
    neshanDirectUrl: string;
    baladDirectUrl: string;
    wazeDirectUrl: string;
  };
  media: {
    heroPoster: string;
    heroVideo: string;
    featuredVideo: string;
    featuredVideoPoster: string;
    audioTrack: {
      en: string;
      fa: string;
    };
    gallery: Array<{
      id: string;
      src: string;
      titleEn: string;
      titleFa: string;
      captionEn: string;
      captionFa: string;
    }>;
  };
  story: {
    quoteEn: string;
    quoteFa: string;
    chapters: Array<{
      year: string;
      yearFa: string;
      titleEn: string;
      titleFa: string;
      contentEn: string;
      contentFa: string;
      image?: string;
    }>;
  };
  schedule: Array<{
    time: string;
    timeFa: string;
    titleEn: string;
    titleFa: string;
    descEn: string;
    descFa: string;
    icon: string;
  }>;
  rsvp: {
    deadlineEn: string;
    deadlineFa: string;
    sheetEndpoint: string;
    dietaryOptions: string[];
  };
  contacts: {
    groom: {
      nameEn: string;
      nameFa: string;
      phone: string;
      displayPhone: string;
    };
    bride: {
      nameEn: string;
      nameFa: string;
      phone: string;
      displayPhone: string;
    };
  };
}

export const invitationConfig: InvitationConfig = {
  couple: {
    groomEn: 'Babak',
    groomFa: 'بابک',
    brideEn: 'Mohadese',
    brideFa: 'محدثه',
    monogramEn: 'B & M',
    monogramFa: 'ب & م',
    groomFamilyEn: 'The Ebrahimi & Estaji Families',
    groomFamilyFa: 'خانواده‌های محترم ابراهیمی و استاجی',
    brideFamilyEn: 'The Estaji Family',
    brideFamilyFa: 'خانواده محترم استاجی',
  },
  event: {
    targetIsoDate: '2026-10-09T18:00:00',
    endIsoDate: '2026-10-10T02:00:00',
    dateEn: 'Friday, October 9, 2026',
    dateFa: 'جمعه ۱۷ مهر ۱۴۰۵',
    timeEn: 'Reception & Doors Open at 6:00 PM',
    timeFa: 'ساعت ۱۸:۰۰ (۶ عصر)',
    venueNameEn: 'Rosamir Palace',
    venueNameFa: 'عمارت مجلل رزامیر',
    venueAddressEn: 'Garmdarreh, Amirabad Blvd, Kouhak 2nd West, Rosamir Palace',
    venueAddressFa: 'گرمدره، بلوار امیرآباد، کوهک دوم غربی، عمارت رزامیر',
    cityEn: 'Garmdarreh',
    cityFa: 'گرمدره',
  },
  navigation: {
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=%D8%B9%D9%85%D8%A7%D8%B1%D8%AA+%D9%85%D8%AC%D9%84%D9%84+%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1+%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87&hl=fa&z=15&output=embed',
    googleMapsDirectUrl: 'https://maps.app.goo.gl/VaX7pFHPccWEKgx47?g_st=atm',
    appleMapsDirectUrl:
      'https://maps.apple.com/?q=%D8%B9%D9%85%D8%A7%D8%B1%D8%AA%20%D9%85%D8%AC%D9%84%D9%84%20%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1%20%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    neshanDirectUrl: 'https://nshn.ir/83rbvoC1VxCvuE',
    baladDirectUrl:
      'https://balad.ir/search?q=%D8%B9%D9%85%D8%A7%D8%B1%D8%AA%20%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1%20%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    wazeDirectUrl:
      'https://waze.com/ul?q=%D8%B9%D9%85%D8%A7%D8%B1%D8%AA%20%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1%20%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87&navigate=yes',
  },
  media: {
    heroPoster: '/us in the north.jpg',
    heroVideo: '',
    featuredVideo: '',
    featuredVideoPoster: '/us engagement rings.jpg',
    audioTrack: {
      en: '/en-You Are My Favorite - Heather Mae (Official Music Video).mp3',
      fa: '/fa-Mix final.mp3',
    },
    gallery: [
      {
        id: 'childhood-hug',
        src: '/childhood_hug_realistic.jpg',
        titleEn: 'Embrace of Destiny',
        titleFa: 'آغوش مهر کودکی',
        captionEn:
          'Before we knew the road ahead, our hearts were already reaching out toward forever.',
        captionFa:
          'روایت شیرین و واقعی از کودکی دو ستاره، پیش از آنکه بدانند جهان چه پیوند زیبایی را برایشان رقم زده است.',
      },
      {
        id: 'g12',
        src: '/Babak childhood.jpg',
        titleEn: 'The Boy He Was (Babak)',
        titleFa: 'کودکی بابک',
        captionEn:
          'Looking at this little boy, I see the man who would one day hold my hand forever.',
        captionFa:
          'به این پسر کوچک که نگاه می‌کنم، مردی را می‌بینم که قرار است تا همیشه دستم را بگیرد.',
      },
      {
        id: 'g13',
        src: "/mohadese's childhood.jpg",
        titleEn: 'The Girl She Was (Mohadese)',
        titleFa: 'کودکی محدثه',
        captionEn:
          'A smile this pure was always meant to find its way to me — and I am endlessly grateful it did.',
        captionFa:
          'لبخندی به این پاکی قرار بود راهش را به سمت من پیدا کند؛ و من برای همیشه سپاسگزارم که این اتفاق افتاد.',
      },
      {
        id: 'g1',
        src: '/us in the north.jpg',
        titleEn: 'North of Forever',
        titleFa: 'سرزمین آغوش',
        captionEn:
          'In the hush of the northern woods, the world shrank down to just the two of us — and we knew this was home.',
        captionFa:
          'در سکوت جنگل‌های شمال، دنیا به اندازه‌ی دو نفر کوچک شد؛ و همان‌جا فهمیدیم خانه همین‌جاست.',
      },
      {
        id: 'g2',
        src: '/us in mountains.jpg',
        titleEn: 'Higher Ground',
        titleFa: 'فراز کوهستان',
        captionEn:
          'Climbing toward the sky, hand in hand, we found the courage to promise each other the rest of our lives.',
        captionFa:
          'در دل کوهستان، دست در دست، دل به هم سپردیم؛ و قولی دادیم که تا قله‌ی زندگی ادامه دارد.',
      },
      {
        id: 'g3',
        src: '/us in cave.jpg',
        titleEn: 'Sheltered Hearts',
        titleFa: 'پناه دل‌ها',
        captionEn:
          'Even in the cool shade of stone, your laugh was the warmest place I had ever known.',
        captionFa:
          'حتی در سایه‌ی خنک غار، خنده‌ی تو گرم‌ترین نقطه‌ای بود که تا به آن روز شناخته بودم.',
      },
      {
        id: 'g4',
        src: '/us and sunshine.jpg',
        titleEn: 'Made of Sunlight',
        titleFa: 'از جنس آفتاب',
        captionEn:
          'The light spilled through your hair and I remember thinking: this is what forever looks like.',
        captionFa:
          'نور از لابه‌لای موهایت گذشت و در دلم گفتم: ابدیت دقیقاً همین شکلی است.',
      },
      {
        id: 'g5',
        src: '/us somewhere.jpg',
        titleEn: 'Anywhere With You',
        titleFa: 'هرجا با تو',
        captionEn:
          'We never needed a map — wherever your hand found mine, that was the destination.',
        captionFa:
          'هیچ‌وقت به نقشه نیاز نداشتیم؛ هرجا دست تو به دستم می‌رسید، مقصد همان‌جا بود.',
      },
      {
        id: 'g6',
        src: '/snowy us.jpg',
        titleEn: 'First Snow, Always You',
        titleFa: 'نخستین برف، همیشه تو',
        captionEn:
          'The first snow fell, and the world went quiet — except for the sound of my heart, saying your name.',
        captionFa:
          'اولین برف بارید و همه‌چیز ساکت شد؛ فقط صدای قلبم بود که نامت را زمزمه می‌کرد.',
      },
      {
        id: 'g7',
        src: '/us engagement rings.jpg',
        titleEn: 'A Quiet Yes',
        titleFa: 'یک «آری» آرام',
        captionEn:
          'Two small circles. One enormous promise. The moment our hands trembled in the best possible way.',
        captionFa:
          'دو حلقه‌ی کوچک، یک عهد بزرگ؛ لحظه‌ای که دست‌هایمان از شادی به لرزه افتاد.',
      },
      {
        id: 'g8',
        src: '/the date of engagement.jpg',
        titleEn: 'The Day It Began',
        titleFa: 'روزی که آغاز شد',
        captionEn:
          'The calendar marked a date, but our hearts had already made the decision a long time ago.',
        captionFa:
          'تقویم یک تاریخ را ثبت کرد، اما دل‌های ما خیلی پیش‌تر از آن تصمیمشان را گرفته بودند.',
      },
      {
        id: 'g9',
        src: '/mohadese.jpg',
        titleEn: 'Mohadese',
        titleFa: 'محدثه، ستاره‌ی شب‌های من',
        captionEn:
          'Your eyes hold every reason I will ever need to be happy. Thank you for choosing this life with me.',
        captionFa:
          'در چشمانت تمام دلایلی که برای شاد زیستن نیاز دارم را می‌بینم؛ ممنونم که این مسیر را با من انتخاب کردی.',
      },
      {
        id: 'g10',
        src: '/babak and mohadese.jpg',
        titleEn: 'Our Safe Harbor',
        titleFa: 'ساحل آرامش ما',
        captionEn:
          'No storm can touch what was built on this much quiet certainty. Here is to a lifetime of safe harbors.',
        captionFa:
          'هیچ طوفانی به آنچه با این اندازه از یقین ساخته شده، آسیبی نخواهد زد؛ به امید عمری پر از آرامش.',
      },
      {
        id: 'g11',
        src: '/babak and mohadese 2.jpg',
        titleEn: 'To Forever, Hand in Hand',
        titleFa: 'به سوی ابدیت، دست در دست',
        captionEn:
          'This is not the end of a love story — it is the very first sentence of our forever.',
        captionFa:
          'این پایان یک داستان عاشقانه نیست؛ این نخستین جمله‌ی ابدیت مشترک ماست.',
      },
    ],
  },
  story: {
    quoteEn:
      '“In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.”',
    quoteFa:
      '«تو مرا جان و جهانی، چه کنم جان و جهان را... در دل من چیزی جز مهر و اشتیاق ابدی تو نیست.»',
    chapters: [
      {
        year: 'Chapter I',
        yearFa: 'فصل اول',
        titleEn: 'Destined From the Start',
        titleFa: 'آغاز سرنوشت',
        contentEn:
          'Long before our paths crossed in life, the universe was already aligning the gentle steps of two souls destined to meet.',
        contentFa:
          'سال‌ها پیش از آنکه راه‌هایمان یکی شود، در دنیای پاک کودکی رشد کردیم؛ غافل از آنکه سرنوشت زیباترین پیوند را برایمان در آستین دارد.',
      },
      {
        year: 'Chapter II',
        yearFa: 'فصل دوم',
        titleEn: 'Growing Side by Side',
        titleFa: 'همگام در مسیر رویاها',
        contentEn:
          'From northern forests to graduation halls, every step we took side by side taught us that home is not a place — it is each other.',
        contentFa:
          'از جنگل‌های شمال تا روزهای فارغ‌التحصیلی، هر قدمی که کنار هم برداشتیم یادآور ما شد که خانه یک مکان نیست، بلکه بودن کنار یکدیگر است.',
      },
      {
        year: 'Chapter III',
        yearFa: 'فصل سوم',
        titleEn: 'The Yes to Forever',
        titleFa: 'پاسخ بله به آینده',
        contentEn:
          'On bended knee, with a trembling hand and a steady heart, we said the only word that mattered — yes, to forever, to each other.',
        contentFa:
          'روزی که زانو زد، با دستی لرزان و قلبی استوار، تنها کلمه‌ای را گفت که اهمیت داشت: «آری»؛ آری به ابدیت، آری به یکدیگر.',
      },
    ],
  },
  schedule: [
    {
      time: '6:00 PM',
      timeFa: '۱۸:۰۰',
      titleEn: 'Doors Open & Guest Reception',
      titleFa: 'باز شدن درب‌ها و پذیرش مهمانان',
      descEn:
        'Welcome to Rosamir Palace. Guests are invited to arrive, find their seats, and enjoy welcome refreshments.',
      descFa:
        'خوش‌آمدگویی به عمارت مجلل رزامیر. ورود و استقرار مهمانان ارجمند همراه با پذیرایی آغازین.',
      icon: 'cocktail',
    },
    {
      time: '7:30 PM',
      timeFa: '۱۹:۳۰',
      titleEn: 'Persian Aryan Marriage Ceremony',
      titleFa: 'مراسم عقد آریایی',
      descEn: 'The auspicious moment of sealing our vows in front of family and friends.',
      descFa: 'قرائت سوگندنامه و پیمان مهر عقد آریایی در محضر خانواده‌های گرانقدر.',
      icon: 'ring',
    },
    {
      time: '8:00 PM',
      timeFa: '۲۰:۰۰',
      titleEn: 'Dance & Celebration Begins',
      titleFa: 'شروع رقص و پایکوبی',
      descEn: 'Commencing the joy and celebratory dance with our dearest guests.',
      descFa: 'آغاز بزم و شادی و رقص مهمانان عزیز در تالار اصلی.',
      icon: 'music',
    },
    {
      time: '9:00 PM',
      timeFa: '۲۱:۰۰',
      titleEn: 'Cake Cutting Ceremony',
      titleFa: 'مراسم برش کیک',
      descEn: 'Sweetening the night with celebration cake and toast to new beginnings.',
      descFa: 'مراسم برش کیک شادباش پیوند بابک و محدثه.',
      icon: 'cake',
    },
    {
      time: '9:45 PM',
      timeFa: '۲۱:۴۵',
      titleEn: 'Celebration & Dance Continues',
      titleFa: 'ادامه رقص و پایکوبی',
      descEn: 'Continuing the energetic dance, laughter, and lifelong memories.',
      descFa: 'ادامه‌ی جشن پرشور و رقص خاطره‌انگیز.',
      icon: 'sparkles',
    },
    {
      time: '11:00 PM',
      timeFa: '۲۳:۰۰',
      titleEn: 'Grand Wedding Dinner',
      titleFa: 'ضیافت باشکوه شام',
      descEn: 'A sumptuous feast prepared with love to celebrate our joyful night.',
      descFa: 'پذیرایی شام و ضیافت ویژه از مهمانان عالی‌قدر.',
      icon: 'dinner',
    },
  ],
  rsvp: {
    deadlineEn: 'September 25, 2026',
    deadlineFa: '۳ مهر ۱۴۰۵',
    sheetEndpoint:
      typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_URL
        ? import.meta.env.VITE_GOOGLE_SHEET_URL
        : 'https://script.google.com/macros/s/AKfycbydMVxXh8J5GYI2tj7whQ6VFlABbTwU3J3AG8nY-jfIlJDhstbsWCYiLqzbxDP1fcKq2A/exec',
    dietaryOptions: [],
  },
  contacts: {
    groom: {
      nameEn: 'Babak',
      nameFa: 'بابک',
      phone: '+989120000001',
      displayPhone: '۰۹۱۲۰۰۰۰۰۰۱',
    },
    bride: {
      nameEn: 'Mohadese',
      nameFa: 'محدثه',
      phone: '+989126334751',
      displayPhone: '۰۹۱۲۶۳۳۴۷۵۱',
    },
  },
};

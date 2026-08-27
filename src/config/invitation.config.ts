export interface TimelineItem {
  time: string;
  timeFa: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
  icon: 'ring' | 'cake' | 'music' | 'dinner' | 'sparkles' | 'cocktail';
}

export interface StoryChapter {
  year: string;
  yearFa: string;
  titleEn: string;
  titleFa: string;
  contentEn: string;
  contentFa: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  titleEn: string;
  titleFa: string;
  captionEn: string;
  captionFa: string;
  span?: 'col-span-1' | 'col-span-2' | 'row-span-2';
}

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
    targetIsoDate: string; // Used by countdown and calendar
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
    heroVideo?: string;
    featuredVideo?: string;
    featuredVideoPoster: string;
    /**
     * The audio track is per-language so the English and Persian pages each
     * play their own carefully chosen piece of music.
     */
    audioTrack?: { en?: string; fa?: string } | string;
    gallery: GalleryItem[];
  };
  story: {
    quoteEn: string;
    quoteFa: string;
    chapters: StoryChapter[];
  };
  schedule: TimelineItem[];
  rsvp: {
    deadlineEn: string;
    deadlineFa: string;
    sheetEndpoint: string;
    dietaryOptions: { id: string; labelEn: string; labelFa: string }[];
  };
  contacts: {
    groom: { nameEn: string; nameFa: string; phone: string; displayPhone: string };
    bride: { nameEn: string; nameFa: string; phone: string; displayPhone: string };
  };
}

export const invitationConfig: InvitationConfig = {
couple: {
    groomEn: 'Babak',
    groomFa: 'بابک',
    brideEn: 'Mohadese',
    brideFa: 'محدثه',
    monogramEn: 'B & M',
    monogramFa: '𝕭 & 𝕸',
    groomFamilyEn: 'Together with their families',
    groomFamilyFa: 'با همراهی و شادمانی خانواده\u200cهای محترم',
    brideFamilyEn: '',
    brideFamilyFa: '',
  },
  event: {
    targetIsoDate: '2026-10-09T19:00:00',
    endIsoDate: '2026-10-10T02:00:00',
    dateEn: 'Friday, October 9, 2026',
    dateFa: 'جمعه ۱۷ مهر ۱۴۰۵',
    timeEn: 'Doors open at 7:00 PM — Ceremony at 7:30 PM',
    timeFa: 'ساعت ورود ۱۹:۰۰ — شروع مراسم ۱۹:۳۰',
    venueNameEn: 'Rosamir Reception Hall',
    venueNameFa: 'تالار پذیرایی رزامیر',
    venueAddressEn: 'Garmdareh, Karaj County, Alborz Province, Iran',
    venueAddressFa: 'گرمدره، شهرستان کرج، استان البرز',
    cityEn: 'Garmdareh',
    cityFa: 'گرمدره',
  },
  navigation: {
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1+%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1+%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87&hl=fa&z=15&output=embed',
    googleMapsDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1+%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1+%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    appleMapsDirectUrl:
      'https://maps.apple.com/?q=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1%20%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1%20%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    neshanDirectUrl:
      'https://nshn.ir/search?q=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1+%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1+%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    baladDirectUrl:
      'https://balad.ir/search?q=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1+%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1+%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    wazeDirectUrl:
      'https://waze.com/ul?q=%D8%AA%D8%A7%D9%84%D8%A7%D8%B1%20%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1%20%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87&navigate=yes',
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
          'روایت شیرین و واقعی از کودکی دو ستاره، پیش از آنکه بدانند جهان چه پیوند زیبایی را برایشان در آستین دارد.',
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
          'Some dates belong on calendars. Others belong on the heart — and this one is etched in mine.',
        captionFa:
          'بعضی تاریخ‌ها روی تقویم می‌مانند، بعضی‌ها روی قلب؛ این تاریخ روی قلب من حک شده است.',
      },
      {
        id: 'g9',
        src: '/us and graduation.jpg',
        titleEn: 'Chapters We Earned',
        titleFa: 'فصل‌هایی که ساختیم',
        captionEn:
          'Hard work, long nights, and your hand on my shoulder — every chapter of us was earned together.',
        captionFa:
          'شب‌های بیداری، تلاش‌های بی‌پایان و دست تو روی شانه‌ام؛ تک‌تک فصل‌های ما با هم ساخته شد.',
      },
      {
        id: 'g10',
        src: '/his birthday in dental clinic.jpg',
        titleEn: 'Laughter in the Ordinary',
        titleFa: 'خنده در روزمرگی',
        captionEn:
          'Even in the most unexpected places, you turned ordinary days into my favorite memories.',
        captionFa:
          'حتی در غیرمنتظره‌ترین لحظه‌ها، تو روزهای معمولی را به خاطره‌های مورد علاقه‌ام تبدیل کردی.',
      },
      {
        id: 'g11',
        src: '/33 years old.jpg',
        titleEn: 'Thirty-Three and Counting',
        titleFa: 'سی و سه سالگی و ادامه‌اش',
        captionEn:
          'A birthday candle, a wish, and a heart that already had everything it ever wanted — you.',
        captionFa:
          'یک شمع روی کیک، یک آرزو، و قلبی که از قبل همه‌چیزش را داشت: تو.',
      },
    ],
  },
  story: {
    quoteEn: '“In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.”',
    quoteFa: '«در تمام جهان، هیچ قلبی چون قلب تو برای من نیست؛ و در تمام جهان، هیچ عشقی چون عشق من برای تو نیست.»',
    chapters: [
      {
        year: 'Chapter I',
        yearFa: 'فصل اول',
        titleEn: 'Childhood & Innocent Dreams',
        titleFa: 'فصل کودکی و آغاز رویاها',
        contentEn:
          'Two innocent childhoods unfolding with laughter and curiosity, unknowingly walking toward the moment their destinies would become one.',
        contentFa:
          'سال‌ها پیش از آنکه راه‌هایمان یکی شود، در دنیای کودکی با آرزوهایی پاک رشد کردیم؛ غافل از آنکه سرنوشت زیباترین پیوند را برایمان رقم زده است.',
        image: '/childhood_hug_realistic.jpg',
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
        image: '/us in the north.jpg',
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
        image: '/us engagement rings.jpg',
      },
    ],
  },
  schedule: [
    {
      time: '7:00 PM',
      timeFa: '۱۹:۰۰',
      titleEn: 'Doors Open & Guest Reception',
      titleFa: 'باز شدن درب‌ها و پذیرش مهمانان',
      descEn:
        'Welcome to Rosamir Hall. Guests are invited to arrive, find their seats, and enjoy welcome refreshments.',
      descFa:
        'خوش آمدید به تالار رزامیر. لحظاتی را با پذیرایی آغازین و خوش‌آمدگویی مهمانان گرامی سپری کنید.',
      icon: 'cocktail',
    },
    {
      time: '7:30 PM',
      timeFa: '۱۹:۳۰',
      titleEn: 'Solemn Marriage Ceremony',
      titleFa: 'مراسم عقد و پیمان مهر',
      descEn: 'The auspicious moment of sealing our vows in front of family and friends.',
      descFa: 'قرائت خطبه عقد آریایی و ثبت ماندگارترین لحظه‌ی پیوند عشق.',
      icon: 'ring',
    },
    {
      time: '9:00 PM',
      timeFa: '۲۱:۰۰',
      titleEn: 'Cake Cutting & Toast',
      titleFa: 'برش کیک و شادباش',
      descEn: 'Sweetening the night with celebration cake and toast to new beginnings.',
      descFa: 'مراسم بریدن کیک و شادباش و تبریک‌های صمیمانه.',
      icon: 'cake',
    },
    {
      time: '9:45 PM',
      timeFa: '۲۱:۴۵',
      titleEn: 'Grand Banquet Dinner',
      titleFa: 'ضیافت شام شاهانه',
      descEn: 'A sumptuous feast prepared with love to celebrate our joyful night.',
      descFa: 'صرف شام فاخر و پذیرایی ویژه از مهمانان عالی‌قدر.',
      icon: 'dinner',
    },
    {
      time: '10:45 PM',
      timeFa: '۲۲:۴۵',
      titleEn: 'Music, Dance & Celebration',
      titleFa: 'جشن، رقص و پایکوبی',
      descEn: 'Dancing the night away with joy, laughter, and lifelong memories.',
      descFa: 'ادامه‌ی جشن پرشور، پایکوبی و خاطره‌سازی تا پاسی از شب.',
      icon: 'music',
    },
  ],
  rsvp: {
    deadlineEn: 'September 25, 2026',
    deadlineFa: '۳ مهر ۱۴۰۵',
    sheetEndpoint: typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_URL ? import.meta.env.VITE_GOOGLE_SHEET_URL : '',
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
      phone: '+989120000002',
      displayPhone: '۰۹۱۲۰۰۰۰۰۰۲',
    },
  },
};

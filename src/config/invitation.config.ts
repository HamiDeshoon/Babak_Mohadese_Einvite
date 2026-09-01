/**
 * ==========================================================================
 * Babak & Mohadese Wedding Invitation — Production Configuration
 * ==========================================================================
 *
 * Single Source of Truth for Wedding Date, Venue, Contacts, Gallery,
 * Google Sheets RSVP Webhook, and Multi-language Strings.
 */

export interface ScheduleItem {
  time: string;
  timeFa: string;
  titleEn: string;
  titleFa: string;
  descEn: string;
  descFa: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  titleEn: string;
  titleFa: string;
  captionEn: string;
  captionFa: string;
}

export interface StoryChapter {
  year: string;
  yearFa: string;
  titleEn: string;
  titleFa: string;
  contentEn: string;
  contentFa: string;
}

export interface ContactPerson {
  name: string;
  roleEn: string;
  roleFa: string;
  phone: string;
  displayPhone: string;
}

export interface InvitationConfig {
  couple: {
    groomEn: string;
    brideEn: string;
    groomFa: string;
    brideFa: string;
    groomFamilyEn: string;
    brideFamilyEn: string;
    groomFamilyFa: string;
    brideFamilyFa: string;
    monogramEn: string;
    monogramFa: string;
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
    gallery: GalleryItem[];
  };
  story: {
    quoteEn: string;
    quoteFa: string;
    chapters: StoryChapter[];
  };
  schedule: ScheduleItem[];
  rsvp: {
    deadlineEn: string;
    deadlineFa: string;
    sheetEndpoint: string;
    maxGuestsPerSubmission: number;
    dietaryOptions: { value: string; labelEn: string; labelFa: string }[];
  };
  contacts: {
    groom: ContactPerson;
    bride: ContactPerson;
  };
  giftInfo: {
    shabaNumber: string;
    cardNumber: string;
    bankName: string;
    accountHolder: string;
  };
}

export const invitationConfig: InvitationConfig = {
  couple: {
    groomEn: 'Babak',
    brideEn: 'Mohadese',
    groomFa: 'بابک',
    brideFa: 'محدثه',
    groomFamilyEn: 'Together with their families',
    brideFamilyEn: 'Together with their families',
    groomFamilyFa: 'با همراهی و شادمانی خانواده‌های محترم',
    brideFamilyFa: 'با همراهی و شادمانی خانواده‌های محترم',
    monogramEn: 'B & M',
    monogramFa: 'ب & م',
  },
  event: {
    targetIsoDate: '2026-10-09T18:00:00+03:30',
    endIsoDate: '2026-10-09T23:59:00+03:30',
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
      'https://maps.google.com/maps?q=%D8%B9%D9%85%D8%A7%D8%B1%D8%AA+%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1+%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87&hl=fa&z=15&output=embed',
    googleMapsDirectUrl: 'https://maps.app.goo.gl/butSyJwEj83FzB7y6',
    appleMapsDirectUrl:
      'https://maps.apple.com/?q=%D8%B9%D9%85%D8%A7%D8%B1%D8%AA%20%D8%B1%D8%B2%D8%A7%D9%85%DB%8C%D8%B1%20%DA%AF%D8%B1%D9%85%D8%AF%D8%B1%D9%87',
    neshanDirectUrl: 'https://nshn.ir/b8rbvoCRWxCvxG',
    baladDirectUrl: 'https://balad.ir/p/71KInvWnRI5FQE',
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
        id: 'g_grad',
        src: '/us and graduation.jpg',
        titleEn: 'Celebration of Milestones',
        titleFa: 'جشن همراهی و پیروزی',
        captionEn:
          'Celebrating every triumph and every dream together, side by side.',
        captionFa:
          'شادمانی در کنار هم برای تک‌تک پیروزی‌ها و رویاهایی که با هم ساختیم.',
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
          'پیش از آنکه راهمان در مسیر زندگی به هم برسد، جهان در حال چیدن مقدمات پیوند دو قلبی بود که برای هم آفریده شده بودند.',
      },
      {
        year: 'Chapter II',
        yearFa: 'فصل دوم',
        titleEn: 'The Proposal & The Promise',
        titleFa: 'پیمان و بله ابدی',
        contentEn:
          'A quiet moment in the mountains, two simple rings, and a question that changed the meaning of every tomorrow.',
        contentFa:
          'لحظه‌ای آرام و به‌یادماندنی در آغوش کوهستان، دو حلقه درخشان، و پاسخی که معنای تمام روزهای فردایمان را دگرگون ساخت.',
      },
      {
        year: 'Chapter III',
        yearFa: 'فصل سوم',
        titleEn: 'To the Beginning of Always',
        titleFa: 'در آستانه آغازی ماندگار',
        contentEn:
          'Surrounded by the warmth of family and dearest friends, we step together into a lifetime of endless laughter and devotion.',
        contentFa:
          'اکنون در کنار گرمای وجود خانواده‌های پرمهر و دوستان عزیزمان، قدم به آغاز زیباترین فصل زندگی مشترکمان می‌گذاریم.',
      },
    ],
  },
  schedule: [
    {
      time: '18:00',
      timeFa: '۱۸:۰۰ (۶ عصر)',
      titleEn: 'Guest Welcome & Reception',
      titleFa: 'باز شدن درب‌ها و پذیرش مهمانان',
      descEn: 'Arrival of beloved guests, ambient live music, welcome beverages, and hors d’oeuvres.',
      descFa: 'خوش‌آمدگویی به مهمانان گرامی، پذیرایی با نوشیدنی و عصرانه به همراه نوای دلنشین موسیقی.',
    },
    {
      time: '19:30',
      timeFa: '۱۹:۳۰',
      titleEn: 'Ancient Aryan Ceremony & Vows',
      titleFa: 'مراسم باشکوه عقد آریایی',
      descEn: 'Traditional solemn vows, poetic blessing readings, and exchange of forever promises.',
      descFa: 'قرائت سوگندنامه‌ی کهن آریایی، پیمان وفاداری و آرزوی خیر و برکت.',
    },
    {
      time: '20:00',
      timeFa: '۲۰:۰۰',
      titleEn: 'Celebration & Dance Commences',
      titleFa: 'شروع جشن، رقص و پایکوبی',
      descEn: 'Opening dance of the bride and groom, followed by joyful festivities with all guests.',
      descFa: 'ورود پرشور عروس و داماد به پیست رقص و آغاز بزم شادمانی در کنار عزیزان.',
    },
    {
      time: '21:00',
      timeFa: '۲۱:۰۰',
      titleEn: 'Wedding Cake Cutting Ceremony',
      titleFa: 'مراسم برش کیک عروسی',
      descEn: 'Celebration of sweetness and joy with sparkling fountains and sweet toasts.',
      descFa: 'برش کیک پیوند با آتش‌بازی و شادباش مهمانان گرامی.',
    },
    {
      time: '21:45',
      timeFa: '۲۱:۴۵',
      titleEn: 'Joyful Dance & Music Continues',
      titleFa: 'ادامه بزم و شادمانی',
      descEn: 'Uninterrupted music, group dances, and unforgettable party moments.',
      descFa: 'ادامه رقص، موسیقی پرانرژی و ثبت لحظه‌های شاد و خاطره‌انگیز.',
    },
    {
      time: '23:00',
      timeFa: '۲۳:۰۰ (۱۱ شب)',
      titleEn: 'Grand Dinner Banquet',
      titleFa: 'ضیافت مجلل شام',
      descEn: 'A sumptuous multi-course Persian dinner prepared specially for our honored guests.',
      descFa: 'پذیرایی با منوی فاخر ایرانی در تالار پذیرایی عمارت رزامیر.',
    },
  ],
  rsvp: {
    deadlineEn: 'September 20, 2026',
    deadlineFa: '۳۰ شهریور ۱۴۰۵',
    sheetEndpoint:
      'https://script.google.com/macros/s/AKfycbydMVxXh8J5GYI2tj7whQ6VFlABbTwU3J3AG8nY-jfIlJDhstbsWCYiLqzbxDP1fcKq2A/exec',
    maxGuestsPerSubmission: 8,
    dietaryOptions: [
      { value: 'standard', labelEn: 'Standard Persian Royal Menu', labelFa: 'منوی تشریفاتی مجلل' },
      { value: 'vegetarian', labelEn: 'Vegetarian / Herbivore', labelFa: 'منوی گیاه‌خواری' },
      { value: 'halal_special', labelEn: 'Chef Special Selection', labelFa: 'انتخاب ویژه سرآشپز' },
    ],
  },
  contacts: {
    groom: {
      name: 'Babak',
      roleEn: 'Groom',
      roleFa: 'داماد: بابک',
      phone: '+989128434565',
      displayPhone: '۰۹۱۲۸۴۳۴۵۶۵',
    },
    bride: {
      name: 'Mohadese',
      roleEn: 'Bride',
      roleFa: 'عروس: محدثه',
      phone: '+989126334751',
      displayPhone: '۰۹۱۲۶۳۳۴۷۵۱',
    },
  },
  giftInfo: {
    shabaNumber: 'IR000000000000000000000000',
    cardNumber: '۶۰۳۷-۹۹۷۰-۰۰۰۰-۰۰۰۰',
    bankName: 'بانک ملی ایران',
    accountHolder: 'بابک و محدثه',
  },
};

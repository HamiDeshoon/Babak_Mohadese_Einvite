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
    dressCodeEn: string;
    dressCodeFa: string;
    dressCodeDescEn: string;
    dressCodeDescFa: string;
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
    audioTrack?: string;
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
    monogramFa: 'ب & م',
    groomFamilyEn: 'Together with their families',
    groomFamilyFa: 'با همراهی و شادمانی خانواده‌های محترم',
    brideFamilyEn: '',
    brideFamilyFa: '',
  },
  event: {
    targetIsoDate: '2026-09-18T18:30:00',
    endIsoDate: '2026-09-19T01:00:00',
    dateEn: 'Friday, September 18, 2026',
    dateFa: 'جمعه ۲۷ شهریور ۱۴۰۵',
    timeEn: '6:30 PM until late',
    timeFa: 'ساعت ۱۸:۳۰ الی بامداد',
    venueNameEn: 'Royal Palace Grand Ballroom',
    venueNameFa: 'عمارت باشکوه رویال پالاس',
    venueAddressEn: 'No. 18, Golestan Blvd, Tehran, Iran',
    venueAddressFa: 'تهران، بلوار گلستان، عمارت رویال پالاس',
    cityEn: 'Tehran',
    cityFa: 'تهران',
    dressCodeEn: 'Black Tie & Formal Elegance',
    dressCodeFa: 'لباس شب رسمی و شیک',
    dressCodeDescEn: 'We kindly request our guests to dress in formal evening attire to make the celebration truly unforgettable.',
    dressCodeDescFa: 'حضور باوقار شما با پوشش رسمی و آراسته، زیبایی جشن ما را دوچندان خواهد کرد.',
  },
  navigation: {
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.3416593875154!2d51.2096296603599!3d35.65860216138485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8df9007207f015%3A0xa4accfcab4fcd142!2z2KjYp9i6INi52YXYp9ix2Kog2LTYp9mH2K_Yrtiq!5e0!3m2!1sen!2s!4v1783141964584!5m2!1sen!2s',
    googleMapsDirectUrl: 'https://maps.google.com/?q=35.658602,51.209630',
    appleMapsDirectUrl: 'https://maps.apple.com/?q=35.658602,51.209630',
    neshanDirectUrl: 'https://nshn.ir/search?q=35.658602,51.209630',
    baladDirectUrl: 'https://balad.ir/location?lat=35.658602&lng=51.209630',
    wazeDirectUrl: 'https://waze.com/ul?ll=35.658602,51.209630&navigate=yes',
  },
  media: {
    heroPoster: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
    heroVideo: '',
    featuredVideo: '',
    featuredVideoPoster: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    audioTrack: '/music.mp3', // La Maritza (Piano) wedding music track
    gallery: [
      {
        id: '1',
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'A Gentle Beginning',
        titleFa: 'آغاز یک نگاه',
        captionEn: 'Every love story is beautiful, but ours is our favorite.',
        captionFa: 'هر داستان عشقی زیباست، اما داستان ما جاودانه است.',
      },
      {
        id: '2',
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Pure Harmony',
        titleFa: 'هماهنگی و آرامش',
        captionEn: 'Walking hand in hand toward our next great adventure.',
        captionFa: 'دست در دست هم به سوی روشن‌ترین فرداها.',
      },
      {
        id: '3',
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Golden Moments',
        titleFa: 'لحظه‌های طلایی',
        captionEn: 'Surrounded by love, joy, and gentle laughter.',
        captionFa: 'در آغوش لبخند، نور و مهربانی.',
      },
      {
        id: '4',
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'The Eternal Promise',
        titleFa: 'پیمان جاودان',
        captionEn: 'A lifelong commitment sealed with joy and grace.',
        captionFa: 'پیمانی از سر مهر برای تمام روزهای پیش‌رو.',
      },
      {
        id: '5',
        src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Celebration of Love',
        titleFa: 'جشن شکوه عشق',
        captionEn: 'Creating memories that will shine for years to come.',
        captionFa: 'خاطراتی که تا ابد در قلب‌هایمان می‌درخشند.',
      },
      {
        id: '6',
        src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Together Forever',
        titleFa: 'تا همیشه در کنار هم',
        captionEn: 'Two souls, one heartbeat, infinite dreams.',
        captionFa: 'دو جان، یک قلب، و آرزوهایی بی‌پایان.',
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
        titleEn: 'The First Spark',
        titleFa: 'نخستین دیدار',
        contentEn: 'Our paths crossed in the most unexpected way. What began as a simple conversation quickly revealed an unmistakable connection, quiet understanding, and shared laughter that lit up the room.',
        contentFa: 'مسیر زندگی‌مان به زیباترین شکل ممکن به هم گره خورد. گفت‌وگویی ساده که خیلی زود به درکی عمیق، لبخندهایی بی‌پایان و اتصالی پاک و صمیمی تبدیل شد.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      },
      {
        year: 'Chapter II',
        yearFa: 'فصل دوم',
        titleEn: 'Growing Side by Side',
        titleFa: 'همگام در مسیر رویاها',
        contentEn: 'Through seasons of adventures, challenges, shared cups of tea, and late-night dreams, we discovered that home isn’t a place—it is being with each other.',
        contentFa: 'با هر فصل از زندگی، در میان سفرها، چالش‌ها و رویاپردازی‌های شبانه، آموختیم که خانه یک مکان نیست، بلکه بودن در کنار یکدیگر است.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      },
      {
        year: 'Chapter III',
        yearFa: 'فصل سوم',
        titleEn: 'The Yes to Forever',
        titleFa: 'پاسخ بله به آینده',
        contentEn: 'Under the starlit sky, we made a promise to choose each other every day, through every storm and every sunshine. Now, we begin our greatest chapter yet.',
        contentFa: 'زیر آسمان پرستاره، عهدی بستیم تا در تک تک روزهای زندگی، در شادی و در سختی، تکیه‌گاه یکدیگر باشیم و اکنون بزرگ‌ترین جشن پیوندمان را آغاز می‌کنیم.',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  schedule: [
    {
      time: '6:30 PM',
      timeFa: '۱۸:۳۰',
      titleEn: 'Guest Welcome & Reception',
      titleFa: 'استقبال و خوش‌آمدگویی',
      descEn: 'Arrival of beloved guests, ambient music, and welcome drinks in the rose garden.',
      descFa: 'ورود مهمانان گرامی، پذیرایی عصرانه و نوای دل‌انگیز موسیقی زنده.',
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
      time: '8:30 PM',
      timeFa: '۲۰:۳۰',
      titleEn: 'Cake Cutting & Toast',
      titleFa: 'برش کیک و شادباش',
      descEn: 'Sweetening the night with celebration cake and toast to new beginnings.',
      descFa: 'مراسم بریدن کیک و شادباش و تبریک‌های صمیمانه.',
      icon: 'cake',
    },
    {
      time: '9:15 PM',
      timeFa: '۲۱:۱۵',
      titleEn: 'Grand Banquet Dinner',
      titleFa: 'ضیافت شام شاهانه',
      descEn: 'A sumptuous feast prepared with love to celebrate our joyful night.',
      descFa: 'صرف شام فاخر و پذیرایی ویژه از مهمانان عالی‌قدر.',
      icon: 'dinner',
    },
    {
      time: '10:30 PM',
      timeFa: '۲۲:۳۰',
      titleEn: 'Music, Dance & Celebration',
      titleFa: 'جشن، رقص و پایکوبی',
      descEn: 'Dancing the night away with joy, laughter, and lifelong memories.',
      descFa: 'ادامه‌ی جشن پرشور، پایکوبی و خاطره‌سازی تا پاسی از شب.',
      icon: 'music',
    },
  ],
  rsvp: {
    deadlineEn: 'September 5, 2026',
    deadlineFa: '۱۵ شهریور ۱۴۰۵',
    sheetEndpoint: typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_URL ? import.meta.env.VITE_GOOGLE_SHEET_URL : '',
    dietaryOptions: [
      { id: 'standard', labelEn: 'Standard Feast', labelFa: 'منوی استاندارد' },
      { id: 'vegetarian', labelEn: 'Vegetarian', labelFa: 'گیاه‌خواری' },
      { id: 'halal', labelEn: 'Halal Gourmet', labelFa: 'حلال ویژه' },
      { id: 'none', labelEn: 'No Preference', labelFa: 'بدون اولویت خاص' },
    ],
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

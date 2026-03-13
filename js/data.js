/* ============================================================
   VIA — Mock Data
   ============================================================ */

const VIA_DATA = {

  creators: [
    {
      id: 'camille',
      name: 'Camille Laurent',
      handle: '@camille',
      followers: '287k',
      followersNum: 287000,
      bio: 'Slow travel, beautiful hotels, and the kind of mornings you never want to leave. Based between Paris and wherever I just got back from.',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=800&q=80',
      locations: ['Paris', 'Amalfi', 'Kyoto', 'Lisbon', 'New York'],
      stats: { stays: 12, avgBooking: '€840', matchRate: '94%', earned: '€18,200' },
      verified: true,
      stayIds: [1, 2, 6, 7]
    },
    {
      id: 'marcos',
      name: 'Marcos Silva',
      handle: '@marcos',
      followers: '156k',
      followersNum: 156000,
      bio: 'Architecture, coastlines, and the best espresso of each city I pass through. Portugal-born, world-shaped.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
      locations: ['Positano', 'Lisbon', 'Morocco', 'Seville'],
      stats: { stays: 8, avgBooking: '€1,200', matchRate: '91%', earned: '€22,400' },
      verified: true,
      stayIds: [3, 4, 8]
    },
    {
      id: 'yuna',
      name: 'Yuna Inoue',
      handle: '@yuna',
      followers: '421k',
      followersNum: 421000,
      bio: 'Ryokans, onsen, and hidden guesthouses across East Asia. I believe a room can change how you see everything.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      locations: ['Kyoto', 'Seoul', 'Bali', 'Tokyo', 'Chiang Mai'],
      stats: { stays: 21, avgBooking: '¥92k', matchRate: '97%', earned: '¥3.2m' },
      verified: true,
      stayIds: [5, 9, 10]
    },
    {
      id: 'sofia',
      name: 'Sofia Andersen',
      handle: '@sofiaway',
      followers: '98k',
      followersNum: 98000,
      bio: 'Nordic design meets Mediterranean warmth. Interior enthusiast, slow traveler, chronic over-packer.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
      cover: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      locations: ['Copenhagen', 'Mykonos', 'Tulum', 'Cape Town'],
      stats: { stays: 6, avgBooking: '€650', matchRate: '89%', earned: '€9,800' },
      verified: true,
      stayIds: [11, 12]
    }
  ],

  stays: [
    {
      id: 1,
      name: 'Hôtel Le Pigonnet',
      location: 'Aix-en-Provence, France',
      country: 'France',
      price: 385,
      currency: '€',
      rating: 4.9,
      reviews: 42,
      nights: 3,
      creatorId: 'camille',
      creatorNote: '"The most quietly beautiful hotel I\'ve ever stayed in. Four days passed like four hours."',
      stayDate: 'January 2025',
      images: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'
      ],
      description: 'A 19th-century bastide nestled in a private garden two minutes from the Cours Mirabeau. Stone walls, linen everywhere, a pool hidden by lavender. This is southern France at its most unhurried.',
      amenities: ['Pool', 'Garden', 'Breakfast included', 'Spa', 'Free Wi-Fi', 'Parking', 'Restaurant', 'Terrace'],
      category: 'Boutique Hotel',
      tags: ['France', 'Countryside', 'Romantic', 'Historic'],
      commission: 0.10
    },
    {
      id: 2,
      name: 'Hôtel Richer',
      location: 'Paris, France',
      country: 'France',
      price: 420,
      currency: '€',
      rating: 4.8,
      reviews: 78,
      nights: 2,
      creatorId: 'camille',
      creatorNote: '"The most perfectly Parisian two days — everything within walking distance, nothing too loud."',
      stayDate: 'October 2024',
      images: [
        'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=900&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'
      ],
      description: 'A quiet, design-forward hotel tucked into the 9th arrondissement. Warm plaster walls, curated vintage art, and a breakfast that will ruin all other breakfasts for you.',
      amenities: ['Breakfast', 'Bar', 'Free Wi-Fi', 'Concierge', 'Room Service'],
      category: 'Boutique Hotel',
      tags: ['France', 'City', 'Design', 'Paris'],
      commission: 0.10
    },
    {
      id: 3,
      name: 'Villa Serafina',
      location: 'Positano, Italy',
      country: 'Italy',
      price: 680,
      currency: '€',
      rating: 4.97,
      reviews: 31,
      nights: 4,
      creatorId: 'marcos',
      creatorNote: '"You will not find a better view in all of Positano. The lemon trees outside the window alone were worth the flight."',
      stayDate: 'May 2025',
      images: [
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80'
      ],
      description: 'A cliffside villa with private terrace, plunge pool, and an uninterrupted view of the Tyrrhenian Sea. Three bedrooms, all with handmade ceramics and Positano-woven linens.',
      amenities: ['Private Pool', 'Sea View', 'Kitchen', 'Terrace', 'AC', 'Daily Cleaning', 'Concierge'],
      category: 'Private Villa',
      tags: ['Italy', 'Coastal', 'Luxury', 'Amalfi'],
      commission: 0.10
    },
    {
      id: 4,
      name: 'Casa da Saudade',
      location: 'Lisbon, Portugal',
      country: 'Portugal',
      price: 210,
      currency: '€',
      rating: 4.85,
      reviews: 95,
      nights: 3,
      creatorId: 'marcos',
      creatorNote: '"Five floors, no elevator, one of the best apartments I\'ve ever lived in for a week."',
      stayDate: 'February 2025',
      images: [
        'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=900&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'
      ],
      description: 'A lovingly restored Alfama townhouse with original azulejo tiles, exposed timber, and a rooftop terrace with castle views. Self-catering with a full kitchen stocked on arrival.',
      amenities: ['Rooftop Terrace', 'Kitchen', 'Free Wi-Fi', 'City View', 'Self Check-in'],
      category: 'Guesthouse',
      tags: ['Portugal', 'City', 'Historic', 'Lisbon'],
      commission: 0.10
    },
    {
      id: 5,
      name: 'Ryokan Tanuki',
      location: 'Kyoto, Japan',
      country: 'Japan',
      price: 85000,
      currency: '¥',
      rating: 4.99,
      reviews: 18,
      nights: 2,
      creatorId: 'yuna',
      creatorNote: '"I have stayed in over 40 ryokans. This is the one I return to when I need to remember what stillness feels like."',
      stayDate: 'March 2025',
      images: [
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80'
      ],
      description: 'A 200-year-old machiya townhouse turned eight-room ryokan in Fushimi. Private onsen in every room, a kaiseki dinner served by the owner, and a garden that changes with every season.',
      amenities: ['Private Onsen', 'Kaiseki Dinner', 'Yukata', 'Garden', 'Tea Ceremony', 'Breakfast'],
      category: 'Ryokan',
      tags: ['Japan', 'Cultural', 'Historic', 'Spa'],
      commission: 0.10
    },
    {
      id: 6,
      name: 'Maison Papillon',
      location: 'Nice, France',
      country: 'France',
      price: 290,
      currency: '€',
      rating: 4.7,
      reviews: 56,
      nights: 3,
      creatorId: 'camille',
      creatorNote: '"Perfect base for the Côte d\'Azur — small, personal, and the breakfast is extraordinary."',
      stayDate: 'August 2024',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80'
      ],
      description: 'An Art Deco jewel steps from the Promenade des Anglais. Twelve rooms, each different. The kind of hotel that still exists in Nice if you know where to look.',
      amenities: ['Breakfast', 'Bar', 'Beach Access', 'Free Wi-Fi', 'Concierge'],
      category: 'Boutique Hotel',
      tags: ['France', 'Coastal', 'Art Deco', 'City'],
      commission: 0.10
    },
    {
      id: 7,
      name: 'The Hoxton Shoreditch',
      location: 'London, UK',
      country: 'UK',
      price: 175,
      currency: '£',
      rating: 4.6,
      reviews: 204,
      nights: 2,
      creatorId: 'camille',
      creatorNote: '"My London base for three years running. They greet you by name and the lobby never gets old."',
      stayDate: 'November 2024',
      images: [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80'
      ],
      description: 'East London\'s original cool hotel. A neighbourhood lobby that\'s always buzzing, tiny-but-perfect rooms, and strong opinions about breakfast.',
      amenities: ['Breakfast included', 'Bar', 'Restaurant', 'Free Wi-Fi', '24h Front Desk'],
      category: 'Boutique Hotel',
      tags: ['UK', 'City', 'Design', 'London'],
      commission: 0.10
    },
    {
      id: 8,
      name: 'Riad Jnane Tamsna',
      location: 'Marrakech, Morocco',
      country: 'Morocco',
      price: 320,
      currency: '€',
      rating: 4.92,
      reviews: 29,
      nights: 4,
      creatorId: 'marcos',
      creatorNote: '"A full day in this garden and you forget the medina exists. The food alone is worth the journey."',
      stayDate: 'January 2025',
      images: [
        'https://images.unsplash.com/photo-1548018560-c7196548c73f?w=900&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'
      ],
      description: 'Five acres of gardens in the Palmeraie. Eleven suites, a cooking school, two pools, and an owner who has spent thirty years making this the most beautiful private space in Morocco.',
      amenities: ['2 Pools', 'Garden', 'Cooking School', 'Spa', 'Restaurant', 'Breakfast'],
      category: 'Riad',
      tags: ['Morocco', 'Luxury', 'Garden', 'Cultural'],
      commission: 0.10
    },
    {
      id: 9,
      name: 'Alaya Resort Ubud',
      location: 'Ubud, Bali',
      country: 'Indonesia',
      price: 280,
      currency: '€',
      rating: 4.88,
      reviews: 67,
      nights: 5,
      creatorId: 'yuna',
      creatorNote: '"Waking up to that jungle canopy every morning at 6am reset something in me entirely."',
      stayDate: 'April 2025',
      images: [
        'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=900&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80'
      ],
      description: 'Thatched villas perched on a ridge above the Campuhan River, surrounded by rice terraces. Infinity pool, an extraordinary spa, and a restaurant that sources everything from a ten-mile radius.',
      amenities: ['Infinity Pool', 'Spa', 'Yoga', 'Restaurant', 'Jungle View', 'Free Airport Transfer'],
      category: 'Resort',
      tags: ['Bali', 'Tropical', 'Wellness', 'Jungle'],
      commission: 0.10
    },
    {
      id: 10,
      name: 'Signiel Seoul',
      location: 'Seoul, South Korea',
      country: 'South Korea',
      price: 620,
      currency: '€',
      rating: 4.82,
      reviews: 43,
      nights: 3,
      creatorId: 'yuna',
      creatorNote: '"Floor 76, views to Namsan. Seoul is best seen from somewhere impossible."',
      stayDate: 'February 2025',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80'
      ],
      description: 'Seoul\'s most elevated luxury hotel, occupying floors 76–101 of the Lotte World Tower. Panoramic views from every room, a Michelin-starred restaurant, and the quietest beds in Asia.',
      amenities: ['City View', 'Spa', 'Pool', 'Restaurant', 'Bar', 'Concierge', 'Gym'],
      category: 'Luxury Hotel',
      tags: ['Korea', 'City', 'Luxury', 'Skyline'],
      commission: 0.10
    },
    {
      id: 11,
      name: 'Nimb Hotel',
      location: 'Copenhagen, Denmark',
      country: 'Denmark',
      price: 530,
      currency: '€',
      rating: 4.9,
      reviews: 35,
      nights: 3,
      creatorId: 'sofia',
      creatorNote: '"The Tivoli lights visible from the bathtub. I keep going back every December."',
      stayDate: 'December 2024',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80'
      ],
      description: 'A Moorish palace inside the Tivoli Gardens. Seventeen suites, each designed individually. One of the most romantic hotels in all of Europe and a Copenhagen landmark since 1909.',
      amenities: ['Tivoli Views', 'Spa', 'Restaurant', 'Bar', 'Breakfast', 'Concierge'],
      category: 'Historic Hotel',
      tags: ['Denmark', 'City', 'Romantic', 'Historic'],
      commission: 0.10
    },
    {
      id: 12,
      name: 'Casa Malca',
      location: 'Tulum, Mexico',
      country: 'Mexico',
      price: 195,
      currency: '$',
      rating: 4.74,
      reviews: 118,
      nights: 5,
      creatorId: 'sofia',
      creatorNote: '"Where cenote mornings and rooftop sunsets happen within the same perfect day."',
      stayDate: 'March 2025',
      images: [
        'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=900&q=80',
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80'
      ],
      description: 'Pablo Escobar\'s former Tulum residence, now a boutique hotel where the jungle meets the Caribbean. Cenote on property, rooftop with 360 views, and an art collection that invites conversation.',
      amenities: ['Private Cenote', 'Rooftop Pool', 'Beach Club', 'Restaurant', 'Spa', 'Yoga'],
      category: 'Boutique Hotel',
      tags: ['Mexico', 'Tropical', 'Beach', 'Jungle'],
      commission: 0.10
    }
  ],

  reviews: {
    1: [
      { reviewer: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', date: 'Feb 2025', stars: 5, text: 'Exactly what Camille described. The garden at breakfast genuinely stopped me in my tracks. Already planning a return.' },
      { reviewer: 'Tom K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', date: 'Jan 2025', stars: 5, text: 'The room was a work of art. Staff treated every guest like a personal friend. The best hotel I\'ve stayed in France.' },
      { reviewer: 'Mei L.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80', date: 'Dec 2024', stars: 5, text: 'We booked via Camille\'s recommendation and couldn\'t be more grateful. The lavender pool area is unreal.' }
    ],
    2: [
      { reviewer: 'Isabelle F.', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80', date: 'Nov 2024', stars: 5, text: 'Perfect location, perfect size. They remembered my coffee order on day two.' },
      { reviewer: 'James C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', date: 'Oct 2024', stars: 4, text: 'Parisian through and through. Small rooms, but who\'s in their room in Paris?' }
    ],
    3: [
      { reviewer: 'Anna P.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', date: 'Jun 2025', stars: 5, text: 'The view made us cry. Not joking. Three mornings of espresso on that terrace with the sea below us.' },
      { reviewer: 'Luca B.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', date: 'May 2025', stars: 5, text: 'Marcos called it right. The plunge pool alone justified the trip. We\'ll be back every May.' }
    ]
  }
};

// Simple state
const VIA_STATE = {
  get user() { try { return JSON.parse(localStorage.getItem('via_user')); } catch { return null; } },
  set user(v) { localStorage.setItem('via_user', JSON.stringify(v)); },
  get bookings() { try { return JSON.parse(localStorage.getItem('via_bookings')) || []; } catch { return []; } },
  set bookings(v) { localStorage.setItem('via_bookings', JSON.stringify(v)); },
  get wishlist() { try { return JSON.parse(localStorage.getItem('via_wishlist')) || []; } catch { return []; } },
  set wishlist(v) { localStorage.setItem('via_wishlist', JSON.stringify(v)); },

  addBooking(booking) {
    const b = this.bookings;
    b.unshift({ ...booking, id: Date.now(), status: 'confirmed', createdAt: new Date().toISOString() });
    this.bookings = b;
  },
  toggleWishlist(stayId) {
    const w = this.wishlist;
    const idx = w.indexOf(stayId);
    if (idx === -1) w.push(stayId); else w.splice(idx, 1);
    this.wishlist = w;
    return idx === -1;
  },
  isWishlisted(stayId) { return this.wishlist.includes(stayId); }
};

// Stay coordinates [lat, lng] for map view
const VIA_COORDS = {
  1:  [43.5297,   5.4474],
  2:  [48.8566,   2.3522],
  3:  [40.6280,  14.4843],
  4:  [38.7169,  -9.1399],
  5:  [35.0116, 135.7681],
  6:  [43.7102,   7.2620],
  7:  [51.5074,  -0.1278],
  8:  [31.6295,  -7.9811],
  9:  [-8.5069, 115.2625],
  10: [37.5665, 126.9780],
  11: [55.6761,  12.5683],
  12: [20.2115, -87.4654],
};

// Creator posts (social feed)
VIA_DATA.posts = [
  {
    id: 'p1', creatorId: 'camille', stayId: 1,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80',
    caption: 'Four days I genuinely never wanted to leave. The garden here in the early morning — lavender still wet, coffee in hand — is one of the best things I\'ve experienced anywhere.',
    location: 'Aix-en-Provence, France',
    postedAt: '2025-01-18',
    stats: { views: 124800, saves: 8420, bookings: 14, revenue: '€5,390' }
  },
  {
    id: 'p2', creatorId: 'yuna', stayId: 5,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80',
    caption: 'I have stayed in over 40 ryokans. This is the one I return to when I need to remember what stillness feels like. The private onsen at 5am, the garden at sunrise.',
    location: 'Kyoto, Japan',
    postedAt: '2025-03-10',
    stats: { views: 287400, saves: 21600, bookings: 22, revenue: '¥1.87m' }
  },
  {
    id: 'p3', creatorId: 'marcos', stayId: 3,
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80',
    caption: 'You will not find a better view in all of Positano. We sat on this terrace for four hours and watched the light change. Nothing to add.',
    location: 'Positano, Italy',
    postedAt: '2025-05-22',
    stats: { views: 198600, saves: 15200, bookings: 18, revenue: '€12,240' }
  },
  {
    id: 'p4', creatorId: 'sofia', stayId: 11,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',
    caption: 'Tivoli lights visible from the bathtub. I keep going back every December. There is no other hotel in Copenhagen like this — or really anywhere.',
    location: 'Copenhagen, Denmark',
    postedAt: '2024-12-20',
    stats: { views: 94200, saves: 6810, bookings: 9, revenue: '€4,770' }
  },
  {
    id: 'p5', creatorId: 'camille', stayId: 2,
    image: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=900&q=80',
    caption: 'My Paris base for the 9th arr. Warm plaster walls, the best breakfast, and they remembered my coffee order by day two.',
    location: 'Paris, France',
    postedAt: '2024-10-14',
    stats: { views: 88300, saves: 5640, bookings: 11, revenue: '€4,620' }
  },
  {
    id: 'p6', creatorId: 'marcos', stayId: 8,
    image: 'https://images.unsplash.com/photo-1548018560-c7196548c73f?w=900&q=80',
    caption: 'A full day in this garden and you forget the medina exists. Five acres of palms, two pools, and the owner has spent thirty years making it perfect.',
    location: 'Marrakech, Morocco',
    postedAt: '2025-01-12',
    stats: { views: 156700, saves: 11900, bookings: 16, revenue: '€5,120' }
  },
  {
    id: 'p7', creatorId: 'yuna', stayId: 9,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=900&q=80',
    caption: 'Waking up to that jungle canopy every morning at 6am reset something in me entirely. The Campuhan River below, the rice terraces beyond. Ubud at its most unhurried.',
    location: 'Ubud, Bali',
    postedAt: '2025-04-18',
    stats: { views: 312400, saves: 24700, bookings: 31, revenue: '€8,680' }
  },
  {
    id: 'p8', creatorId: 'sofia', stayId: 12,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=900&q=80',
    caption: 'Cenote mornings and rooftop sunsets within the same perfect day. Tulum doesn\'t need to try this hard, and yet it does.',
    location: 'Tulum, Mexico',
    postedAt: '2025-03-08',
    stats: { views: 76100, saves: 5280, bookings: 7, revenue: '€1,365' }
  },
];

// Helpers
function getCreator(id) { return VIA_DATA.creators.find(c => c.id === id); }
function getStay(id) { return VIA_DATA.stays.find(s => s.id === id); }
function getStaysByCreator(creatorId) { return VIA_DATA.stays.filter(s => s.creatorId === creatorId); }
function getPostsByCreator(creatorId) { return VIA_DATA.posts.filter(p => p.creatorId === creatorId); }
function formatPrice(amount, currency) { return `${currency}${typeof amount === 'number' ? amount.toLocaleString() : amount}`; }
function starsHtml(n) { return '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)); }
function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return `${diff} days ago`;
  if (diff < 365) return `${Math.floor(diff/30)} months ago`;
  return `${Math.floor(diff/365)}y ago`;
}
function fmtNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'm';
  if (n >= 1000) return (n/1000).toFixed(1) + 'k';
  return n.toString();
}

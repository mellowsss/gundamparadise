# Gundam Paradise

A modern web application for Gundam model kit (Gunpla) collectors to track prices, manage collections, and never miss a deal.

## Features

- **Search & Browse**: Search through Gundam kits by name, grade (HG, RG, MG, PG, etc.), and series
- **Price Tracking**: View current prices, average prices, and price history charts
- **Collection Management**: Track your owned kits with purchase prices and dates (stored in browser)
- **Wishlist**: Save kits you want to buy and set target prices (stored in browser)
- **Price Alerts**: Get notified when prices drop or kits come back in stock
- **Statistics Dashboard**: View detailed stats about your collection and spending

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Storage**: Browser localStorage (no database required!)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gundamparadise
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gundamparadise/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (using localStorage)
│   ├── kits/              # Kit detail pages
│   ├── search/            # Search page
│   ├── wishlist/          # Wishlist page
│   ├── collection/        # Collection page
│   └── stats/             # Statistics page
├── components/            # React components
├── lib/                   # Utilities and storage
└── public/                # Static assets
```

## Storage

This app uses **browser localStorage** for data persistence. This means:
- ✅ No database setup required
- ✅ Data persists in your browser
- ✅ Works offline
- ⚠️ Data is stored locally (not synced across devices)
- ⚠️ Data is cleared if you clear browser data

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Deploy - **No database setup needed!**

The app will work immediately after deployment. Users' data will be stored in their browser's localStorage.

## API Endpoints

All endpoints work with localStorage:

- `GET /api/kits` - Search and list kits
- `GET /api/kits/[id]` - Get kit details
- `GET /api/kits/[id]/prices` - Get price history
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add kit to wishlist
- `DELETE /api/wishlist/[id]` - Remove from wishlist
- `GET /api/collection` - Get user's collection
- `POST /api/collection` - Add kit to collection
- `DELETE /api/collection/[id]` - Remove from collection
- `GET /api/alerts` - Get user's price alerts
- `POST /api/alerts` - Create price alert
- `DELETE /api/alerts/[id]` - Delete alert

## Future Enhancements

- User authentication and cloud sync
- Price scraping from retailers
- Email/SMS notifications for alerts
- Social features (sharing collections)
- Mobile app
- Advanced filtering and sorting
- Kit recommendations

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
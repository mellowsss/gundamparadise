# Gundam Paradise

A modern web application for Gundam model kit (Gunpla) collectors to track prices, manage collections, and never miss a deal.

## Features

- **Search & Browse**: Search through Gundam kits by name, grade (HG, RG, MG, PG, etc.), and series
- **Price Tracking**: View current prices, average prices, and price history charts
- **Collection Management**: Track your owned kits with purchase prices and dates
- **Wishlist**: Save kits you want to buy and set target prices
- **Price Alerts**: Get notified when prices drop or kits come back in stock
- **Statistics Dashboard**: View detailed stats about your collection and spending

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
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

3. Set up the database:
```bash
# Create the database and run migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gundamparadise/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── kits/          # Kit endpoints
│   │   ├── wishlist/      # Wishlist endpoints
│   │   ├── collection/    # Collection endpoints
│   │   └── alerts/        # Price alert endpoints
│   ├── kits/              # Kit detail pages
│   ├── search/            # Search page
│   ├── wishlist/          # Wishlist page
│   ├── collection/        # Collection page
│   └── stats/             # Statistics page
├── components/            # React components
├── lib/                   # Utilities and Prisma client
├── prisma/                # Prisma schema and migrations
└── public/                # Static assets
```

## Database Schema

The app uses Prisma with SQLite. Key models include:

- **Kit**: Gundam model kits with grade, series, scale, etc.
- **PriceEntry**: Historical price data for tracking
- **Store**: Retailers where kits can be purchased
- **WishlistItem**: User's wishlist items
- **CollectionItem**: User's owned kits
- **PriceAlert**: Price drop and stock alerts

## API Endpoints

### Kits
- `GET /api/kits` - Search and list kits
- `GET /api/kits/[id]` - Get kit details
- `GET /api/kits/[id]/prices` - Get price history
- `POST /api/kits/[id]/prices` - Add price entry

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add kit to wishlist
- `DELETE /api/wishlist/[id]` - Remove from wishlist

### Collection
- `GET /api/collection` - Get user's collection
- `POST /api/collection` - Add kit to collection
- `DELETE /api/collection/[id]` - Remove from collection

### Alerts
- `GET /api/alerts` - Get user's price alerts
- `POST /api/alerts` - Create price alert
- `DELETE /api/alerts/[id]` - Delete alert

## User Types

Currently, the app supports **Guest Users** who can:
- Browse and search kits
- View price information
- Manage wishlist and collection
- Set up price alerts

Future versions will include authenticated users with persistent data across devices.

## Development

### Database Commands

```bash
# Create a new migration
npm run db:migrate

# Push schema changes without migration
npm run db:push

# Seed the database
npm run db:seed
```

### Building for Production

```bash
npm run build
npm start
```

## Future Enhancements

- User authentication and accounts
- Price scraping from retailers
- Email/SMS notifications for alerts
- Social features (sharing collections)
- Mobile app
- Advanced filtering and sorting
- Kit recommendations

## Deployment

### Deploy to Vercel

The easiest way to deploy Gundam Paradise is using [Vercel](https://vercel.com):

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set up Database** (Choose one):
   
   **Option A: Vercel Postgres (Recommended)**
   - In your Vercel project, go to **Storage** tab
   - Create a **Postgres** database
   - Update `prisma/schema.prisma` to use `postgresql` instead of `sqlite`
   - Add environment variables:
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `DATABASE_URL` (same as POSTGRES_PRISMA_URL)

   **Option B: External Database**
   - Use PlanetScale, Supabase, or another provider
   - Add `DATABASE_URL` environment variable in Vercel

4. **Deploy**
   - Click **Deploy**
   - After deployment, run migrations:
     ```bash
     npx vercel env pull .env.local
     npx prisma migrate deploy
     ```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
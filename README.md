# 🚀 Burch Platform - Complete & Ready for Deployment

A comprehensive event, hotel, and restaurant booking platform built with Next.js, PostgreSQL, and payment integration (M-Pesa + Flutterwave).

## ✨ Features

✅ **Event Management** - Create, manage, and sell event tickets  
✅ **Hotel Bookings** - Partner portal for managing hotel reservations  
✅ **Restaurant Reservations** - Manage dining reservations  
✅ **QR Code Tickets** - Digital event tickets with QR codes for check-in  
✅ **Manual Check-in** - 8-character alphanumeric codes for offline venues  
✅ **Payment Processing** - M-Pesa sandbox & Flutterwave integration  
✅ **Email Confirmations** - Automatic booking confirmations via Resend  
✅ **Partner Portal** - Full management dashboard for organizers  
✅ **Guest Dashboard** - View & manage all bookings  
✅ **Authentication** - NextAuth.js with email/password & OAuth  
✅ **Seed Data** - 8 Nairobi hotels + 20 restaurants + Kenyan events  

---

## 📋 Quick Start (5 Minutes)

### 1. Prerequisites
- **Node.js 20+** ([https://nodejs.org](https://nodejs.org))
- **PostgreSQL 14+** or Neon account ([https://neon.tech](https://neon.tech))
- **npm or yarn**

### 2. Clone & Setup
```bash
git clone https://github.com/Burch-Labs/burch-platform.git
cd burch-platform
npm install
```

### 3. Environment Variables
Create `.env.local` in root:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/burch_platform
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:5000
RESEND_API_KEY=re_your_key
EMAIL_FROM=Burch Platform <noreply@your-domain.com>
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=174379
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_your_key
FLUTTERWAVE_SECRET_HASH=your_hash
```

### 4. Database Setup
```bash
cd apps/web
npm run db:push
npm run db:seed  # Optional: Add sample data
```

### 5. Run Local
```bash
npm run dev
# Visit http://localhost:5000
```

---

## 🦁 Lilita Keper Agent Portal - Hackathon Submission

**All Things Agentic Hackathon 2026** - Autonomous Booking Management System

### 📚 Quick Navigation

**Start Here:**
- 🎯 [HACKATHON.md](./HACKATHON.md) - Complete submission overview & executive summary
- 🎬 [DEMO_VIDEO_SCRIPT.md](./DEMO_VIDEO_SCRIPT.md) - 5-minute production-ready demo script
- 📊 [PROCESS_FLOW_A_Z.html](./PROCESS_FLOW_A_Z.html) - Interactive A-Z workflow diagram (26 steps, 8 phases)

**Live Portal:** https://lilita-agent-portal-881829848506.us-central1.run.app

---

## 📖 Complete Documentation Index

### 🎯 **HACKATHON & PRESENTATION MATERIALS**
| Resource | Purpose |
|----------|---------|
| [HACKATHON.md](./HACKATHON.md) | Executive summary, business impact, technical highlights |
| [DEMO_VIDEO_SCRIPT.md](./DEMO_VIDEO_SCRIPT.md) | 5-minute read-aloud demo script with screen cues |
| [PROCESS_FLOW_A_Z.html](./PROCESS_FLOW_A_Z.html) | Interactive visual workflow (A→Z, 26 steps, 19 autonomous) |
| [FEATURES_COMPLETE.md](./FEATURES_COMPLETE.md) | Complete feature list with pricing & capabilities |

### 🎨 **FRONTEND**
| Resource | Content |
|----------|---------|
| [index.html](./index.html) | Landing page with interactive route navigation |
| `apps/web/` | Next.js frontend application |
| `apps/web/components/` | React components (auth, bookings, partner portal) |
| [DESIGN.md](./docs/DESIGN.md) | UI/UX guidelines and component specifications |
| Baby Brown Branding | Luxury safari aesthetic (baby brown #8B7355, dark green #2D5A3D) |

### ⚙️ **BACKEND**
| Resource | Content |
|----------|---------|
| `apps/web/api/` | API routes and handlers |
| `apps/actions/` | Server actions and business logic |
| [API.md](./API.md) | API endpoint documentation |
| [ENGINEERING.md](./ENGINEERING.md) | Backend architecture & patterns |
| Email Service | Resend API integration for bulk campaigns |
| Payment Processing | M-Pesa + Flutterwave payment handlers |

### 🗄️ **DATABASE**
| Resource | Content |
|----------|---------|
| `apps/database/` | Prisma schema and migrations |
| [DATABASE.md](./DATABASE.md) | Database structure & relationships |
| `apps/database/schema.prisma` | Complete data model |
| `apps/database/scripts/` | Seed data & database utilities |
| PostgreSQL 14+ | Production database with Neon support |

### 🚀 **DEPLOYMENT**
| Resource | Purpose |
|----------|---------|
| [CLOUD_RUN_DEPLOYMENT.md](./CLOUD_RUN_DEPLOYMENT.md) | **Primary:** Google Cloud Run setup (current production) |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | General deployment strategies |
| [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) | Step-by-step deployment walkthrough |
| [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | Fast deployment checklist |
| [SELF_HOSTING_GUIDE.md](./SELF_HOSTING_GUIDE.md) | Self-hosted VPS/Docker deployment |
| [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) | Render.com deployment guide |
| [DOWNLOAD_INSTRUCTIONS.md](./DOWNLOAD_INSTRUCTIONS.md) | Offline/custom hosting |
| Docker | Containerized deployment ready |
| Google Cloud Console | Monitoring, logging, auto-scaling |

### 🧪 **TESTING & QA**
| Resource | Content |
|----------|---------|
| [FINAL_TESTING_CHECKLIST.md](./FINAL_TESTING_CHECKLIST.md) | Complete testing matrix (15 categories) |
| [TESTING_AND_DEPLOYMENT.md](./TESTING_AND_DEPLOYMENT.md) | QA procedures and validation steps |

### 📋 **CONFIGURATION & SETUP**
| Resource | Content |
|----------|---------|
| [ENVIRONMENT.md](./ENVIRONMENT.md) | Environment variables reference |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Initial project setup |
| [CREDENTIALS_TEMPLATE.txt](./CREDENTIALS_TEMPLATE.txt) | Template for required API keys |
| `.env.example` | Environment template |
| `.env.test` | Test environment configuration |

### 🔐 **SECURITY**
| Resource | Content |
|----------|---------|
| [SECURITY.md](./SECURITY.md) | Security best practices & checklist |
| [SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md) | Comprehensive security audit |
| HTTPS Enforced | Production deployment requires HTTPS |
| Input Sanitization | XSS & SQL injection prevention |

### 📊 **BUSINESS & STRATEGY**
| Resource | Content |
|----------|---------|
| [VISION.md](./VISION.md) | Product vision & long-term roadmap |
| [BUSINESS_MODEL.md](./BUSINESS_MODEL.md) | Revenue model & unit economics |
| [ROADMAP.md](./ROADMAP.md) | Feature roadmap Q3–Q4 2026 |
| [SUCCESS_METRICS.md](./SUCCESS_METRICS.md) | KPIs and measurement framework |
| [PRODUCT_REQUIREMENTS.md](./PRODUCT_REQUIREMENTS.md) | Detailed product requirements |
| [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) | Pre-launch verification |

### 👥 **TEAM & OPERATIONS**
| Resource | Content |
|----------|---------|
| [AI-TEAM.md](./AI-TEAM.md) | AI agent roles and responsibilities |
| [AGENT-MANAGEMENT.md](./AGENT-MANAGEMENT.md) | Agent deployment & lifecycle |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines |

### 📚 **ADDITIONAL RESOURCES**
| Resource | Content |
|----------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture overview |
| [TECH_STACK.md](./TECH_STACK.md) | Technology stack details |
| [PROJECT_PLAN.md](./PROJECT_PLAN.md) | Development timeline |
| [CHANGELOG.md](./CHANGELOG.md) | Version history & updates |
| [FIXES_SUMMARY.md](./FIXES_SUMMARY.md) | Recent bug fixes & improvements |
| [DEPLOYMENT_AUDIT_REPORT.md](./DEPLOYMENT_AUDIT_REPORT.md) | Post-deployment audit |

---

## 🌐 Navigation Index

**Start here:** Open [INDEX.html](./INDEX.html) in a browser for interactive navigation of all routes.

### Main Routes

#### 🔐 **Authentication**
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up
- `/auth/forgot-password` - Password reset

#### 👤 **Guest Dashboard**
- `/dashboard` - Main dashboard
- `/dashboard/bookings` - All bookings
- `/dashboard/bookings/[bookingId]` - Edit booking

#### 🎫 **Tickets**
- `/tickets/[bookingId]` - Digital event ticket (QR + code)
- `/checkin/[token]` - Guest check-in (public)

#### 🏨 **Browse**
- `/events` - Browse events
- `/hotels` - Browse hotels
- `/restaurants` - Browse restaurants

#### 👨‍💼 **Partner Portal**
- `/partner` - Dashboard home
- `/partner/checkin` - Scan QR or enter codes
- `/partner/events` - Manage events
- `/partner/hotels` - Manage hotels
- `/partner/restaurants` - Manage restaurants

#### ⚙️ **Admin**
- `/admin` - Admin dashboard
- `/admin/users` - Manage users
- `/admin/partners` - Manage partners
- `/admin/events`, `/admin/hotels`, `/admin/restaurants` - Manage all entities

#### 🔌 **API**
- `GET /api/health` - Health check (503 if config errors)

---

## 📦 Deployment Options

### Option 1: Self-Host (Recommended) 
Full control, lowest cost after initial setup.

**Read:** [SELF_HOSTING_GUIDE.md](./SELF_HOSTING_GUIDE.md)

Supports:
- Linux VPS with PM2 or Systemd
- Docker
- Heroku, DigitalOcean, AWS, Google Cloud, Azure
- Nginx reverse proxy with HTTPS/SSL

### Option 2: Render (Free Tier)
Quick deployment, limited resources.

**Read:** [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

### Option 3: Download & Deploy
For offline deployment or custom hosting.

**Read:** [DOWNLOAD_INSTRUCTIONS.md](./DOWNLOAD_INSTRUCTIONS.md)

---

## 🔧 Environment Variables

### Required
| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host/db` |
| `NEXTAUTH_SECRET` | Session encryption (run: `openssl rand -base64 32`) | `B1AXW6CUWQHVn5eGTmiA1...` |
| `NEXTAUTH_URL` | Public app URL | `https://your-domain.com` |
| `RESEND_API_KEY` | Email service | `re_Am94ybid` |
| `EMAIL_FROM` | Sender email | `Burch Platform <noreply@...>` |

### M-Pesa (Sandbox for Testing)
| Variable | Purpose |
|----------|---------|
| `MPESA_ENV` | `sandbox` or `production` |
| `MPESA_CONSUMER_KEY` | From Safaricom |
| `MPESA_CONSUMER_SECRET` | From Safaricom |
| `MPESA_PASSKEY` | Base64 encoded Passkey |
| `MPESA_SHORTCODE` | Test: 174379 |

### Flutterwave (Sandbox for Testing)
| Variable | Purpose |
|----------|---------|
| `FLUTTERWAVE_SECRET_KEY` | Test: `FLWSECK_TEST_...` |
| `FLUTTERWAVE_SECRET_HASH` | Webhook hash |

### Optional
| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | For AI features (optional) |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth |

---

## 🗄️ Database Schema

### Core Models
- **User** - Platform users (guests & partners)
- **Partner** - Event organizers, hotels, restaurants
- **Event** - Events with tickets & check-in
- **Hotel** - Hotels with room inquiries
- **Restaurant** - Restaurants with reservation inquiries
- **Booking** - All bookings (EVENT, HOTEL, RESTAURANT type)
  - `checkInToken` - 8-char code for manual entry
  - `checkedInAt` - Timestamp when guest checked in
- **Payment** - Payment records (M-Pesa, Flutterwave)

---

## 🔐 Security Checklist

- ✅ Never commit `.env.local` (secrets)
- ✅ Use strong `NEXTAUTH_SECRET` (for session encryption)
- ✅ Enable HTTPS in production (critical for payments)
- ✅ Regularly backup PostgreSQL database
- ✅ Monitor logs for errors & suspicious activity
- ✅ Keep Node.js & PostgreSQL updated
- ✅ Validate all user input at API boundaries
- ✅ Use environment variables for all secrets

---

## 📊 Testing Credentials (Sandbox)

### M-Pesa Test Payment
- Phone: `254708374149`
- Amount: Any amount (KES)
- Status: Will appear as PENDING until webhook confirms

### Flutterwave Test Payment
- Card: Use test card numbers from Flutterwave docs
- Status: Immediate confirmation via webhook

### Email Testing
All emails can be redirected to: `sparksnairobi@gmail.com`  
Set `EMAIL_OVERRIDE_TO` env var in development.

---

## 🚨 Troubleshooting

### Database Connection Error
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules apps/web/.next apps/web/node_modules
npm ci --legacy-peer-deps
npm run build
```

### App Won't Start
```bash
# Check logs (PM2)
pm2 logs burch-platform

# Or Systemd
sudo journalctl -u burch-platform -f
```

### Configuration Errors
- Visit `/api/health` endpoint
- Returns 503 with error details if config is invalid
- Check all environment variables are set

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [INDEX.html](./INDEX.html) | **Start here** - Interactive route index |
| [SELF_HOSTING_GUIDE.md](./SELF_HOSTING_GUIDE.md) | Complete self-hosting instructions |
| [DOWNLOAD_INSTRUCTIONS.md](./DOWNLOAD_INSTRUCTIONS.md) | How to download & set up locally |
| [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) | Render deployment guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Environment setup & checklist |
| [QUICK_START.md](./QUICK_START.md) | Quick reference guide |

---

## 🏗️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend** | Next.js | 15.5.22 |
| **Language** | TypeScript | 5.8 |
| **Database** | PostgreSQL | 14+ |
| **ORM** | Prisma | 6.9.0 |
| **Auth** | NextAuth.js | 4.24.15 |
| **Styling** | Tailwind CSS | 4.1 |
| **Runtime** | Node.js | 20+ |

---

## 🎯 What's Included

```
burch-platform/
├── apps/web/                    # Next.js app (main)
│   ├── src/
│   │   ├── app/                 # Routes (App Router)
│   │   ├── components/          # React components
│   │   ├── lib/                 # Utilities
│   │   └── styles/              # Tailwind CSS
│   ├── prisma/                  # Database schema & migrations
│   ├── public/                  # Static assets
│   └── package.json
├── packages/                    # Shared libraries
├── INDEX.html                   # Interactive navigation
├── SELF_HOSTING_GUIDE.md        # Deployment guide
├── DOWNLOAD_INSTRUCTIONS.md     # Setup instructions
├── RENDER_DEPLOYMENT.md         # Render guide
├── DEPLOYMENT.md                # Environment reference
├── QUICK_START.md               # Quick reference
└── README.md                    # This file
```

---

## 🚀 Deployment Timeline

**Phase 1: Local Development** (5-10 min)
- Clone repo → Install → Add env vars → Run dev

**Phase 2: Testing** (10-15 min)
- Run `npm run dev`
- Test sign up → Browse events → Create booking
- Test M-Pesa sandbox payment

**Phase 3: Production Setup** (30-60 min)
- Choose hosting: Self-host / Render / Cloud
- Set up database (PostgreSQL / Neon)
- Configure environment variables
- Build: `npm run build`

**Phase 4: Deployment** (5-30 min)
- Deploy to chosen platform
- Run migrations: `npm run db:push`
- Test live instance
- Set up monitoring (optional)

---

## 📞 Support

- **Docs:** See links above
- **Issues:** https://github.com/Burch-Labs/burch-platform/issues
- **Database:** [Prisma Docs](https://www.prisma.io/docs)
- **Framework:** [Next.js Docs](https://nextjs.org/docs)

---

## 🎉 Ready to Deploy!

1. **Quick Test:** `npm run dev` → Visit http://localhost:5000
2. **Choose Platform:** Self-host (recommended) or Render
3. **Deploy:** Follow the appropriate guide above
4. **Monitor:** Use PM2, Systemd, or cloud provider dashboard

**Questions?** Check [SELF_HOSTING_GUIDE.md](./SELF_HOSTING_GUIDE.md) or [INDEX.html](./INDEX.html)

---

**Burch Platform v1.0.0** | Complete & Production-Ready 🚀

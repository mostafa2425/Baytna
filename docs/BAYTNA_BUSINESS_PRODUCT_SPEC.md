# Baytna — Business & Product Specification

## Vision
**بيتنا — اعرف ناقص إيه، اكتب اللي محتاجه، وانزل اشتري وأنت عارف.**

Baytna is a personal household shopping assistant. It starts with a simple loop and becomes smarter through purchase history.

## Product loop
**Catalog → List → Buy → Record Price → History**

## Languages
- Arabic is the default.
- English is fully supported.
- RTL/LTR must be first-class.
- Initial currency: EGP.

## Product identity
A name is not enough to identify a product.

**Category → Base Product → Brand/Attributes → Product Variant → Purchase**

Examples:
- Tomato 500 g ≠ Tomato 1 kg.
- Juhayna Milk 1 L ≠ Juhayna Milk 2 L.
- Juhayna Milk 1 L ≠ Almarai Milk 1 L.
- Tomato / طماطم / طماطه can map to the same base product through aliases.

Purchase quantity is separate from package/variant size.

## Core entities
- profiles
- categories
- brands
- base_products
- product_aliases
- product_variants
- user_products
- user_favorites
- stores
- shopping_lists
- shopping_list_items
- shopping_sessions
- purchase_items
- price_history (planned extension)
- receipts
- budgets

## Phase 1 — Simple
**List → Buy → Record Price**

- Authentication
- Arabic default + English
- Categories and large seed catalog
- Search products
- Product variants, brands, sizes and units
- Shopping lists
- Edit lists
- Start shopping
- Purchased / Not Purchased
- Requested and purchased quantities
- Price recording
- Shopping totals
- Receipt upload
- Basic history

## Phase 2 — Personal
**Favorites → History → Buy Again → Stores**

- Personal product library
- Favorites
- Quick Add
- Store management
- Preferred store
- Purchase history
- Last price
- Buy Again

## Phase 3 — Smart
**Price Comparison → Unit Price → Budget → Suggestions**

- Price changes
- Previous price comparison
- Unit price normalization
- Cheapest known option
- Monthly budget
- Spending trends
- Purchase frequency
- Smart suggestions

Example:
500 g tomato for 30 EGP = 60 EGP/kg.
1 kg tomato for 52 EGP = 52 EGP/kg.

## Phase 4 — AI
**أنا هطبخ إيه؟ → إيه اللي ناقص؟**

- Recipe → shopping list
- Missing ingredients
- Smart weekly shopping
- Receipt OCR
- Natural language product entry
- Intelligent product matching

## Initial seed categories
1. Dairy & Milk — الألبان
2. Vegetables — الخضروات
3. Fruits — الفواكه
4. Meat — اللحوم
5. Poultry — الدواجن
6. Fish & Seafood — الأسماك
7. Rice & Grains — الأرز والحبوب
8. Pasta — المكرونة
9. Legumes — البقوليات
10. Bakery — المخبوزات
11. Breakfast — الإفطار
12. Canned Food — المعلبات
13. Sauces & Condiments — الصوصات
14. Oils & Fats — الزيوت
15. Spices — التوابل
16. Snacks — السناكس
17. Sweets — الحلويات
18. Beverages — المشروبات
19. Coffee & Tea — القهوة والشاي
20. Frozen Food — المجمدات
21. Household Cleaning — منظفات المنزل
22. Paper & Disposable — الورقيات
23. Personal Care — العناية الشخصية
24. Baby — الأطفال
25. Pet Supplies — الحيوانات
26. Home Supplies — مستلزمات المنزل

The hosted seed currently contains **26 categories, 173 base products, 187 variants and 5 brands**. The catalog is intentionally extensible.

## UI / Design
- Next.js + TypeScript
- Ant Design
- SCSS custom design layer
- Mobile-first
- Compact spacing
- Rounded cards
- Friendly household feel
- Green primary: `#16A34A`
- Amber: `#F59E0B`
- Danger red: `#EF4444`
- Warm background: `#F7FAF7`

## Backend
Supabase provides:
- PostgreSQL
- Auth
- Row Level Security
- Storage

All user-owned data is protected by RLS.
Receipt storage uses a private `receipts` bucket and user-scoped object paths.

## Deployment
- GitHub: `mostafa2425/Baytna`
- Frontend: Next.js on Vercel
- Backend: Supabase project `Baytna`
- Environment variables are never committed.

## MVP success criteria
A user can sign in, create a list, search/select a correctly sized product variant, add it, start shopping, mark items purchased/not purchased, record quantities/prices, upload a receipt, and review history.

## Philosophy
**Simple first. Smart later.**
AI is an enhancement, not a dependency for core shopping.

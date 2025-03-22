# Frontend Layihəsinin Təlimatı (Azərbaycan dili)

## Layihə haqqında
Bu frontend layihəsi **Next**, **TypeScript** və **Tailwind CSS** ilə hazırlanmışdır. Layihə **backend**-ə asılıdır və düzgün işləməsi üçün **backend** lokal mühitdə işləməlidir.

## Tələblər
Layihəni işlətmək üçün aşağıdakı tələblərə cavab verən sistemə ehtiyac var:
- **Node.js** (Son versiya tövsiyə olunur)
- **npm** və ya **yarn**

## Quraşdırma
Layihəni endirdikdən sonra aşağıdakı addımları yerinə yetirin:

```bash
# Layihəni klonlayın
$ git clone <repository-link>

# Layihə qovluğuna keçin
$ cd frontend

# Asılılıqları quraşdırın
$ npm install  # və ya `yarn install`
```

## Backend ilə Bağlantı
Bu frontend layihəsi backend ilə əlaqəli olduğu üçün backend-in lokal mühitdə işləməsi vacibdir. Backend **localhost:3002** portunda işləməlidir. Əgər backend fərqli portda işləyirsə, **frontend konfiqurasiyasını müvafiq olaraq yeniləməlisiniz.**

## Layihəni İşə Salmaq

```bash
# İnkişaf mühiti üçün
$ npm run dev  # və ya `yarn dev`
```

Layihə **http://localhost:5173** ünvanında işləyəcək (Vite istifadə etdiyiniz halda). Əgər fərqli portda işləyirsə, terminalda göstərilən linki yoxlayın.

## Build və Deployment

```bash
# Layihəni build etmək üçün
$ npm run build  # və ya `yarn build`
```

Build edilmiş fayllar `dist` qovluğuna yazılacaq. Bu faylları istənilən **hosting** platformasına yükləyə bilərsiniz.

## Əlaqə
Layihə ilə bağlı suallarınız yaranarsa, bizimlə əlaqə saxlaya bilərsiniz. 🚀



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🌟 Modern Portfolio Website

<div align="center">
  <img src="public/images/preview.png" alt="Portfolio Preview" width="100%">
  
  <p align="center">
    A modern, animated portfolio website built with Next.js 14 and TypeScript
    <br />
    <a href="https://raikou.me"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/devraikou/modern-portfolio/issues">Report Bug</a>
    ·
    <a href="https://github.com/devraikou/modern-portfolio/issues">Request Feature</a>
  </p>

  ![GitHub stars](https://img.shields.io/github/stars/devraikou/modern-portfolio)
  ![GitHub forks](https://img.shields.io/github/forks/devraikou/modern-portfolio)
  ![GitHub issues](https://img.shields.io/github/issues/devraikou/modern-portfolio)
  ![GitHub license](https://img.shields.io/github/license/devraikou/modern-portfolio)
</div>

## ✨ Features

- 🎨 **Modern Design**
  - Neon-themed UI with smooth animations
  - Responsive layout for all devices
  - Custom animated cursors
  - Beautiful gradient effects
  - Smooth page transitions

- 🎮 **Discord Integration**
  - Real-time status updates via Lanyard API
  - Custom animated Discord card
  - Display current activity
  - Dynamic badge showcase

- 💼 **Project Showcase**
  - Dynamic project grid with animations
  - Animated project cards with hover effects
  - Technology tags
  - Live demo & GitHub links

- 🛠 **Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Framer Motion for animations
  - MongoDB for data storage

- 🔒 **Security Features**
  - Protected admin dashboard
  - Environment variable protection
  - API route protection

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- MongoDB database
- Discord account (for Lanyard API)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/devRaikou/modern-portfolio.git
   cd modern-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file
   ```env
   MONGODB_URI=your_mongodb_uri
   DISCORD_USER_ID=your_discord_id
   NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── DiscordCard/  # Discord status card
│   │   ├── ProjectCard/  # Project showcase card
│   │   └── ...
│   ├── lib/             # Utilities and database
│   └── types/           # TypeScript types
├── public/              # Static assets
└── styles/             # Global styles
```

## 🎨 Customization

### Theme Colors

Edit the theme colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'neon-pink': '#ff006e',
      'neon-blue': '#3a86ff',
      'neon-purple': '#8338ec',
    }
  }
}
```

### Background Effects

Modify animations in `src/app/globals.css`:
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Content

Update your information in:
- `src/app/page.tsx` - Main content
- `src/components/DiscordCard.tsx` - Social links

## 🔑 Admin Dashboard

Access the admin panel at `/admin` to:
- Add new projects
- Edit existing projects
- Manage project images
- Update content

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lanyard API](https://github.com/Phineas/lanyard)
- [MongoDB](https://www.mongodb.com/)

## 📧 Contact

Arda Gülez - [@devraikou](https://twitter.com/devraikou)
           - [@ard4gulez](https://www.instagram.com/ard4gulez/)
           - [@ardagulez](https://www.linkedin.com/in/ardagulez/)  

Project Link: [https://github.com/devraikou/modern-portfolio](https://github.com/devraikou/modern-portfolio)

---

<p align="center">If you found this project helpful, please consider giving it a ⭐️!</p> 

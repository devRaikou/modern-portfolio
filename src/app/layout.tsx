import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Hi, I'm Arda | Full-Stack Developer",
  description: 'A passionate full-stack developer crafting innovative web experiences with modern technologies',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script id="protection" strategy="beforeInteractive">
          {`
            // Disable right click
            document.addEventListener('contextmenu', (e) => e.preventDefault());

            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            document.addEventListener('keydown', (e) => {
              if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
                (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
              ) {
                e.preventDefault();
              }
            });

            // Disable text selection
            document.addEventListener('selectstart', (e) => e.preventDefault());

            // Custom message when trying to copy
            document.addEventListener('copy', (e) => {
              e.preventDefault();
              alert('Copying is not allowed on this website!');
            });

            // Disable developer tools
            setInterval(() => {
              const devtools = /./;
              devtools.toString = function() {
                this.opened = true;
              }
              console.log('%c', devtools);
            }, 1000);

            // Disable view source
            document.onkeypress = function (event) {
              event = (event || window.event);
              if (event.keyCode == 123) {
                return false;
              }
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-dark-bg text-white min-h-screen relative`}>
        {children}
        <div className="signature group">
          <svg
            className="w-4 h-4 text-neon-purple opacity-50 group-hover:opacity-100 transition-opacity"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5l6-4.5-6-4.5v9z" />
          </svg>
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
            Made by devRaikou
          </span>
          <svg
            className="w-4 h-4 text-neon-pink opacity-50 group-hover:opacity-100 transition-opacity"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </body>
    </html>
  );
} 
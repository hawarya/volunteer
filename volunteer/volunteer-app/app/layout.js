// app/layout.js
export const metadata = {
  title: "Volunteer Work Assignment Tool",
  description: "Manage events, volunteers, and assignments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f4f4f4" }}>
        {children}
      </body>
    </html>
  );
}

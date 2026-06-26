export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🏠 Home Page</h1>
      <p>dolphin-routing ले यो page auto-detect गर्यो!</p>
      <nav style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <a href="/about">About →</a>
        <a href="/blog">Blog →</a>
      </nav>
    </div>
  );
}

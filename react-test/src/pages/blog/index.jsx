export default function Blog() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📝 Blog Page</h1>
      <p>यो /blog route हो!</p>
      <ul>
        <li><a href="/blog/hello-world">Post: hello-world</a></li>
        <li><a href="/blog/dolphincss-rocks">Post: dolphincss-rocks</a></li>
      </ul>
      <a href="/">← Home</a>
    </div>
  );
}

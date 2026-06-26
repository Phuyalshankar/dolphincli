import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { slug } = useParams();
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📄 Blog Post: <code>{slug}</code></h1>
      <p>यो /blog/:slug dynamic route हो — dolphin-routing ले auto-generate गर्यो!</p>
      <a href="/blog">← Blog</a>
    </div>
  );
}

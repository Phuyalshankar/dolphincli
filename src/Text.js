
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
export default function Test() {
  const [theme, setTheme] = useState("light");
  const [gender, setGender] = useState("female");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-6 p-6 bg-[color:var(--color-surface)] text-[color:var(--color-text)] transition-colors duration-300">

      <h1 className="text-3xl font-bold mb-4">🐬 Dolphin Global Form + Radio + Buttons</h1>

      {/* ===== Form Inputs ===== */}
      <form className="flex flex-col gap-4 w-full max-w-md">
        <div className="input-wrapper">
          <label className="input-label" htmlFor="name">Full Name</label>
          <input id="name" type="text" placeholder="Full Name" className="filled primary md w-full" />
        </div>

        <div className="input-wrapper">
          <label className="input-label" htmlFor="email">Email Address</label>
          <input id="email" type="email" placeholder="Email Address" className="filled danger md w-full" />
        </div>

        <div className="input-wrapper">
          <label className="input-label" htmlFor="message">Message</label>
          <textarea id="message" placeholder="Write your message..." rows={4} className="outlined warning md w-full" />
        </div>

        {/* ===== Radio Group ===== */}
        <div className="radio-group mt-2">
          <div className="radio-item">
            <input type="radio" id="female" name="gender" value="female" checked={gender==="female"} onChange={e=>setGender(e.target.value)} />
            <label htmlFor="female" className="radio-label">Female</label>
          </div>
          <div className="radio-item">
            <input type="radio" id="male" name="gender" value="male" checked={gender==="male"} onChange={e=>setGender(e.target.value)} />
            <label htmlFor="male" className="radio-label">Male</label>
          </div>
          <div className="radio-item">
            <input type="radio" id="other" name="gender" value="other" checked={gender==="other"} onChange={e=>setGender(e.target.value)} />
            <label htmlFor="other" className="radio-label">Other</label>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="filled primary md flex items-center justify-center gap-2 mt-2">
          <Check size={16} /> Submit
        </button>
      </form>

      {/* ===== Theme Toggle Circle ===== */}
      <div className="mt-6">
        <button className="circle filled primary md flex items-center justify-center w-20 h-20" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

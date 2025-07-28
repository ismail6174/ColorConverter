function convertHex() {
      const hex = document.getElementById('hexInput').value.trim();
      let cleanHex = hex.replace(/^#/, '');

      if (/^[0-9A-Fa-f]{3}$/.test(cleanHex)) {
        cleanHex = cleanHex.split('').map(c => c + c).join('');
      }

      if (/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        const rgb = `rgb(${r}, ${g}, ${b})`;
        document.getElementById('rgbOutput').value = rgb;
        document.getElementById('colorPreview').style.backgroundColor = rgb;

        const hsl = rgbToHsl(r, g, b);
        document.getElementById('hslOutput').value = hsl;
      } else {
        document.getElementById('rgbOutput').value = '';
        document.getElementById('hslOutput').value = '';
        document.getElementById('colorPreview').style.backgroundColor = 'transparent';
      }
    }

    function convertRGB() {
      const rgbInput = document.getElementById('rgbInput').value.trim();

      // Accept both "rgb(255, 87, 51)" and "255,87,51"
      const cleaned = rgbInput.replace(/rgb|||\s+/gi, '');
      const parts = cleaned.split(',').map(Number);

      if (parts.length === 3 && parts.every(v => v >= 0 && v <= 255)) {
        const [r, g, b] = parts;
        const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
        document.getElementById('hexOutput').value = hex;
        document.getElementById('colorPreview').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      } else {
        document.getElementById('hexOutput').value = '';
        document.getElementById('colorPreview').style.backgroundColor = 'transparent';
      }
    }

    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    function copyText(id) {
      const text = document.getElementById(id).value;
      if (text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert(`${id.toUpperCase().replace('OUTPUT', '')} copied to clipboard!`);
      }
    }

    function toggleTheme() {
      const root = document.documentElement;
      const body = document.body;
      const btn = document.getElementById('themeToggleBtn');
      if (body.getAttribute('data-theme') === 'light') {
        // Switch to dark theme
        body.setAttribute('data-theme', 'dark');
        root.style.setProperty('--bg-color', '#121212');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--input-bg', '#1e1e1e');
        root.style.setProperty('--input-text', 'white');
        root.style.setProperty('--button-bg', '#00ffcc');
        root.style.setProperty('--button-text', '#121212');
        root.style.setProperty('--preview-border', '#00ffcc');
        btn.textContent = "Switch 🔅";
        localStorage.setItem('theme', 'dark');
      } else {
        // Switch to light theme
        body.setAttribute('data-theme', 'light');
        root.style.setProperty('--bg-color', 'white');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--input-bg', '#ddd');
        root.style.setProperty('--input-text', '#222');
        root.style.setProperty('--button-bg', '#007acc');
        root.style.setProperty('--button-text', 'white');
        root.style.setProperty('--preview-border', '#007acc');
        btn.textContent = "Switch 🌙";
        localStorage.setItem('theme', 'light');
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        document.documentElement.style.setProperty('--bg-color', 'white');
        document.documentElement.style.setProperty('--text-color', 'black');
        document.documentElement.style.setProperty('--input-bg', '#ddd');
        document.documentElement.style.setProperty('--input-text', '#222');
        document.documentElement.style.setProperty('--button-bg', '#007acc');
        document.documentElement.style.setProperty('--button-text', 'white');
        document.documentElement.style.setProperty('--preview-border', '#007acc');
        document.getElementById('themeToggleBtn').textContent = "Switch 🌙/🔅";
      } else {
        document.body.setAttribute('data-theme', 'dark');
      }
    });
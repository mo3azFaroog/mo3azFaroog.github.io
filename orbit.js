/* ===== Orbit photo: builds the floating tool icons and draws the connecting lines ===== */
(function () {
  // Edit this list to add / remove / reorder tools.
  const tools = [
    { name: 'HTML',             img: 'assets/icons/html5.png',        color: '#e34f26' },
    { name: 'CSS',              img: 'assets/icons/css3.png',         color: '#2196f3' },
    { name: 'Python',           img: 'assets/icons/python.png',       color: '#f2c12e' },
    { name: 'MySQL',            img: 'assets/icons/sql.png',          color: '#3b82a8' },
    { name: 'Power BI',         img: 'assets/icons/powerbi.png',      color: '#f2c811' },
    { name: 'Claude',           img: 'assets/icons/claude.png',       color: '#d97757' },
    { name: 'VS Code',          img: 'assets/icons/vscode.png',       color: '#1e90ff' },
    { name: 'Google Drive',     img: 'assets/icons/google-drive.png', color: '#34a853' },
    { name: 'Microsoft Office', img: 'assets/icons/office.png',       color: '#ff5722' }
  ];

  const orbit = document.getElementById('orbit');
  const svg = document.getElementById('orbit-lines');
  if (!orbit || !svg) return;

  const RADIUS = 0.40;                       // distance from the photo (0 - 0.5)
  const NS = 'http://www.w3.org/2000/svg';
  const items = [];

  tools.forEach((t, i) => {
    const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
    const left = 50 + Math.cos(angle) * RADIUS * 100;
    const top  = 50 + Math.sin(angle) * RADIUS * 100;

    const node = document.createElement('div');
    node.className = 'orbit-node';
    node.style.left = left + '%';
    node.style.top = top + '%';

    const chip = document.createElement('div');
    chip.className = 'orbit-chip';
    chip.style.setProperty('--dur', (5 + (i % 4)) + 's');
    chip.style.setProperty('--delay', (-i * 0.7) + 's');
    chip.style.setProperty('--fx', ((i % 2 ? 1 : -1) * (5 + (i % 3) * 3)) + 'px');
    chip.style.setProperty('--fy', ((i % 3 === 0 ? 1 : -1) * (8 + (i % 2) * 4)) + 'px');

    const icon = document.createElement('div');
    icon.className = 'orbit-icon';
    icon.style.setProperty('--c', t.color);

    const img = document.createElement('img');
    img.src = t.img;
    img.alt = t.name;
    icon.appendChild(img);

    const label = document.createElement('span');
    label.className = 'orbit-label';
    label.textContent = t.name;

    chip.append(icon, label);
    node.appendChild(chip);
    orbit.appendChild(node);

    const line = document.createElementNS(NS, 'line');
    svg.appendChild(line);
    items.push({ icon, line });
  });

  // Icons float, so the lines are re-drawn on every frame.
  function draw() {
    const box = orbit.getBoundingClientRect();
    const cx = box.width / 2;
    const cy = box.height / 2;
    items.forEach(({ icon, line }) => {
      const r = icon.getBoundingClientRect();
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', r.left - box.left + r.width / 2);
      line.setAttribute('y2', r.top - box.top + r.height / 2);
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

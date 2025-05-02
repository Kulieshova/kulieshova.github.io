    const innerIcons = ['🧠','🐻','💪','🎓','💻'];
    const outerIcons = ['✨','🏃','🌸','🐾','🧩','🎮','📚','✍️'];

    const container = document.querySelector('.orbit-container');

    // helper to create each icon
    function makeIcon(emoji, angle, cls) {
      const wrap = document.createElement('div');
      wrap.classList.add('icon', cls);
      wrap.style.setProperty('--angle', angle + 'deg');
      wrap.innerHTML = `<div class="icon-content">${emoji}</div>`;
      container.appendChild(wrap);
    }

    // populate inner orbit
    innerIcons.forEach((e, i) => {
      const angle = 360 / innerIcons.length * i;
      makeIcon(e, angle, 'inner-icon');
    });

    // populate outer orbit
    outerIcons.forEach((e, i) => {
      const angle = 360 / outerIcons.length * i;
      makeIcon(e, angle, 'outer-icon');
    });
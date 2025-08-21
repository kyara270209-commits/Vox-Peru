const candidatos = [
  {
    id: 1,
    nombre: "Pedro Castillo",
    partido: "Perú Libre",
    foto: "👨‍🌾",
    cargo: "Presidente de la República (2021–2022)",
    propuestas: ["Asamblea Constituyente", "Reformas estructurales", "Mejora salarial a maestros"],
    obras: ["Ampliación de centros de salud en Cajamarca", "Programa de apoyo a pequeños agricultores"],
    antecedentes: "Investigación por lavado de activos, destitución y arresto preventivo (2022)",
    historial: "Ex maestro rural, líder sindical, candidato presidencial 2021"
  },
  {
    id: 2,
    nombre: "Alan García",
    partido: "APRA",
    foto: "🤵",
    cargo: "Presidente de la República (1985–1990, 2006–2011)",
    propuestas: ["Apertura económica", "Modernización del Estado", "Lucha contra el terrorismo"],
    obras: ["Reconstrucción tras El Niño 1983", "Proyectos de infraestructura vial"],
    antecedentes: "Investigado por caso Odebrecht, falleció en 2019 durante proceso judicial",
    historial: "Líder histórico de APRA, dos veces presidente"
  },
  {
    id: 3,
    nombre: "Keiko Fujimori",
    partido: "Fuerza Popular",
    foto: "👩‍💼",
    cargo: "Congresista, candidata presidencial (2011, 2016, 2021)",
    propuestas: ["Lucha contra la corrupción", "Seguridad ciudadana", "Apoyo a emprendedores"],
    obras: "Ninguna como funcionaria directa, pero vinculada a gestión municipal de Lima (2003–2005)",
    antecedentes: "Procesada por lavado de activos (caso Odebrecht), arresto preventivo (2018–2023)",
    historial: "Hija de Alberto Fujimori, congresista desde 2006"
  }
];

const factChecks = [
  {
    frase: "No soy corrupto, nunca he tenido un solo caso de corrupción",
    origen: "Keiko Fujimori, 2016",
    veredicto: "Falso",
    explicacion: "Tiene múltiples procesos por lavado de activos, incluyendo el caso Odebrecht."
  },
  {
    frase: "Voy a gobernar para todos, sin exclusiones",
    origen: "Pedro Castillo, 2021",
    veredicto: "Parcialmente Verdadero",
    explicacion: "Su gobierno mostró polarización y intento de autogolpe de Estado en 2022."
  },
  {
    frase: "El Perú crecerá con justicia social",
    origen: "Alan García, 2006",
    veredicto: "Parcialmente Verdadero",
    explicacion: "Hubo crecimiento económico, pero también casos de corrupción en su segundo gobierno."
  }
];

const testimonios = [
  {
    id: 1,
    candidato: "Pedro Castillo",
    relacion: "ex colaborador",
    comentario: "Tenía buenas intenciones, pero su entorno estaba lleno de intereses ocultos.",
    votos: { util: 12, no_util: 3 }
  },
  {
    id: 2,
    candidato: "Alan García",
    relacion: "periodista",
    comentario: "Carismático y hábil orador, pero su gobierno terminó marcado por corrupción.",
    votos: { util: 10, no_util: 5 }
  },
  {
    id: 3,
    candidato: "Keiko Fujimori",
    relacion: "vecino",
    comentario: "Muy preparada, pero parece más interesada en poder que en servir.",
    votos: { util: 8, no_util: 7 }
  }
];

const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const mainContent = document.getElementById('mainContent');
const sections = document.querySelectorAll('.section');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  mainContent.classList.toggle('shift');
});

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  sidebar.classList.remove('open');
  mainContent.classList.remove('shift');
}

document.querySelectorAll('[data-section]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(el.getAttribute('data-section'));
  });
});

function loadCandidatos() {
  const container = document.getElementById('candidatosList');
  container.innerHTML = '';
  candidatos.forEach(c => {
    const div = document.createElement('div');
    div.className = 'candidate-profile';
    div.innerHTML = `
      <div class="candidate-photo">${c.foto}</div>
      <div class="candidate-info">
        <h3>${c.nombre}</h3>
        <p><strong>Partido:</strong> ${c.partido}</p>
        <p><strong>Cargo:</strong> ${c.cargo}</p>
        <div class="candidate-summary">
          <span class="summary-item">📚 ${c.propuestas.length} propuestas</span>
          <span class="summary-item">🔨 ${c.obras.length} obras</span>
          <span class="summary-item">⚠️ ${c.antecedentes.includes("Ninguno") ? "Limpio" : "Con proceso"}</span>
          <span class="summary-item">🏛️ ${c.historial.substring(0, 30)}...</span>
        </div>
        <button onclick="showDetail(${c.id})" class="btn-more">Ver más</button>
        <button onclick="addToComparator(${c.id})" class="btn-more">➕ Comparar</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function showDetail(id) {
  const c = candidatos.find(can => can.id === id);
  alert(`Detalles de ${c.nombre} (${c.partido}):
  
Propuestas: ${c.propuestas.join(', ')}
Obras: ${c.obras.join(', ')}
Antecedentes: ${c.antecedentes}
Historial: ${c.historial}`);
}

let selectedForCompare = [];
function addToComparator(id) {
  if (selectedForCompare.includes(id)) {
    selectedForCompare = selectedForCompare.filter(c => c !== id);
    alert("Candidato eliminado del comparador");
  } else if (selectedForCompare.length < 3) {
    selectedForCompare.push(id);
    alert("Candidato añadido al comparador");
  } else {
    alert("Solo puedes comparar hasta 3 candidatos");
  }
}

function loadComparador() {
  const selector = document.getElementById('selectorComparador');
  selector.innerHTML = '<p>Selecciona candidatos:</p>';
  candidatos.forEach(c => {
    const checked = selectedForCompare.includes(c.id) ? 'checked' : '';
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${c.id}" ${checked}> ${c.nombre}`;
    selector.appendChild(label);
  });

  const btn = document.createElement('button');
  btn.textContent = "Comparar";
  btn.onclick = performCompare;
  selector.appendChild(btn);
}

function performCompare() {
  const selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                       .map(cb => parseInt(cb.value));
  const resultDiv = document.getElementById('resultadoComparador');
  resultDiv.innerHTML = '';

  if (selected.length === 0) {
    resultDiv.innerHTML = '<p>Selecciona al menos un candidato.</p>';
    return;
  }

  const html = selected.map(id => {
    const c = candidatos.find(can => can.id === id);
    const obras = c.obras.length;
    const denuncias = c.antecedentes.includes("Ninguno") ? 0 : 1;
    return `
      <div class="candidate-card">
        <h4>${c.nombre}</h4>
        <strong>Propuestas:</strong> ${c.propuestas.length}/5
        <div class="bar"><div class="bar-fill" style="width:${(c.propuestas.length/5)*100}%"></div></div>
        <strong>Obras:</strong> ${obras}/4
        <div class="bar"><div class="bar-fill" style="width:${(obras/4)*100}%"></div></div>
        <strong>Antecedentes:</strong> ${denuncias ? "Con proceso" : "Limpio"}
        <div class="bar"><div class="bar-fill" style="width:${(1-denuncias)*100}%"></div></div>
      </div>
    `;
  }).join('');

  resultDiv.innerHTML = `<div class="comparator">${html}</div>`;
}

function loadFactChecking() {
  const container = document.getElementById('factCheckList');
  container.innerHTML = '';
  factChecks.forEach(fc => {
    const div = document.createElement('div');
    div.className = 'fact-item';
    let cls = fc.veredicto === "Verdadero" ? "verdadero" : fc.veredicto === "Falso" ? "falso" : "parcial";
    div.innerHTML = `
      <p><strong>Frase:</strong> "${fc.frase}"</p>
      <p><strong>Origen:</strong> ${fc.origen}</p>
      <p><strong>Explicación:</strong> ${fc.explicacion}</p>
      <span class="fact-verdict ${cls}">${fc.veredicto}</span>
      <button onclick="shareFact('${fc.frase}')" style="margin-top:10px;background:#1a3a6e;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">📤 Compartir</button>
    `;
    container.appendChild(div);
  });
}

function shareFact(frase) {
  alert(`Compartiendo: "${frase}" vía Vox Perú`);
}

function loadTestimonios() {
  const container = document.getElementById('testimoniosList');
  container.innerHTML = '';
  testimonios.forEach(t => {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.innerHTML = `
      <p><strong>${t.candidato}</strong> – <em class="testimonial-relacion">${t.relacion}</em></p>
      <p>${t.comentario}</p>
      <div class="testimonial-actions">
        <button class="btn-vote" onclick="vote(${t.id}, 'util')">👍 Útil (${t.votos.util})</button>
        <button class="btn-vote" onclick="vote(${t.id}, 'no_util')">👎 No útil (${t.votos.no_util})</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function vote(id, type) {
  const t = testimonios.find(tt => tt.id === id);
  t.votos[type]++;
  loadTestimonios();
}

function loadGuia() {
  const container = document.getElementById('guiaCuestionario');
  container.innerHTML = `
    <form id="formGuia">
      <p><strong>¿Qué priorizas?</strong></p>
      <label><input type="radio" name="tema" value="salud"> Salud pública</label>
      <label><input type="radio" name="tema" value="educacion"> Educación</label>
      <label><input type="radio" name="tema" value="seguridad"> Seguridad ciudadana</label>
      <label><input type="radio" name="tema" value="economia"> Economía familiar</label>
      <button type="submit" style="margin-top:15px;background:#1a3a6e;color:white;padding:10px;border:none;border-radius:6px;cursor:pointer;">Ver resultado</button>
    </form>
  `;
  document.getElementById('formGuia').onsubmit = (e) => {
    e.preventDefault();
    const tema = document.querySelector('input[name="tema"]:checked')?.value || 'ninguno';
    let recomendacion = '';
    if (tema === 'salud' || tema === 'educacion') recomendacion = 'Pedro Castillo';
    else if (tema === 'seguridad') recomendacion = 'Keiko Fujimori';
    else recomendacion = 'Alan García';
    alert(`Tu prioridad: ${tema}. Candidato más alineado: ${recomendacion}.`);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  loadCandidatos();
  loadComparador();
  loadFactChecking();
  loadTestimonios();
  loadGuia();
});
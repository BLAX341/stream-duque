// --- CONFIGURACIÓN DE CONEXIÓN CON POSTGRESQL (SUPABASE) ---
// (Recuerda reemplazar estas dos variables con tus claves reales de Supabase)
const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co'; 
const SUPABASE_ANON_KEY = 'TU_CLAVE_ANON_AQUI';        

// Inicializamos el cliente de Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función principal para traer los datos desde PostgreSQL
async function cargarPlanes() {
  const { data: planes, error } = await supabaseClient
    .from('planes')
    .select(`
      id,
      nombre,
      precio,
      color_borde,
      caracteristicas_plan ( texto )
    `)
    .eq('activo', true);

  if (error) {
    console.error('Error al conectar con PostgreSQL:', error);
    return;
  }

  const contenedor = document.querySelector('.products-grid');
  if (!contenedor) return;
  contenedor.innerHTML = ''; 

  planes.forEach(plan => {
    const beneficiosHtml = plan.caracteristicas_plan
      .map(item => `<li><i class="fas fa-check"></i> ${item.texto}</li>`)
      .join('');

    const nombreClean = plan.nombre.replace('+', '');
    const msgComprar = encodeURIComponent(`Hola, deseo comprar ${plan.nombre}`);
    const msgYape = encodeURIComponent(`Hola, deseo pagar por YAPE mi perfil de ${plan.nombre}`);

    const tarjeta = `
      <div class="card-product ${plan.color_borde}">
        <div class="card-header">
          <h3 class="title-${nombreClean.toLowerCase()}">${plan.nombre}</h3>
        </div>
        <div class="card-body">
          <p class="price">S/ ${parseFloat(plan.precio).toFixed(2)} <span>/ mes</span></p>
          <ul>
            ${beneficiosHtml}
          </ul>
          <a href="https://wa.me/51990516065?text=${msgComprar}" class="btn-card btn-${nombreClean.toLowerCase()}" target="_blank">Comprar Perfil</a>
          <div class="payment-methods">
            <a href="https://wa.me/51990516065?text=${msgYape}" class="badge-yape" target="_blank">
              <i class="fas fa-mobile-alt"></i> Pagar con YAPE
            </a>
          </div>
        </div>
      </div>
    `;

    contenedor.innerHTML += tarjeta;
  });
}

// Cargar los datos cuando abra la página
document.addEventListener('DOMContentLoaded', cargarPlanes);

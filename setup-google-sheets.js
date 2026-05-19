/**
 * Google Apps Script — Setup inicial de hojas RCV-Digital
 *
 * INSTRUCCIONES:
 * 1. Abre Google Sheets: https://docs.google.com/spreadsheets/d/1vkR76VyiE_vB5ylIP40dy6-If9r9MyOuXkc3EUtw3tg
 * 2. Extensions → Apps Script
 * 3. Borra el código existente y pega todo este archivo
 * 4. Haz clic en "Run" (ícono ▶) con la función setupSheets seleccionada
 * 5. Autoriza los permisos que pida
 * 6. Listo — las dos pestañas quedan creadas y llenadas
 */

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ─── PESTAÑA TEMAS ──────────────────────────────────────────────────────────
  var temasSheet = ss.getSheetByName('TEMAS');
  if (!temasSheet) {
    temasSheet = ss.insertSheet('TEMAS');
  } else {
    temasSheet.clear();
  }

  var temasHeaders = ['semana', 'tema', 'keyword_seo', 'categoria', 'estado', 'fecha_publicacion', 'url_articulo'];
  temasSheet.getRange(1, 1, 1, temasHeaders.length).setValues([temasHeaders]);

  // Formato encabezado
  var headerRange = temasSheet.getRange(1, 1, 1, temasHeaders.length);
  headerRange.setBackground('#131313');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');

  var temasData = [
    ['2025-S10', 'Los 5 errores estructurales en Meta Ads que comprometen el ROAS', 'meta ads shopify roas', 'paid-media', 'PUBLICADO', 'Mar 2025', 'art-meta-ads.html'],
    ['2025-S06', 'Por qué recuperar el carrito abandonado es más rentable que adquirir nuevos compradores', 'abandono carrito shopify', 'email', 'PUBLICADO', 'Feb 2025', 'art-abandono-carrito.html'],
    ['2025-S02', 'Benchmarks de e-commerce Shopify en Latam: las métricas reales', 'benchmarks shopify latam', 'cro', 'PUBLICADO', 'Ene 2025', 'art-benchmarks.html'],
    ['2024-S48', 'Cuándo (y cuándo no) escalar el presupuesto en Meta Ads', 'escalar meta ads shopify', 'paid-media', 'PUBLICADO', 'Dic 2024', 'art-escalar-ads.html'],
    ['2024-S44', 'Welcome Series en Klaviyo: la secuencia que genera más revenue', 'welcome series klaviyo', 'email', 'PUBLICADO', 'Nov 2024', 'art-welcome-series.html'],
    ['2024-S40', 'Advantage+ de Meta vs campañas manuales para e-commerce Shopify', 'advantage plus meta ads', 'paid-media', 'PUBLICADO', 'Oct 2024', 'art-advantage-plus.html'],
    ['2024-S36', 'Calendario de Black Friday para e-commerce Shopify: el plan de 8 semanas', 'black friday shopify', 'paid-media', 'PUBLICADO', 'Sep 2024', 'art-black-friday.html'],
    ['2026-S19', 'Cómo estructurar el funnel de Meta Ads por temperatura de audiencia', 'funnel meta ads temperatura', 'paid-media', '[PENDIENTE]', '', ''],
    ['2026-S20', 'Email Marketing post-compra: la secuencia que aumenta el LTV en Klaviyo', 'klaviyo post compra ltv', 'email', '[PENDIENTE]', '', ''],
    ['2026-S21', 'CRO en checkout Shopify: los 7 puntos de fuga que cuestan ventas', 'cro checkout shopify', 'cro', '[PENDIENTE]', '', ''],
    ['2026-S22', 'Cómo calcular el presupuesto óptimo de Meta Ads según el revenue', 'presupuesto meta ads ecommerce', 'paid-media', '[PENDIENTE]', '', ''],
    ['2026-S23', 'Segmentación Lookalike vs intereses en Meta Ads para Latam', 'lookalike meta ads latam', 'paid-media', '[PENDIENTE]', '', ''],
    ['2026-S24', 'Klaviyo Flows avanzados: segmentación por comportamiento de compra', 'klaviyo flows segmentacion', 'email', '[PENDIENTE]', '', ''],
    ['2026-S25', 'Por qué sube el CPM en Meta Ads y cómo controlarlo', 'cpm meta ads control', 'paid-media', '[PENDIENTE]', '', ''],
    ['2026-S26', 'Shopify Markets: cómo vender en múltiples países', 'shopify markets paises', 'cro', '[PENDIENTE]', '', ''],
    ['2026-S27', 'La estructura de reporte semanal que usan los e-commerces que escalan', 'reporte semanal ecommerce', 'cro', '[PENDIENTE]', '', ''],
  ];

  temasSheet.getRange(2, 1, temasData.length, temasHeaders.length).setValues(temasData);

  // Formato filas PUBLICADO (verde oscuro) y PENDIENTE (gris)
  for (var i = 0; i < temasData.length; i++) {
    var row = i + 2;
    var estado = temasData[i][4];
    var rowRange = temasSheet.getRange(row, 1, 1, temasHeaders.length);
    if (estado === 'PUBLICADO') {
      rowRange.setBackground('#0d1f0d');
      temasSheet.getRange(row, 5).setFontColor('#4caf50');
    } else {
      rowRange.setBackground('#1a1a1a');
      temasSheet.getRange(row, 5).setFontColor('#888888');
    }
  }

  // Ancho de columnas
  temasSheet.setColumnWidth(1, 90);
  temasSheet.setColumnWidth(2, 420);
  temasSheet.setColumnWidth(3, 200);
  temasSheet.setColumnWidth(4, 100);
  temasSheet.setColumnWidth(5, 110);
  temasSheet.setColumnWidth(6, 130);
  temasSheet.setColumnWidth(7, 200);
  temasSheet.setFrozenRows(1);

  // ─── PESTAÑA SUSCRIPTORES ───────────────────────────────────────────────────
  var susSheet = ss.getSheetByName('SUSCRIPTORES');
  if (!susSheet) {
    susSheet = ss.insertSheet('SUSCRIPTORES');
  } else {
    susSheet.clear();
  }

  var susHeaders = ['nombre', 'email', 'pais', 'fecha_suscripcion', 'fuente', 'estado_beehiiv'];
  susSheet.getRange(1, 1, 1, susHeaders.length).setValues([susHeaders]);

  var susHeaderRange = susSheet.getRange(1, 1, 1, susHeaders.length);
  susHeaderRange.setBackground('#131313');
  susHeaderRange.setFontColor('#ffffff');
  susHeaderRange.setFontWeight('bold');

  susSheet.setColumnWidth(1, 160);
  susSheet.setColumnWidth(2, 240);
  susSheet.setColumnWidth(3, 100);
  susSheet.setColumnWidth(4, 160);
  susSheet.setColumnWidth(5, 100);
  susSheet.setColumnWidth(6, 130);
  susSheet.setFrozenRows(1);

  // Configurar fondo oscuro a las hojas
  temasSheet.setTabColor('#131313');
  susSheet.setTabColor('#1a1a1a');

  SpreadsheetApp.getUi().alert('✅ Setup completado\n\nPestaña TEMAS: ' + temasData.length + ' filas cargadas.\nPestaña SUSCRIPTORES: lista para recibir datos automáticos.');
}

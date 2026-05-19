# Guía de Setup Completo — RCV-Digital Automatización

Tiempo total estimado: **45-60 minutos** (una sola vez)

---

## PASO 1 — GitHub: crear repositorio y subir archivos

### 1a. Instalar GitHub CLI
```bash
# Opción A: descargar el instalador
# → https://cli.github.com → Download for macOS → ejecutar el .pkg

# Opción B: si tienes Homebrew
brew install gh
```

### 1b. Autenticarte
```bash
gh auth login
# Selecciona: GitHub.com → HTTPS → Login with browser
```

### 1c. Crear repo y subir el sitio
```bash
cd ~/rcv-digital-web
git init
git add index.html publicaciones.html art-*.html privacy.html terms.html _headers _redirects robots.txt sitemap.xml apple-touch-icon.png favicon.ico icon-192.png icon-512.png
git commit -m "feat: sitio inicial RCV-Digital"
gh repo create rcv-digital-web --public --source=. --remote=origin --push
```

**Resultado:** tu código está en `github.com/TU_USUARIO/rcv-digital-web`

### 1d. Crear Personal Access Token para Make.com
1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. "Generate new token (classic)"
3. Nombre: `Make-RCV-Digital`
4. Scopes: marcar solo `repo` (acceso completo a repos privados/públicos)
5. Expiración: 1 año
6. Copia el token → lo necesitas en los pasos de Make.com

---

## PASO 2 — Cloudflare Pages: conectar con GitHub

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → **rcvdigital**
2. Settings → Builds & Deployments → Connected Git Repository
3. Si no está conectado: "Connect to Git" → GitHub → autorizar → seleccionar `rcv-digital-web`
4. Build settings:
   - **Build command:** (dejar vacío)
   - **Build output directory:** `/`
   - **Branch:** `main`
5. Save

**Test:** haz un push de prueba y verifica que Cloudflare despliega automáticamente.

---

## PASO 3 — Google Sheets: setup inicial

1. Abre [la planilla](https://docs.google.com/spreadsheets/d/1vkR76VyiE_vB5ylIP40dy6-If9r9MyOuXkc3EUtw3tg)
2. Extensions → Apps Script
3. Borra todo el código existente
4. Copia y pega el contenido de `setup-google-sheets.js`
5. Haz clic en el menú desplegable de funciones → selecciona `setupSheets`
6. Clic en ▶ Run
7. Autoriza los permisos que pida (son solo para esta planilla)
8. Aparecerá un alert: "✅ Setup completado"

**Resultado:** dos pestañas creadas (TEMAS con 16 filas + SUSCRIPTORES vacía)

---

## PASO 4 — Make.com: importar los escenarios

### Escenario 1 — Suscriptores

1. Ve a [make.com](https://make.com) → My Scenarios → Create a new scenario
2. Clic en los tres puntos (...) → Import Blueprint
3. Sube `MAKE-Escenario-Suscriptores.json`
4. Conecta el módulo de Google Sheets con tu cuenta de Google
5. Activa el escenario (toggle ON)
6. Copia la URL del webhook que aparece en el Módulo 1
7. Ve a [formspree.io](https://formspree.io) → tu formulario → Settings → Webhooks → agrega la URL

### Escenario 2 — Publicar blog + newsletter

1. Create a new scenario → Import Blueprint
2. Sube `MAKE-Escenario-Publicar.json`
3. En los módulos 2, 3 y 4 (GitHub API), reemplaza:
   - `{{GITHUB_USERNAME}}` → tu usuario de GitHub
   - `{{GITHUB_TOKEN}}` → el token del Paso 1d
4. Conecta el módulo de Google Sheets con tu cuenta de Google
5. Conecta el módulo de Gmail con tu cuenta Gmail
6. **No activar** este escenario (se corre manualmente con "Run once")

---

## PASO 5 — Beehiiv: configuraciones finales

1. Ve a [app.beehiiv.com](https://app.beehiiv.com) → Settings

### Double opt-in (anti-spam)
- Settings → Subscription → Email Confirmation → Enable

### Verificar dominio (SPF/DKIM)
- Settings → Domains → Add domain → `rcv-digital.com`
- Beehiiv te dará 2-3 registros DNS para agregar
- Ve a Cloudflare DNS → agrega los registros
- Vuelve a Beehiiv → Verify domain

### Configurar remitente
- Settings → Sending → From name: `RCV-Digital`
- Reply-to: `rcvdigitalma@gmail.com`

---

## PASO 6 — Claude.ai: crear el Agente Redactor

1. Ve a [claude.ai](https://claude.ai) → Projects → New Project
2. Nombre: `RCV Redactor`
3. Instructions → pega todo el contenido de `AGENTE-REDACTOR-PROMPT.txt`
4. Save

---

## PASO 7 — Verificación final

### Test del Escenario 1 (suscriptores)
```bash
curl -X POST "URL_WEBHOOK_ESCENARIO_1" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","nombre":"Test Usuario","pais":"Chile"}'
```
Verificar:
- ✓ Aparece en Beehiiv (lista de suscriptores)
- ✓ Aparece en Google Sheets pestaña SUSCRIPTORES
- ✓ Si envías el mismo email dos veces: NO se duplica en Sheets (Make verifica) y Beehiiv lo reactiva

### Test del Escenario 2 (publicación)

1. Make.com → Escenario 2 → Run once
2. Cuando pida datos, pega este JSON de prueba:

```json
{
  "slug": "art-test-automatizacion",
  "titulo": "Test: verificación del sistema de automatización",
  "categoria": "cro",
  "categoria_label": "CRO · Datos",
  "fecha": "May 2026",
  "tiempo_lectura": 5,
  "resumen": "Artículo de prueba para verificar que el sistema de automatización funciona correctamente. Este texto no llegará a producción y será eliminado después de confirmar que todos los módulos funcionan.",
  "asunto_email": "Test del sistema — ignorar",
  "preview_text": "Este es un test del sistema de automatización.",
  "tema_publicado": "Cómo estructurar el funnel de Meta Ads por temperatura de audiencia",
  "articulo_html": "<!DOCTYPE html><html><head><title>Test</title></head><body><div class='art-hero'><h1 class='art-title'>TEST — Borrar este archivo</h1></div></body></html>",
  "newsletter_html": "<div style='background:#131313;color:#fff;padding:40px;font-family:Arial'>TEST — Sistema de automatización verificado</div>"
}
```

Verificar que:
- ✓ `art-test-automatizacion.html` aparece en el repo de GitHub
- ✓ Cloudflare Pages lo despliega (rcv-digital.com/art-test-automatizacion.html)
- ✓ El card de test aparece al inicio en rcv-digital.com/publicaciones
- ✓ El borrador aparece en Beehiiv (no enviarlo)
- ✓ El tema se marca como PUBLICADO en Google Sheets
- ✓ Llega email de confirmación a rcvdigitalma@gmail.com

### Limpieza después del test
1. Eliminar `art-test-automatizacion.html` del repo de GitHub (UI o `git rm`)
2. Restaurar `publicaciones.html` (revertir el commit del test o eliminar el card manualmente)
3. Restaurar el tema en Sheets: cambiar estado de vuelta a `[PENDIENTE]`

---

## Sistema listo ✅

A partir de aquí, el flujo semanal es:
1. **Lunes:** Claude genera JSON → tú copias → Make publica
2. **Martes 8am:** tú abres Beehiiv → clic en Send

Costo mensual: **USD 0**
